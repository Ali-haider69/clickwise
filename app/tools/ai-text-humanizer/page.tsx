"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Check, Sparkles, Wand2, RotateCcw } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

// ── Humanizing rules ─────────────────────────────────────────────────────────

// AI-cliché words/phrases → human alternatives (case-insensitive)
const PHRASE_SWAPS: [RegExp, string][] = [
  [/\bin today's fast-paced world\b/gi, "these days"],
  [/\bin today's digital age\b/gi, "right now"],
  [/\bin the ever-evolving landscape of\b/gi, "in"],
  [/\bin the realm of\b/gi, "in"],
  [/\bin the world of\b/gi, "in"],
  [/\bembark on a journey\b/gi, "get started"],
  [/\bunlock the (full )?potential of\b/gi, "get more out of"],
  [/\bharness the power of\b/gi, "use"],
  [/\bit is (important|worth) (to note|noting) that\b/gi, "keep in mind,"],
  [/\bit's (important|worth) (to note|noting) that\b/gi, "keep in mind,"],
  [/\bit should be noted that\b/gi, "note that"],
  [/\ba testament to\b/gi, "proof of"],
  [/\ba tapestry of\b/gi, "a mix of"],
  [/\bdelve into\b/gi, "dig into"],
  [/\bdelves into\b/gi, "digs into"],
  [/\bdelving into\b/gi, "digging into"],
  [/\bdelve\b/gi, "dig"],
  [/\bfurthermore,?\s/gi, "Plus, "],
  [/\bmoreover,?\s/gi, "Also, "],
  [/\badditionally,?\s/gi, "And "],
  [/\bconsequently,?\s/gi, "So "],
  [/\bsubsequently,?\s/gi, "then "],
  [/\bnevertheless,?\s/gi, "still, "],
  [/\bin conclusion,?\s/gi, "Bottom line: "],
  [/\bto summarize,?\s/gi, "In short, "],
  [/\bin summary,?\s/gi, "In short, "],
  [/\bultimately,?\s/gi, "In the end, "],
  [/\bleverage\b/g, "use"],
  [/\bleveraging\b/g, "using"],
  [/\bleverages\b/g, "uses"],
  [/\bLeverage\b/g, "Use"],
  [/\butilize\b/g, "use"],
  [/\butilizes\b/g, "uses"],
  [/\butilizing\b/g, "using"],
  [/\bUtilize\b/g, "Use"],
  [/\bfacilitate\b/g, "help"],
  [/\bfacilitates\b/g, "helps"],
  [/\bgame-changer\b/gi, "big deal"],
  [/\bgame changing\b/gi, "huge"],
  [/\brevolutionize\b/gi, "change"],
  [/\bseamlessly\b/gi, "smoothly"],
  [/\bseamless\b/gi, "smooth"],
  [/\brobust\b/gi, "solid"],
  [/\bcutting-edge\b/gi, "modern"],
  [/\bstate-of-the-art\b/gi, "modern"],
  [/\bmyriad of\b/gi, "lot of"],
  [/\ba plethora of\b/gi, "plenty of"],
  [/\bplethora of\b/gi, "plenty of"],
  [/\bcrucial\b/gi, "key"],
  [/\bpivotal\b/gi, "key"],
  [/\bparamount\b/gi, "critical"],
  [/\belevate your\b/gi, "improve your"],
  [/\bsupercharge\b/gi, "boost"],
  [/\bwhether you're a\b/gi, "if you're a"],
  [/\blook no further\b/gi, "here's the answer"],
  [/\bdive deep into\b/gi, "get into"],
  [/\bdive into\b/gi, "get into"],
  [/\bnavigate the complexities of\b/gi, "handle"],
  [/\bnavigating the\b/gi, "dealing with the"],
  [/\bfoster\b/g, "build"],
  [/\bfosters\b/g, "builds"],
  [/\bholistic\b/gi, "complete"],
  [/\bsynergy\b/gi, "teamwork"],
  [/\bfirstly,?\s/gi, "First, "],
  [/\bsecondly,?\s/gi, "Second, "],
  [/\bthirdly,?\s/gi, "Third, "],
  [/\blastly,?\s/gi, "Finally, "],
];

// Formal → contraction
const CONTRACTIONS: [RegExp, string][] = [
  [/\bit is\b/g, "it's"],
  [/\bIt is\b/g, "It's"],
  [/\bdo not\b/g, "don't"],
  [/\bDo not\b/g, "Don't"],
  [/\bdoes not\b/g, "doesn't"],
  [/\bDoes not\b/g, "Doesn't"],
  [/\bdid not\b/g, "didn't"],
  [/\bcannot\b/g, "can't"],
  [/\bCannot\b/g, "Can't"],
  [/\bcan not\b/g, "can't"],
  [/\bwill not\b/g, "won't"],
  [/\bWill not\b/g, "Won't"],
  [/\bwould not\b/g, "wouldn't"],
  [/\bshould not\b/g, "shouldn't"],
  [/\bcould not\b/g, "couldn't"],
  [/\bis not\b/g, "isn't"],
  [/\bare not\b/g, "aren't"],
  [/\bwas not\b/g, "wasn't"],
  [/\bwere not\b/g, "weren't"],
  [/\bhave not\b/g, "haven't"],
  [/\bhas not\b/g, "hasn't"],
  [/\bhad not\b/g, "hadn't"],
  [/\byou are\b/g, "you're"],
  [/\bYou are\b/g, "You're"],
  [/\byou will\b/g, "you'll"],
  [/\bYou will\b/g, "You'll"],
  [/\byou have\b/g, "you've"],
  [/\bwe are\b/g, "we're"],
  [/\bWe are\b/g, "We're"],
  [/\bwe will\b/g, "we'll"],
  [/\bthey are\b/g, "they're"],
  [/\bThey are\b/g, "They're"],
  [/\bthat is\b/g, "that's"],
  [/\bThat is\b/g, "That's"],
  [/\bthere is\b/g, "there's"],
  [/\bThere is\b/g, "There's"],
  [/\bwho is\b/g, "who's"],
  [/\bwhat is\b/g, "what's"],
  [/\bWhat is\b/g, "What's"],
  [/\blet us\b/g, "let's"],
  [/\bLet us\b/g, "Let's"],
];

function humanizeText(
  input: string,
  opts: { contractions: boolean; fixDashes: boolean; simplify: boolean }
): { output: string; changes: number } {
  let text = input;
  let changes = 0;

  const applySwaps = (swaps: [RegExp, string][]) => {
    for (const [pattern, replacement] of swaps) {
      const matches = text.match(pattern);
      if (matches) {
        changes += matches.length;
        text = text.replace(pattern, replacement);
      }
    }
  };

  if (opts.simplify) applySwaps(PHRASE_SWAPS);

  if (opts.fixDashes) {
    // Em-dashes are one of the most common AI tells
    const emDashes = text.match(/\s?—\s?/g);
    if (emDashes) {
      changes += emDashes.length;
      text = text.replace(/\s?—\s?/g, ", ");
    }
    // Fancy quotes → straight quotes
    text = text.replace(/[\u201C\u201D]/g, '"').replace(/[\u2018\u2019]/g, "'");
  }

  if (opts.contractions) applySwaps(CONTRACTIONS);

  // Clean double spaces and space-before-comma artifacts
  text = text.replace(/ {2,}/g, " ").replace(/ ,/g, ",").replace(/,\s*,/g, ",");

  // Fix sentence capitalization after replacements
  text = text.replace(/([.!?]\s+)([a-z])/g, (_, sep, letter) => sep + letter.toUpperCase());

  return { output: text, changes };
}

function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

const AI_TELLS = [
  /\bdelve/i, /\bfurthermore\b/i, /\bmoreover\b/i, /\bleverage/i, /\butilize/i,
  /—/, /\btapestry\b/i, /\bin today's\b/i, /\bgame-changer\b/i, /\bseamless/i,
  /\brobust\b/i, /\bplethora\b/i, /\bin conclusion\b/i, /\bharness\b/i, /\bunlock\b/i,
];

function aiScore(text: string): number {
  if (!text.trim()) return 0;
  const hits = AI_TELLS.filter((r) => r.test(text)).length;
  return Math.min(100, Math.round((hits / AI_TELLS.length) * 160));
}

const FAQS = [
  {
    question: "Is this AI text humanizer really free?",
    answer:
      "Yes. It's 100% free with no word limits, no signup, and no hidden paywall. Everything runs in your browser, so your text never leaves your device.",
  },
  {
    question: "How does the AI humanizer work?",
    answer:
      "It scans your text for known AI writing patterns — words like 'delve', 'leverage', and 'furthermore', em-dashes, and stiff formal phrasing — then rewrites them with natural, conversational alternatives and contractions that real people actually use.",
  },
  {
    question: "Will humanized text pass AI detectors?",
    answer:
      "Removing common AI tells significantly reduces detection scores in tools like GPTZero and Originality.ai, but no tool can guarantee a 0% score. For best results, add your own personal examples and opinions after humanizing.",
  },
  {
    question: "Is my text stored anywhere?",
    answer:
      "No. This tool is fully client-side — your text is processed in your browser and is never uploaded, stored, or logged on any server.",
  },
];

export default function AiTextHumanizer() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [changes, setChanges] = useState(0);
  const [copied, setCopied] = useState(false);
  const [useContractions, setUseContractions] = useState(true);
  const [fixDashes, setFixDashes] = useState(true);
  const [simplify, setSimplify] = useState(true);

  function handleHumanize() {
    if (!input.trim()) return;
    const result = humanizeText(input, { contractions: useContractions, fixDashes, simplify });
    setOutput(result.output);
    setChanges(result.changes);
    setCopied(false);
  }

  function handleCopy() {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleReset() {
    setInput("");
    setOutput("");
    setChanges(0);
  }

  const scoreBefore = aiScore(input);
  const scoreAfter = output ? aiScore(output) : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free AI Text Humanizer",
    description:
      "Humanize AI-generated text instantly. Remove robotic AI phrases, add natural contractions, and make ChatGPT content sound human. Free, unlimited, no signup.",
    url: "https://clickwise.website/tools/ai-text-humanizer",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/tools" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:opacity-80" style={{ color: "var(--text-muted)" }}>
            <ArrowLeft className="w-4 h-4" /> All Tools
          </Link>

          <div className="text-center mb-10">
            <span className="text-5xl mb-4 block">🪄</span>
            <h1 className="text-3xl md:text-4xl font-black mb-3" style={{ color: "var(--text-primary)" }}>
              AI Text Humanizer
            </h1>
            <p className="max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              Paste AI-generated text and instantly remove robotic phrases, em-dashes, and stiff wording. Free, unlimited, 100% private — nothing leaves your browser.
            </p>
          </div>

          {/* Options */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {[
              { label: "Remove AI clichés", checked: simplify, set: setSimplify },
              { label: "Add contractions", checked: useContractions, set: setUseContractions },
              { label: "Fix em-dashes & quotes", checked: fixDashes, set: setFixDashes },
            ].map(({ label, checked, set }) => (
              <label key={label} className="glass rounded-xl px-4 py-2.5 flex items-center gap-2.5 cursor-pointer transition-all hover:scale-[1.02]">
                <input type="checkbox" checked={checked} onChange={(e) => set(e.target.checked)} className="w-4 h-4 accent-purple-600 rounded" />
                <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{label}</span>
              </label>
            ))}
          </div>

          {/* Input / Output */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="glass rounded-3xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold" style={{ color: "var(--text-muted)" }}>AI Text</span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>{countWords(input)} words</span>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your ChatGPT, Claude, or Gemini text here..."
                rows={12}
                className="w-full rounded-xl px-4 py-3 text-sm resize-y outline-none focus:ring-2 focus:ring-purple-500"
                style={{ background: "var(--bg-card)", border: "1.5px solid var(--border-color)", color: "var(--text-primary)" }}
              />
              {input.trim() && (
                <div className="mt-3 text-xs font-semibold" style={{ color: scoreBefore > 40 ? "#EF4444" : "#10B981" }}>
                  AI-pattern score: {scoreBefore}/100
                </div>
              )}
            </div>

            <div className="glass rounded-3xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold gradient-text">Humanized Text</span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>{countWords(output)} words</span>
              </div>
              <textarea
                value={output}
                readOnly
                placeholder="Your human-sounding text will appear here..."
                rows={12}
                className="w-full rounded-xl px-4 py-3 text-sm resize-y outline-none"
                style={{ background: "var(--bg-card)", border: "1.5px solid var(--border-color)", color: "var(--text-primary)" }}
              />
              {output && scoreAfter !== null && (
                <div className="mt-3 flex items-center justify-between text-xs font-semibold">
                  <span style={{ color: scoreAfter > 40 ? "#F59E0B" : "#10B981" }}>
                    AI-pattern score: {scoreAfter}/100
                  </span>
                  <span style={{ color: "var(--text-muted)" }}>{changes} {changes === 1 ? "fix" : "fixes"} applied</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            <button onClick={handleHumanize} disabled={!input.trim()} className="btn-primary text-base disabled:opacity-50">
              <Wand2 className="w-4 h-4 mr-2" /> Humanize Text
            </button>
            {output && (
              <button onClick={handleCopy} className="btn-primary text-sm">
                {copied ? <><Check className="w-4 h-4 mr-2" /> Copied!</> : <><Copy className="w-4 h-4 mr-2" /> Copy Result</>}
              </button>
            )}
            {(input || output) && (
              <button onClick={handleReset} className="btn-ghost text-sm flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            )}
          </div>

          {/* How it works */}
          <div className="glass rounded-3xl p-8 mb-10">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "var(--text-primary)" }}>
              How to Humanize AI Text in 3 Steps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "1", title: "Paste your AI text", desc: "Copy output from ChatGPT, Claude, Gemini, or any AI writer and paste it into the left box." },
                { step: "2", title: "Click Humanize", desc: "We strip AI clichés like 'delve' and 'leverage', kill em-dashes, and add natural contractions." },
                { step: "3", title: "Copy & polish", desc: "Copy the result, then add one personal example or opinion — that's what makes text truly human." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="text-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-white font-black flex items-center justify-center mx-auto mb-3">
                    {step}
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>{title}</h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="glass rounded-3xl p-8">
            <div className="flex items-center gap-2 mb-6 justify-center">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Frequently Asked Questions</h2>
            </div>
            <div className="space-y-5 max-w-3xl mx-auto">
              {FAQS.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-bold mb-1.5" style={{ color: "var(--text-primary)" }}>{faq.question}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <RelatedTools currentTool="ai-text-humanizer" />
        </div>
      </div>
    </>
  );
}
