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
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
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
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/15 via-blue-600/10 to-purple-600/15" />
        <div className="absolute inset-0 border rounded-3xl" style={{ borderColor: "rgba(124,58,237,0.2)" }} />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl" />

        <div className="relative px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/15 border border-purple-500/25 px-4 py-2 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Free Weekly Newsletter
          </div>

          <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: "var(--text-primary)" }}>
            Get the Best Deals &amp;{" "}
            <span className="gradient-text">Reviews Weekly</span>
          </h2>

          <p className="max-w-xl mx-auto mb-8" style={{ color: "var(--text-secondary)" }}>
            Join 50,000+ subscribers who get the top trending products, AI tools,
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
                  className="w-full rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 glass disabled:opacity-50"
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
            {["50K+ Subscribers", "Weekly Deals", "Zero Spam"].map((item) => (
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
