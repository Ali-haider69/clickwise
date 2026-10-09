export interface VideoEntry {
  id: string;        // YouTube video ID
  title: string;
  channel: string;
  category: "Tools" | "Tutorials" | "News" | "Reviews";
  thumbnail?: string; // custom thumbnail URL; falls back to ytimg CDN
}

// Manually curated. Update these IDs to keep the Watch & Learn carousel fresh.
// Verify each ID at: https://www.youtube.com/watch?v=<id>
export const videos: VideoEntry[] = [
  {
    id: "JTxsNm9IdYU",
    title: "Introducing ChatGPT",
    channel: "OpenAI",
    category: "News",
  },
  {
    id: "e0aqqFHsNP0",
    title: "Claude AI: Full Demo",
    channel: "Anthropic",
    category: "Tools",
  },
  {
    id: "pLCQDFWplGs",
    title: "How to Use Midjourney v6",
    channel: "AI Advantage",
    category: "Tutorials",
  },
  {
    id: "gqUQbjsYZLQ",
    title: "Cursor AI: The Best AI Code Editor",
    channel: "Fireship",
    category: "Tools",
  },
  {
    id: "UIZAiXYceBI",
    title: "Google Gemini: Everything You Need to Know",
    channel: "Google",
    category: "News",
  },
  {
    id: "Sqa8Zo2XWc4",
    title: "GitHub Copilot — Full Review 2025",
    channel: "Fireship",
    category: "Reviews",
  },
  {
    id: "8ext9G7xZCA",
    title: "Perplexity AI vs ChatGPT — Which is Better?",
    channel: "The AI Advantage",
    category: "Reviews",
  },
  {
    id: "oc6RV5c1yd0",
    title: "ElevenLabs Voice AI — Complete Tutorial",
    channel: "Matt Wolfe",
    category: "Tutorials",
  },
  {
    id: "ZXILzUpVx7A",
    title: "Make Money Online with AI Tools in 2025",
    channel: "Income Stream Surfers",
    category: "Tutorials",
  },
  {
    id: "kYWLZbKAZC0",
    title: "Top 10 AI Tools You're NOT Using",
    channel: "Matt Wolfe",
    category: "Tools",
  },
  {
    id: "aywZrzNaKjs",
    title: "Runway Gen-3 — AI Video Generation Review",
    channel: "Two Minute Papers",
    category: "Reviews",
  },
  {
    id: "jNQXAC9IVRw",
    title: "AI for Absolute Beginners — Full Course",
    channel: "freeCodeCamp",
    category: "Tutorials",
  },
  {
    id: "hJP5GqnTrNo",
    title: "Notion AI Complete Guide",
    channel: "Keep Productive",
    category: "Tools",
  },
  {
    id: "tFHeUSJAYbE",
    title: "GPT-4o Explained in 5 Minutes",
    channel: "AI Explained",
    category: "News",
  },
  {
    id: "DJimm8TnNKo",
    title: "I Built a SaaS with AI — Here's What Happened",
    channel: "Pieter Levels",
    category: "Tutorials",
  },
];
