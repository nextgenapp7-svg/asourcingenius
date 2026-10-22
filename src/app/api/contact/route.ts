const REQUIRED_FIELDS = ["name", "company", "email", "requestType", "message"] as const;

// Bots that auto-fill every field tend to fill this too; real visitors never see it.
const HONEYPOT_FIELD = "website";

// Values starting with these characters are interpreted as formulas by Google
// Sheets / Excel. Prefixing with a quote forces them to be read as plain text.
function sanitizeForSheets(value: string) {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// A contact-form submission is a lead — retry transient failures a few times
// before giving up, so a brief Google-side hiccup doesn't silently drop it.
async function postToSheetWithRetry(webhookUrl: string, body: string, attempts = 3) {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      if (response.ok) return response;
      lastError = new Error(`Sheet webhook responded ${response.status}: ${await response.text()}`);
    } catch (error) {
      lastError = error;
    }

    if (attempt < attempts) await sleep(attempt * 500);
  }

  throw lastError;
}

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("GOOGLE_SHEETS_WEBHOOK_URL is not set");
    return Response.json({ error: "Contact form is not configured." }, { status: 500 });
  }

  const data = await request.json();

  // Silently pretend success so bots don't learn to leave this field blank.
  if (String(data[HONEYPOT_FIELD] ?? "").trim()) {
    return Response.json({ status: "ok" });
  }

  for (const field of REQUIRED_FIELDS) {
    if (!String(data[field] ?? "").trim()) {
      return Response.json({ error: `Missing field: ${field}` }, { status: 400 });
    }
  }

  const sanitized = Object.fromEntries(
    REQUIRED_FIELDS.map((field) => [field, sanitizeForSheets(String(data[field]))])
  );

  try {
    await postToSheetWithRetry(webhookUrl, JSON.stringify(sanitized));
  } catch (error) {
    // Even after retries this submission didn't reach the sheet — log it in
    // full so it can be recovered from Vercel's logs rather than lost.
    console.error("Google Sheets webhook failed after retries", error, sanitized);
    return Response.json({ error: "Could not reach the sheet." }, { status: 502 });
  }

  return Response.json({ status: "ok" });
}
