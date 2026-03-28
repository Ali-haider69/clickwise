"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, RotateCcw, Star } from "lucide-react";

const questions = [
  {
    id: "useCase",
    question: "What do you mainly need AI for?",
    options: [
      { value: "writing", label: "✍️ Writing & Content", desc: "Blog posts, emails, copywriting" },
      { value: "coding", label: "💻 Coding & Dev", desc: "Code generation, debugging, review" },
      { value: "design", label: "🎨 Design & Images", desc: "Image generation, editing" },
      { value: "research", label: "🔍 Research & Analysis", desc: "Summarize, analyze, fact-check" },
      { value: "business", label: "📊 Business & Productivity", desc: "Docs, meetings, automation" },
      { value: "video", label: "🎬 Video & Audio", desc: "Video generation, voice, music" },
    ],
  },
  {
    id: "budget",
    question: "What's your monthly budget?",
    options: [
      { value: "free", label: "💚 Free only", desc: "No credit card, free forever" },
      { value: "low", label: "💛 Under $20/mo", desc: "Basic paid plans" },
      { value: "mid", label: "🟠 $20-50/mo", desc: "Professional tier" },
      { value: "high", label: "🔴 $50+/mo", desc: "Business / Team plans" },
    ],
  },
  {
    id: "level",
    question: "How would you describe yourself?",
    options: [
      { value: "beginner", label: "🌱 Beginner", desc: "Just getting started with AI" },
      { value: "intermediate", label: "🌿 Intermediate", desc: "Used AI tools before" },
      { value: "power", label: "🌳 Power User", desc: "Need advanced features & API" },
    ],
  },
];

type AnswerMap = Record<string, string>;

const aiTools: { id: string; name: string; tagline: string; rating: number; price: string; tags: string[]; pros: string[]; url: string; badge?: string }[] = [
  { id: "claude", name: "Claude", tagline: "Best for writing, analysis & coding", rating: 4.9, price: "Free / $20mo", tags: ["writing","research","coding","free","beginner","intermediate","power"], pros: ["1M token context","Excellent writing quality","Strong coding"], url: "#", badge: "Editor's Pick" },
  { id: "chatgpt", name: "ChatGPT", tagline: "Most versatile AI assistant", rating: 4.8, price: "Free / $20mo", tags: ["writing","coding","business","design","free","beginner","intermediate"], pros: ["DALL-E image gen","Voice mode","Plugin ecosystem"], url: "#" },
  { id: "midjourney", name: "Midjourney", tagline: "Best AI image generator", rating: 4.9, price: "$10-$60mo", tags: ["design","mid","high","intermediate","power"], pros: ["Photorealistic output","Consistent style","Fast generation"], url: "#", badge: "Best for Design" },
  { id: "perplexity", name: "Perplexity AI", tagline: "AI search with real-time web access", rating: 4.7, price: "Free / $20mo", tags: ["research","free","low","beginner","intermediate"], pros: ["Real-time search","Cited sources","Clean interface"], url: "#" },
  { id: "github-copilot", name: "GitHub Copilot", tagline: "AI coding assistant", rating: 4.8, price: "$10mo", tags: ["coding","low","intermediate","power"], pros: ["IDE integration","Context-aware","Autocomplete"], url: "#", badge: "Best for Coding" },
  { id: "runway", name: "Runway ML", tagline: "AI video generation & editing", rating: 4.6, price: "Free / $15mo", tags: ["video","free","low","mid","intermediate","power"], pros: ["Video generation","Background removal","Text-to-video"], url: "#" },
  { id: "notion-ai", name: "Notion AI", tagline: "AI built into your workspace", rating: 4.5, price: "$10mo add-on", tags: ["business","writing","low","beginner","intermediate"], pros: ["Built into Notion","Document AI","Meeting summaries"], url: "#" },
  { id: "suno", name: "Suno AI", tagline: "Create music from text prompts", rating: 4.7, price: "Free / $10mo", tags: ["video","free","low","beginner","intermediate"], pros: ["Full song generation","50+ genres","Instant creation"], url: "#" },
  { id: "cursor", name: "Cursor", tagline: "AI-first code editor", rating: 4.8, price: "Free / $20mo", tags: ["coding","free","low","intermediate","power"], pros: ["Built on VS Code","Codebase context","Fast autocomplete"], url: "#" },
  { id: "canva-ai", name: "Canva AI", tagline: "AI-powered design platform", rating: 4.6, price: "Free / $13mo", tags: ["design","business","free","low","beginner","intermediate"], pros: ["Magic Design feature","Huge template library","Easy for beginners"], url: "#" },
];

function getRecommendations(answers: AnswerMap) {
  return aiTools
    .filter((tool) => {
      const uc = answers.useCase ? tool.tags.includes(answers.useCase) : true;
      const budget = answers.budget ? tool.tags.includes(answers.budget) : true;
      const level = answers.level ? tool.tags.includes(answers.level) : true;
      return uc && (budget || level);
    })
    .slice(0, 4);
}

export default function AIFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [done, setDone] = useState(false);

  const currentQ = questions[step];
  const recommendations = getRecommendations(answers);

  function handleAnswer(val: string) {
    const newAnswers = { ...answers, [currentQ.id]: val };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setDone(false);
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-purple-600 dark:hover:text-purple-400" style={{ color: "var(--text-muted)" }}>
          <ArrowLeft className="w-4 h-4" /> All Tools
        </Link>

        <div className="text-center mb-10">
          <span className="text-5xl mb-4 block">🤖</span>
          <h1 className="text-3xl md:text-4xl font-black mb-3" style={{ color: "var(--text-primary)" }}>AI Tool Finder</h1>
          <p style={{ color: "var(--text-secondary)" }}>Answer 3 questions. Get matched to the perfect AI tools for you.</p>
        </div>

        {!done ? (
          <>
            {/* Progress */}
            <div className="flex items-center gap-2 mb-8">
              {questions.map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-gray-200 dark:bg-white/10"}`} />
              ))}
            </div>

            <div className="glass rounded-3xl p-6 md:p-8 animate-fade-up">
              <p className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-3">Question {step + 1} of {questions.length}</p>
              <h2 className="text-xl md:text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>{currentQ.question}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt) => (
                  <button key={opt.value} onClick={() => handleAnswer(opt.value)}
                    className="glass rounded-2xl p-4 text-left card-hover group hover:border-purple-400/40 transition-all">
                    <div className="font-semibold mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors" style={{ color: "var(--text-primary)" }}>{opt.label}</div>
                    <div className="text-sm" style={{ color: "var(--text-muted)" }}>{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="animate-fade-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                🎯 Your Perfect AI Tools ({recommendations.length} matches)
              </h2>
              <button onClick={reset} className="btn-ghost text-sm flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> Retake
              </button>
            </div>

            <div className="space-y-4">
              {recommendations.map((tool, i) => (
                <div key={tool.id} className={`glass rounded-2xl p-6 card-hover ${i === 0 ? "gradient-border" : ""}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {i === 0 && <span className="text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 px-2 py-0.5 rounded-full">Best Match</span>}
                        {tool.badge && <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">{tool.badge}</span>}
                      </div>
                      <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{tool.name}</h3>
                      <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>{tool.tagline}</p>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(s => <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.floor(tool.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />)}
                          <span className="text-xs ml-1" style={{ color: "var(--text-muted)" }}>{tool.rating}</span>
                        </div>
                        <span className="text-sm font-bold gradient-text">{tool.price}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tool.pros.map(p => (
                          <span key={p} className="text-xs glass px-2 py-0.5 rounded-full" style={{ color: "var(--text-muted)" }}>✓ {p}</span>
                        ))}
                      </div>
                    </div>
                    <Link href={tool.url} className="btn-primary text-sm py-2 flex-shrink-0 flex items-center gap-1">
                      Try Free <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {recommendations.length === 0 && (
              <div className="glass rounded-2xl p-8 text-center">
                <p style={{ color: "var(--text-secondary)" }}>No exact matches — try adjusting your filters.</p>
                <button onClick={reset} className="btn-primary mt-4 inline-flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" /> Try Again
                </button>
              </div>
            )}

            <div className="text-center mt-8">
              <Link href="/blog/best-ai-tools-2026" className="btn-ghost inline-flex items-center gap-2 text-sm">
                Read: 15 Best Free AI Tools 2026 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
