"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import PostCard from "@/components/PostCard";
import VideoCard from "@/components/VideoCard";
import Link from "next/link";
import type { Post } from "@/data/posts";
import type { VideoEntry } from "@/data/videos";
import { cn } from "@/lib/cn";

interface CarouselRowProps {
  title: string;
  href?: string;
  posts?: Post[];
  videos?: VideoEntry[];
}

export default function CarouselRow({ title, href, posts, videos }: CarouselRowProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateButtons);
    emblaApi.on("init", updateButtons);
    updateButtons();
    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("init", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  const items = posts ?? videos ?? [];
  if (items.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Divider */}
      <div className="border-t border-zinc-900 mb-6" />

      {/* Row header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 bg-[#b15f2c] rounded-full" />
          <h2 className="text-base font-bold text-white">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          {href && (
            <Link
              href={href}
              className="hidden sm:flex items-center gap-1 text-xs text-zinc-500 hover:text-[#cf8047] transition-colors font-medium mr-2"
            >
              See all <ArrowRight className="w-3 h-3" />
            </Link>
          )}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            aria-label="Scroll left"
            className={cn(
              "p-1.5 rounded-lg border transition-all",
              canPrev
                ? "border-zinc-700 text-zinc-400 hover:border-[#b15f2c]/60 hover:text-white"
                : "border-zinc-900 text-zinc-800 cursor-default"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            aria-label="Scroll right"
            className={cn(
              "p-1.5 rounded-lg border transition-all",
              canNext
                ? "border-zinc-700 text-zinc-400 hover:border-[#b15f2c]/60 hover:text-white"
                : "border-zinc-900 text-zinc-800 cursor-default"
            )}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Embla viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-3">
          {posts?.map((post) => (
            <PostCard key={post.slug} post={post} compact />
          ))}
          {videos?.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
