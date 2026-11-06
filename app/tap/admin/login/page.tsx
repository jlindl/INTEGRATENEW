import { AdminLoginForm } from "@/components/tap/forms";
import { Card, PageTitle, TapShell } from "@/components/tap/ui";

export default function AdminLogin() {
  return (
    <TapShell>
      <PageTitle kicker="Integrate staff only" title="Tap admin" intro="Make batches of plates, write them and manage customers." />
      <Card className="mt-8">
        <AdminLoginForm />
      </Card>
    </TapShell>
  );
}
