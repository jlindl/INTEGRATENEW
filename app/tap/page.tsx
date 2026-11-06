import { FindPlateForm } from "@/components/tap/forms";
import { Card, PageTitle, Plate, TapShell, secondaryButton } from "@/components/tap/ui";
import { currentBusiness } from "@/lib/tap/auth";

const STEPS = [
  ["Tap your plate", "Hold the top of your phone against it. Any iPhone or Android works, no app needed."],
  ["Create your account", "Your business name, your details and a password. The plate is now yours."],
  ["Add your links", "Your Google review link, plus Instagram, Facebook, your website and more."],
  ["Change it any time", "Log in here. The plate itself never needs reprogramming."],
] as const;

export default async function TapHome() {
  const business = await currentBusiness();
  return (
    <TapShell
      right={
        <a href={business ? "/tap/dashboard" : "/tap/login"} className={secondaryButton}>
          {business ? "Dashboard" : "Log in"}
        </a>
      }
    >
      <Plate ping />
      <div className="mt-8">
        <PageTitle
          title="Set up your review plate"
          intro="Tap the plate with your phone and setup opens by itself. It takes about a minute."
        />
      </div>

      <ol className="mt-9 space-y-0">
        {STEPS.map(([title, body], i) => (
          <li key={title} className="relative flex gap-4 pb-6 last:pb-0">
            {i < STEPS.length - 1 && <span className="absolute left-[0.94rem] top-9 bottom-1 w-px bg-line" aria-hidden="true" />}
            <span className="font-display-tuned flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-card text-[0.95rem] text-ink shadow-hairline">
              {i + 1}
            </span>
            <span className="pt-0.5 text-[0.94rem] leading-relaxed text-ink-2">
              <span className="block font-medium text-ink">{title}</span>
              {body}
            </span>
          </li>
        ))}
      </ol>

      <details className="group mt-10">
        <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 text-[0.95rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="transition-transform group-open:rotate-90">
            <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Can&apos;t tap it? Type the plate code instead
        </summary>
        <Card className="mt-3">
          <FindPlateForm />
        </Card>
      </details>
    </TapShell>
  );
}
