import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

/**
 * Per-page metadata from a messages namespace that has `metaTitle` + `metaDescription`,
 * with canonical and hreflang alternates for every locale.
 */
export async function pageMetadata(
  locale: string,
  path: string,
  namespace: string,
  image?: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const title = t("metaTitle");
  const description = t("metaDescription");
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: Object.fromEntries(routing.locales.map((code) => [code, `/${code}${path}`])),
    },
    openGraph: {
      title,
      description,
      url: `/${locale}${path}`,
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}

/** Gregorian date formatter for news dates in either locale. */
export function newsDateFormat(locale: string, month: "short" | "long" = "short") {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA-u-ca-gregory" : "en-US", {
    month,
    day: "numeric",
    year: "numeric",
  });
}
