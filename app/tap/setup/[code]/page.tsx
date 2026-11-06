import { ClaimForm } from "@/components/tap/forms";
import { Card, PageTitle, Plate, TapShell, primaryButton, secondaryButton } from "@/components/tap/ui";
import { currentBusiness } from "@/lib/tap/auth";
import { normaliseCode } from "@/lib/tap/codes";
import { getStore } from "@/lib/tap/store";

export const dynamic = "force-dynamic";

export default async function SetupPage({ params }: { params: Promise<{ code: string }> }) {
  const code = normaliseCode((await params).code);
  const [plate, business] = await Promise.all([getStore().getPlate(code), currentBusiness()]);

  if (!plate || plate.status === "disabled") {
    return (
      <TapShell>
        <Plate code={code || undefined} muted />
        <div className="mt-8">
          <PageTitle
            title="This plate isn't active"
            intro="Check the code, or contact Integrate and we'll get it working."
          />
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="/tap" className={secondaryButton}>Try another code</a>
          <a href="/contact" className={secondaryButton}>Contact us</a>
        </div>
      </TapShell>
    );
  }

  if (plate.status === "claimed") {
    const mine = business && plate.businessId === business.id;
    return (
      <TapShell>
        <Plate code={code} caption="Already set up" />
        <div className="mt-8">
          <PageTitle
            title={mine ? "This plate is already yours" : "This plate is already set up"}
            intro={mine ? "Change where it sends people from your dashboard." : "If it's yours, log in to manage it."}
          />
        </div>
        <a href={mine ? "/tap/dashboard" : "/tap/login?next=/tap/dashboard"} className={`${primaryButton} mt-7 sm:w-auto`}>
          {mine ? "Open my dashboard" : "Log in"}
        </a>
      </TapShell>
    );
  }

  return (
    <TapShell
      right={
        business ? (
          <span className="max-w-[10rem] truncate text-[0.85rem] text-ink-3">{business.name}</span>
        ) : (
          <a href={`/tap/login?next=/tap/setup/${code}`} className={secondaryButton}>
            Log in
          </a>
        )
      }
    >
      <Plate code={code} caption="Your plate" ping />
      <div className="mt-8">
        <PageTitle
          title={business ? "Add this plate" : "Activate your plate"}
          intro={
            business
              ? `It will join ${business.name} and use the same page and links as your other plates.`
              : "Takes about a minute. When you're done, every tap on this plate goes wherever you choose."
          }
        />
      </div>
      {!business && (
        <p className="mt-4 text-[0.9rem] text-ink-3">
          Already have an account?{" "}
          <a className="font-medium text-ink underline underline-offset-2" href={`/tap/login?next=/tap/setup/${code}`}>
            Log in first
          </a>{" "}
          to keep all your plates together.
        </p>
      )}
      <Card className="mt-8">
        <ClaimForm code={code} signedInAs={business?.name ?? null} />
      </Card>
    </TapShell>
  );
}
