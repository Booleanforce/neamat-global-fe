/** Site-wide constants. Public URLs come from env so staging/prod can differ. */
export const siteConfig = {
  name: "NEAMAT GLOBAL",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://neamatglobal.com",
  careUrl: process.env.NEXT_PUBLIC_CARE_URL ?? "https://neamatcare.com",
} as const;

/**
 * Public contact details.
 * NOTE: placeholders until the client confirms the real addresses, numbers and mailboxes.
 */
export const contactInfo = {
  email: "info@neamatglobal.com",
  careersEmail: "careers@neamatglobal.com",
  supportEmail: "support@neamatglobal.com",
  mediaEmail: "media@neamatglobal.com",
  phoneSaudi: "+966 11 000 0000",
  phoneBangladesh: "+880 2 0000 0000",
} as const;

/** `tel:` href for a display phone number. */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** In-page section anchors (ids on the home page). */
export const sections = {
  businesses: "businesses",
  about: "about",
  care: "neamat-care",
  presence: "presence",
  news: "news",
} as const;

/** Every published page (locale-relative), used by the sitemap. */
export const sitePages = [
  "",
  "/about",
  "/businesses",
  "/global-presence",
  "/neamat-care",
  "/news",
  "/careers",
  "/contact",
  "/help",
  "/support",
  "/privacy",
  "/terms",
] as const;

/** NEAMAT CARE's overview page on the group site (its CTA links on to the product site). */
export function careHref(locale: string) {
  return `/${locale}/neamat-care`;
}

/** Anchor for a business unit on the Our Businesses page. */
export function businessHref(locale: string, key: string) {
  return key === "neamatcare" ? careHref(locale) : `/${locale}/businesses#${key}`;
}
