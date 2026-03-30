#!/usr/bin/env node

/**
 * Search Engine Indexing Helper
 * - Fetches all URLs from sitemap.xml
 * - Submits URLs via IndexNow API (Bing, Yandex, Naver, Seznam)
 *
 * Usage: node scripts/submit-to-search-engines.mjs
 */

const SITE_URL = "https://clickwise.website";
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

// IndexNow requires a key — we'll generate one and host it as a static file
const INDEXNOW_KEY = "clickwise-indexnow-key-2026";
const INDEXNOW_KEY_URL = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

// ─── Step 1: Fetch all URLs from sitemap ───────────────────────────────────────

async function fetchSitemapUrls() {
  console.log("\n📄 Fetching sitemap...");
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`Failed to fetch sitemap: ${res.status}`);

  const xml = await res.text();

  // Simple regex extraction — no XML parser dependency needed
  const urls = [];
  const regex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1]);
  }

  console.log(`   Found ${urls.length} URLs in sitemap`);
  return urls;
}

// ─── Step 2: Submit URLs via IndexNow ──────────────────────────────────────────

async function submitToIndexNow(urls) {
  console.log("\n🚀 Submitting URLs via IndexNow...");

  // IndexNow accepts up to 10,000 URLs per request
  const payload = {
    host: new URL(SITE_URL).host,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_URL,
    urlList: urls,
  };

  // IndexNow is supported by Bing, Yandex, Naver, Seznam
  // Submitting to one shares with all partners
  const indexNowEndpoint = "https://api.indexnow.org/IndexNow";

  try {
    const res = await fetch(indexNowEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (res.ok || res.status === 202) {
      console.log(`   ✅ IndexNow — submitted ${urls.length} URLs successfully`);
      console.log(`   (Shared with: Bing, Yandex, Naver, Seznam)`);
    } else {
      const text = await res.text();
      console.log(`   ⚠️  IndexNow — responded with ${res.status}: ${text}`);

      if (res.status === 422) {
        console.log(`\n   💡 Make sure the key file exists at: ${INDEXNOW_KEY_URL}`);
        console.log(`      The file should contain: ${INDEXNOW_KEY}`);
      }
    }
  } catch (err) {
    console.log(`   ❌ IndexNow — failed: ${err.message}`);
  }
}

// ─── Run ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🔍 ClickWise — Search Engine Indexing Helper");
  console.log("=".repeat(50));

  try {
    const urls = await fetchSitemapUrls();
    await submitToIndexNow(urls);

    console.log("\n" + "=".repeat(50));
    console.log("✅ Done! Summary:");
    console.log(`   • ${urls.length} URLs found in sitemap`);
    console.log(`   • ${urls.length} URLs submitted to IndexNow (Bing, Yandex, Naver, Seznam)`);
    console.log("\n💡 Tips:");
    console.log("   • Run this script after every deployment with new content");
    console.log("   • Also submit your sitemap in Google Search Console manually");
  } catch (err) {
    console.error("\n❌ Error:", err.message);
    process.exit(1);
  }
}

main();
