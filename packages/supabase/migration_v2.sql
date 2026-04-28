-- ============================================================
-- OpenSteps — Schema Migration v2
-- Run this in the Supabase SQL editor AFTER schema.sql
-- ============================================================

-- ── 1. Countries table ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.countries (
  code       text PRIMARY KEY,
  name       text NOT NULL,
  currency   text NOT NULL,
  flag       text NOT NULL,
  active     boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_countries" ON public.countries FOR SELECT USING (true);

INSERT INTO public.countries (code, name, currency, flag, active) VALUES
  ('sl', 'Sierra Leone', 'Le',  '🇸🇱', true),
  ('ng', 'Nigeria',      '₦',   '🇳🇬', false),
  ('za', 'South Africa', 'R',   '🇿🇦', false),
  ('gh', 'Ghana',        'GH₵', '🇬🇭', false)
ON CONFLICT (code) DO NOTHING;

-- ── 2. Add country column to guides ──────────────────────────────────────
ALTER TABLE public.guides
  ADD COLUMN IF NOT EXISTS country text NOT NULL DEFAULT 'sl' REFERENCES public.countries(code);

UPDATE public.guides SET country = 'sl' WHERE country IS NULL;

CREATE INDEX IF NOT EXISTS idx_guides_country ON public.guides(country, published);

-- ── 3. Auto-create verifier profile on auth.users insert ─────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.verifiers (id, display_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    'verifier'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── 4. Tip upvotes table ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.tip_upvotes (
  tip_id     uuid NOT NULL REFERENCES public.tips(id) ON DELETE CASCADE,
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tip_id, user_id)
);

ALTER TABLE public.tip_upvotes ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'tip_upvotes' AND policyname = 'public_read_tip_upvotes') THEN
    CREATE POLICY "public_read_tip_upvotes" ON public.tip_upvotes FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'tip_upvotes' AND policyname = 'auth_insert_tip_upvote') THEN
    CREATE POLICY "auth_insert_tip_upvote" ON public.tip_upvotes FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'tip_upvotes' AND policyname = 'auth_delete_tip_upvote') THEN
    CREATE POLICY "auth_delete_tip_upvote" ON public.tip_upvotes FOR DELETE USING (auth.uid() = user_id);
  END IF;
END $$;

-- Trigger: keep tips.upvotes denormalized from tip_upvotes count
CREATE OR REPLACE FUNCTION public.sync_tip_upvote_count()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  UPDATE public.tips
  SET upvotes = (
    SELECT COUNT(*) FROM public.tip_upvotes
    WHERE tip_id = COALESCE(NEW.tip_id, OLD.tip_id)
  )
  WHERE id = COALESCE(NEW.tip_id, OLD.tip_id);
  RETURN COALESCE(NEW, OLD);
END;
$$;

DROP TRIGGER IF EXISTS trg_tip_upvotes ON public.tip_upvotes;
CREATE TRIGGER trg_tip_upvotes
  AFTER INSERT OR DELETE ON public.tip_upvotes
  FOR EACH ROW EXECUTE FUNCTION public.sync_tip_upvote_count();

-- ── 5. Edit requests table ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.edit_requests (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guide_id     uuid NOT NULL REFERENCES public.guides(id) ON DELETE CASCADE,
  requester_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reason       text NOT NULL,
  status       text NOT NULL DEFAULT 'pending',
  reviewed_by  uuid REFERENCES auth.users(id),
  reviewed_at  timestamptz,
  created_at   timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.edit_requests ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'edit_requests' AND policyname = 'editors_read_edit_requests') THEN
    -- Editors see all; requesters see their own
    CREATE POLICY "editors_read_edit_requests" ON public.edit_requests
      FOR SELECT USING (
        auth.uid() = requester_id
        OR EXISTS (
          SELECT 1 FROM public.verifiers
          WHERE id = auth.uid() AND role = 'editor'
        )
      );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'edit_requests' AND policyname = 'auth_insert_edit_request') THEN
    CREATE POLICY "auth_insert_edit_request" ON public.edit_requests
      FOR INSERT WITH CHECK (auth.uid() = requester_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'edit_requests' AND policyname = 'editors_update_edit_request') THEN
    CREATE POLICY "editors_update_edit_request" ON public.edit_requests
      FOR UPDATE USING (
        EXISTS (SELECT 1 FROM public.verifiers WHERE id = auth.uid() AND role = 'editor')
      );
  END IF;
END $$;

-- ── 6. Add columns to guide_verifications ────────────────────────────────
ALTER TABLE public.guide_verifications
  ADD COLUMN IF NOT EXISTS note text,
  ADD COLUMN IF NOT EXISTS verified_at timestamptz NOT NULL DEFAULT now();

-- ── 7. Auto-publish trigger (5 community verifications) ──────────────────
CREATE OR REPLACE FUNCTION public.check_auto_publish()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_count int;
BEGIN
  SELECT COUNT(*) INTO v_count
  FROM public.guide_verifications
  WHERE guide_id = NEW.guide_id;

  IF v_count >= 5 THEN
    UPDATE public.guides
    SET
      published        = true,
      trust_score      = 7.0,
      last_verified_at = now()
    WHERE id = NEW.guide_id AND published = false;

    -- Only insert feed event if the guide was actually unpublished
    IF FOUND THEN
      INSERT INTO public.community_feed (type, guide_id, actor_id, description)
      VALUES (
        'verify',
        NEW.guide_id,
        NEW.verifier_id,
        'Guide auto-published after 5 community verifications'
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_auto_publish ON public.guide_verifications;
CREATE TRIGGER trg_auto_publish
  AFTER INSERT ON public.guide_verifications
  FOR EACH ROW EXECUTE FUNCTION public.check_auto_publish();

-- ── 8. RLS write policies ─────────────────────────────────────────────────

-- Pending guides now readable by everyone (community verification)
DROP POLICY IF EXISTS "public_read_guides" ON public.guides;
CREATE POLICY "public_read_guides" ON public.guides FOR SELECT USING (true);

-- Tips: authenticated users can insert/delete their own
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'tips' AND policyname = 'auth_insert_tip') THEN
    CREATE POLICY "auth_insert_tip" ON public.tips FOR INSERT WITH CHECK (auth.uid() = author_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'tips' AND policyname = 'auth_delete_tip') THEN
    CREATE POLICY "auth_delete_tip" ON public.tips FOR DELETE USING (auth.uid() = author_id);
  END IF;
END $$;

-- Guide verifications: authenticated users can insert (PK prevents duplicates)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'guide_verifications' AND policyname = 'auth_insert_verification') THEN
    CREATE POLICY "auth_insert_verification" ON public.guide_verifications
      FOR INSERT WITH CHECK (auth.uid() = verifier_id);
  END IF;
END $$;

-- Verifiers: users can update their own profile
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'verifiers' AND policyname = 'auth_update_verifier') THEN
    CREATE POLICY "auth_update_verifier" ON public.verifiers
      FOR UPDATE USING (auth.uid() = id);
  END IF;
END $$;

-- ── 9. Enable Realtime on key tables ─────────────────────────────────────
-- Run these in Supabase Dashboard → Database → Replication if not already enabled:
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.community_feed;
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.tips;
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.guide_verifications;
