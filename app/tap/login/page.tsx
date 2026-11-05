import { redirect } from "next/navigation";
import { LoginForm } from "@/components/tap/forms";
import { Card, PageTitle, TapShell } from "@/components/tap/ui";
import { currentBusiness } from "@/lib/tap/auth";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  if (await currentBusiness()) redirect(next?.startsWith("/tap/") ? next : "/tap/dashboard");
  return (
    <TapShell>
      <PageTitle eyebrow="Integrate Tap" title="Log in" intro="Manage your plates, links and page." />
      <Card className="mt-8">
        <LoginForm next={next} />
      </Card>
      <p className="mt-6 text-center text-[0.85rem] text-ink-3">
        Forgotten your password? Email{" "}
        <a className="underline" href="mailto:hello@integrate.agency?subject=Tap%20password%20reset">
          hello@integrate.agency
        </a>
        .
      </p>
    </TapShell>
  );
}
