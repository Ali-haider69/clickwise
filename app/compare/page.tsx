"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, type Product } from "@/data/products";
import { CheckCircle, XCircle, Star, ExternalLink, ArrowLeftRight, Award, Zap, Battery, Camera, Cpu } from "lucide-react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`w-4 h-4 ${s <= Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"}`} />
      ))}
      <span className="text-sm ml-1" style={{ color: "var(--text-muted)" }}>{rating}</span>
    </div>
  );
}

function ScoreBar({ score, label }: { score: number; label: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span style={{ color: "var(--text-muted)" }}>{label}</span>
        <span className="font-bold" style={{ color: "var(--text-primary)" }}>{score}/100</span>
      </div>
      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--border-color)" }}>
        <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-700" style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

function ProductColumn({ product, isWinner }: { product: Product; isWinner: boolean }) {
  return (
    <div className={`glass rounded-2xl p-6 text-center relative flex flex-col ${isWinner ? "gradient-border" : ""}`}>
      {isWinner && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
          Winner
        </div>
      )}
      <div className="relative w-28 h-28 mx-auto mb-4 rounded-2xl overflow-hidden">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
      </div>
      {product.badge && (
        <span className="text-xs font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full mb-2 inline-block">{product.badge}</span>
      )}
      <h3 className="font-bold mb-2 leading-snug" style={{ color: "var(--text-primary)" }}>{product.name}</h3>
      <StarRating rating={product.rating} />
      <div className="text-xs mt-1 mb-3" style={{ color: "var(--text-muted)" }}>({product.reviews.toLocaleString()} reviews)</div>
      <div className="text-3xl font-black gradient-text mb-1">{product.price}</div>
      {product.originalPrice && (
        <div className="text-sm line-through mb-3" style={{ color: "var(--text-muted)" }}>{product.originalPrice}</div>
      )}
      <ScoreBar score={product.score} label="ClickWise Score" />
      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary mt-4 w-full flex items-center justify-center gap-2 text-sm"
      >
        Check Price <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

export default function ComparePage() {
  const iphone17 = products.find((p) => p.id === "iphone-17-pro-max")!;
  const iphone16 = products.find((p) => p.id === "iphone-16-pro-max")!;
  const macbookAir = products.find((p) => p.id === "macbook-air-m4")!;

  const [leftId, setLeftId] = useState(iphone17.id);
  const [rightId, setRightId] = useState(iphone16.id);
  const left = products.find((p) => p.id === leftId)!;
  const right = products.find((p) => p.id === rightId)!;
  const winner = left.score >= right.score ? left : right;
  const allSpecs = Array.from(new Set([...Object.keys(left.specs || {}), ...Object.keys(right.specs || {})]));

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="gradient-text">Compare</span>
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>Side-by-side specs, scores, and honest verdicts</p>
        </div>

        {/* ── FEATURED: iPhone 17 Pro Max vs iPhone 16 Pro Max ── */}
        <div className="glass rounded-3xl overflow-hidden mb-16">
          {/* Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-white" />
              <span className="text-white font-bold">Featured Comparison</span>
            </div>
            <span className="text-white/80 text-sm">Updated March 2026</span>
          </div>

          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-black text-center mb-2" style={{ color: "var(--text-primary)" }}>
              iPhone 17 Pro Max vs iPhone 16 Pro Max
            </h2>
            <p className="text-center text-sm mb-8" style={{ color: "var(--text-muted)" }}>
              Is a $200 premium worth it? We ran both phones for 8 weeks to find out.
            </p>

            {/* Product cards */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
              <ProductColumn product={iphone17} isWinner={true} />
              <ProductColumn product={iphone16} isWinner={false} />
            </div>

            {/* Key differences */}
            <h3 className="font-bold text-lg mb-4" style={{ color: "var(--text-primary)" }}>Key Differences at a Glance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {[
                { icon: <Camera className="w-4 h-4 text-purple-400" />, label: "Ultrawide Camera", left: "48 MP", right: "12 MP", winner: "17 Pro Max" },
                { icon: <Zap className="w-4 h-4 text-yellow-400" />, label: "Peak Brightness", left: "3,000 nits", right: "2,000 nits", winner: "17 Pro Max" },
                { icon: <Cpu className="w-4 h-4 text-blue-400" />, label: "Chip / RAM", left: "A19 Pro · 12 GB", right: "A18 Pro · 8 GB", winner: "17 Pro Max" },
                { icon: <Battery className="w-4 h-4 text-green-400" />, label: "Battery Life", left: "~30 hrs", right: "~33 hrs", winner: "16 Pro Max" },
              ].map(({ icon, label, left: lv, right: rv, winner: w }) => (
                <div key={label} className="glass rounded-xl p-4 flex items-start gap-3">
                  <div className="mt-0.5">{icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>{label}</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className={`rounded-lg px-2 py-1.5 text-center font-medium ${w === "17 Pro Max" ? "bg-purple-500/20 text-purple-400" : ""}`} style={w !== "17 Pro Max" ? { color: "var(--text-secondary)" } : {}}>
                        {lv}
                        {w === "17 Pro Max" && <div className="text-[10px] mt-0.5 text-purple-400 font-bold">Better</div>}
                      </div>
                      <div className={`rounded-lg px-2 py-1.5 text-center font-medium ${w === "16 Pro Max" ? "bg-green-500/20 text-green-400" : ""}`} style={w !== "16 Pro Max" ? { color: "var(--text-secondary)" } : {}}>
                        {rv}
                        {w === "16 Pro Max" && <div className="text-[10px] mt-0.5 text-green-400 font-bold">Better</div>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Full spec table */}
            <h3 className="font-bold text-lg mb-4" style={{ color: "var(--text-primary)" }}>Full Spec Comparison</h3>
            <div className="glass rounded-2xl overflow-hidden mb-8">
              <div className="grid grid-cols-3 text-sm">
                <div className="p-3 font-semibold uppercase text-xs tracking-wide" style={{ color: "var(--text-muted)" }}>Spec</div>
                <div className="p-3 font-semibold text-center text-xs" style={{ borderLeft: "1px solid var(--border-color)", color: "var(--text-primary)" }}>iPhone 17 Pro Max</div>
                <div className="p-3 font-semibold text-center text-xs" style={{ borderLeft: "1px solid var(--border-color)", color: "var(--text-primary)" }}>iPhone 16 Pro Max</div>

                {[
                  ["Chip", "Apple A19 Pro", "Apple A18 Pro"],
                  ["RAM", "12 GB", "8 GB"],
                  ["Display", "6.9\" OLED · 3,000 nits", "6.9\" OLED · 2,000 nits"],
                  ["Main Camera", "48 MP · f/1.78", "48 MP · f/1.78"],
                  ["Ultrawide", "48 MP · f/2.2", "12 MP · f/2.2"],
                  ["Telephoto", "48 MP · 5x periscope", "12 MP · 5x periscope"],
                  ["Log Video", "Internal storage", "Needs external SSD"],
                  ["Battery", "~30 hrs playback", "~33 hrs playback"],
                  ["MagSafe", "25 W", "15 W"],
                  ["Frame", "Titanium", "Titanium"],
                  ["Storage", "256 / 512 GB / 1 TB", "256 / 512 GB / 1 TB"],
                  ["Price", "$1,199", "$999"],
                ].map(([spec, lv, rv], i) => (
                  <React.Fragment key={spec}>
                    <div className="p-3 text-sm" style={{ color: "var(--text-secondary)", background: i % 2 === 0 ? "transparent" : "rgba(99,102,241,0.04)" }}>{spec}</div>
                    <div className="p-3 text-center text-sm font-medium" style={{ borderLeft: "1px solid var(--border-color)", color: "var(--text-primary)", background: i % 2 === 0 ? "transparent" : "rgba(99,102,241,0.04)" }}>{lv}</div>
                    <div className="p-3 text-center text-sm font-medium" style={{ borderLeft: "1px solid var(--border-color)", color: "var(--text-primary)", background: i % 2 === 0 ? "transparent" : "rgba(99,102,241,0.04)" }}>{rv}</div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Pros & Cons */}
            <h3 className="font-bold text-lg mb-4" style={{ color: "var(--text-primary)" }}>Pros & Cons</h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[iphone17, iphone16].map((phone) => (
                <div key={phone.id} className="glass rounded-2xl p-5">
                  <div className="font-bold text-sm mb-3" style={{ color: "var(--text-primary)" }}>{phone.name}</div>
                  <div className="space-y-2">
                    {phone.pros.map((pro) => (
                      <div key={pro} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span style={{ color: "var(--text-secondary)" }}>{pro}</span>
                      </div>
                    ))}
                    {phone.cons.map((con) => (
                      <div key={con} className="flex items-start gap-2 text-sm">
                        <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span style={{ color: "var(--text-muted)" }}>{con}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Verdict */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="glass rounded-2xl p-5 border-l-4 border-purple-500">
                <div className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>Buy iPhone 17 Pro Max if...</div>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>You shoot a lot of video or photography, want Log recording without an external drive, or plan to keep this phone 3+ years. The 48 MP ultrawide is a generational leap.</p>
              </div>
              <div className="glass rounded-2xl p-5 border-l-4 border-green-500">
                <div className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>Buy iPhone 16 Pro Max if...</div>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>You want to save $200, already own a 16 Pro Max, or are upgrading from a 15 Pro. At $999 it is still the second-best phone in the world.</p>
              </div>
            </div>

            {/* CTA row */}
            <div className="grid grid-cols-2 gap-4">
              <a href="https://www.apple.com/iphone/" target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center justify-center gap-2 text-sm">
                iPhone 17 Pro Max on Apple.com <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a href="https://www.apple.com/shop/buy-iphone" target="_blank" rel="noopener noreferrer" className="btn-ghost flex items-center justify-center gap-2 text-sm">
                iPhone 16 Pro Max on Apple.com <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="text-center mt-4">
              <Link href="/blog/iphone-17-pro-max-vs-16-pro-max" className="text-sm text-purple-600 dark:text-purple-400 underline underline-offset-2 hover:no-underline">
                Read our full written comparison article
              </Link>
            </div>
          </div>
        </div>

        {/* ── FEATURED: MacBook Air M4 Review ── */}
        <div className="glass rounded-3xl overflow-hidden mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-white" />
              <span className="text-white font-bold">Featured Review</span>
            </div>
            <span className="text-white/80 text-sm">Score: 97 / 100</span>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left — image + score */}
              <div>
                <div className="relative w-full rounded-2xl overflow-hidden mb-4" style={{ height: "240px" }}>
                  <Image src={macbookAir.image} alt="MacBook Air M4" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span className="text-white text-sm font-medium">MacBook Air M4 — available in 4 colours</span>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["$1,099", "Starting price"],
                    ["17 hrs", "Real battery life"],
                    ["2.7 lbs", "Weight"],
                    ["97/100", "ClickWise score"],
                  ].map(([val, label]) => (
                    <div key={label} className="glass rounded-xl p-3 text-center">
                      <div className="text-xl font-black gradient-text">{val}</div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — details */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-1 rounded-full">Best Laptop 2026</span>
                </div>
                <h2 className="text-2xl font-black mb-2" style={{ color: "var(--text-primary)" }}>MacBook Air M4</h2>
                <StarRating rating={macbookAir.rating} />
                <p className="text-sm mt-3 mb-5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  After 4 months of daily use, the MacBook Air M4 is the best laptop for most people in 2026. Completely silent, 17+ hour battery, and M4 performance that beats Windows laptops costing $400 more.
                </p>

                {/* Spec table */}
                <div className="space-y-2 mb-5">
                  {[
                    ["Chip", "Apple M4 — 10-core CPU"],
                    ["GPU", "10-core integrated (fanless)"],
                    ["RAM", "16 GB unified memory (base)"],
                    ["Storage", "256 GB SSD — configure to 512 GB"],
                    ["Display", "13.6\" Liquid Retina · P3 · 500 nits"],
                    ["Battery", "Up to 18 hrs (17 hrs real-world)"],
                    ["Weight", "2.7 lbs — charger optional for day trips"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm py-1.5" style={{ borderBottom: "1px solid var(--border-color)" }}>
                      <span className="font-medium" style={{ color: "var(--text-muted)" }}>{k}</span>
                      <span className="text-right" style={{ color: "var(--text-primary)" }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Pros & cons */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div>
                    <div className="text-xs font-semibold text-green-500 mb-2">What we loved</div>
                    {macbookAir.pros.map((p) => (
                      <div key={p} className="flex items-start gap-1.5 text-xs mb-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span style={{ color: "var(--text-secondary)" }}>{p}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-red-400 mb-2">Trade-offs</div>
                    {macbookAir.cons.map((c) => (
                      <div key={c} className="flex items-start gap-1.5 text-xs mb-1.5">
                        <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                        <span style={{ color: "var(--text-muted)" }}>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance benchmark callout */}
                <div className="glass rounded-xl p-4 mb-5">
                  <div className="text-xs font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Benchmark vs Intel Ultrabook</div>
                  {[
                    { label: "Cinebench Multi-core", m4: 92, intel: 50 },
                    { label: "4K Export Speed", m4: 88, intel: 35 },
                    { label: "Battery Life", m4: 97, intel: 40 },
                  ].map(({ label, m4, intel }) => (
                    <div key={label} className="mb-3">
                      <div className="flex justify-between text-xs mb-1" style={{ color: "var(--text-muted)" }}>
                        <span>{label}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="w-16 text-right font-medium" style={{ color: "var(--text-muted)" }}>M4 Air</span>
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--border-color)" }}>
                          <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" style={{ width: `${m4}%` }} />
                        </div>
                        <span className="w-8 font-bold gradient-text">{m4}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs mt-1">
                        <span className="w-16 text-right font-medium" style={{ color: "var(--text-muted)" }}>Intel i7</span>
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--border-color)" }}>
                          <div className="h-full rounded-full" style={{ width: `${intel}%`, background: "var(--border-color)", filter: "brightness(1.8)" }} />
                        </div>
                        <span className="w-8" style={{ color: "var(--text-muted)" }}>{intel}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <a href="https://www.apple.com/macbook-air/" target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center justify-center gap-2 text-sm">
                    View on Apple.com <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <Link href="/blog/apple-macbook-air-m4-full-review" className="btn-ghost flex items-center justify-center gap-2 text-sm">
                    Full Review
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── GENERIC COMPARATOR ── */}
        <div className="glass rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Compare Any Two Products</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {[{ value: leftId, set: setLeftId, label: "Product A" }, { value: rightId, set: setRightId, label: "Product B" }].map(({ value, set, label }) => (
              <div key={label}>
                <label className="text-xs uppercase tracking-wide mb-2 block font-semibold" style={{ color: "var(--text-muted)" }}>{label}</label>
                <select
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  className="w-full glass rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer text-sm"
                  style={{ color: "var(--text-primary)", background: "var(--bg-card)" }}
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id} style={{ background: "var(--bg-card)" }}>{p.name}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="flex justify-center mb-6">
            <button onClick={() => { setLeftId(rightId); setRightId(leftId); }} className="btn-ghost flex items-center gap-2 text-sm">
              <ArrowLeftRight className="w-4 h-4" /> Swap
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <ProductColumn product={left} isWinner={left.score >= right.score} />
            <ProductColumn product={right} isWinner={right.score > left.score} />
          </div>

          {allSpecs.length > 0 && (
            <div className="glass rounded-2xl overflow-hidden mb-6">
              <div className="grid grid-cols-3 text-sm">
                <div className="p-3 font-semibold uppercase text-xs tracking-wide" style={{ color: "var(--text-muted)" }}>Spec</div>
                <div className="p-3 font-semibold text-center text-xs truncate" style={{ borderLeft: "1px solid var(--border-color)", color: "var(--text-primary)" }}>{left.name}</div>
                <div className="p-3 font-semibold text-center text-xs truncate" style={{ borderLeft: "1px solid var(--border-color)", color: "var(--text-primary)" }}>{right.name}</div>
                {allSpecs.map((spec, i) => (
                  <>
                    <div key={`s-${spec}`} className="p-3 text-sm" style={{ color: "var(--text-secondary)", background: i % 2 === 0 ? "transparent" : "rgba(99,102,241,0.04)" }}>{spec}</div>
                    <div key={`l-${spec}`} className="p-3 text-center text-sm font-medium" style={{ borderLeft: "1px solid var(--border-color)", color: "var(--text-primary)", background: i % 2 === 0 ? "transparent" : "rgba(99,102,241,0.04)" }}>{left.specs?.[spec] || "—"}</div>
                    <div key={`r-${spec}`} className="p-3 text-center text-sm font-medium" style={{ borderLeft: "1px solid var(--border-color)", color: "var(--text-primary)", background: i % 2 === 0 ? "transparent" : "rgba(99,102,241,0.04)" }}>{right.specs?.[spec] || "—"}</div>
                  </>
                ))}
              </div>
            </div>
          )}

          <div className="glass rounded-2xl p-6 text-center gradient-border">
            <h3 className="font-bold mb-1" style={{ color: "var(--text-primary)" }}>Our Verdict</h3>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
              Based on score and features — <span className="text-purple-600 dark:text-purple-400 font-semibold">{winner.name}</span> wins this comparison.
            </p>
            <a href={winner.affiliateUrl} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 text-sm">
              Get {winner.name} — {winner.price} <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
