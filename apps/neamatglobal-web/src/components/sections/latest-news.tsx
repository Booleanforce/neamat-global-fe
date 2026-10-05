import { getLocale, getTranslations } from "next-intl/server";
import { GoldPillButton } from "@neamat/ui/components/brand/gold-pill-button";
import { NewsCard } from "@neamat/ui/components/brand/news-card";
import { Reveal, Stagger, StaggerItem } from "@neamat/ui/components/brand/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { sections } from "@/config/site";
import { businesses } from "@/content/businesses";
import { newsItems } from "@/content/news";

/** Section 7 — Latest News & Insights: featured lead story + stacked compact cards. */
export async function LatestNews() {
  const t = await getTranslations("News");
  const tCommon = await getTranslations("Common");
  const locale = await getLocale();
  const dateFormat = new Intl.DateTimeFormat(locale === "ar" ? "ar-SA-u-ca-gregory" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const cards = newsItems.map((item) => {
    const unit = businesses.find((business) => business.key === item.key);
    return {
      key: item.key,
      image: { src: item.image, alt: t(`items.${item.key}.imageAlt`) },
      date: item.date,
      dateLabel: dateFormat.format(new Date(item.date)),
      title: t(`items.${item.key}.title`),
      category: unit?.plainName,
      categoryClassName: unit?.accent.tile,
      href: `/${locale}/news/${item.slug}`,
      linkLabel: tCommon("readMore"),
    };
  });
  const [lead, ...rest] = cards;

  return (
    <section
      id={sections.news}
      aria-labelledby="news-title"
      className="relative isolate scroll-mt-20 overflow-hidden bg-white py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="bg-gold/10 glow absolute -end-32 top-0 -z-10 size-96 rounded-full"
      />

      <div className="container-site">
        <SectionHeading
          id="news-title"
          eyebrow={t("eyebrow")}
          title={
            <>
              {t("title")} <span className="text-gradient-navy">{t("titleHighlight")}</span>
            </>
          }
          description={t("description")}
          aside={
            <GoldPillButton href={`/${locale}/news`} variant="outline" size="lg">
              {t("cta")}
            </GoldPillButton>
          }
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          {lead && (
            <Reveal className="h-full">
              <NewsCard {...lead} featured />
            </Reveal>
          )}
          <Stagger as="ul" className="grid gap-4">
            {rest.map((card) => (
              <StaggerItem as="li" key={card.key}>
                <NewsCard {...card} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
