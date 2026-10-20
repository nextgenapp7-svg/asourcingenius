const REQUIRED_FIELDS = ["name", "company", "email", "requestType", "message"] as const;

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("GOOGLE_SHEETS_WEBHOOK_URL is not set");
    return Response.json({ error: "Contact form is not configured." }, { status: 500 });
  }

  const data = await request.json();

  for (const field of REQUIRED_FIELDS) {
    if (!String(data[field] ?? "").trim()) {
      return Response.json({ error: `Missing field: ${field}` }, { status: 400 });
    }
  }

  const sheetResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!sheetResponse.ok) {
    console.error("Google Sheets webhook failed", await sheetResponse.text());
    return Response.json({ error: "Could not reach the sheet." }, { status: 502 });
  }

  return Response.json({ status: "ok" });
}
