import { NextRequest, NextResponse } from "next/server";

/**
 * Contact form handler using Web3Forms (free — 250 submissions/month).
 *
 * Setup:
 * 1. Go to https://web3forms.com — enter your email, get an access key
 * 2. Add to .env.local:  WEB3FORMS_KEY=your_access_key_here
 */
export async function POST(req: NextRequest) {
  const key = process.env.WEB3FORMS_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Contact form not configured yet." },
      { status: 503 }
    );
  }

  try {
    const { name, email, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: `New message from ${name} — ClickWise`,
        from_name: name,
        email,
        message,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
