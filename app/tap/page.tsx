import { FindPlateForm } from "@/components/tap/forms";
import { Card, PageTitle, TapShell, secondaryButton } from "@/components/tap/ui";
import { currentBusiness } from "@/lib/tap/auth";

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
      <PageTitle
        eyebrow="Review plates"
        title={
          <>
            Set up your{" "}
            <span className="italic text-silver [font-variation-settings:'opsz'_90,'SOFT'_40,'WONK'_0]">plate</span>
          </>
        }
        intro="The quickest way: tap your plate with your phone. It'll open the setup page by itself. Or type the code from the card in your box."
      />
      <Card className="mt-8">
        <FindPlateForm />
      </Card>
      <ol className="mt-10 space-y-4 text-[0.92rem] leading-relaxed text-ink-2">
        {[
          ["01", "Tap or scan your plate", "No app needed. Any iPhone or Android works."],
          ["02", "Enter the setup code", "It's on the card in the box, so only you can claim your plate."],
          ["03", "Add your review link", "Plus Instagram, your website, WhatsApp and more if you like."],
          ["04", "Change it any time", "Log in here. The plate itself never needs reprogramming."],
        ].map(([n, t, d]) => (
          <li key={n} className="flex gap-4">
            <span className="font-mono text-[0.72rem] text-ink-3">{n}</span>
            <span>
              <span className="block font-medium text-ink">{t}</span>
              {d}
            </span>
          </li>
        ))}
      </ol>
    </TapShell>
  );
}
