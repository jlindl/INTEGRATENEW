/**
 * Google Analytics 4 helpers. The tag is loaded by <GoogleAnalytics /> in the
 * root layout; these helpers are safe to call before it loads (calls queue in
 * dataLayer) and on the server (they no-op).
 *
 * The Measurement ID is public by design, so it is safe to default here. Set
 * NEXT_PUBLIC_GA_ID in Vercel to override it per environment.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-D203B7J8X8";

/** localStorage key holding the visitor's cookie choice: "granted" | "denied". */
export const CONSENT_KEY = "cookie-consent";

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Send a GA4 event, e.g. track("generate_lead", { form: "contact" }). */
export function track(event: string, params: GtagParams = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, params);
}

/** Apply a consent choice to GA (Consent Mode v2) and remember it. */
export function setConsent(choice: "granted" | "denied") {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    /* storage blocked: the choice still applies for this page view */
  }
  window.gtag?.("consent", "update", {
    analytics_storage: choice,
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
  });
  window.dispatchEvent(new Event("cookie-consent-change"));
}
