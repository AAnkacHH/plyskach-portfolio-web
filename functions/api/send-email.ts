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

const ORIGIN = 'https://mykhayloplyskach.com';
const DEFAULT_PROCESSOR = 'https://email-processor.ankach-ua.workers.dev/send';
const MAX_SUBJECT = 200;
const MAX_HTML = 50_000;
const MAX_ATTACHMENTS = 5;
const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;

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
    if (a.content.length > MAX_ATTACHMENT_BYTES) continue;
    const type = typeof a?.type === 'string' ? a.type : undefined;
    out.push({ filename: a.filename, content: a.content, ...(type ? { type } : {}) });
  }
  return out;
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

  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const html = typeof body.html === 'string' ? body.html : '';

  if (!subject || !html) {
    return jsonResponse(400, { success: false, errorMessage: 'Missing required fields: subject, html' });
  }
  if (subject.length > MAX_SUBJECT || html.length > MAX_HTML) {
    return jsonResponse(413, { success: false, errorMessage: 'Payload too large' });
  }

  const attachments = sanitizeAttachments(body.attachments);
  const processorUrl = env.EMAIL_PROCESSOR_URL ?? DEFAULT_PROCESSOR;

  const upstream = await fetch(processorUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.SEND_SECRET}`,
    },
    body: JSON.stringify({
      origin: ORIGIN,
      subject,
      html,
      ...(attachments.length > 0 ? { attachments } : {}),
    }),
  });

  const responseText = await upstream.text();
  return new Response(responseText, {
    status: upstream.status,
    headers: { 'Content-Type': upstream.headers.get('content-type') ?? 'application/json' },
  });
};
