import { ClaimForm } from "@/components/tap/forms";
import { Card, Notice, PageTitle, TapShell, secondaryButton } from "@/components/tap/ui";
import { currentBusiness } from "@/lib/tap/auth";
import { normaliseCode, normaliseSetupCode } from "@/lib/tap/codes";
import { getStore } from "@/lib/tap/store";

export const dynamic = "force-dynamic";

export default async function SetupPage({
  params,
  searchParams,
}: {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ s?: string }>;
}) {
  const code = normaliseCode((await params).code);
  const { s } = await searchParams;
  const [plate, business] = await Promise.all([getStore().getPlate(code), currentBusiness()]);

  if (!plate || plate.status === "disabled") {
    return (
      <TapShell>
        <PageTitle title="This plate isn't active" intro="Check the code, or contact Integrate and we'll sort it." />
        <a href="/tap" className={`${secondaryButton} mt-6`}>Try another code</a>
      </TapShell>
    );
  }

  if (plate.status === "claimed") {
    const mine = business && plate.businessId === business.id;
    return (
      <TapShell>
        <PageTitle
          eyebrow={`Plate ${code}`}
          title={mine ? "This plate is already yours" : "This plate is already set up"}
          intro={mine ? "Change where it goes from your dashboard." : "If it's yours, log in to manage it."}
        />
        <a href={mine ? "/tap/dashboard" : `/tap/login?next=/tap/dashboard`} className={`${secondaryButton} mt-6`}>
          {mine ? "Open dashboard" : "Log in"}
        </a>
      </TapShell>
    );
  }

  return (
    <TapShell
      right={
        business ? (
          <span className="text-[0.8rem] text-ink-3">{business.name}</span>
        ) : (
          <a href={`/tap/login?next=/tap/setup/${code}`} className={secondaryButton}>
            Log in
          </a>
        )
      }
    >
      <PageTitle
        eyebrow={`Plate ${code}`}
        title={business ? "Add this plate" : "Activate your plate"}
        intro={
          business
            ? `This plate will join ${business.name} and use the same page and links as your other plates.`
            : "Takes about a minute. When you're done, every tap on this plate will go wherever you choose."
        }
      />
      {!business && (
        <div className="mt-5">
          <Notice tone="info">
            Got more than one plate or already have an account?{" "}
            <a className="font-medium text-ink underline" href={`/tap/login?next=/tap/setup/${code}`}>
              Log in first
            </a>{" "}
            and they&apos;ll all be in one place.
          </Notice>
        </div>
      )}
      <Card className="mt-6">
        <ClaimForm code={code} signedInAs={business?.name ?? null} presetSetupCode={s ? normaliseSetupCode(s) : undefined} />
      </Card>
    </TapShell>
  );
}
