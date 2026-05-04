// Shared inline styles and HTML shell for all OpenSteps email templates.
// All styles are inline — required for email client compatibility.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://opensteps.10na.city';

export const colors = {
  bg:      '#f7f3eb',
  white:   '#ffffff',
  border:  '#e8e3d8',
  divider: '#f0ebe0',
  ink:     '#1a1a18',
  muted:   '#7a736b',
  faint:   '#b0a99f',
  mono:    '#c8c2bb',
  green:   '#1a6b43',
  surface: '#f5f0e8',
};

export function emailShell(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>OpenSteps</title>
</head>
<body style="margin:0;padding:0;background-color:${colors.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
         style="background-color:${colors.bg};padding:48px 20px;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" role="presentation"
               style="background-color:${colors.white};border-radius:14px;border:1px solid ${colors.border};">

          <!-- Header -->
          <tr>
            <td style="padding:28px 36px 24px;border-bottom:1px solid ${colors.divider};">
              <span style="font-size:17px;font-weight:700;color:${colors.ink};letter-spacing:-0.3px;">OpenSteps</span>
              <span style="font-size:10px;font-family:monospace;color:#aaa;background:${colors.surface};padding:2px 7px;border-radius:4px;margin-left:8px;letter-spacing:0.05em;">BETA</span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 36px 28px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 36px;border-top:1px solid ${colors.divider};">
              <p style="font-size:11px;font-family:monospace;color:${colors.mono};margin:0;letter-spacing:0.02em;">
                Made with tenacity &middot;
                <a href="https://10na.city" style="color:${colors.mono};text-decoration:none;">10na.city</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function heading(text: string): string {
  return `<p style="font-family:Georgia,'Times New Roman',serif;font-size:26px;color:${colors.ink};margin:0 0 14px;line-height:1.25;font-weight:400;">${text}</p>`;
}

export function body(text: string): string {
  return `<p style="font-size:14px;color:${colors.muted};margin:0 0 24px;line-height:1.65;">${text}</p>`;
}

export function ctaButton(label: string, href: string): string {
  return `<table cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:24px;">
    <tr>
      <td style="border-radius:8px;background-color:${colors.green};">
        <a href="${href}" style="display:inline-block;padding:13px 30px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:0.01em;">${label}</a>
      </td>
    </tr>
  </table>`;
}

export function note(text: string): string {
  return `<p style="font-size:12px;color:${colors.faint};margin:0;line-height:1.6;">${text}</p>`;
}
