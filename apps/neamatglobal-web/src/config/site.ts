/** Site-wide constants. Public URLs come from env so staging/prod can differ. */
export const siteConfig = {
  name: "NEAMAT GLOBAL",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://neamatglobal.com",
  careUrl: process.env.NEXT_PUBLIC_CARE_URL ?? "https://neamatcare.com",
} as const;

/**
 * Public contact details.
 */
export const contactInfo = {
  email: "corporate@neamatglobal.com",
  corporateEmail: "corporate@neamatglobal.com",
  careersEmail: "careers@neamatglobal.com",
  supportEmail: "support@neamatglobal.com",
  mediaEmail: "media@neamatglobal.com",
  corporatePhone: "+880 1817-886592",
  phoneBangladesh: "+880 1817-886592",
  phoneSaudi: null,
  website: "neamatglobal.com",
  headOffice: {
    title: "Bangladesh Head Office",
    streetAddress: "House 20, Road 13, Merul Badda",
    cityPostal: "Dhaka 1212, Bangladesh",
    fullAddress: "House 20, Road 13, Merul Badda, Dhaka 1212, Bangladesh",
    phone: "+880 1817-886592",
    email: "corporate@neamatglobal.com",
    website: "neamatglobal.com",
  },
  saudiOffice: {
    title: "Saudi Office",
    status: "Up coming",
  },
} as const;

/** `tel:` href for a display phone number. */
export function telHref(phone?: string | null) {
  if (!phone) return "";
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
