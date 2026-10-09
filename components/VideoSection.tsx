"use client";

import { useState } from "react";
import { YouTubeEmbed } from "@next/third-parties/google";
import { Play } from "lucide-react";

interface VideoSectionProps {
  videoId: string;
  title?: string;
  caption?: string;
}

export default function VideoSection({ videoId, title, caption }: VideoSectionProps) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <figure className="my-8 rounded-2xl overflow-hidden border border-white/10 bg-surface-1">
      {playing ? (
        <div className="w-full aspect-video">
          <YouTubeEmbed videoid={videoId} params="controls=1&autoplay=1" />
        </div>
      ) : (
        <button
          onClick={() => setPlaying(true)}
          aria-label={title ? `Play: ${title}` : "Play video"}
          className="relative w-full aspect-video block group focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt={title ?? "Video thumbnail"}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors">
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-xl">
              <Play className="w-7 h-7 text-black fill-black ml-0.5" />
            </div>
          </div>
          {title && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-left">
              <p className="text-sm font-semibold text-white">▶ Watch: {title}</p>
            </div>
          )}
        </button>
      )}
      {caption && (
        <figcaption className="px-4 py-2 text-xs text-zinc-500">{caption}</figcaption>
      )}
    </figure>
  );
}
