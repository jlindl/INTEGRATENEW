"use client";

/**
 * AdVideo — the /trades hero video. It starts muted and looping (browsers only
 * autoplay muted video), so someone arriving from the ad sees it moving
 * straight away; one tap turns the sound on and restarts it from the top.
 *
 * Loading: most visitors arrive from a Meta ad inside the Facebook or
 * Instagram in-app browser, often on mobile data. The video must never compete
 * with the headline, the form or the tracking scripts, so the page renders
 * with only the poster image, and the video source is attached once the page
 * has finished loading, the browser is idle and the player is near the screen.
 * A tap before then starts it straight away with sound.
 */
import { useEffect, useRef, useState } from "react";

export function AdVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (load) return;
    const el = ref.current;
    if (!el) return;

    let cancelled = false;
    let observer: IntersectionObserver | undefined;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const start = () => {
      if (cancelled) return;
      if (typeof IntersectionObserver === "undefined") {
        setLoad(true);
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            observer?.disconnect();
            setLoad(true);
          }
        },
        { rootMargin: "200px 0px" },
      );
      observer.observe(el);
    };

    const whenIdle = () => {
      const w = window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      };
      if (w.requestIdleCallback) idleId = w.requestIdleCallback(start, { timeout: 1500 });
      else timeoutId = setTimeout(start, 300);
    };

    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", whenIdle);
      observer?.disconnect();
      const w = window as Window & { cancelIdleCallback?: (id: number) => void };
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [load]);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    if (muted) {
      if (!load) {
        // Tapped before the deferred load: attach the source now so it plays
        // within the user gesture (needed for sound on iOS).
        v.src = src;
        setLoad(true);
      }
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
        src={load ? src : undefined}
        poster={poster}
        autoPlay={load}
        muted
        loop
        playsInline
        preload="none"
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
