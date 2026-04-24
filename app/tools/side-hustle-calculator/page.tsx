"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Share2, ChevronDown } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

const skillOptions = ["Writing & Content","Coding & Development","Design & Creative","Marketing & SEO","Teaching & Coaching","Video & Editing","Social Media","Admin & Virtual Assistant","Sales & Copywriting","Finance & Accounting"];

const hustleData: Record<string, { name: string; min: number; max: number; platform: string; url: string; difficulty: string; timeToFirst: string; description: string }[]> = {
  "Writing & Content": [
    { name: "Freelance Writing", min: 800, max: 5000, platform: "Upwork", url: "#", difficulty: "Easy", timeToFirst: "1-2 weeks", description: "Write blog posts, articles, and web copy for businesses." },
    { name: "Blog + Affiliate Marketing", min: 200, max: 8000, platform: "WordPress", url: "#", difficulty: "Medium", timeToFirst: "3-6 months", description: "Build a niche blog and earn commissions from product recommendations." },
    { name: "Newsletter Creator", min: 300, max: 5000, platform: "Beehiiv", url: "#", difficulty: "Medium", timeToFirst: "2-3 months", description: "Grow a paid newsletter in your area of expertise." },
    { name: "AI Content Agency", min: 1500, max: 10000, platform: "Fiverr", url: "#", difficulty: "Medium", timeToFirst: "2-4 weeks", description: "Use AI tools to create content at scale for multiple clients." },
  ],
  "Coding & Development": [
    { name: "Freelance Web Dev", min: 2000, max: 12000, platform: "Toptal", url: "#", difficulty: "Easy", timeToFirst: "1 week", description: "Build websites and web apps for clients." },
    { name: "SaaS Product", min: 500, max: 50000, platform: "Stripe", url: "#", difficulty: "Hard", timeToFirst: "3-6 months", description: "Build and sell your own software product." },
    { name: "Chrome Extensions", min: 200, max: 3000, platform: "Chrome Store", url: "#", difficulty: "Medium", timeToFirst: "1-2 months", description: "Create browser extensions and monetize with one-time or recurring fees." },
    { name: "AI Tool Development", min: 1000, max: 15000, platform: "Product Hunt", url: "#", difficulty: "Medium", timeToFirst: "1-2 months", description: "Build AI-powered micro-tools and charge for API access." },
  ],
  "Design & Creative": [
    { name: "Freelance Design", min: 1500, max: 8000, platform: "99designs", url: "#", difficulty: "Easy", timeToFirst: "1-2 weeks", description: "Create logos, brand identities, and marketing materials." },
    { name: "Digital Templates", min: 300, max: 4000, platform: "Etsy", url: "#", difficulty: "Easy", timeToFirst: "2-4 weeks", description: "Sell Canva templates, Notion templates, and printables." },
    { name: "UI/UX Consulting", min: 3000, max: 15000, platform: "LinkedIn", url: "#", difficulty: "Medium", timeToFirst: "2-3 weeks", description: "Review and improve product interfaces for tech companies." },
    { name: "Stock Assets", min: 100, max: 2000, platform: "Creative Market", url: "#", difficulty: "Easy", timeToFirst: "1 month", description: "Sell fonts, icons, illustrations, and mockups." },
  ],
  "Marketing & SEO": [
    { name: "SEO Consulting", min: 2000, max: 10000, platform: "LinkedIn", url: "#", difficulty: "Medium", timeToFirst: "1-2 weeks", description: "Help businesses rank higher on Google." },
    { name: "Affiliate Marketing", min: 500, max: 20000, platform: "ClickBank", url: "#", difficulty: "Medium", timeToFirst: "2-4 months", description: "Promote products and earn commissions per sale." },
    { name: "Social Media Management", min: 1000, max: 5000, platform: "Contra", url: "#", difficulty: "Easy", timeToFirst: "1-2 weeks", description: "Manage Instagram, LinkedIn, or TikTok for brands." },
    { name: "Email Marketing", min: 1500, max: 7000, platform: "Upwork", url: "#", difficulty: "Easy", timeToFirst: "1 week", description: "Build and manage email campaigns for e-commerce brands." },
  ],
  "Teaching & Coaching": [
    { name: "Online Courses", min: 500, max: 15000, platform: "Teachable", url: "#", difficulty: "Medium", timeToFirst: "1-2 months", description: "Teach your expertise in a structured video course." },
    { name: "1-on-1 Coaching", min: 1500, max: 8000, platform: "Calendly", url: "#", difficulty: "Easy", timeToFirst: "1-2 weeks", description: "Coach individuals on career, fitness, or business." },
    { name: "Tutoring", min: 800, max: 4000, platform: "Tutor.com", url: "#", difficulty: "Easy", timeToFirst: "Days", description: "Tutor students in your subject area online." },
    { name: "Membership Community", min: 300, max: 10000, platform: "Skool", url: "#", difficulty: "Medium", timeToFirst: "1-3 months", description: "Build a paid community around your knowledge." },
  ],
};

const defaultHustle = hustleData["Writing & Content"];

const multiplier: Record<string, number> = { Beginner: 0.5, Intermediate: 1.0, Expert: 1.6 };
const hourMultiplier: Record<string, number> = { "1-5": 0.4, "5-10": 0.7, "10-20": 1.0, "20-40": 1.5, "40+": 2.0 };

export default function SideHustleCalculator() {
  const [skill, setSkill] = useState("Writing & Content");
  const [experience, setExperience] = useState("Beginner");
  const [hours, setHours] = useState("10-20");
  const [calculated, setCalculated] = useState(false);
  const [shared, setShared] = useState(false);

  const hustles = hustleData[skill] || defaultHustle;
  const expMult = multiplier[experience];
  const hrMult = hourMultiplier[hours];

  const results = hustles.map((h) => ({
    ...h,
    calcMin: Math.round(h.min * expMult * hrMult / 100) * 100,
    calcMax: Math.round(h.max * expMult * hrMult / 100) * 100,
  }));

  const topResult = results[0];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-purple-600 dark:hover:text-purple-400" style={{ color: "var(--text-muted)" }}>
          <ArrowLeft className="w-4 h-4" /> All Tools
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-5xl mb-4 block">💰</span>
          <h1 className="text-3xl md:text-4xl font-black mb-3" style={{ color: "var(--text-primary)" }}>
            Side Hustle Income Calculator
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Find out exactly how much you could earn — based on your real skills and available time.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="glass rounded-3xl p-6 md:p-8 mb-8">
          <h2 className="text-lg font-bold mb-6" style={{ color: "var(--text-primary)" }}>Tell us about yourself</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Skill */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Your Main Skill</label>
              <div className="relative">
                <select value={skill} onChange={(e) => { setSkill(e.target.value); setCalculated(false); }}
                  className="w-full glass rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none cursor-pointer text-sm"
                  style={{ color: "var(--text-primary)", background: "var(--bg-card)" }}>
                  {skillOptions.map((s) => <option key={s} value={s} style={{ background: "var(--bg-card)" }}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "var(--text-muted)" }} />
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Experience Level</label>
              <div className="flex flex-col gap-2">
                {["Beginner", "Intermediate", "Expert"].map((lvl) => (
                  <button key={lvl} onClick={() => { setExperience(lvl); setCalculated(false); }}
                    className={`py-2 px-4 rounded-xl text-sm font-medium transition-all text-left ${experience === lvl ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : "glass hover:border-purple-400/40"}`}
                    style={experience !== lvl ? { color: "var(--text-secondary)" } : {}}>
                    {lvl} {lvl === "Beginner" ? "— Just starting" : lvl === "Intermediate" ? "— 1-3 years" : "— 3+ years"}
                  </button>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Hours per Week</label>
              <div className="flex flex-col gap-2">
                {["1-5", "5-10", "10-20", "20-40", "40+"].map((hr) => (
                  <button key={hr} onClick={() => { setHours(hr); setCalculated(false); }}
                    className={`py-2 px-4 rounded-xl text-sm font-medium transition-all text-left ${hours === hr ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : "glass hover:border-purple-400/40"}`}
                    style={hours !== hr ? { color: "var(--text-secondary)" } : {}}>
                    {hr} hrs/week
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setCalculated(true)}
            className="btn-primary w-full text-base py-4 text-lg font-bold"
          >
            Calculate My Income Potential →
          </button>
        </div>

        {/* Results */}
        {calculated && (
          <div className="space-y-4 animate-fade-up">
            {/* Top result highlight */}
            <div className="glass rounded-3xl p-6 gradient-border">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">#1 Best Match</span>
                  <h3 className="text-xl font-bold mt-2" style={{ color: "var(--text-primary)" }}>{topResult.name}</h3>
                  <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>{topResult.description}</p>
                </div>
                <div className="text-right ml-4">
                  <div className="text-2xl font-black gradient-text">${topResult.calcMin.toLocaleString()}–${topResult.calcMax.toLocaleString()}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>per month</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-4 pt-4" style={{ borderTop: "1px solid var(--border-color)" }}>
                <span className="text-xs glass px-2 py-1 rounded-full" style={{ color: "var(--text-muted)" }}>⏱ First $ in: {topResult.timeToFirst}</span>
                <span className="text-xs glass px-2 py-1 rounded-full" style={{ color: "var(--text-muted)" }}>📊 Difficulty: {topResult.difficulty}</span>
                <span className="text-xs glass px-2 py-1 rounded-full" style={{ color: "var(--text-muted)" }}>🚀 Start on: {topResult.platform}</span>
                <Link href={topResult.url} className="ml-auto btn-primary text-xs py-1.5 px-4 flex items-center gap-1">
                  Get Started <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Other results */}
            <h3 className="font-bold text-sm uppercase tracking-wide pt-2" style={{ color: "var(--text-muted)" }}>Other Options for You</h3>
            {results.slice(1).map((r) => (
              <div key={r.name} className="glass rounded-2xl p-5 flex items-center justify-between gap-4 card-hover">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{r.name}</h4>
                  <p className="text-xs mt-0.5 truncate" style={{ color: "var(--text-muted)" }}>{r.description}</p>
                  <div className="flex gap-3 mt-2">
                    <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>⏱ {r.timeToFirst}</span>
                    <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>📊 {r.difficulty}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-bold gradient-text">${r.calcMin.toLocaleString()}–${r.calcMax.toLocaleString()}/mo</div>
                  <Link href={r.url} className="text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1 justify-end mt-1 hover:underline">
                    Start on {r.platform} <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}

            {/* Share */}
            <div className="text-center pt-4">
              <button
                onClick={() => setShared(true)}
                className="btn-ghost flex items-center gap-2 mx-auto text-sm"
              >
                <Share2 className="w-4 h-4" />
                {shared ? "Link Copied!" : "Share Your Results"}
              </button>
            </div>
          </div>
        )}
      </div>
      <RelatedTools currentTool="side-hustle-calculator" />
    </div>
  );
}
