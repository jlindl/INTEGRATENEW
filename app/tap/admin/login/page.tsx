import { AdminLoginForm } from "@/components/tap/forms";
import { Card, PageTitle, TapShell } from "@/components/tap/ui";

export default function AdminLogin() {
  return (
    <TapShell>
      <PageTitle eyebrow="Admin" title="Integrate Tap admin" />
      <Card className="mt-8">
        <AdminLoginForm />
      </Card>
    </TapShell>
  );
}
