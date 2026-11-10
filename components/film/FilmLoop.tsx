"use client";

/**
 * A silent background loop laid over its own still.
 *
 * The still underneath is the real first paint (and the LCP image); this
 * video is only fetched once the page has finished loading, fades in when it
 * can play, and pauses whenever it is off screen. It never loads under
 * reduced motion or data saver, where the still simply stays.
 *
 * GENERATED MEDIA: the clips are Higgsfield stand-ins for atmosphere. See
 * lib/film/content.ts.
 */
import { useEffect, useRef, useState } from "react";

type Clip = { mp4: string; webm: string };

export function FilmLoop({ wide, tall, className = "" }: { wide: Clip; tall: Clip; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const holder = useRef<HTMLSpanElement>(null);
  const [clip, setClip] = useState<Clip | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;

    const pick = () => setClip(window.matchMedia("(min-width: 768px)").matches ? wide : tall);
    /* Fetch only once the page has loaded AND the loop's frame is close to
       the screen, so a clip far down the page costs nothing up front. */
    let idle = 0;
    let io: IntersectionObserver | null = null;
    const arm = () => {
      idle = window.setTimeout(() => {
        const host = holder.current?.parentElement;
        if (!host) return pick();
        io = new IntersectionObserver(
          ([e]) => {
            if (e.isIntersecting) {
              io?.disconnect();
              pick();
            }
          },
          { rootMargin: "100% 0px" },
        );
        io.observe(host);
      }, 700);
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => {
      window.removeEventListener("load", arm);
      window.clearTimeout(idle);
      io?.disconnect();
    };
    // The clip sources are static for the life of the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !clip) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [clip]);

  if (!clip) return <span ref={holder} hidden />;
  return (
    <video
      ref={ref}
      className={`film-cover film-loop ${className}`}
      data-ready={ready ? "" : undefined}
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
      onCanPlay={() => setReady(true)}
    >
      <source src={clip.webm} type="video/webm" />
      <source src={clip.mp4} type="video/mp4" />
    </video>
  );
}
