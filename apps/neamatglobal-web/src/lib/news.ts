import { getTranslations } from "next-intl/server";
import type { Story } from "@/components/news/story-card";
import { businesses } from "@/content/businesses";
import { newsItems, type NewsItem } from "@/content/news";
import { newsDateFormat } from "@/lib/metadata";

/** Localised newsroom stories, newest first. */
export async function getStories(locale: string): Promise<Story[]> {
  const t = await getTranslations({ locale, namespace: "News.items" });
  const dateFormat = newsDateFormat(locale);

  return [...newsItems]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((item) => {
      const unit = businesses.find((business) => business.key === item.key);
      return {
        slug: item.slug,
        href: `/${locale}/news/${item.slug}`,
        title: t(`${item.key}.title`),
        summary: t(`${item.key}.summary`),
        image: { src: item.image, alt: t(`${item.key}.imageAlt`) },
        date: item.date,
        dateLabel: dateFormat.format(new Date(item.date)),
        category: unit?.plainName ?? "",
        categoryClassName: unit?.accent.tile ?? "bg-navy",
        unitKey: item.key,
      };
    });
}

export function findNewsItem(slug: string): NewsItem | undefined {
  return newsItems.find((item) => item.slug === slug);
}
