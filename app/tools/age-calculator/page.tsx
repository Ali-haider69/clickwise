"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Star, Gift, Cake } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

const today = () => new Date().toISOString().split("T")[0];

function getZodiac(month: number, day: number): string {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "♈ Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "♉ Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "♊ Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "♋ Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "♌ Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "♍ Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "♎ Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "♏ Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "♐ Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "♑ Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "♒ Aquarius";
  return "♓ Pisces";
}

const BIRTHSTONES: Record<number, string> = {
  1: "Garnet", 2: "Amethyst", 3: "Aquamarine", 4: "Diamond",
  5: "Emerald", 6: "Pearl", 7: "Ruby", 8: "Peridot",
  9: "Sapphire", 10: "Opal", 11: "Topaz", 12: "Turquoise",
};

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const MONTH_NAMES = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  nextBirthday: { days: number; date: string };
  dayOfWeek: string;
  zodiac: string;
  birthstone: string;
}

function calcAge(birthStr: string, targetStr: string): AgeResult {
  const birth = new Date(birthStr);
  const target = new Date(targetStr);

  let years = target.getFullYear() - birth.getFullYear();
  let months = target.getMonth() - birth.getMonth();
  let days = target.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.floor((target.getTime() - birth.getTime()) / msPerDay);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;

  // Next birthday from target date
  const bMonth = birth.getMonth();
  const bDay = birth.getDate();
  let nextBDay = new Date(target.getFullYear(), bMonth, bDay);
  if (nextBDay <= target) {
    nextBDay = new Date(target.getFullYear() + 1, bMonth, bDay);
  }
  const daysUntilBirthday = Math.ceil((nextBDay.getTime() - target.getTime()) / msPerDay);
  const nextBirthDate = `${MONTH_NAMES[bMonth + 1]} ${bDay}`;

  const dayOfWeek = DAYS[birth.getDay()];
  const zodiac = getZodiac(birth.getMonth() + 1, birth.getDate());
  const birthstone = BIRTHSTONES[birth.getMonth() + 1];

  return {
    years, months, days,
    totalDays, totalWeeks, totalMonths,
    nextBirthday: { days: daysUntilBirthday, date: nextBirthDate },
    dayOfWeek, zodiac, birthstone,
  };
}

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [useCustomTarget, setUseCustomTarget] = useState(false);
  const [targetDate, setTargetDate] = useState(today());
  const [result, setResult] = useState<AgeResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    setError("");
    if (!birthDate) { setError("Please enter your date of birth."); return; }
    const t = useCustomTarget ? targetDate : today();
    if (!t) { setError("Please enter a target date."); return; }
    if (new Date(birthDate) > new Date(t)) {
      setError("Date of birth cannot be after the target date."); return;
    }
    setResult(calcAge(birthDate, t));
  }

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
          <span className="text-5xl mb-4 block">🎂</span>
          <h1 className="text-3xl md:text-4xl font-black mb-3" style={{ color: "var(--text-primary)" }}>
            Age Calculator
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Find your exact age in years, months, days — plus fun facts about your birthday
          </p>
        </div>

        {/* Inputs */}
        <div className="glass rounded-3xl p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Date of birth */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
                Date of Birth
              </label>
              <input
                type="date"
                value={birthDate}
                max={today()}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all"
                style={{
                  background: "var(--bg-card)",
                  border: "1.5px solid var(--border-color)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            {/* Target date */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
                  Calculate Age As Of
                </label>
                <button
                  onClick={() => { setUseCustomTarget(!useCustomTarget); if (useCustomTarget) setTargetDate(today()); }}
                  className="text-xs font-semibold px-2 py-1 rounded-lg transition-all"
                  style={{
                    background: useCustomTarget ? "linear-gradient(135deg,#7C3AED,#2563EB)" : "var(--border-color)",
                    color: useCustomTarget ? "#fff" : "var(--text-muted)",
                  }}
                >
                  {useCustomTarget ? "Custom" : "Today"}
                </button>
              </div>
              <input
                type="date"
                value={useCustomTarget ? targetDate : today()}
                disabled={!useCustomTarget}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all"
                style={{
                  background: "var(--bg-card)",
                  border: "1.5px solid var(--border-color)",
                  color: useCustomTarget ? "var(--text-primary)" : "var(--text-muted)",
                  opacity: useCustomTarget ? 1 : 0.6,
                }}
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm font-medium" style={{ color: "#EF4444" }}>{error}</p>
          )}

          <button
            onClick={handleCalculate}
            className="btn-primary mt-6 w-full text-base"
          >
            <Cake className="w-4 h-4 mr-2" /> Calculate My Age
          </button>
        </div>

        {/* Results */}
        {result && (
          <>
            {/* Age breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              {[
                { label: "Years", value: result.years.toLocaleString(), icon: "🎉" },
                { label: "Months", value: result.months.toLocaleString(), icon: "📅" },
                { label: "Days", value: result.days.toLocaleString(), icon: "⏰" },
              ].map(({ label, value, icon }) => (
                <div key={label} className="glass rounded-2xl p-5 text-center">
                  <div className="text-2xl mb-1">{icon}</div>
                  <div className="text-3xl font-black gradient-text">{value}</div>
                  <div className="text-xs font-semibold mt-1" style={{ color: "var(--text-muted)" }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Total stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {[
                { label: "Total Days Lived", value: result.totalDays.toLocaleString(), icon: <Calendar className="w-5 h-5" /> },
                { label: "Total Weeks Lived", value: result.totalWeeks.toLocaleString(), icon: <Calendar className="w-5 h-5" /> },
                { label: "Total Months Lived", value: result.totalMonths.toLocaleString(), icon: <Calendar className="w-5 h-5" /> },
              ].map(({ label, value, icon }) => (
                <div key={label} className="glass rounded-2xl p-5 flex items-center gap-4">
                  <div style={{ color: "var(--text-muted)" }}>{icon}</div>
                  <div>
                    <div className="text-xl font-black" style={{ color: "var(--text-primary)" }}>{value}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Next birthday */}
            <div className="glass gradient-border rounded-2xl p-5 mb-4 flex items-center gap-4">
              <div className="text-3xl">🎁</div>
              <div>
                <div className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-muted)" }}>Next Birthday</div>
                <div className="text-xl font-black" style={{ color: "var(--text-primary)" }}>
                  in{" "}
                  <span className="gradient-text">{result.nextBirthday.days} days</span>
                  <span className="font-medium text-base ml-2" style={{ color: "var(--text-secondary)" }}>
                    ({result.nextBirthday.date})
                  </span>
                </div>
              </div>
            </div>

            {/* Fun facts */}
            <div className="glass rounded-3xl p-6">
              <h2 className="font-bold text-lg mb-5 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <Star className="w-5 h-5" style={{ color: "#7C3AED" }} />
                Fun Birthday Facts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-2">📆</div>
                  <div className="text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Born On</div>
                  <div className="font-bold" style={{ color: "var(--text-primary)" }}>{result.dayOfWeek}</div>
                </div>
                <div className="glass rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-2">✨</div>
                  <div className="text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Zodiac Sign</div>
                  <div className="font-bold" style={{ color: "var(--text-primary)" }}>{result.zodiac}</div>
                </div>
                <div className="glass rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-2">💎</div>
                  <div className="text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Birthstone</div>
                  <div className="font-bold" style={{ color: "var(--text-primary)" }}>{result.birthstone}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <RelatedTools currentTool="age-calculator" />
    </div>
  );
}
