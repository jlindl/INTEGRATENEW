import Image from "next/image";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";
import { focusRing, label, mono, photo, serif, wrap } from "./ui";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 border-t border-[#d6cfbf] bg-[#ebe6d9]">
      <div className={`${wrap} py-24 sm:py-32 lg:py-40`}>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <p className={`${label} text-[#4f5a54]`}>
                <span className="text-[#a7834b]">08</span> &nbsp;Book a call
              </p>
              <h2
                id="contact-title"
                className={`${serif} mt-8 text-[clamp(2.4rem,5vw,4.4rem)] font-[350] leading-[1] tracking-[-0.02em] text-[#13201b]`}
              >
                Bring your last set of accounts. <em className="italic text-[#1b4a3a]">We&rsquo;ll bring coffee.</em>
              </h2>
              <p className="mt-7 max-w-[28rem] text-[1.05rem] leading-[1.7] text-[#4f5a54]">
                Thirty minutes, in Clerkenwell or on video. We&rsquo;ll tell you
                what we would do differently and what it would cost. No
                obligation, and no follow-up sequence.
              </p>
            </Reveal>

            <Reveal className="mt-12" delay={100}>
              <figure className="relative aspect-[3/2] overflow-hidden rounded-[2px] bg-[#d6cfbf]">
                <Image
                  src="/web-design/demo/accountants/office-doors.webp"
                  alt="The black front doors of the Meridian & Co townhouse office in Clerkenwell"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className={`${photo} object-cover object-[70%_60%]`}
                />
              </figure>
              <address className="mt-6 grid grid-cols-2 gap-6 not-italic">
                <div>
                  <p className={`${label} text-[0.62rem] text-[#4f5a54]`}>Studio</p>
                  <p className="mt-2 text-[0.98rem] leading-[1.6] text-[#13201b]">
                    9 Merlin Row
                    <br />
                    Clerkenwell
                    <br />
                    London EC1R 4DT
                  </p>
                </div>
                <div>
                  <p className={`${label} text-[0.62rem] text-[#4f5a54]`}>Direct</p>
                  <p className="mt-2 text-[0.98rem] leading-[1.6]">
                    <a href="tel:+442079460480" className={`rounded-sm text-[#13201b] tabular-nums underline decoration-[#13201b]/25 underline-offset-4 hover:decoration-[#13201b] ${focusRing}`}>
                      020 7946 0480
                    </a>
                    <br />
                    <a href="mailto:partners@meridian.cpa" className={`rounded-sm break-all text-[#13201b] underline decoration-[#13201b]/25 underline-offset-4 hover:decoration-[#13201b] ${focusRing}`}>
                      partners@meridian.cpa
                    </a>
                  </p>
                  <p className={`${mono} mt-3 text-[0.7rem] text-[#4f5a54]`}>Mon to Fri, 8.30 to 6</p>
                </div>
              </address>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-6 lg:col-start-7 lg:pt-36" delay={160}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
