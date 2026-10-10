"use client";

import { useState } from "react";
import { Mail, Sparkles, CheckCircle, Loader2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(
        `https://api.convertkit.com/v3/forms/9299535/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: "Z6SyeuD-_B1FzdGMhbbT-g",
            email,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || data.error) {
        setErrorMsg(data.message || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="newsletter">
      <div className="relative rounded-3xl overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#b15f2c]/12 via-[#cf8047]/8 to-[#b15f2c]/12" />
        <div className="absolute inset-0 border rounded-3xl" style={{ borderColor: "rgba(177,95,44,0.2)" }} />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#cf8047]/12 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#97501f]/12 rounded-full blur-3xl" />

        <div className="relative px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-[#b15f2c]/12 border border-[#b15f2c]/25 px-4 py-2 rounded-full text-[#b15f2c] dark:text-[#cf8047] text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Free Weekly Newsletter
          </div>

          <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: "var(--text-primary)" }}>
            Get the Best Deals &amp;{" "}
            <span className="gradient-text">Reviews Weekly</span>
          </h2>

          <p className="max-w-xl mx-auto mb-8" style={{ color: "var(--text-secondary)" }}>
            Join our growing community and get the top trending products, AI tools,
            and side hustle ideas every week. No spam, unsubscribe anytime.
          </p>

          {status === "success" ? (
            <div className="flex items-center justify-center gap-3 text-green-600 dark:text-green-400 text-lg font-semibold">
              <CheckCircle className="w-6 h-6" />
              You&apos;re in! Check your inbox.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "var(--text-muted)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={status === "loading"}
                  className="w-full rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#b15f2c]/50 glass disabled:opacity-50"
                  style={{ color: "var(--text-primary)" }}
                />
              </div>
              <button type="submit" className="btn-primary whitespace-nowrap flex items-center justify-center gap-2" disabled={status === "loading"}>
                {status === "loading" ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Subscribing...</>
                ) : (
                  "Subscribe Free"
                )}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="text-sm text-red-500 mt-3">{errorMsg}</p>
          )}

          <p className="text-xs mt-4" style={{ color: "var(--text-muted)" }}>
            No spam ever. Unsubscribe with one click.
          </p>

          <div className="flex items-center justify-center gap-6 mt-8">
            {["Weekly Deals", "AI Tool Picks", "Zero Spam"].map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-muted)" }}>
                <CheckCircle className="w-4 h-4 text-green-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
