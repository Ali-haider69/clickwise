import { NextRequest, NextResponse } from "next/server";

/**
 * Newsletter subscription handler.
 *
 * Supports two providers — pick one and set the env var:
 *
 * Option A — Beehiiv (recommended, free up to 2,500 subs):
 *   1. Create account at https://beehiiv.com
 *   2. Settings → Integrations → API → Create New API Key
 *   3. Get your Publication ID from Settings → Publication
 *   4. Add to .env.local:
 *        BEEHIIV_API_KEY=your_api_key
 *        BEEHIIV_PUBLICATION_ID=your_pub_id
 *
 * Option B — Kit / ConvertKit (free up to 10K subs):
 *   1. Create account at https://kit.com
 *   2. Settings → Advanced → API → API Key
 *   3. Create a Form, note the form ID
 *   4. Add to .env.local:
 *        KIT_API_KEY=your_api_key
 *        KIT_FORM_ID=your_form_id
 */
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email?.trim() || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }

    // --- Beehiiv ---
    const beehiivKey = process.env.BEEHIIV_API_KEY;
    const beehiivPub = process.env.BEEHIIV_PUBLICATION_ID;

    if (beehiivKey && beehiivPub) {
      const res = await fetch(
        `https://api.beehiiv.com/v2/publications/${beehiivPub}/subscriptions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${beehiivKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            reactivate_existing: true,
            send_welcome_email: true,
          }),
        }
      );

      if (!res.ok) {
        const err = await res.text();
        console.error("Beehiiv error:", err);
        return NextResponse.json({ error: "Subscription failed." }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    // --- Kit (ConvertKit) ---
    const kitKey = process.env.KIT_API_KEY;
    const kitForm = process.env.KIT_FORM_ID;

    if (kitKey && kitForm) {
      const res = await fetch(
        `https://api.convertkit.com/v3/forms/${kitForm}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ api_key: kitKey, email }),
        }
      );

      if (!res.ok) {
        const err = await res.text();
        console.error("Kit error:", err);
        return NextResponse.json({ error: "Subscription failed." }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    // No provider configured
    return NextResponse.json(
      { error: "Newsletter not configured yet." },
      { status: 503 }
    );
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
