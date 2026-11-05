import { PageTitle, TapShell, secondaryButton } from "@/components/tap/ui";

export default function InactivePage() {
  return (
    <TapShell>
      <PageTitle
        eyebrow="Integrate Tap"
        title="This plate isn't active right now"
        intro="If you own it, log in to check it, or contact Integrate and we'll get it working."
      />
      <div className="mt-6 flex gap-3">
        <a href="/tap/login" className={secondaryButton}>Log in</a>
        <a href="/contact" className={secondaryButton}>Contact us</a>
      </div>
    </TapShell>
  );
}
