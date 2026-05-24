// HTML email templates matching the site brand: deep-navy header,
// orange accent rule, light card body, dark footer with contacts.
// All styles are inlined (email clients strip <style>); layout uses
// nested tables for client compatibility.

const NAVY = '#1a2540';
const ORANGE = '#f57d1f';
const PAPER = '#f4f1ea';
const BORDER = '#e8e6df';
const TEXT = '#1a1a1a';
const MUTED = '#6b6b6b';
const FOOTER_TEXT = '#a7b3cc';
const FOOTER_MUTED = '#7a8aa8';
const FONT = "'Helvetica Neue',Helvetica,Arial,sans-serif";

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function summaryRows(data, fieldLabels) {
  const cleanPhone = String(data.phone || '').replace(/\s/g, '');
  const cell = (label, value) =>
    `<tr>
      <td style="padding:10px 0;border-bottom:1px solid ${BORDER};width:32%;vertical-align:top">
        <div style="font:600 10px/1 ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${MUTED}">${esc(label)}</div>
      </td>
      <td style="padding:10px 0 10px 16px;border-bottom:1px solid ${BORDER};vertical-align:top">
        <div style="font:400 14px/1.4 ${FONT};color:${TEXT}">${value}</div>
      </td>
    </tr>`;

  return [
    cell(fieldLabels.name, esc(data.name)),
    cell(fieldLabels.email, `<a href="mailto:${esc(data.email)}" style="color:${ORANGE};text-decoration:none">${esc(data.email)}</a>`),
    cell(fieldLabels.phone, `<a href="tel:${esc(cleanPhone)}" style="color:${ORANGE};text-decoration:none">${esc(data.phone)}</a>`),
    cell(fieldLabels.service, esc(data.service)),
  ].join('');
}

function shell({ previewText, eyebrow, content }) {
  return `<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Mykhaylo Plyskach</title>
</head>
<body style="margin:0;padding:0;background:${PAPER};font-family:${FONT};color:${TEXT}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(previewText)}</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${PAPER};padding:28px 12px">
  <tr><td align="center">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;background:#ffffff;border:1px solid ${BORDER}">
      <tr><td style="background:${NAVY};padding:28px 32px">
        <div style="font:600 11px/1 ${FONT};letter-spacing:2.5px;text-transform:uppercase;color:${ORANGE};margin-bottom:12px">${esc(eyebrow)}</div>
        <div style="font:700 26px/1.1 ${FONT};letter-spacing:-0.5px;color:#ffffff">
          Mykhaylo <span style="color:${ORANGE}">Plyskach</span>
        </div>
      </td></tr>
      <tr><td style="background:${ORANGE};height:3px;line-height:3px;font-size:0">&nbsp;</td></tr>
      <tr><td style="padding:32px">${content}</td></tr>
      <tr><td style="background:${NAVY};padding:18px 32px">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td style="font:600 11px/1.4 ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${FOOTER_TEXT}">Mykhaylo Plyskach</td>
            <td align="right" style="font:400 11px/1.4 ${FONT};letter-spacing:0.5px"><a href="https://mykhayloplyskach.com" style="color:${FOOTER_TEXT};text-decoration:none">mykhayloplyskach.com</a></td>
          </tr>
          <tr>
            <td colspan="2" style="font:400 11px/1.4 ${FONT};color:${FOOTER_MUTED};padding-top:8px">IČO 26369524 · Praha · Středočeský kraj</td>
          </tr>
        </table>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export function buildOwnerEmail(data, labels) {
  const content = `
    <div style="font:600 10px/1 ${FONT};letter-spacing:2px;text-transform:uppercase;color:${ORANGE};margin-bottom:8px">— Nº 04 / Inquiry</div>
    <h1 style="margin:0 0 24px;font:700 22px/1.2 ${FONT};color:${TEXT}">${esc(labels.heading)}</h1>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top:1px solid ${BORDER}">
      ${summaryRows(data, labels.fields)}
    </table>
    <h2 style="margin:28px 0 8px;font:600 11px/1 ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${MUTED}">${esc(labels.message_label)}</h2>
    <p style="margin:0;font:400 14px/1.6 ${FONT};color:${TEXT};white-space:pre-wrap">${esc(data.message)}</p>
  `;
  return shell({
    previewText: `${labels.heading} — ${data.name}`,
    eyebrow: labels.eyebrow,
    content,
  });
}

export function buildAckEmail(data, labels) {
  const content = `
    <p style="margin:0 0 12px;font:400 15px/1.5 ${FONT};color:${TEXT}">${esc(labels.greeting)}</p>
    <p style="margin:0 0 28px;font:400 14px/1.6 ${FONT};color:${TEXT}">${esc(labels.intro)}</p>
    <div style="font:600 10px/1 ${FONT};letter-spacing:2px;text-transform:uppercase;color:${ORANGE};margin-bottom:8px">— ${esc(labels.summary_label)}</div>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top:1px solid ${BORDER}">
      ${summaryRows(data, labels.fields)}
    </table>
    <h2 style="margin:28px 0 8px;font:600 11px/1 ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${MUTED}">${esc(labels.message_label)}</h2>
    <p style="margin:0 0 32px;font:400 14px/1.6 ${FONT};color:${TEXT};white-space:pre-wrap">${esc(data.message)}</p>
    <p style="margin:0;font:400 14px/1.5 ${FONT};color:${TEXT}">${esc(labels.signoff)}<br><strong style="color:${TEXT}">${esc(labels.signoff_name)}</strong></p>
    <p style="margin:24px 0 0;padding-top:14px;border-top:1px solid ${BORDER};font:400 11px/1.5 ${FONT};color:${MUTED}">${esc(labels.footer)}</p>
  `;
  return shell({
    previewText: labels.intro,
    eyebrow: labels.eyebrow,
    content,
  });
}
