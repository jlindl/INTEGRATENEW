"use client";

/**
 * AdVideo — the /trades hero video. It starts muted and looping (browsers only
 * autoplay muted video), so someone arriving from the ad sees it moving
 * straight away; one tap turns the sound on and restarts it from the top.
 */
import { useRef, useState } from "react";

export function AdVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    if (muted) {
      v.currentTime = 0;
      v.muted = false;
      v.loop = false;
      void v.play();
      setMuted(false);
    } else {
      v.muted = true;
      setMuted(true);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-ink shadow-[0_30px_80px_-40px_rgba(27,26,22,0.55)]">
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        controls={!muted}
        className="block aspect-video w-full bg-ink object-contain"
      />
      {/* The whole video is the tap target; the visible pill sits top-right
          so it never covers the captions burned into the bottom of the VSL. */}
      {muted && (
        <button
          type="button"
          onClick={toggleSound}
          className="group absolute inset-0 flex items-start justify-end p-2.5 sm:p-4"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-paper/95 px-3 py-1.5 text-[0.78rem] font-medium text-ink shadow-lg transition-colors group-hover:bg-paper sm:min-h-11 sm:gap-2 sm:px-5 sm:py-2 sm:text-[0.9rem]">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 9v6h4l5 4V5L8 9H4Z" />
              <path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" />
            </svg>
            Tap for sound
          </span>
        </button>
      )}
    </div>
  );
}
