/**
 * ContactCta — the guaranteed route from every post to /contact. The post
 * template renders the "closing" variant after the body regardless of what the
 * MDX says; the "inline" variant is exposed to MDX as <ContactCta /> for an
 * optional mid-post nudge.
 */
import Link from "next/link";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CONTACT_PATH } from "@/lib/site";

export function ContactCta({ variant = "inline" }: { variant?: "inline" | "closing" }) {
  if (variant === "closing") {
    return (
      <div className="mt-16 rounded-3xl bg-paper-2 p-8 text-center md:p-12">
        <p className="font-display-tuned text-[clamp(1.5rem,3vw,2.1rem)] font-medium leading-tight text-ink">
          Want more of the right enquiries?
        </p>
        <p className="mx-auto mt-3 max-w-[44ch] leading-relaxed text-ink-2">
          Tell us about your business and where you work. We&apos;ll show you
          how we&apos;d bring in more work and take the admin off your plate.
        </p>
        <div className="mt-7 flex justify-center">
          <MagneticButton href={CONTACT_PATH} variant="primary">
            Get in touch
          </MagneticButton>
        </div>
      </div>
    );
  }

  return (
    <aside className="my-10 flex flex-col gap-4 rounded-2xl bg-paper-2 p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
      <p className="font-display-tuned text-[1.2rem] font-medium leading-snug text-ink">
        Want this working for your business?
      </p>
      <Link
        href={CONTACT_PATH}
        className="group flex shrink-0 items-center gap-1.5 text-[0.95rem] font-medium text-ink transition-colors duration-300 hover:text-accent"
      >
        Talk to us
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </aside>
  );
}
