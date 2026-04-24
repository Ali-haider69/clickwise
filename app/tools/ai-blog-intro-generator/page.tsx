"use client";

import { useState } from "react";
import { FileText, Copy, Check, Sparkles, Loader2 } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

type Tone = "Conversational" | "Professional" | "Bold" | "Educational";
type HookStyle = "Question Hook" | "Stat Hook" | "Story Hook" | "Bold Statement";

const tones: Tone[] = ["Conversational", "Professional", "Bold", "Educational"];
const hookStyles: HookStyle[] = ["Question Hook", "Stat Hook", "Story Hook", "Bold Statement"];

function generateIntro(
  blogTitle: string,
  audience: string,
  mainPoint: string,
  tone: Tone,
  style: HookStyle
): string {
  const title = blogTitle.trim() || "this topic";
  const aud = audience.trim() || "you";
  const point = mainPoint.trim() || "change the way you think about this";

  // Opening hook by style
  const hooks: Record<HookStyle, Record<Tone, string>> = {
    "Question Hook": {
      Conversational: `Have you ever looked back at something and thought — why did I wait so long?\n\nIf you're ${aud}, you've probably wrestled with the idea of ${title}. Maybe you've read about it, talked about it, or had it on your list for months. And yet, something keeps getting in the way.\n\nHere's what most people in your position don't realize: ${point}. It's not as complicated as it looks from the outside. And the gap between where you are now and where you want to be is almost always smaller than you think.`,
      Professional: `What separates the ${aud} who consistently move forward from those who stay stuck in the same place?\n\nThe answer, more often than not, comes down to a few well-placed decisions around ${title}. Organizations and individuals who've figured this out share a common understanding: ${point}.\n\nThis piece breaks down exactly what that understanding looks like in practice — and how you can apply it to your own situation, starting today.`,
      Bold: `What if everything you thought you knew about ${title} was keeping you from actually getting results?\n\nFor ${aud}, this isn't a hypothetical. It's a pattern that plays out constantly. The conventional approach looks sensible on the surface. Follow the standard path. Do what everyone else does. And end up wondering why the needle isn't moving.\n\nThe truth? ${point}. And once you see it, you can't unsee it.`,
      Educational: `What does it actually take to succeed with ${title} — and why do so many ${aud} struggle to get there?\n\nThese are questions worth asking carefully. Because the conventional answers are often either too vague to act on or too complicated to sustain. The real answer is more practical than most guides let on: ${point}.\n\nIn this post, we'll break down exactly how this works, why it matters, and what you can do with it immediately.`,
    },
    "Stat Hook": {
      Conversational: `Studies consistently show that the gap between knowing what to do and actually doing it is the single biggest obstacle for ${aud} trying to make progress with ${title}.\n\nAnd honestly? That tracks.\n\nMost of us aren't short on information. We're short on a clear, honest path forward. The kind that cuts through the noise and gives you something you can actually use. That's exactly what this post is — because ${point}.`,
      Professional: `Research across high-performing ${aud} reveals a consistent pattern: those who approach ${title} with a structured, evidence-based framework outperform their peers significantly — not because they work harder, but because they work with greater clarity.\n\nThe principle at the center of that clarity is this: ${point}.\n\nWhat follows is a practical breakdown of how that principle works and how to apply it with precision in your own context.`,
      Bold: `Here's a number worth sitting with: the majority of ${aud} who start down the path of ${title} never reach the outcome they were after — not because the goal was wrong, but because the approach was.\n\nThe single variable that predicts success in this space? ${point}. It's unglamorous. It doesn't make for a great headline. But it works with a consistency that more exciting strategies rarely match.\n\nThis post is about that variable.`,
      Educational: `Research on how ${aud} learn and apply concepts around ${title} points to one consistent finding: the approaches that stick are the ones built on strong foundational understanding, not tricks or shortcuts.\n\nWhat does that foundation look like? Simply put: ${point}.\n\nThis post walks through that foundation systematically — so by the time you finish, you'll have a working understanding you can apply immediately, not just a collection of facts.`,
    },
    "Story Hook": {
      Conversational: `A few years back, I was exactly where a lot of ${aud} find themselves — curious about ${title}, reading everything I could find, but genuinely not sure where to start.\n\nI tried a few things. Some worked, most didn't. What eventually changed things wasn't a new tactic or a better tool. It was understanding the core principle underneath all of it: ${point}.\n\nOnce that clicked, everything else started making more sense. This post is my attempt to give you that shortcut.`,
      Professional: `Early in my work with ${aud}, I noticed a consistent pattern among those who achieved meaningful results with ${title}: they had each, at some point, arrived at the same foundational insight — independently and often the hard way.\n\nThat insight is this: ${point}.\n\nRather than leaving you to discover it through trial and error, this piece lays it out directly — along with the practical framework for putting it to work.`,
      Bold: `The first time I truly understood what ${title} could do, I was frustrated. Not because it was complicated — but because nobody had ever explained it clearly. Every guide I found either buried the key insight or dressed it up in so much jargon it became useless.\n\nSo I figured it out myself, the slow way. And what I found was this: ${point}.\n\nI wrote this for the ${aud} who are tired of reading around the point. Here's the actual point.`,
      Educational: `When I first started studying ${title} seriously, I made the same mistake most ${aud} make: I tried to learn everything at once. I collected frameworks, bookmarked guides, and filled notebooks.\n\nWhat actually moved things forward was narrowing down to the one insight that underpins all of it: ${point}.\n\nThis post is structured around that insight — starting with the foundation, then building up to the practical application.`,
    },
    "Bold Statement": {
      Conversational: `Most of what you've heard about ${title} is incomplete — and that gap is probably costing you more than you realize.\n\nIf you're one of the ${aud} who's tried the standard approaches and found them underwhelming, this is worth your next ten minutes. Because the issue usually isn't effort. It's framing. And the reframe is simple: ${point}.\n\nThat one shift changes everything about how you approach this. Here's how it plays out in practice.`,
      Professional: `The conventional approach to ${title} fails ${aud} not because the information is wrong — but because it's incomplete.\n\nProfessionals who've achieved consistent, repeatable results in this area understand something their peers often miss: ${point}. That understanding changes not just what they do, but how they think about the problem entirely.\n\nThis piece makes that shift explicit — and gives you the framework to act on it.`,
      Bold: `Here's the truth about ${title} that most content in this space refuses to say directly: the reason most ${aud} don't get the results they're after has nothing to do with their resources, their skills, or their work ethic.\n\nIt has everything to do with one missing piece: ${point}.\n\nOnce you understand that, the path forward becomes dramatically clearer. This post is that clarity, in plain terms, with nothing left out.`,
      Educational: `${title} is one of the most misunderstood topics in any guide written for ${aud} — and that misunderstanding has real consequences.\n\nThe core misconception is treating it as more complex than it needs to be. Stripped back to its foundation, the principle is clean: ${point}.\n\nFrom that foundation, everything else becomes learnable. This post builds it up systematically, from the ground floor.`,
    },
  };

  const hook = hooks[style]?.[tone] ?? `${title} matters more than most ${aud} realize — and this post explains exactly why.\n\n${point}. This is what most guides get wrong, and it's costing people real progress.`;

  const closing: Record<Tone, string> = {
    Conversational: `Ready to get into it? Here's everything you need to know.`,
    Professional: `What follows is a structured breakdown of everything you need to implement this effectively.`,
    Bold: `Here's exactly what that looks like — no fluff, no filler.`,
    Educational: `Here's everything you need to know, explained clearly from the ground up.`,
  };

  return `${hook}\n\n${closing[tone]}`;
}

export default function BlogIntroGenerator() {
  const [blogTitle, setBlogTitle] = useState("");
  const [audience, setAudience] = useState("");
  const [mainPoint, setMainPoint] = useState("");
  const [tone, setTone] = useState<Tone>("Conversational");
  const [style, setStyle] = useState<HookStyle>("Question Hook");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleGenerate() {
    if (!blogTitle.trim()) return;
    setLoading(true);
    setResult("");
    setTimeout(() => {
      setResult(generateIntro(blogTitle, audience, mainPoint, tone, style));
      setLoading(false);
    }, 1200);
  }

  function handleCopy() {
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const wordCount = result
    ? result.split(/\s+/).filter(Boolean).length
    : 0;

  return (
    <main style={{ minHeight: "100vh", paddingTop: "7rem", paddingBottom: "4rem", paddingLeft: "1rem", paddingRight: "1rem" }}>
      {/* Header */}
      <div style={{ maxWidth: 680, margin: "0 auto 2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "0.75rem",
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FileText size={22} color="#fff" />
          </div>
          <h1 className="gradient-text" style={{ fontSize: "1.75rem", fontWeight: 800, margin: 0 }}>
            AI Blog Intro Generator
          </h1>
        </div>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", margin: 0 }}>
          Generate a compelling blog introduction that hooks readers in 3 seconds
        </p>
      </div>

      {/* Form */}
      <div
        className="glass"
        style={{ maxWidth: 680, margin: "0 auto 1.5rem", borderRadius: "1.25rem", padding: "1.75rem" }}
      >
        {/* Blog title */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", color: "var(--text-primary)", fontSize: "0.9rem" }}>
            Blog Title
          </label>
          <input
            type="text"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            placeholder="e.g. 10 Ways to Double Your Productivity in 30 Days"
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

        {/* Target audience */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", color: "var(--text-primary)", fontSize: "0.9rem" }}>
            Target Audience <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span>
          </label>
          <input
            type="text"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="e.g. freelancers, startup founders, content creators"
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

        {/* Main point */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", color: "var(--text-primary)", fontSize: "0.9rem" }}>
            Main Point / Key Takeaway <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span>
          </label>
          <input
            type="text"
            value={mainPoint}
            onChange={(e) => setMainPoint(e.target.value)}
            placeholder="e.g. you can earn $5000/month with these 3 side hustles"
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

        {/* Tone */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", color: "var(--text-primary)", fontSize: "0.9rem" }}>
            Writing Tone
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
                  fontWeight: tone === t ? 600 : 400,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Hook style */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", color: "var(--text-primary)", fontSize: "0.9rem" }}>
            Hook Style
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {hookStyles.map((h) => (
              <button
                key={h}
                onClick={() => setStyle(h)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "0.6rem",
                  border: style === h ? "none" : "1px solid var(--border-color)",
                  background:
                    style === h
                      ? "linear-gradient(to right, #7c3aed, #06b6d4)"
                      : "var(--bg-card)",
                  color: style === h ? "#fff" : "var(--text-secondary)",
                  fontWeight: style === h ? 600 : 400,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        {/* Generate */}
        <button
          className="btn-primary"
          onClick={handleGenerate}
          disabled={loading || !blogTitle.trim()}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            opacity: !blogTitle.trim() ? 0.6 : 1,
            cursor: !blogTitle.trim() ? "not-allowed" : "pointer",
          }}
        >
          {loading ? (
            <>
              <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
              Writing your intro...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate Blog Intro
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
              Your Blog Introduction
            </h2>
            <button
              className="btn-ghost"
              onClick={handleCopy}
              style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem" }}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? "Copied!" : "Copy intro"}
            </button>
          </div>
          <textarea
            readOnly
            value={result}
            rows={12}
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "0.75rem",
              border: "1px solid var(--border-color)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              fontSize: "0.9rem",
              lineHeight: 1.8,
              resize: "vertical",
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />
          <div
            style={{
              marginTop: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--text-muted)" }}>
              {wordCount} words · Paste directly into your blog editor
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.8rem",
                color: wordCount >= 150 && wordCount <= 200 ? "#10b981" : "var(--text-muted)",
              }}
            >
              {wordCount >= 150 && wordCount <= 200
                ? "Ideal length"
                : wordCount < 150
                ? "On the shorter side"
                : "Detailed intro"}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <RelatedTools currentTool="ai-blog-intro-generator" />
    </main>
  );
}
