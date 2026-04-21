// App shell: tabs + tweaks
const { useState, useEffect } = React;

const SCREENS = [
  { id: 'home',       num: '01', title: 'Home & Discovery',   sub: 'Find a process. Search, browse categories, see recently verified guides. Mobile-first, low bandwidth.', render: () => <HomeScreen /> },
  { id: 'guide',      num: '02', title: 'Guide Detail',       sub: 'The actual step-by-step. Overview box, steps, docs, fees, evidence, tips, history.', render: () => <GuideScreen /> },
  { id: 'contribute', num: '03', title: 'Contribute a Guide', sub: 'Submit a new procedure. Structured template, evidence upload, save-for-later.', render: () => <ContributeScreen /> },
  { id: 'verify',     num: '04', title: 'Verification / Review', sub: 'Community validates submissions. Diff view, evidence checks, vote, fast-track for editors.', render: () => <VerifyScreen /> },
  { id: 'evidence',   num: '05', title: 'Evidence Upload',    sub: 'Receipts, forms, office photos. The trust layer. Offline-tolerant.', render: () => <EvidenceScreen /> },
];

function App() {
  const initial = (typeof localStorage !== 'undefined' && localStorage.getItem('os_tab')) || 'home';
  const [tab, setTab] = useState(initial);
  const [tweaksOpen, setTweaksOpen] = useState(false);

  useEffect(() => { try { localStorage.setItem('os_tab', tab); } catch {} }, [tab]);

  // Tweaks panel: listen, then announce
  useEffect(() => {
    const onMsg = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  useEffect(() => {
    const el = document.getElementById('tweaks');
    if (el) el.classList.toggle('hidden', !tweaksOpen);
  }, [tweaksOpen]);

  // Wire up tweak controls to body data-attrs
  useEffect(() => {
    const defaults = {
      fidelity: 'crisp', annotations: 'on', accent: 'marigold', density: 'roomy', form: 'both',
    };
    const saved = JSON.parse(localStorage.getItem('os_tweaks') || 'null') || defaults;
    const apply = (k, v) => {
      document.body.setAttribute('data-' + k, v);
      const sel = document.getElementById('tw-' + k);
      if (sel) sel.value = v;
    };
    Object.entries(saved).forEach(([k, v]) => apply(k, v));

    const onChange = (k) => (e) => {
      const v = e.target.value;
      document.body.setAttribute('data-' + k, v);
      const cur = JSON.parse(localStorage.getItem('os_tweaks') || 'null') || defaults;
      cur[k] = v;
      localStorage.setItem('os_tweaks', JSON.stringify(cur));
    };
    ['fidelity','annotations','accent','density','form'].forEach(k => {
      const el = document.getElementById('tw-' + k);
      if (el) el.addEventListener('change', onChange(k));
    });
    const closeBtn = document.getElementById('tweaks-close');
    if (closeBtn) closeBtn.addEventListener('click', () => setTweaksOpen(false));
  }, []);

  const current = SCREENS.find(s => s.id === tab) || SCREENS[0];

  return (
    <div>
      {current.render()}
    </div>
  );
}

function mountTabs() {
  const host = document.getElementById('tabs');
  const initial = (typeof localStorage !== 'undefined' && localStorage.getItem('os_tab')) || 'home';
  host.innerHTML = '';
  SCREENS.forEach(s => {
    const b = document.createElement('button');
    b.className = 'tab';
    b.textContent = s.num + ' · ' + s.title.replace(/ &.*/, '');
    b.setAttribute('aria-selected', s.id === initial ? 'true' : 'false');
    b.addEventListener('click', () => {
      localStorage.setItem('os_tab', s.id);
      [...host.children].forEach(c => c.setAttribute('aria-selected', 'false'));
      b.setAttribute('aria-selected', 'true');
      ReactDOM.render(<App />, document.getElementById('stage'));
    });
    host.appendChild(b);
  });
}

mountTabs();
ReactDOM.render(<App />, document.getElementById('stage'));
