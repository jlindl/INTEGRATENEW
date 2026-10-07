/**
 * Shared structured data. The Organization node uses the same @id as the blog
 * JSON-LD (`${SITE_URL}/#organization`), so Google merges them into one entity.
 * Only facts the business has published (company details, contact routes,
 * social profiles) are asserted: no ratings, prices or addresses are invented.
 */
import { COMPANY } from "@/lib/legalData";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

export const ORG_ID = `${SITE_URL}/#organization`;

const AREAS = ["Lancashire", "Greater Manchester", "Merseyside", "Cumbria", "North West England", "United Kingdom"];

export function organizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": ORG_ID,
        name: SITE_NAME,
        legalName: COMPANY.name,
        url: SITE_URL,
        logo: absoluteUrl("/icon.svg"),
        image: absoluteUrl("/opengraph-image"),
        description:
          "AI automation, lead generation and web design for trades and local businesses across Lancashire and the North West.",
        email: COMPANY.email,
        telephone: "+447765977085",
        address: {
          "@type": "PostalAddress",
          streetAddress: "6 Aycliffe Drive",
          addressLocality: "Chorley",
          addressRegion: "Lancashire",
          postalCode: "PR7 7GD",
          addressCountry: "GB",
        },
        areaServed: AREAS.map((name) => ({ "@type": "AdministrativeArea", name })),
        knowsAbout: [
          "AI automation",
          "AI chatbots",
          "WhatsApp automation",
          "Lead generation",
          "Facebook and Instagram ads",
          "Web design",
          "CRM systems",
        ],
        sameAs: [
          "https://www.instagram.com/integrate_tech",
          "https://www.linkedin.com/company/integrate-tech/",
          "https://www.tiktok.com/@integrate.ai",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: "en-GB",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

/** Service node for a web-design niche page. */
export function webDesignServiceGraph(opts: { slug: string; name: string; description: string }) {
  const url = absoluteUrl(`/web-design/${opts.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: opts.name,
        serviceType: "Web design",
        description: opts.description,
        url,
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Country", name: "United Kingdom" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Web design", item: absoluteUrl("/web-design") },
          { "@type": "ListItem", position: 2, name: opts.name, item: url },
        ],
      },
    ],
  };
}
