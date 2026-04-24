"use client";
import { useState, useMemo } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

type Country = "US" | "UK" | "Canada" | "Australia" | "Pakistan" | "India";
type FilingStatus = "single" | "married" | "head";

const currencies: Record<Country, string> = { US: "$", UK: "£", Canada: "CA$", Australia: "A$", Pakistan: "PKR", India: "₹" };

// ── US 2026 Federal brackets ──────────────────────────────────────────────
const usBrackets: Record<FilingStatus, { limit: number; rate: number }[]> = {
  single: [
    { limit: 11600, rate: 0.10 },
    { limit: 47150, rate: 0.12 },
    { limit: 100525, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: 243725, rate: 0.32 },
    { limit: 609350, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ],
  married: [
    { limit: 23200, rate: 0.10 },
    { limit: 94300, rate: 0.12 },
    { limit: 201050, rate: 0.22 },
    { limit: 383900, rate: 0.24 },
    { limit: 487450, rate: 0.32 },
    { limit: 731200, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ],
  head: [
    { limit: 16550, rate: 0.10 },
    { limit: 63100, rate: 0.12 },
    { limit: 100500, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: 243700, rate: 0.32 },
    { limit: 609350, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ],
};

const usStandardDeduction: Record<FilingStatus, number> = { single: 14600, married: 29200, head: 21900 };

// US State flat estimates (simplified)
const usStates: Record<string, number> = {
  "No State Tax": 0, California: 0.093, "New York": 0.0685, Texas: 0, Florida: 0,
  Washington: 0, Nevada: 0, Illinois: 0.0495, Pennsylvania: 0.0307,
  "New Jersey": 0.0637, Ohio: 0.04, Georgia: 0.055, "North Carolina": 0.0525,
  Michigan: 0.0425, Arizona: 0.025, Colorado: 0.044, Tennessee: 0,
};

// ── UK 2026/27 ────────────────────────────────────────────────────────────
function calcUK(income: number) {
  const personalAllowance = 12570;
  const taxable = Math.max(0, income - personalAllowance);
  let tax = 0;
  if (taxable <= 37700) tax = taxable * 0.20;
  else if (taxable <= 125140) tax = 37700 * 0.20 + (taxable - 37700) * 0.40;
  else tax = 37700 * 0.20 + 87440 * 0.40 + (taxable - 125140) * 0.45;
  const ni = income > 12570 ? Math.min(income, 50270) * 0.08 + Math.max(0, income - 50270) * 0.02 : 0;
  return { incomeTax: tax, ni, total: tax + ni };
}

// ── Canada 2026 Federal ───────────────────────────────────────────────────
function calcCanada(income: number) {
  const brackets = [
    { limit: 55867, rate: 0.15 },
    { limit: 111733, rate: 0.205 },
    { limit: 154906, rate: 0.26 },
    { limit: 220000, rate: 0.29 },
    { limit: Infinity, rate: 0.33 },
  ];
  const bpa = 15705;
  const taxable = Math.max(0, income - bpa);
  let tax = 0, prev = 0;
  for (const b of brackets) {
    if (taxable <= prev) break;
    tax += (Math.min(taxable, b.limit) - prev) * b.rate;
    prev = b.limit;
  }
  const cpp = Math.min(Math.max(0, income - 3500), 68500) * 0.0595;
  const ei = Math.min(income, 63200) * 0.0166;
  return { incomeTax: tax, cpp, ei, total: tax + cpp + ei };
}

// ── Australia 2026 ────────────────────────────────────────────────────────
function calcAustralia(income: number) {
  let tax = 0;
  if (income <= 18200) tax = 0;
  else if (income <= 45000) tax = (income - 18200) * 0.19;
  else if (income <= 120000) tax = 5092 + (income - 45000) * 0.325;
  else if (income <= 180000) tax = 29467 + (income - 120000) * 0.37;
  else tax = 51667 + (income - 180000) * 0.45;
  const medicare = income > 26000 ? income * 0.02 : 0;
  return { incomeTax: tax, medicare, total: tax + medicare };
}

// ── Pakistan FY 2025-26 (salaried) ───────────────────────────────────────
// Brackets in PKR per FBR Finance Act 2024
function calcPakistan(income: number) {
  let tax = 0;
  if (income <= 600000) {
    tax = 0;
  } else if (income <= 1200000) {
    tax = (income - 600000) * 0.05;
  } else if (income <= 2200000) {
    tax = 30000 + (income - 1200000) * 0.15;
  } else if (income <= 3200000) {
    tax = 180000 + (income - 2200000) * 0.25;
  } else if (income <= 4100000) {
    tax = 430000 + (income - 3200000) * 0.30;
  } else {
    tax = 700000 + (income - 4100000) * 0.35;
  }
  // EOBI employee contribution: 1% of basic (approx 6% of gross for min wage workers; simplified)
  const eobi = Math.min(income * 0.01, 9000);
  return { incomeTax: tax, eobi, total: tax + eobi };
}

// ── India FY 2025-26 New Tax Regime (default) ─────────────────────────────
// Budget 2025: rebate u/s 87A up to ₹12L income → zero tax
function calcIndia(income: number) {
  // New regime slabs (post-Budget 2025)
  let tax = 0;
  if (income <= 400000) tax = 0;
  else if (income <= 800000) tax = (income - 400000) * 0.05;
  else if (income <= 1200000) tax = 20000 + (income - 800000) * 0.10;
  else if (income <= 1600000) tax = 60000 + (income - 1200000) * 0.15;
  else if (income <= 2000000) tax = 120000 + (income - 1600000) * 0.20;
  else if (income <= 2400000) tax = 200000 + (income - 2000000) * 0.25;
  else tax = 300000 + (income - 2400000) * 0.30;

  // Section 87A rebate: if income ≤ ₹12,00,000 tax is nil
  if (income <= 1200000) tax = 0;

  // Standard deduction ₹75,000 (new regime)
  // (already applied via slab — we show it as a note)

  // 4% Health & Education cess on tax
  const cess = tax * 0.04;

  // Employee PF: 12% of basic (approx 10% of gross, capped ₹1,800/mo = ₹21,600/yr)
  const pf = Math.min(income * 0.10, 21600);

  return { incomeTax: tax, cess, pf, total: tax + cess + pf };
}

function fmt(n: number, sym: string) {
  return sym + Math.round(n).toLocaleString();
}

function pct(n: number) {
  return n.toFixed(1) + "%";
}

function calcUS(income: number, filing: FilingStatus, stateName: string) {
  const deduction = usStandardDeduction[filing];
  const taxable = Math.max(0, income - deduction);
  const brackets = usBrackets[filing];
  let tax = 0, prev = 0;
  for (const b of brackets) {
    if (taxable <= prev) break;
    tax += (Math.min(taxable, b.limit) - prev) * b.rate;
    prev = b.limit;
  }
  const stateTax = income * (usStates[stateName] ?? 0);
  const fica = Math.min(income, 168600) * 0.062 + income * 0.0145;
  return { federal: tax, state: stateTax, fica, total: tax + stateTax + fica };
}

export default function TaxCalculator() {
  const [country, setCountry] = useState<Country>("US");
  const [income, setIncome] = useState("75000");
  const [filing, setFiling] = useState<FilingStatus>("single");
  const [state, setState] = useState("No State Tax");
  const [calculated, setCalculated] = useState(false);

  const incomeNum = parseFloat(income.replace(/,/g, "")) || 0;
  const sym = currencies[country];

  const result = useMemo(() => {
    if (!calculated || incomeNum <= 0) return null;
    if (country === "US") {
      const r = calcUS(incomeNum, filing, state);
      return {
        rows: [
          { label: "Federal Income Tax", value: r.federal, color: "#9333ea" },
          { label: `${state} State Tax`, value: r.state, color: "#3b82f6" },
          { label: "FICA (SS + Medicare)", value: r.fica, color: "#f59e0b" },
        ],
        total: r.total,
        takeHome: incomeNum - r.total,
        effectiveRate: (r.total / incomeNum) * 100,
      };
    }
    if (country === "UK") {
      const r = calcUK(incomeNum);
      return {
        rows: [
          { label: "Income Tax", value: r.incomeTax, color: "#9333ea" },
          { label: "National Insurance", value: r.ni, color: "#3b82f6" },
        ],
        total: r.total,
        takeHome: incomeNum - r.total,
        effectiveRate: (r.total / incomeNum) * 100,
      };
    }
    if (country === "Canada") {
      const r = calcCanada(incomeNum);
      return {
        rows: [
          { label: "Federal Income Tax", value: r.incomeTax, color: "#9333ea" },
          { label: "CPP Contributions", value: r.cpp, color: "#3b82f6" },
          { label: "EI Premiums", value: r.ei, color: "#f59e0b" },
        ],
        total: r.total,
        takeHome: incomeNum - r.total,
        effectiveRate: (r.total / incomeNum) * 100,
      };
    }
    if (country === "Australia") {
      const r = calcAustralia(incomeNum);
      return {
        rows: [
          { label: "Income Tax", value: r.incomeTax, color: "#9333ea" },
          { label: "Medicare Levy", value: r.medicare, color: "#3b82f6" },
        ],
        total: r.total,
        takeHome: incomeNum - r.total,
        effectiveRate: (r.total / incomeNum) * 100,
      };
    }
    if (country === "Pakistan") {
      const r = calcPakistan(incomeNum);
      return {
        rows: [
          { label: "Income Tax (FBR)", value: r.incomeTax, color: "#9333ea" },
          { label: "EOBI Contribution", value: r.eobi, color: "#3b82f6" },
        ],
        total: r.total,
        takeHome: incomeNum - r.total,
        effectiveRate: (r.total / incomeNum) * 100,
      };
    }
    // India
    const r = calcIndia(incomeNum);
    return {
      rows: [
        { label: "Income Tax (New Regime)", value: r.incomeTax, color: "#9333ea" },
        { label: "Health & Education Cess (4%)", value: r.cess, color: "#f59e0b" },
        { label: "Employee PF (est.)", value: r.pf, color: "#3b82f6" },
      ],
      total: r.total,
      takeHome: incomeNum - r.total,
      effectiveRate: (r.total / incomeNum) * 100,
    };
  }, [calculated, incomeNum, country, filing, state]);

  function calculate() {
    if (incomeNum > 0) setCalculated(true);
  }

  function reset() {
    setCalculated(false);
    setIncome("75000");
    setFiling("single");
    setState("No State Tax");
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium text-purple-600 dark:text-purple-400 mb-4">
            <Sparkles className="w-4 h-4" /> Free Tax Tool — No Signup
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-3" style={{ color: "var(--text-primary)" }}>
            Income Tax Calculator 2026
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Estimate your income tax, deductions, and take-home pay — US, UK, Canada, Australia, Pakistan & India.
          </p>
          <div className="flex justify-center gap-6 mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
            {["6 countries", "Federal + State/Province", "Instant results"].map((s) => (
              <span key={s} className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block" />{s}
              </span>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-6 md:p-8 space-y-6">

          {/* Country selector */}
          <div>
            <label className="block text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Country</label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {([
                ["US", "🇺🇸 US"],
                ["UK", "🇬🇧 UK"],
                ["Canada", "🇨🇦 Canada"],
                ["Australia", "🇦🇺 Australia"],
                ["Pakistan", "🇵🇰 Pakistan"],
                ["India", "🇮🇳 India"],
              ] as [Country, string][]).map(([c, label]) => (
                <button key={c} onClick={() => { setCountry(c); setCalculated(false); }}
                  className="py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: country === c ? "linear-gradient(to right,#9333ea,#3b82f6)" : "var(--bg-card)",
                    color: country === c ? "white" : "var(--text-secondary)",
                    border: "1px solid var(--border-color)",
                  }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Income */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              Annual Gross Income ({sym})
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold pointer-events-none" style={{ color: "var(--text-muted)" }}>{sym}</span>
              <input
                type="number"
                value={income}
                onChange={(e) => { setIncome(e.target.value); setCalculated(false); }}
                placeholder="75000"
                className="w-full glass rounded-xl pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                style={{ color: "var(--text-primary)", paddingLeft: `${sym.length * 10 + 16}px` }}
              />
            </div>
          </div>

          {/* US-only: Filing status + State */}
          {country === "US" && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Filing Status</label>
                <div className="grid grid-cols-3 gap-2">
                  {([["single", "Single"], ["married", "Married (Joint)"], ["head", "Head of Household"]] as [FilingStatus, string][]).map(([val, label]) => (
                    <button key={val} onClick={() => { setFiling(val); setCalculated(false); }}
                      className="py-2 rounded-xl text-xs font-medium transition-all"
                      style={{
                        background: filing === val ? "linear-gradient(to right,#9333ea,#3b82f6)" : "var(--bg-card)",
                        color: filing === val ? "white" : "var(--text-secondary)",
                        border: "1px solid var(--border-color)",
                      }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>State</label>
                <select value={state} onChange={(e) => { setState(e.target.value); setCalculated(false); }}
                  className="w-full glass rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  style={{ color: "var(--text-primary)", background: "var(--bg-card)" }}>
                  {Object.keys(usStates).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          <button onClick={calculate} disabled={!income || incomeNum <= 0}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3"
            style={{ opacity: incomeNum <= 0 ? 0.6 : 1 }}>
            <Sparkles className="w-4 h-4" /> Calculate Tax
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="glass rounded-3xl p-6 md:p-8 mt-6 space-y-6">

            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: "Gross Income", value: fmt(incomeNum, sym), sub: "Before tax" },
                { label: "Total Tax", value: fmt(result.total, sym), sub: `Effective rate ${pct(result.effectiveRate)}` },
                { label: "Take-Home Pay", value: fmt(result.takeHome, sym), sub: `${pct((result.takeHome / incomeNum) * 100)} of income` },
              ].map((c) => (
                <div key={c.label} className="glass rounded-2xl p-4 text-center">
                  <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{c.label}</div>
                  <div className="text-xl font-black" style={{ color: "var(--text-primary)" }}>{c.value}</div>
                  <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{c.sub}</div>
                </div>
              ))}
            </div>

            {/* Breakdown */}
            <div>
              <h3 className="font-bold mb-4" style={{ color: "var(--text-primary)" }}>Tax Breakdown</h3>
              <div className="space-y-3">
                {result.rows.map((row) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span style={{ color: "var(--text-secondary)" }}>{row.label}</span>
                      <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                        {fmt(row.value, sym)} <span style={{ color: "var(--text-muted)" }}>({pct((row.value / incomeNum) * 100)})</span>
                      </span>
                    </div>
                    <div className="h-2 rounded-full" style={{ background: "var(--bg-card)" }}>
                      <div className="h-2 rounded-full transition-all duration-700"
                        style={{ width: `${Math.min((row.value / incomeNum) * 100, 100)}%`, background: row.color }} />
                    </div>
                  </div>
                ))}

                {/* Take-home bar */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span style={{ color: "var(--text-secondary)" }}>Take-Home Pay</span>
                    <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                      {fmt(result.takeHome, sym)} <span style={{ color: "var(--text-muted)" }}>({pct((result.takeHome / incomeNum) * 100)})</span>
                    </span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: "var(--bg-card)" }}>
                    <div className="h-2 rounded-full transition-all duration-700"
                      style={{ width: `${(result.takeHome / incomeNum) * 100}%`, background: "linear-gradient(to right,#22c55e,#16a34a)" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly / weekly breakdown */}
            <div>
              <h3 className="font-bold mb-3" style={{ color: "var(--text-primary)" }}>Pay Period Breakdown</h3>
              <div className="glass rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                      {["Period", "Gross", "Tax", "Take-Home"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "Annual", div: 1 },
                      { label: "Monthly", div: 12 },
                      { label: "Bi-weekly", div: 26 },
                      { label: "Weekly", div: 52 },
                    ].map(({ label, div }) => (
                      <tr key={label} style={{ borderBottom: "1px solid var(--border-color)" }}>
                        <td className="px-4 py-3 font-medium" style={{ color: "var(--text-primary)" }}>{label}</td>
                        <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{fmt(incomeNum / div, sym)}</td>
                        <td className="px-4 py-3 text-red-400">{fmt(result.total / div, sym)}</td>
                        <td className="px-4 py-3 text-green-400 font-semibold">{fmt(result.takeHome / div, sym)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="glass rounded-xl p-4 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
              <strong style={{ color: "var(--text-primary)" }}>Disclaimer:</strong> This calculator provides estimates based on {new Date().getFullYear()} tax rates and simplified rules. Actual tax liability may differ based on deductions, credits, and individual circumstances. Consult a tax professional for advice specific to your situation.
            </div>

            <button onClick={reset} className="btn-ghost flex items-center gap-2 text-sm w-full justify-center">
              <RefreshCw className="w-3.5 h-3.5" /> Reset Calculator
            </button>
          </div>
        )}
      </div>
      <RelatedTools currentTool="tax-calculator" />
    </div>
  );
}
