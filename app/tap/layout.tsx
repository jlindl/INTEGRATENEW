import type { Metadata } from "next";
import { TapShell, PageTitle, Notice } from "@/components/tap/ui";
import { storeReady } from "@/lib/tap/store";

/**
 * /tap is the Integrate Tap tool: plate setup, the customer dashboard and the
 * admin/encoder. Like /links it skips the site nav (almost everyone arrives
 * on a phone, straight from tapping a plate) and it's kept out of search.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Integrate Tap",
  description: "Set up and manage your Integrate review plate.",
  robots: { index: false, follow: false },
};

export default function TapLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (!storeReady()) {
    return (
      <main id="main">
        <TapShell>
          <PageTitle eyebrow="Integrate Tap" title="Almost ready" />
          <div className="mt-6">
            <Notice tone="info">
              Plate setup is being switched on. If you have a plate to set up, email{" "}
              <a className="underline" href="mailto:hello@integrate.agency">hello@integrate.agency</a> and we&apos;ll
              do it for you.
            </Notice>
          </div>
        </TapShell>
      </main>
    );
  }
  return <main id="main">{children}</main>;
}
