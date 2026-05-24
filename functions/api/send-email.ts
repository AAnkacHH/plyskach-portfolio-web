interface Env {
  SEND_SECRET: string;
  EMAIL_PROCESSOR_URL?: string;
}

interface AttachmentIn {
  filename?: unknown;
  content?: unknown;
  type?: unknown;
}

interface OutgoingAttachment {
  filename: string;
  content: string;
  type?: string;
}

interface EmailPart {
  subject?: unknown;
  html?: unknown;
  to?: unknown;
}

const OWNER_EMAIL = 'maria.andrej@centrum.cz';
const ORIGIN = 'https://mykhayloplyskach.com';
const DEFAULT_PROCESSOR = 'https://email-processor.ankach-ua.workers.dev/send';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_SUBJECT = 200;
const MAX_HTML = 50_000;
const MAX_ATTACHMENTS = 5;
const MAX_ATTACHMENT_CHARS = 4 * 1024 * 1024;

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function sanitizeAttachments(input: unknown): OutgoingAttachment[] {
  if (!Array.isArray(input)) return [];
  const out: OutgoingAttachment[] = [];
  for (const item of input.slice(0, MAX_ATTACHMENTS)) {
    const a = item as AttachmentIn;
    if (typeof a?.filename !== 'string' || typeof a?.content !== 'string') continue;
    if (a.content.length > MAX_ATTACHMENT_CHARS) continue;
    const type = typeof a?.type === 'string' ? a.type : undefined;
    out.push({ filename: a.filename, content: a.content, ...(type ? { type } : {}) });
  }
  return out;
}

function validatePart(part: unknown, requireTo: boolean): { subject: string; html: string; to?: string } | string {
  if (!part || typeof part !== 'object') return 'invalid';
  const p = part as EmailPart;
  const subject = typeof p.subject === 'string' ? p.subject.trim() : '';
  const html = typeof p.html === 'string' ? p.html : '';
  if (!subject || !html) return 'missing subject/html';
  if (subject.length > MAX_SUBJECT) return 'subject too long';
  if (html.length > MAX_HTML) return 'html too long';
  if (requireTo) {
    const to = typeof p.to === 'string' ? p.to.trim() : '';
    if (!EMAIL_RE.test(to)) return 'invalid recipient';
    return { subject, html, to };
  }
  return { subject, html };
}

async function sendViaProcessor(
  processorUrl: string,
  sendSecret: string,
  body: {
    to: string;
    subject: string;
    html: string;
    attachments?: OutgoingAttachment[];
  },
): Promise<{ ok: boolean; status: number; body: string }> {
  const upstream = await fetch(processorUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sendSecret}`,
    },
    body: JSON.stringify({ origin: ORIGIN, ...body }),
  });
  const text = await upstream.text();
  return { ok: upstream.ok, status: upstream.status, body: text };
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.SEND_SECRET) {
    console.error('SEND_SECRET env var is not configured on this Pages project');
    return jsonResponse(500, { success: false, errorMessage: 'Email service not configured' });
  }

  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return jsonResponse(415, { success: false, errorMessage: 'Content-Type must be application/json' });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return jsonResponse(400, { success: false, errorMessage: 'Invalid JSON body' });
  }

  const ownerPart = validatePart(body.owner, false);
  if (typeof ownerPart === 'string') {
    return jsonResponse(400, { success: false, errorMessage: `owner: ${ownerPart}` });
  }

  const visitorPart = validatePart(body.visitor, true);
  if (typeof visitorPart === 'string') {
    return jsonResponse(400, { success: false, errorMessage: `visitor: ${visitorPart}` });
  }

  const attachments = sanitizeAttachments(body.attachments);
  const processorUrl = env.EMAIL_PROCESSOR_URL ?? DEFAULT_PROCESSOR;

  const [ownerResult, visitorResult] = await Promise.all([
    sendViaProcessor(processorUrl, env.SEND_SECRET, {
      to: OWNER_EMAIL,
      subject: ownerPart.subject,
      html: ownerPart.html,
      ...(attachments.length > 0 ? { attachments } : {}),
    }),
    sendViaProcessor(processorUrl, env.SEND_SECRET, {
      to: visitorPart.to!,
      subject: visitorPart.subject,
      html: visitorPart.html,
    }),
  ]);

  if (!ownerResult.ok) {
    console.error('Owner email failed', ownerResult.status, ownerResult.body);
    return jsonResponse(502, { success: false, errorMessage: 'Failed to deliver inquiry' });
  }

  if (!visitorResult.ok) {
    console.warn('Visitor acknowledgement failed', visitorResult.status, visitorResult.body);
  }

  return jsonResponse(200, {
    success: true,
    owner: { ok: ownerResult.ok },
    visitor: { ok: visitorResult.ok },
  });
};
