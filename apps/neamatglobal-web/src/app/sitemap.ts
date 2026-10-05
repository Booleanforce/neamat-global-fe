import type { MetadataRoute } from "next";
import { siteConfig, sitePages } from "@/config/site";
import { newsItems } from "@/content/news";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...sitePages, ...newsItems.map(({ slug }) => `/news/${slug}`)];

  return paths.map((path) => ({
    url: `${siteConfig.url}/${routing.defaultLocale}${path}`,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, `${siteConfig.url}/${locale}${path}`]),
      ),
    },
  }));
}
