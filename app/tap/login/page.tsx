import { redirect } from "next/navigation";
import { LoginForm } from "@/components/tap/forms";
import { Card, PageTitle, TapShell } from "@/components/tap/ui";
import { currentBusiness } from "@/lib/tap/auth";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  if (await currentBusiness()) redirect(next?.startsWith("/tap/") ? next : "/tap/dashboard");
  return (
    <TapShell>
      <PageTitle title="Log in" intro="Change where your plates send people, update your links and see your taps." />
      <Card className="mt-8">
        <LoginForm next={next} />
      </Card>
      <div className="mt-6 space-y-2 text-[0.9rem] leading-relaxed text-ink-3">
        <p>
          New plate? You don&apos;t need an account yet. Just tap the plate and setup opens.
        </p>
        <p>
          Forgotten your password? Email{" "}
          <a className="font-medium text-ink underline underline-offset-2" href="mailto:sales@integrate-tech.co.uk?subject=Tap%20password%20reset">
            sales@integrate-tech.co.uk
          </a>{" "}
          and we&apos;ll reset it.
        </p>
      </div>
    </TapShell>
  );
}
