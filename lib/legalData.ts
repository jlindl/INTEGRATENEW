/**
 * Legal / regulatory documents for the site, rendered by app/legal/[slug].
 *
 * IMPORTANT (Jack): these are solid, UK-focused STARTING TEMPLATES — not legal
 * advice. Before launch:
 *   1. Have them reviewed by a solicitor.
 *   2. Fill every [bracketed placeholder] — company number, registered office,
 *      ICO registration number, and any specific cookies/processors you use.
 *   3. Confirm the contact address (sales@integrate.co.uk is used throughout;
 *      swap for a dedicated privacy@ inbox if you set one up).
 *
 * The bracketed placeholders are intentional and visible so nothing ships
 * looking finished when it still needs your details.
 */

export const COMPANY = {
  name: "Integrate AI Solutions Limited",
  shortName: "Integrate",
  email: "sales@integrate.co.uk",
  phoneDisplay: "07765 977085",
  site: "integrate.co.uk",
  companyNumber: "17340859",
  registeredOffice: "6 Aycliffe Drive, Chorley PR7 7GD",
  /* Still to confirm before launch. */
  icoNumber: "[ICO registration number]",
} as const;

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  slug: string;
  /** Nav/footer label. */
  label: string;
  title: string;
  /** One-line summary for metadata + the page intro. */
  summary: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

const p = (text: string): LegalBlock => ({ type: "p", text });
const ul = (items: string[]): LegalBlock => ({ type: "ul", items });

/* ------------------------------------------------------------------ */
/*  Privacy Policy                                                     */
/* ------------------------------------------------------------------ */

const privacy: LegalDoc = {
  slug: "privacy",
  label: "Privacy Policy",
  title: "Privacy Policy",
  summary:
    "How Integrate AI Solutions Limited collects, uses, and protects your personal data under UK data protection law.",
  updated: "18 July 2026",
  intro:
    "This Privacy Policy explains how Integrate AI Solutions Limited collects, uses, shares, and protects your personal data when you visit our website or get in touch with us, and sets out your rights under UK data protection law.",
  sections: [
    {
      heading: "1. Who we are",
      blocks: [
        p(
          `Integrate AI Solutions Limited ("Integrate", "we", "us", or "our") is a company registered in England and Wales under company number ${COMPANY.companyNumber}, with its registered office at ${COMPANY.registeredOffice}.`,
        ),
        p(
          `We are the "data controller" responsible for your personal data. We are registered with the Information Commissioner's Office (ICO) under registration number ${COMPANY.icoNumber}.`,
        ),
        p(
          `If you have any questions about this policy or how we handle your data, you can contact us at ${COMPANY.email}.`,
        ),
      ],
    },
    {
      heading: "2. The information we collect",
      blocks: [
        p("We collect and process the following categories of personal data:"),
        ul([
          "Information you give us — such as your name, email address, telephone number, company name, and the contents of any message you send us through our contact form, by email, or via WhatsApp.",
          "Information we collect automatically — such as your IP address, browser type and version, device information, and how you use our website, collected through cookies and similar technologies (see our Cookie Policy).",
          "Information from third parties — occasionally we may receive information about you from analytics providers, or from publicly available sources where you have made your business contact details public.",
        ]),
        p(
          "We do not intentionally collect any special category (sensitive) personal data through our website. Please do not send us such information unless we specifically ask for it.",
        ),
      ],
    },
    {
      heading: "3. How and why we use your information",
      blocks: [
        p(
          "We only use your personal data where the law allows us to. The lawful bases we rely on are:",
        ),
        ul([
          "To respond to your enquiries and provide quotes — on the basis of taking steps at your request prior to entering into a contract, and our legitimate interests in running our business.",
          "To provide our services and manage our relationship with you — on the basis of performing a contract with you.",
          "To send you updates or marketing about our services — on the basis of your consent, or our legitimate interests where you are an existing client (you can opt out at any time).",
          "To operate, secure, and improve our website — on the basis of our legitimate interests in maintaining a safe and effective website.",
          "To comply with our legal and regulatory obligations — on the basis of legal obligation.",
        ]),
      ],
    },
    {
      heading: "4. Cookies and analytics",
      blocks: [
        p(
          "Our website uses cookies and similar technologies to function correctly and to help us understand how it is used. For full details of the cookies we use and how to control them, please see our Cookie Policy.",
        ),
      ],
    },
    {
      heading: "5. Who we share your information with",
      blocks: [
        p("We may share your personal data with:"),
        ul([
          "Service providers who help us run our business and website — for example hosting, email, analytics, and communication providers (including messaging platforms such as WhatsApp) — who process data on our behalf under contract.",
          "Professional advisers such as accountants and lawyers, where necessary.",
          "Regulators, law enforcement, or other authorities where we are legally required to do so.",
        ]),
        p(
          "We do not sell your personal data, and we do not share it with third parties for their own marketing purposes.",
        ),
      ],
    },
    {
      heading: "6. International transfers",
      blocks: [
        p(
          "Some of our service providers may be based outside the UK. Where we transfer your personal data outside the UK, we ensure a similar degree of protection by relying on an adequacy decision, the International Data Transfer Agreement, or the UK Addendum to the EU Standard Contractual Clauses, as appropriate.",
        ),
      ],
    },
    {
      heading: "7. How long we keep your information",
      blocks: [
        p(
          "We keep your personal data only for as long as necessary for the purposes we collected it for, including to satisfy any legal, accounting, or reporting requirements. Enquiry data that does not lead to a contract is typically kept for a limited period and then deleted or anonymised.",
        ),
      ],
    },
    {
      heading: "8. Your rights",
      blocks: [
        p("Under UK data protection law, you have the right to:"),
        ul([
          "Request access to the personal data we hold about you.",
          "Request correction of inaccurate or incomplete data.",
          "Request erasure of your data in certain circumstances.",
          "Object to, or request restriction of, our processing of your data.",
          "Request the transfer of your data to you or another provider.",
          "Withdraw your consent at any time where we rely on consent.",
        ]),
        p(
          `To exercise any of these rights, please contact us at ${COMPANY.email}. You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk, though we would appreciate the chance to address your concerns first.`,
        ),
      ],
    },
    {
      heading: "9. How we protect your information",
      blocks: [
        p(
          "We use appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or misuse. While no system can be guaranteed completely secure, we take reasonable steps to keep your information safe.",
        ),
      ],
    },
    {
      heading: "10. Third-party links",
      blocks: [
        p(
          "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites, and we encourage you to read their own privacy policies.",
        ),
      ],
    },
    {
      heading: "11. Children",
      blocks: [
        p(
          "Our website and services are not directed at children, and we do not knowingly collect personal data from anyone under the age of 16.",
        ),
      ],
    },
    {
      heading: "12. Changes to this policy",
      blocks: [
        p(
          "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.",
        ),
      ],
    },
    {
      heading: "13. Contact us",
      blocks: [
        p(
          `If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at ${COMPANY.email}.`,
        ),
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Terms & Conditions                                                 */
/* ------------------------------------------------------------------ */

const terms: LegalDoc = {
  slug: "terms",
  label: "Terms & Conditions",
  title: "Terms & Conditions",
  summary:
    "The terms governing your use of the Integrate AI Solutions Limited website.",
  updated: "18 July 2026",
  intro:
    "These terms and conditions govern your use of our website. By accessing or using the site, you confirm that you accept these terms and agree to comply with them. If you do not agree, please do not use our website.",
  sections: [
    {
      heading: "1. Who we are",
      blocks: [
        p(
          `This website is operated by Integrate AI Solutions Limited, a company registered in England and Wales under company number ${COMPANY.companyNumber}, with its registered office at ${COMPANY.registeredOffice}. You can contact us at ${COMPANY.email}.`,
        ),
      ],
    },
    {
      heading: "2. Using our website",
      blocks: [
        p(
          "We grant you a limited, non-exclusive licence to access and use our website for your own personal or internal business purposes. You agree not to:",
        ),
        ul([
          "Use the site in any way that is unlawful or fraudulent, or that could damage, disable, or impair it.",
          "Attempt to gain unauthorised access to the site, the server on which it is stored, or any connected server, computer, or database.",
          "Introduce viruses, trojans, worms, or other material that is malicious or technologically harmful.",
          "Copy, reproduce, or exploit any part of the site for commercial purposes without our written permission.",
        ]),
      ],
    },
    {
      heading: "3. Intellectual property",
      blocks: [
        p(
          "All content on this website — including text, graphics, logos, designs, images, and code — is owned by or licensed to Integrate AI Solutions Limited and is protected by copyright and other intellectual property laws. You may not use it without our prior written consent, except as permitted for normal viewing of the site.",
        ),
      ],
    },
    {
      heading: "4. No reliance on information",
      blocks: [
        p(
          "The content on our website is provided for general information only. It is not intended to amount to advice on which you should rely. Although we make reasonable efforts to keep the information up to date, we make no representations or warranties that the content is accurate, complete, or current.",
        ),
      ],
    },
    {
      heading: "5. Enquiries, quotes, and services",
      blocks: [
        p(
          "Any enquiry you submit and any quote or proposal we provide does not, by itself, create a binding contract. Our services are provided under a separate written agreement, which will set out the specific terms, scope, fees, and deliverables that apply to your project.",
        ),
      ],
    },
    {
      heading: "6. Our liability",
      blocks: [
        p(
          "Nothing in these terms excludes or limits our liability for death or personal injury caused by our negligence, for fraud or fraudulent misrepresentation, or for any other liability that cannot be excluded or limited under English law.",
        ),
        p(
          "Subject to the above, we will not be liable to you for any loss or damage, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, arising out of or in connection with your use of, or inability to use, our website, or reliance on any content on it. This includes any loss of profits, business, goodwill, or data.",
        ),
      ],
    },
    {
      heading: "7. Third-party links",
      blocks: [
        p(
          "Where our website contains links to other sites and resources provided by third parties, these links are provided for your information only. We have no control over the contents of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.",
        ),
      ],
    },
    {
      heading: "8. Changes to the site and these terms",
      blocks: [
        p(
          "We may update or amend our website and these terms from time to time. Any changes will take effect when posted on this page. We recommend you check this page periodically to stay informed of any updates.",
        ),
      ],
    },
    {
      heading: "9. Privacy and cookies",
      blocks: [
        p(
          "Your use of our website is also governed by our Privacy Policy and Cookie Policy, which set out how we handle your personal data and use cookies.",
        ),
      ],
    },
    {
      heading: "10. Governing law and jurisdiction",
      blocks: [
        p(
          "These terms are governed by the laws of England and Wales. Any dispute arising out of or in connection with them will be subject to the exclusive jurisdiction of the courts of England and Wales.",
        ),
      ],
    },
    {
      heading: "11. Contact us",
      blocks: [
        p(`If you have any questions about these terms, please contact us at ${COMPANY.email}.`),
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Cookie Policy                                                      */
/* ------------------------------------------------------------------ */

const cookies: LegalDoc = {
  slug: "cookies",
  label: "Cookie Policy",
  title: "Cookie Policy",
  summary:
    "How Integrate AI Solutions Limited uses cookies and similar technologies, and how you can control them.",
  updated: "18 July 2026",
  intro:
    "This Cookie Policy explains what cookies are, how we use them on our website, and how you can manage your preferences.",
  sections: [
    {
      heading: "1. What are cookies?",
      blocks: [
        p(
          "Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, to improve their performance, and to provide information to the site's owners. Similar technologies such as pixels and local storage work in comparable ways, and we refer to all of them as \"cookies\" in this policy.",
        ),
      ],
    },
    {
      heading: "2. How we use cookies",
      blocks: [
        p("We use cookies for the following purposes:"),
        ul([
          "Strictly necessary cookies — required for the website to function and to keep it secure. These cannot be switched off in our systems.",
          "Performance and analytics cookies — help us understand how visitors use the site so we can improve it. The information collected is aggregated and used to measure and improve performance.",
          "Functional cookies — remember choices you make to give you a better, more personalised experience.",
        ]),
        p(
          "[Confirm the specific cookies and providers you use before launch — for example your analytics platform — and list them here, along with their duration and purpose.]",
        ),
      ],
    },
    {
      heading: "3. Third-party cookies",
      blocks: [
        p(
          "Some cookies may be set by third-party services that appear on our pages, such as analytics providers. We do not control the setting of these cookies, so we recommend you check the relevant third party's website for more information about their cookies and how to manage them.",
        ),
      ],
    },
    {
      heading: "4. Managing your cookies",
      blocks: [
        p(
          "Most web browsers allow you to control cookies through their settings. You can set your browser to block or alert you about cookies, but some parts of the site may not work properly as a result. To find out more, visit your browser's help pages or aboutcookies.org.",
        ),
      ],
    },
    {
      heading: "5. Changes to this policy",
      blocks: [
        p(
          "We may update this Cookie Policy from time to time to reflect changes to the cookies we use or for operational, legal, or regulatory reasons. Any changes will be posted on this page.",
        ),
      ],
    },
    {
      heading: "6. Contact us",
      blocks: [
        p(`If you have any questions about our use of cookies, please contact us at ${COMPANY.email}.`),
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Accessibility Statement                                            */
/* ------------------------------------------------------------------ */

const accessibility: LegalDoc = {
  slug: "accessibility",
  label: "Accessibility",
  title: "Accessibility Statement",
  summary:
    "Our commitment to making the Integrate AI Solutions Limited website accessible to everyone.",
  updated: "18 July 2026",
  intro:
    "We want as many people as possible to be able to use our website, and we are committed to making it accessible and easy to use.",
  sections: [
    {
      heading: "1. Our commitment",
      blocks: [
        p(
          "We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA. This is an ongoing effort, and we continually work to improve the accessibility of our site as it evolves.",
        ),
      ],
    },
    {
      heading: "2. What we do",
      blocks: [
        p("Among other things, we design and build our website to:"),
        ul([
          "Support keyboard navigation and assistive technologies such as screen readers.",
          "Respect your system preference for reduced motion.",
          "Maintain sufficient colour contrast for text and interactive elements.",
          "Use clear, descriptive text for links, buttons, and images.",
        ]),
      ],
    },
    {
      heading: "3. Known limitations",
      blocks: [
        p(
          "Despite our best efforts, some content may not yet be fully accessible. We are actively working to identify and resolve any issues. If you encounter a problem, we would like to hear about it.",
        ),
      ],
    },
    {
      heading: "4. Contact us",
      blocks: [
        p(
          `If you experience any difficulty accessing any part of our website, or have suggestions on how we can improve, please contact us at ${COMPANY.email} and we will do our best to help.`,
        ),
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Registry + lookups                                                 */
/* ------------------------------------------------------------------ */

export const LEGAL_DOCS: LegalDoc[] = [privacy, terms, cookies, accessibility];

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return LEGAL_DOCS.find((d) => d.slug === slug);
}

export function allLegalSlugs(): string[] {
  return LEGAL_DOCS.map((d) => d.slug);
}
