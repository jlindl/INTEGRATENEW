import { PageTitle, Plate, TapShell, secondaryButton } from "@/components/tap/ui";
import { normaliseCode } from "@/lib/tap/codes";

export default async function InactivePage({ searchParams }: { searchParams: Promise<{ code?: string }> }) {
  const code = normaliseCode((await searchParams).code ?? "").slice(0, 8);
  return (
    <TapShell>
      <Plate code={code || undefined} muted />
      <div className="mt-8">
        <PageTitle
          title="This plate isn't active right now"
          intro="If it's yours, log in to check it. Otherwise contact Integrate and we'll get it working."
        />
      </div>
      <div className="mt-7 flex flex-wrap gap-3">
        <a href="/tap/login" className={secondaryButton}>Log in</a>
        <a href="/contact" className={secondaryButton}>Contact us</a>
      </div>
    </TapShell>
  );
}
