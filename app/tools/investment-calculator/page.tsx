"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, TrendingUp } from "lucide-react";

const platforms = [
  { name: "Fidelity", type: "Stocks & ETFs", minReturn: 7, url: "#", badge: "Best Overall" },
  { name: "Robinhood", type: "Stocks, Crypto, Options", minReturn: 0, url: "#" },
  { name: "Acorns", type: "Automated investing", minReturn: 5, url: "#", badge: "Best Beginner" },
  { name: "Vanguard", type: "Index funds (long-term)", minReturn: 8, url: "#" },
];

export default function InvestmentCalculator() {
  const [initial, setInitial] = useState(1000);
  const [monthly, setMonthly] = useState(200);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(10);

  const results = useMemo(() => {
    const data = [];
    let total = initial;
    let totalContributions = initial;
    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        total = total * (1 + rate / 100 / 12) + monthly;
        totalContributions += monthly;
      }
      data.push({ year: y, total: Math.round(total), contributions: Math.round(totalContributions) });
    }
    return data;
  }, [initial, monthly, rate, years]);

  const final = results[results.length - 1];
  const totalContributed = final?.contributions ?? initial;
  const totalGains = (final?.total ?? initial) - totalContributed;
  const maxVal = final?.total ?? 1;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-purple-600 dark:hover:text-purple-400" style={{ color: "var(--text-muted)" }}>
          <ArrowLeft className="w-4 h-4" /> All Tools
        </Link>

        <div className="text-center mb-10">
          <span className="text-5xl mb-4 block">📈</span>
          <h1 className="text-3xl md:text-4xl font-black mb-3" style={{ color: "var(--text-primary)" }}>Investment Growth Calculator</h1>
          <p style={{ color: "var(--text-secondary)" }}>See the power of compound interest. Watch your money grow over time.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Inputs */}
          <div className="glass rounded-3xl p-6">
            <h2 className="font-bold mb-6" style={{ color: "var(--text-primary)" }}>Your Investment Details</h2>
            <div className="space-y-6">
              {[
                { label: "Initial Investment", value: initial, set: setInitial, min: 0, max: 100000, step: 500, prefix: "$", format: (v: number) => `$${v.toLocaleString()}` },
                { label: "Monthly Contribution", value: monthly, set: setMonthly, min: 0, max: 5000, step: 50, prefix: "$", format: (v: number) => `$${v.toLocaleString()}/mo` },
                { label: "Expected Annual Return", value: rate, set: setRate, min: 1, max: 20, step: 0.5, prefix: "", format: (v: number) => `${v}% per year` },
                { label: "Time Horizon", value: years, set: setYears, min: 1, max: 40, step: 1, prefix: "", format: (v: number) => `${v} years` },
              ].map(({ label, value, set, min, max, step, format }) => (
                <div key={label}>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>{label}</label>
                    <span className="text-sm font-bold gradient-text">{format(value)}</span>
                  </div>
                  <input type="range" min={min} max={max} step={step} value={value}
                    onChange={(e) => set(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{ background: `linear-gradient(to right, #7C3AED ${((value - min) / (max - min)) * 100}%, var(--border-color) ${((value - min) / (max - min)) * 100}%)` }}
                  />
                  <div className="flex justify-between text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                    <span>{min}{label.includes("Return") ? "%" : label.includes("Time") ? "yr" : ""}</span>
                    <span>{max}{label.includes("Return") ? "%" : label.includes("Time") ? "yrs" : ""}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="space-y-4">
            <div className="glass rounded-2xl p-6 gradient-border">
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>After {years} Years</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Total Portfolio Value</div>
                  <div className="text-4xl font-black gradient-text">${final?.total.toLocaleString()}</div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-4" style={{ borderTop: "1px solid var(--border-color)" }}>
                  <div className="glass rounded-xl p-3">
                    <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Total Contributed</div>
                    <div className="font-bold" style={{ color: "var(--text-primary)" }}>${totalContributed.toLocaleString()}</div>
                  </div>
                  <div className="glass rounded-xl p-3">
                    <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Investment Gains</div>
                    <div className="font-bold text-green-600 dark:text-green-400">+${totalGains.toLocaleString()}</div>
                  </div>
                </div>
                <div className="glass rounded-xl p-3 text-center">
                  <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Your money grew by</div>
                  <div className="text-2xl font-black text-green-600 dark:text-green-400">
                    {Math.round((totalGains / totalContributed) * 100)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly breakdown */}
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Monthly growth at year {years}</span>
              </div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Your investment generates approx. <strong style={{ color: "var(--text-primary)" }}>${Math.round((final?.total ?? 0) * (rate / 100 / 12)).toLocaleString()}/mo</strong> in returns alone.
              </p>
            </div>
          </div>
        </div>

        {/* Growth Chart */}
        <div className="glass rounded-3xl p-6 mb-8">
          <h2 className="font-bold mb-6" style={{ color: "var(--text-primary)" }}>Growth Over Time</h2>
          <div className="flex items-end gap-1 h-40">
            {results.map((r) => (
              <div key={r.year} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10" style={{ color: "var(--text-primary)" }}>
                  Yr {r.year}: ${r.total.toLocaleString()}
                </div>
                {/* Gains portion */}
                <div className="w-full bg-gradient-to-t from-purple-600 to-blue-500 rounded-t-sm transition-all duration-300"
                  style={{ height: `${((r.total - r.contributions) / maxVal) * 140}px` }} />
                {/* Contribution portion */}
                <div className="w-full bg-purple-200 dark:bg-purple-900/40 rounded-sm"
                  style={{ height: `${(r.contributions / maxVal) * 140}px` }} />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6 mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-gradient-to-t from-purple-600 to-blue-500 inline-block" /> Investment Gains</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-purple-200 dark:bg-purple-900/40 inline-block" /> Contributions</span>
          </div>
        </div>

        {/* Platform recommendations */}
        <div className="glass rounded-3xl p-6">
          <h2 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>Start Investing Today</h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Recommended platforms to achieve your {rate}% target return:</p>
          <div className="grid grid-cols-2 gap-3">
            {platforms.map((p) => (
              <div key={p.name} className="glass rounded-xl p-4 card-hover">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{p.name}</span>
                  {p.badge && <span className="text-[10px] font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 py-0.5 rounded-full">{p.badge}</span>}
                </div>
                <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>{p.type}</p>
                <Link href={p.url} className="btn-primary text-xs py-1.5 w-full justify-center flex items-center gap-1">
                  Open Account <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
