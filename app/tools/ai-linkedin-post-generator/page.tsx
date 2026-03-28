"use client";

import { useState } from "react";
import { Linkedin, Copy, Check, Sparkles, Loader2, Users, Zap, Lock } from "lucide-react";

type Tone = "Professional" | "Casual" | "Inspirational" | "Storytelling";
type Industry =
  | "Technology"
  | "Marketing"
  | "Finance"
  | "Healthcare"
  | "Education"
  | "Design"
  | "Sales"
  | "Other";

const industries: Industry[] = [
  "Technology",
  "Marketing",
  "Finance",
  "Healthcare",
  "Education",
  "Design",
  "Sales",
  "Other",
];

const tones: Tone[] = ["Professional", "Casual", "Inspirational", "Storytelling"];

const industryHashtags: Record<Industry, string[]> = {
  Technology: ["#TechLeadership", "#Innovation", "#SoftwareEngineering", "#FutureOfWork", "#TechTrends"],
  Marketing: ["#MarketingStrategy", "#DigitalMarketing", "#ContentMarketing", "#GrowthHacking", "#BrandBuilding"],
  Finance: ["#FinancialFreedom", "#Investing", "#WealthBuilding", "#PersonalFinance", "#FinTech"],
  Healthcare: ["#HealthcareInnovation", "#MedicalLeadership", "#HealthTech", "#PatientCare", "#HealthcareLeaders"],
  Education: ["#EdTech", "#LifelongLearning", "#Education", "#Teaching", "#LearningAndDevelopment"],
  Design: ["#UXDesign", "#ProductDesign", "#DesignThinking", "#CreativeLeadership", "#DesignCommunity"],
  Sales: ["#SalesLeadership", "#SalesStrategy", "#B2BSales", "#RevenueGrowth", "#SalesMindset"],
  Other: ["#ProfessionalGrowth", "#Leadership", "#Entrepreneurship", "#Innovation", "#CareerAdvice"],
};

function generatePost(topic: string, tone: Tone, industry: Industry, cta: string): string {
  const hashtags = industryHashtags[industry].join(" ");
  const safeTopic = topic.trim() || "a major shift in my career";
  const safeCta = cta.trim() || "Follow me for more insights like this.";

  if (tone === "Professional") {
    return `Here's something most people in ${industry} aren't talking about yet:\n\n${safeTopic}.\n\nAfter working in this space for years, I've noticed a pattern that separates those who grow from those who plateau:\n\n→ The ones who succeed treat every challenge as data, not failure.\n→ They invest in relationships before they need them.\n→ They communicate with clarity, not just frequency.\n→ They build systems instead of relying on motivation alone.\n\nThe uncomfortable truth? Most professionals wait for permission to lead. The best ones never do.\n\nIf you're in ${industry} right now, the window to differentiate yourself is open — but it won't stay that way forever.\n\n${safeCta}\n\n${hashtags} #${industry}`;
  }

  if (tone === "Casual") {
    return `Honest truth about ${safeTopic}:\n\nIt's not what most people think.\n\nI used to believe that working harder was the answer. More hours. More hustle. More output. And honestly? It just made me tired.\n\nWhat actually changed things for me was getting really clear on what I was optimizing for.\n\nOnce I did that, everything else clicked. I started saying no to the things that didn't move the needle. I started protecting my energy like it was a finite resource (because it is). I started treating my work in ${industry} like a craft, not just a job.\n\nDid it happen overnight? Absolutely not. But the compounding effect is real.\n\nCurious — what's one thing that's been a game-changer for you lately? Drop it in the comments.\n\n${safeCta}`;
  }

  if (tone === "Inspirational") {
    return `You are one decision away from a completely different trajectory.\n\nI mean that.\n\nRight now, someone in ${industry} is about to quit — and they don't realize they're three feet from gold.\n\nRegarding ${safeTopic}: the people who figure this out don't have a secret advantage. They're not smarter. They're not luckier. They just refused to stop before the breakthrough.\n\nStop waiting for:\n— The perfect moment\n— The right credentials\n— Someone to give you permission\n\nStart with what you have. Where you are. Right now.\n\nThe world doesn't need another person who almost did something remarkable.\n\nIt needs you — fully in.\n\n${safeCta}\n\n${hashtags} #Mindset #Growth`;
  }

  // Storytelling
  return `Two years ago, I was completely wrong about ${safeTopic}.\n\nI remember sitting at my desk in the ${industry} world, convinced I had it figured out. I had the framework. I had the plan. I had the confidence.\n\nAnd then everything I thought I knew got challenged.\n\nA conversation with someone I barely knew flipped my entire perspective. They asked me one question I couldn't answer:\n\n"What does success actually look like for you — not on paper, but in real life?"\n\nI didn't have a good answer. And that silence told me everything.\n\nOver the next six months, I rebuilt my approach from scratch. It was uncomfortable. It was slow. But it was the most important work I've ever done.\n\nThe lesson I carry with me now:\n\nClarity beats confidence. Every single time.\n\nIf you're in the middle of a hard season right now, stay in it. The clarity is coming.\n\n${safeCta}\n\n${hashtags} #Storytelling #Lessons`;
}

export default function LinkedInPostGenerator() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<Tone>("Professional");
  const [industry, setIndustry] = useState<Industry>("Technology");
  const [cta, setCta] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleGenerate() {
    if (!topic.trim()) return;
    setLoading(true);
    setResult("");
    setTimeout(() => {
      setResult(generatePost(topic, tone, industry, cta));
      setLoading(false);
    }, 1200);
  }

  function handleCopy() {
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <main style={{ minHeight: "100vh", paddingTop: "7rem", paddingBottom: "4rem", paddingLeft: "1rem", paddingRight: "1rem" }}>
      {/* Header */}
      <div style={{ maxWidth: 680, margin: "0 auto 2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "0.75rem",
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Linkedin size={22} color="#fff" />
          </div>
          <h1 className="gradient-text" style={{ fontSize: "1.75rem", fontWeight: 800, margin: 0 }}>
            AI LinkedIn Post Generator
          </h1>
        </div>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", margin: "0 0 1rem" }}>
          Generate scroll-stopping LinkedIn posts in seconds — free, no signup
        </p>

        {/* Stats bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            padding: "0.75rem 1rem",
            borderRadius: "0.75rem",
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
          }}
        >
          {[
            { icon: <Sparkles size={14} />, label: "50K+ posts generated" },
            { icon: <Zap size={14} />, label: "Free forever" },
            { icon: <Lock size={14} />, label: "No signup needed" },
          ].map((item) => (
            <div
              key={item.label}
              style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}
            >
              <span style={{ color: "#7c3aed" }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Form card */}
      <div
        className="glass"
        style={{ maxWidth: 680, margin: "0 auto 1.5rem", borderRadius: "1.25rem", padding: "1.75rem" }}
      >
        {/* Topic */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", color: "var(--text-primary)", fontSize: "0.9rem" }}>
            What&apos;s your post about?
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. I just launched my new SaaS product..."
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "0.75rem",
              border: "1px solid var(--border-color)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              fontSize: "0.95rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Industry */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", color: "var(--text-primary)", fontSize: "0.9rem" }}>
            Industry
          </label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value as Industry)}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "0.75rem",
              border: "1px solid var(--border-color)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              fontSize: "0.95rem",
              outline: "none",
              cursor: "pointer",
            }}
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        {/* Tone */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", color: "var(--text-primary)", fontSize: "0.9rem" }}>
            Post Tone
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {tones.map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "0.6rem",
                  border: tone === t ? "none" : "1px solid var(--border-color)",
                  background:
                    tone === t
                      ? "linear-gradient(to right, #7c3aed, #2563eb)"
                      : "var(--bg-card)",
                  color: tone === t ? "#fff" : "var(--text-secondary)",
                  fontSize: "0.875rem",
                  fontWeight: tone === t ? 600 : 400,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", color: "var(--text-primary)", fontSize: "0.9rem" }}>
            Your call to action <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span>
          </label>
          <input
            type="text"
            value={cta}
            onChange={(e) => setCta(e.target.value)}
            placeholder="e.g. Follow me for more tips"
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "0.75rem",
              border: "1px solid var(--border-color)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              fontSize: "0.95rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Generate button */}
        <button
          className="btn-primary"
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            opacity: !topic.trim() ? 0.6 : 1,
            cursor: !topic.trim() ? "not-allowed" : "pointer",
          }}
        >
          {loading ? (
            <>
              <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
              Generating your post...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate LinkedIn Post
            </>
          )}
        </button>
      </div>

      {/* Result */}
      {result && (
        <div
          className="glass"
          style={{ maxWidth: 680, margin: "0 auto", borderRadius: "1.25rem", padding: "1.75rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Your LinkedIn Post
            </h2>
            <button
              className="btn-ghost"
              onClick={handleCopy}
              style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem" }}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? "Copied!" : "Copy post"}
            </button>
          </div>
          <textarea
            readOnly
            value={result}
            rows={14}
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "0.75rem",
              border: "1px solid var(--border-color)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              fontSize: "0.9rem",
              lineHeight: 1.7,
              resize: "vertical",
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />
          <p style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            {result.split(" ").length} words · Paste directly into LinkedIn
          </p>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}
