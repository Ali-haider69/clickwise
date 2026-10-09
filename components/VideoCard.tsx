"use client";

import { useState } from "react";
import { YouTubeEmbed } from "@next/third-parties/google";
import { Play } from "lucide-react";
import type { VideoEntry } from "@/data/videos";

interface VideoCardProps {
  video: VideoEntry;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [playing, setPlaying] = useState(false);
  const thumb =
    video.thumbnail ??
    `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;

  if (playing) {
    return (
      <div className="w-[280px] flex-shrink-0 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
        <div className="w-full aspect-video">
          <YouTubeEmbed videoid={video.id} params="controls=1&autoplay=1" />
        </div>
        <div className="p-3">
          <p className="text-xs font-semibold text-white line-clamp-2 leading-snug">{video.title}</p>
          <p className="text-xs text-zinc-600 mt-1">{video.channel}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[280px] flex-shrink-0 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 group transition-all hover:border-blue-500/40 hover:-translate-y-0.5">
      <button
        onClick={() => setPlaying(true)}
        aria-label={`Play: ${video.title}`}
        className="relative w-full aspect-video block focus:outline-none rounded-t-xl overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width={280}
          height={157}
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-11 h-11 rounded-full bg-blue-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-4 h-4 text-black fill-black ml-0.5" />
          </div>
        </div>
        {/* Category chip */}
        <span className="absolute top-2.5 right-2.5 text-[10px] font-bold bg-black/70 backdrop-blur-sm text-blue-400 border border-blue-500/20 rounded-full px-2 py-0.5">
          {video.category}
        </span>
      </button>
      <div className="p-3">
        <p className="text-xs font-semibold text-white line-clamp-2 leading-snug">{video.title}</p>
        <p className="text-xs text-zinc-600 mt-1">{video.channel}</p>
      </div>
    </div>
  );
}
