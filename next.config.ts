import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      {
        source: "/blog/how-to-get-ai-clients-24-hours-no-experience",
        destination: "/blog/how-to-get-ai-clients",
        permanent: true,
      },
      {
        source: "/blog/how-to-get-ai-clients-fast",
        destination: "/blog/how-to-get-ai-clients",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
    ],
  },
};

export default nextConfig;
