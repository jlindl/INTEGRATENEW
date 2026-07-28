import Image from "next/image";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { container, display } from "./ui";

type Person = {
  name: string;
  role: string;
  focus: string;
  img: string;
};

const people: Person[] = [
  {
    name: "Eleanor Halstead",
    role: "Senior Partner",
    focus: "Private client & estates",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=75",
  },
  {
    name: "James Okafor",
    role: "Partner",
    focus: "Corporate & commercial",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=75",
  },
  {
    name: "Priya Nair",
    role: "Partner",
    focus: "Dispute resolution",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=75",
  },
  {
    name: "Tom Bennett",
    role: "Associate",
    focus: "Commercial property",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=75",
  },
];

export function People() {
  return (
    <section id="people" className="scroll-mt-24">
      <div className={`${container} py-20 sm:py-24 lg:py-28`}>
        <Reveal>
          <SectionHeading
            eyebrow="People"
            title="You will know exactly who is acting for you."
            sub="No faceless case handlers. Every client works with a named solicitor they can reach directly."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {people.map((person, i) => (
            <Reveal key={person.name} className="h-full" delay={(i % 4) * 70}>
              <figure className="group h-full overflow-hidden rounded-2xl border border-[#e4ddd0] bg-white">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={person.img}
                    alt={`${person.name}, ${person.role} at Halstead Law`}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="p-5">
                  <p
                    className={`${display} text-lg font-medium tracking-tight text-[#1a1712]`}
                  >
                    {person.name}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-[#7c2d2d]">
                    {person.role}
                  </p>
                  <p className="mt-1 text-sm text-[#5a544a]">{person.focus}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
