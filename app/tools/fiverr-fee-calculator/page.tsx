"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, TrendingDown, TrendingUp, Info } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

type Mode = "seller" | "buyer";
type Currency = "USD" | "GBP" | "EUR" | "PKR" | "INR";

const CURRENCIES: { code: Currency; symbol: string; rate: number }[] = [
  { code: "USD", symbol: "$", rate: 1 },
  { code: "GBP", symbol: "£", rate: 0.79 },
  { code: "EUR", symbol: "€", rate: 0.92 },
  { code: "PKR", symbol: "₨", rate: 278 },
  { code: "INR", symbol: "₹", rate: 83 },
];

const QUICK_REF_PRICES = [10, 25, 50, 100, 250, 500];

function calcBuyerFee(price: number): number {
  return Math.max(2, price * 0.055);
}

export default function FiverrFeeCalculator() {
  const [mode, setMode] = useState<Mode>("seller");
  const [gigPrice, setGigPrice] = useState(100);
  const [quantity, setQuantity] = useState(1);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [gigsPerMonth, setGigsPerMonth] = useState(10);

  const currencyInfo = CURRENCIES.find((c) => c.code === currency)!;
  const sym = currencyInfo.symbol;
  const r = currencyInfo.rate;

  const fmt = (usd: number, decimals = 2) =>
    (usd * r).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  const fmtInt = (usd: number) =>
    (usd * r).toLocaleString(undefined, { maximumFractionDigits: 0 });

  const result = useMemo(() => {
    const totalGig = gigPrice * quantity;

    // Seller
    const fiverrCutSeller = totalGig * 0.2;
    const sellerReceives = totalGig * 0.8;
    const chargeToEarn = gigPrice / 0.8; // reverse: what to charge to receive gigPrice

    // Monthly projections
    const monthlyGross = gigPrice * gigsPerMonth;
    const monthlyNet = monthlyGross * 0.8;

    // Buyer
    const serviceFee = calcBuyerFee(totalGig);
    const buyerTotal = totalGig + serviceFee;

    return {
      totalGig,
      fiverrCutSeller,
      sellerReceives,
      chargeToEarn,
      monthlyGross,
      monthlyNet,
      serviceFee,
      buyerTotal,
    };
  }, [gigPrice, quantity, gigsPerMonth]);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:opacity-80"
          style={{ color: "var(--text-muted)" }}
        >
          <ArrowLeft className="w-4 h-4" /> All Tools
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-5xl mb-4 block">🟢</span>
          <h1 className="text-3xl md:text-4xl font-black mb-3" style={{ color: "var(--text-primary)" }}>
            Fiverr Fee Calculator 2026
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Instantly calculate how much Fiverr takes — and what you actually receive
          </p>
        </div>

        {/* Mode toggle */}
        <div className="flex gap-2 mb-6 glass rounded-2xl p-2">
          <button
            onClick={() => setMode("seller")}
            className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all"
            style={{
              background: mode === "seller" ? "linear-gradient(135deg,#7C3AED,#2563EB)" : "transparent",
              color: mode === "seller" ? "#fff" : "var(--text-secondary)",
            }}
          >
            🧑‍💻 I&apos;m a Seller
          </button>
          <button
            onClick={() => setMode("buyer")}
            className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all"
            style={{
              background: mode === "buyer" ? "linear-gradient(135deg,#2563EB,#0EA5E9)" : "transparent",
              color: mode === "buyer" ? "#fff" : "var(--text-secondary)",
            }}
          >
            🛒 I&apos;m a Buyer
          </button>
        </div>

        {/* Inputs */}
        <div className="glass rounded-3xl p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Gig price */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
                Gig Price
              </label>
              <div className="flex items-center gap-2">
                <div
                  className="rounded-xl px-3 py-3 flex items-center gap-2 flex-1"
                  style={{ background: "var(--bg-card)", border: "1.5px solid var(--border-color)" }}
                >
                  <span className="font-semibold" style={{ color: "var(--text-muted)" }}>{sym}</span>
                  <input
                    type="number"
                    min={1}
                    value={gigPrice}
                    onChange={(e) => setGigPrice(Math.max(1, Number(e.target.value)))}
                    className="flex-1 outline-none bg-transparent text-base font-bold"
                    style={{ color: "var(--text-primary)" }}
                  />
                </div>
                {/* Currency selector */}
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="rounded-xl px-3 py-3 text-sm font-semibold outline-none cursor-pointer"
                  style={{
                    background: "var(--bg-card)",
                    border: "1.5px solid var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.code}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
                Quantity
              </label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-full rounded-xl px-4 py-3 text-base font-bold outline-none"
                style={{
                  background: "var(--bg-card)",
                  border: "1.5px solid var(--border-color)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {mode === "seller" ? (
          <div
            className="glass rounded-3xl p-6 mb-6"
            style={{ borderColor: "rgba(34,197,94,0.3)", borderWidth: "1.5px" }}
          >
            <h2 className="font-bold text-sm uppercase tracking-wide mb-5 flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
              <TrendingDown className="w-4 h-4" style={{ color: "#22C55E" }} />
              Seller Breakdown
            </h2>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between py-2" style={{ borderBottom: "1px solid var(--border-color)" }}>
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Gig price ({quantity}x)</span>
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{sym}{fmt(result.totalGig)}</span>
              </div>
              <div className="flex justify-between py-2" style={{ borderBottom: "1px solid var(--border-color)" }}>
                <span className="text-sm font-semibold" style={{ color: "#EF4444" }}>Fiverr takes (20%)</span>
                <span className="font-semibold" style={{ color: "#EF4444" }}>-{sym}{fmt(result.fiverrCutSeller)}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="font-bold" style={{ color: "var(--text-primary)" }}>You receive (80%)</span>
                <span className="text-3xl font-black gradient-text">{sym}{fmt(result.sellerReceives)}</span>
              </div>
            </div>

            {/* Reverse calc */}
            <div
              className="rounded-2xl px-4 py-3 mb-5 flex items-center gap-3"
              style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}
            >
              <span className="text-lg">💡</span>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Want to earn{" "}
                <strong style={{ color: "var(--text-primary)" }}>{sym}{fmt(gigPrice * quantity)}</strong>?
                {" "}Charge{" "}
                <strong style={{ color: "#22C55E" }}>{sym}{fmt(result.chargeToEarn * quantity)}</strong>{" "}
                to account for the 20% fee.
              </p>
            </div>

            {/* Monthly projection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Monthly projection</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={gigsPerMonth}
                    onChange={(e) => setGigsPerMonth(Math.max(1, Number(e.target.value)))}
                    className="w-16 rounded-lg px-2 py-1 text-sm font-bold text-center outline-none"
                    style={{ background: "var(--bg-card)", border: "1.5px solid var(--border-color)", color: "var(--text-primary)" }}
                  />
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>gigs/mo</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="glass rounded-xl p-3 text-center">
                  <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Monthly Gross</div>
                  <div className="font-bold" style={{ color: "var(--text-primary)" }}>{sym}{fmtInt(result.monthlyGross)}</div>
                </div>
                <div className="glass rounded-xl p-3 text-center">
                  <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Monthly Net</div>
                  <div className="font-bold" style={{ color: "#22C55E" }}>{sym}{fmtInt(result.monthlyNet)}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="glass rounded-3xl p-6 mb-6"
            style={{ borderColor: "rgba(59,130,246,0.3)", borderWidth: "1.5px" }}
          >
            <h2 className="font-bold text-sm uppercase tracking-wide mb-5 flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
              <TrendingUp className="w-4 h-4" style={{ color: "#3B82F6" }} />
              Buyer Breakdown
            </h2>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between py-2" style={{ borderBottom: "1px solid var(--border-color)" }}>
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Gig price ({quantity}x)</span>
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{sym}{fmt(result.totalGig)}</span>
              </div>
              <div className="flex justify-between py-2" style={{ borderBottom: "1px solid var(--border-color)" }}>
                <span className="text-sm font-semibold" style={{ color: "#F97316" }}>
                  Service fee (5.5%, min {sym}{fmt(2)})
                </span>
                <span className="font-semibold" style={{ color: "#F97316" }}>+{sym}{fmt(result.serviceFee)}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="font-bold" style={{ color: "var(--text-primary)" }}>Total you pay</span>
                <span className="text-3xl font-black gradient-text">{sym}{fmt(result.buyerTotal)}</span>
              </div>
            </div>

            {/* Note */}
            <div
              className="rounded-2xl px-4 py-3 flex items-start gap-3"
              style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}
            >
              <Info className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#3B82F6" }} />
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                For orders under <strong style={{ color: "var(--text-primary)" }}>{sym}{fmt(40 * r > 1 ? 40 : 40)}</strong>,
                {" "}the minimum service fee is <strong style={{ color: "var(--text-primary)" }}>{sym}{fmt(2)}</strong>.
                {" "}Fiverr&apos;s service fee is capped and calculated on the total order value.
              </p>
            </div>
          </div>
        )}

        {/* Quick reference table */}
        <div className="glass rounded-3xl p-6 mb-6">
          <h2 className="font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            Fiverr Fee Quick Reference Table
          </h2>
          <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>
            Common price points — seller net and buyer total at a glance
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <th className="text-left py-2 pr-3 font-semibold" style={{ color: "var(--text-muted)" }}>Gig Price</th>
                  <th className="text-right py-2 pr-3 font-semibold" style={{ color: "#EF4444" }}>Fiverr Takes</th>
                  <th className="text-right py-2 pr-3 font-semibold" style={{ color: "#22C55E" }}>Seller Gets</th>
                  <th className="text-right py-2 font-semibold" style={{ color: "#3B82F6" }}>Buyer Pays</th>
                </tr>
              </thead>
              <tbody>
                {QUICK_REF_PRICES.map((price) => {
                  const fiverrCut = price * 0.2;
                  const sellerGet = price * 0.8;
                  const fee = calcBuyerFee(price);
                  const buyerPays = price + fee;
                  const isActive = gigPrice === price;
                  return (
                    <tr
                      key={price}
                      className="cursor-pointer transition-all"
                      onClick={() => setGigPrice(price)}
                      style={{
                        borderBottom: "1px solid var(--border-color)",
                        background: isActive ? "rgba(124,58,237,0.06)" : "transparent",
                      }}
                    >
                      <td className="py-3 pr-3 font-bold" style={{ color: isActive ? "#7C3AED" : "var(--text-primary)" }}>
                        {sym}{(price * r).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        {isActive && (
                          <span className="ml-2 text-[10px] font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-white px-1.5 py-0.5 rounded-full">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="py-3 pr-3 text-right" style={{ color: "#EF4444" }}>
                        {sym}{(fiverrCut * r).toFixed(2)}
                      </td>
                      <td className="py-3 pr-3 text-right font-semibold" style={{ color: "#22C55E" }}>
                        {sym}{(sellerGet * r).toFixed(2)}
                      </td>
                      <td className="py-3 text-right font-semibold" style={{ color: "#3B82F6" }}>
                        {sym}{(buyerPays * r).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs mt-3" style={{ color: "var(--text-muted)" }}>
            Click any row to set that price in the calculator above.
          </p>
        </div>

        {/* SEO content */}
        <div className="glass rounded-2xl p-5">
          <h2 className="font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            How Fiverr Fees Work in 2026
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Fiverr charges sellers a flat <strong style={{ color: "var(--text-primary)" }}>20% commission</strong> on every order — meaning for every $100 gig, you receive $80. Buyers pay an additional <strong style={{ color: "var(--text-primary)" }}>5.5% service fee</strong> on top of the listed gig price, with a minimum of $2 per order, making a $100 gig cost the buyer $105.50. Understanding Fiverr&apos;s fee structure in 2026 is essential whether you&apos;re a freelancer pricing your services or a client budgeting for a project — use this Fiverr fee calculator to instantly see the exact breakdown before you buy or list.
          </p>
        </div>
      </div>
      <RelatedTools currentTool="fiverr-fee-calculator" />
    </div>
  );
}
