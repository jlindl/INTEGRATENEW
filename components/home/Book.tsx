/**
 * The close: book a free call. Uses the site's shared BookCallForm, so leads
 * reach GoHighLevel exactly as before, with the same source label. WhatsApp
 * and email sit beside it for people who would rather not fill in a form, and
 * the company details sit under the decision.
 */
import { BookCallForm } from "@/components/sections/BookCallForm";
import { CONTACT, PAYOFF } from "@/lib/film/content";
import { COMPANY } from "@/lib/legalData";
import { Em, Eyebrow, Icon, Tick, WhatsAppGlyph, h2 } from "./ui";

const contactCard =
  "flex min-h-16 items-center gap-3 rounded-2xl border border-graphite-2 px-4 py-3 transition-colors hover:border-halo/60";

export function Book() {
  return (
    <section id="book-call" data-tone="dark" aria-labelledby="book-title" className="scroll-mt-16 bg-carbon py-20 text-ivory sm:py-24 lg:py-28">
      <div className="container-x grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <Eyebrow tone="dark">Free 30-minute call</Eyebrow>
          <h2 id="book-title" className={h2}>
            <Em text={PAYOFF.title} />
          </h2>
          <p className="mt-5 max-w-[32rem] text-[1.0625rem] leading-relaxed text-mist sm:text-[1.1875rem]">{PAYOFF.body}</p>
          <ul className="mt-7 grid gap-3">
            {PAYOFF.promises.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-[1rem]">
                <Tick className="h-4 w-4 text-halo" />
                {p}
              </li>
            ))}
          </ul>

          <p className="mt-9 text-[0.9375rem] text-mist">Rather not fill in a form?</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className={contactCard}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08]">
                <WhatsAppGlyph />
              </span>
              <span>
                <span className="block text-[0.75rem] text-mist">WhatsApp</span>
                <span className="block font-semibold">{CONTACT.whatsappDisplay}</span>
              </span>
              <span className="sr-only">(opens WhatsApp)</span>
            </a>
            <a href={`mailto:${CONTACT.email}`} className={contactCard}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08]">
                <Icon name="chat" />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.75rem] text-mist">Email</span>
                <span className="block truncate font-semibold">{CONTACT.email}</span>
              </span>
            </a>
          </div>

          <p className="mt-8 max-w-[32rem] text-[0.8125rem] leading-relaxed text-mist">
            {COMPANY.name}. Registered in England and Wales, company no. {COMPANY.companyNumber}. Registered office: {COMPANY.registeredOffice}.
          </p>
        </div>

        <BookCallForm source={PAYOFF.formSource} />
      </div>
    </section>
  );
}
