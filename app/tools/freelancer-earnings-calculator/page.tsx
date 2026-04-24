"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, DollarSign, TrendingUp, Info } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

type Platform = "Direct Client" | "Upwork" | "Fiverr" | "Freelancer.com" | "Toptal" | "PeoplePerHour";
type Experience = "Beginner" | "Intermediate" | "Expert";
type Currency = "USD" | "GBP" | "EUR" | "PKR" | "INR";

const PLATFORMS: { name: Platform; emoji: string; fee: string; feeNote: string }[] = [
  { name: "Direct Client", emoji: "🤝", fee: "0%", feeNote: "No platform fee" },
  { name: "Upwork", emoji: "🆙", fee: "5–20%", feeNote: "20% up to $500" },
  { name: "Fiverr", emoji: "🟢", fee: "20%", feeNote: "Flat 20% always" },
  { name: "Freelancer.com", emoji: "🔵", fee: "10%", feeNote: "Min $5 fee" },
  { name: "Toptal", emoji: "⭐", fee: "0%", feeNote: "Pre-negotiated" },
  { name: "PeoplePerHour", emoji: "🟠", fee: "7.5–20%", feeNote: "20% up to £500" },
];

const EXPERIENCE_LEVELS: Experience[] = ["Beginner", "Intermediate", "Expert"];

const CURRENCIES: { code: Currency; symbol: string; rate: number }[] = [
  { code: "USD", symbol: "$", rate: 1 },
  { code: "GBP", symbol: "£", rate: 0.79 },
  { code: "EUR", symbol: "€", rate: 0.92 },
  { code: "PKR", symbol: "₨", rate: 278 },
  { code: "INR", symbol: "₹", rate: 83 },
];

function calcPlatformFee(platform: Platform, grossUSD: number): number {
  switch (platform) {
    case "Direct Client":
    case "Toptal":
      return 0;
    case "Fiverr":
      return grossUSD * 0.2;
    case "Freelancer.com":
      return Math.max(5, grossUSD * 0.1);
    case "Upwork": {
      // Tiered: 20% up to $500, 10% $500–$10K, 5% above $10K
      if (grossUSD <= 500) return grossUSD * 0.2;
      if (grossUSD <= 10000) return 500 * 0.2 + (grossUSD - 500) * 0.1;
      return 500 * 0.2 + 9500 * 0.1 + (grossUSD - 10000) * 0.05;
    }
    case "PeoplePerHour": {
      // 20% up to £500 equivalent (~$632), 7.5% above
      const threshold = 632;
      if (grossUSD <= threshold) return grossUSD * 0.2;
      return threshold * 0.2 + (grossUSD - threshold) * 0.075;
    }
  }
}

const PLATFORM_TIPS: Record<Platform, string> = {
  "Direct Client": "Direct clients give you 100% of your earnings. Build your own brand and portfolio to attract clients directly via LinkedIn or your personal website.",
  "Upwork": "Upwork's fee drops to 10% after you earn $500 with a client, and 5% after $10K. Build long-term relationships to minimize fees.",
  "Fiverr": "On Fiverr, if you want to earn $100, charge $125 to account for the 20% fee. Fiverr is great for productized, repeatable services.",
  "Freelancer.com": "Freelancer.com charges 10% with a $5 minimum. Best for project-based work. Bid competitively and use their paid memberships to get more proposals.",
  "Toptal": "Toptal is invite-only with 0% fees — they bill clients directly. You get the full negotiated rate. Acceptance rate is under 3%.",
  "PeoplePerHour": "PeoplePerHour's 20% fee drops to 7.5% after ~$632 earned per client. Use their 'Offers' feature to attract recurring buyers.",
};

interface EarningsResult {
  grossWeekly: number;
  grossMonthly: number;
  grossAnnual: number;
  feeAmount: number;
  feePercent: number;
  netWeekly: number;
  netMonthly: number;
  netAnnual: number;
  keepPercent: number;
}

export default function FreelancerEarningsCalculator() {
  const [hourlyRate, setHourlyRate] = useState(50);
  const [hoursPerWeek, setHoursPerWeek] = useState(30);
  const [platform, setPlatform] = useState<Platform>("Upwork");
  const [experience, setExperience] = useState<Experience>("Intermediate");
  const [currency, setCurrency] = useState<Currency>("USD");

  const currencyInfo = CURRENCIES.find((c) => c.code === currency)!;
  const sym = currencyInfo.symbol;
  const rate = currencyInfo.rate;

  const fmt = (usd: number) =>
    (usd * rate).toLocaleString(undefined, { maximumFractionDigits: 0 });

  const result: EarningsResult = useMemo(() => {
    const grossWeekly = hourlyRate * hoursPerWeek;
    const grossMonthly = grossWeekly * 4.33;
    const grossAnnual = grossWeekly * 52;

    const feeAmount = calcPlatformFee(platform, grossMonthly);
    const feePercent = grossMonthly > 0 ? (feeAmount / grossMonthly) * 100 : 0;

    const netMonthly = grossMonthly - feeAmount;
    const netWeekly = netMonthly / 4.33;
    const netAnnual = netMonthly * 12;
    const keepPercent = grossMonthly > 0 ? (netMonthly / grossMonthly) * 100 : 100;

    return { grossWeekly, grossMonthly, grossAnnual, feeAmount, feePercent, netWeekly, netMonthly, netAnnual, keepPercent };
  }, [hourlyRate, hoursPerWeek, platform]);

  const sliderStyle = (val: number, min: number, max: number) => ({
    background: `linear-gradient(to right, #7C3AED ${((val - min) / (max - min)) * 100}%, var(--border-color) ${((val - min) / (max - min)) * 100}%)`,
  });

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:opacity-80"
          style={{ color: "var(--text-muted)" }}
        >
          <ArrowLeft className="w-4 h-4" /> All Tools
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-5xl mb-4 block">💼</span>
          <h1 className="text-3xl md:text-4xl font-black mb-3" style={{ color: "var(--text-primary)" }}>
            Freelancer Earnings Calculator
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            See exactly how much you take home after platform fees, taxes, and expenses
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="glass rounded-3xl p-6 space-y-6">
            {/* Hourly rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
                  Hourly Rate
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>{sym}</span>
                  <input
                    type="number"
                    min={1} max={500}
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Math.max(1, Math.min(500, Number(e.target.value))))}
                    className="w-20 rounded-lg px-2 py-1 text-sm font-bold text-center outline-none"
                    style={{ background: "var(--bg-card)", border: "1.5px solid var(--border-color)", color: "var(--text-primary)" }}
                  />
                </div>
              </div>
              <input
                type="range" min={1} max={500} step={1} value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={sliderStyle(hourlyRate, 1, 500)}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                <span>$1</span><span>$500</span>
              </div>
            </div>

            {/* Hours per week */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
                  Hours Per Week
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1} max={80}
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(Math.max(1, Math.min(80, Number(e.target.value))))}
                    className="w-20 rounded-lg px-2 py-1 text-sm font-bold text-center outline-none"
                    style={{ background: "var(--bg-card)", border: "1.5px solid var(--border-color)", color: "var(--text-primary)" }}
                  />
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>hrs</span>
                </div>
              </div>
              <input
                type="range" min={1} max={80} step={1} value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={sliderStyle(hoursPerWeek, 1, 80)}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                <span>1hr</span><span>80hrs</span>
              </div>
            </div>

            {/* Platform */}
            <div>
              <label className="block text-sm font-semibold mb-3" style={{ color: "var(--text-secondary)" }}>
                Platform
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setPlatform(p.name)}
                    className="rounded-xl px-3 py-2.5 text-left transition-all"
                    style={{
                      background: platform === p.name ? "linear-gradient(135deg,#7C3AED,#2563EB)" : "var(--bg-card)",
                      border: `1.5px solid ${platform === p.name ? "transparent" : "var(--border-color)"}`,
                      color: platform === p.name ? "#fff" : "var(--text-primary)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span>{p.emoji}</span>
                      <div>
                        <div className="text-xs font-bold">{p.name}</div>
                        <div className="text-[10px] opacity-80">{p.fee}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Experience level */}
            <div>
              <label className="block text-sm font-semibold mb-3" style={{ color: "var(--text-secondary)" }}>
                Experience Level
              </label>
              <div className="flex gap-2">
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setExperience(lvl)}
                    className={experience === lvl ? "btn-primary flex-1 text-sm py-2" : "btn-ghost flex-1 text-sm py-2"}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Currency */}
            <div>
              <label className="block text-sm font-semibold mb-3" style={{ color: "var(--text-secondary)" }}>
                Display Currency
              </label>
              <div className="flex flex-wrap gap-2">
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setCurrency(c.code)}
                    className="rounded-lg px-3 py-1.5 text-sm font-semibold transition-all"
                    style={{
                      background: currency === c.code ? "linear-gradient(135deg,#7C3AED,#2563EB)" : "var(--bg-card)",
                      border: `1.5px solid ${currency === c.code ? "transparent" : "var(--border-color)"}`,
                      color: currency === c.code ? "#fff" : "var(--text-primary)",
                    }}
                  >
                    {c.code}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results panel */}
          <div className="space-y-4">
            <div className="glass gradient-border rounded-3xl p-6">
              <h2 className="font-bold text-sm uppercase tracking-wide mb-5" style={{ color: "var(--text-muted)" }}>
                Your Earnings Breakdown
              </h2>

              {/* Gross */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span style={{ color: "var(--text-secondary)" }}>Gross Weekly</span>
                  <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{sym}{fmt(result.grossWeekly)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "var(--text-secondary)" }}>Gross Monthly</span>
                  <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{sym}{fmt(result.grossMonthly)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "var(--text-secondary)" }}>Gross Annual</span>
                  <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{sym}{fmt(result.grossAnnual)}</span>
                </div>
              </div>

              {/* Fee */}
              <div
                className="flex justify-between py-3 px-4 rounded-xl mb-4 text-sm font-semibold"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
              >
                <span style={{ color: "#EF4444" }}>
                  Platform Fee ({result.feePercent.toFixed(1)}%)
                </span>
                <span style={{ color: "#EF4444" }}>-{sym}{fmt(result.feeAmount)}/mo</span>
              </div>

              {/* Net */}
              <div className="glass rounded-2xl p-4 mb-4">
                <div className="text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Net Monthly</div>
                <div className="text-4xl font-black gradient-text">{sym}{fmt(result.netMonthly)}</div>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>Net Weekly</div>
                    <div className="font-bold" style={{ color: "var(--text-primary)" }}>{sym}{fmt(result.netWeekly)}</div>
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>Net Annual</div>
                    <div className="font-bold" style={{ color: "var(--text-primary)" }}>{sym}{fmt(result.netAnnual)}</div>
                  </div>
                </div>
              </div>

              {/* Keep % progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: "var(--text-secondary)" }}>You keep</span>
                  <span className="font-bold gradient-text">{result.keepPercent.toFixed(1)}%</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--border-color)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${result.keepPercent}%`,
                      background: "linear-gradient(90deg, #7C3AED, #2563EB)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Platform tip */}
            <div className="glass rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <Info className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#7C3AED" }} />
                <div>
                  <div className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                    {platform} Tip
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {PLATFORM_TIPS[platform]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <div className="glass rounded-3xl p-6 mt-6">
          <h2 className="font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            Platform Comparison
          </h2>
          <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>
            Monthly net earnings at {sym}{fmt(hourlyRate)}/hr × {hoursPerWeek} hrs/week across platforms
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <th className="text-left py-2 pr-4 font-semibold" style={{ color: "var(--text-muted)" }}>Platform</th>
                  <th className="text-right py-2 pr-4 font-semibold" style={{ color: "var(--text-muted)" }}>Fee</th>
                  <th className="text-right py-2 font-semibold" style={{ color: "var(--text-muted)" }}>Net / Month</th>
                </tr>
              </thead>
              <tbody>
                {PLATFORMS.map((p) => {
                  const gross = hourlyRate * hoursPerWeek * 4.33;
                  const fee = calcPlatformFee(p.name, gross);
                  const net = gross - fee;
                  const isActive = p.name === platform;
                  return (
                    <tr
                      key={p.name}
                      className="transition-all"
                      style={{
                        borderBottom: "1px solid var(--border-color)",
                        background: isActive ? "rgba(124,58,237,0.06)" : "transparent",
                      }}
                    >
                      <td className="py-3 pr-4">
                        <span className="mr-2">{p.emoji}</span>
                        <span className="font-semibold" style={{ color: isActive ? "#7C3AED" : "var(--text-primary)" }}>
                          {p.name}
                        </span>
                        {isActive && (
                          <span className="ml-2 text-[10px] font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-white px-1.5 py-0.5 rounded-full">
                            Selected
                          </span>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-right" style={{ color: "#EF4444" }}>
                        -{sym}{(fee * rate).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </td>
                      <td className="py-3 text-right font-bold" style={{ color: isActive ? "#7C3AED" : "var(--text-primary)" }}>
                        {sym}{(net * rate).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="glass rounded-2xl p-5 mt-4 flex items-center gap-3">
          <TrendingUp className="w-5 h-5 shrink-0" style={{ color: "#7C3AED" }} />
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            <strong style={{ color: "var(--text-primary)" }}>Pro tip for {experience}s:</strong>{" "}
            {experience === "Beginner"
              ? "Start on Fiverr or Upwork to build reviews, then move to direct clients for higher take-home pay."
              : experience === "Intermediate"
              ? "Leverage your existing reviews to negotiate direct contracts — Direct Client or Toptal gives you the best net earnings."
              : "At Expert level, prioritize direct contracts or Toptal. Your reputation is your best sales tool."}
          </p>
        </div>
      </div>
      <RelatedTools currentTool="freelancer-earnings-calculator" />
    </div>
  );
}
