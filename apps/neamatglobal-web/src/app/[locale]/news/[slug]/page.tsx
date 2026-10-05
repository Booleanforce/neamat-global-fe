import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, CalendarDays, Clock, Quote } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@neamat/ui/components/brand/reveal";
import { cn } from "@neamat/ui/lib/utils";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { StoryCard } from "@/components/news/story-card";
import { businessHref } from "@/config/site";
import { businesses } from "@/content/businesses";
import { newsItems } from "@/content/news";
import { routing } from "@/i18n/routing";
import { newsDateFormat } from "@/lib/metadata";
import { findNewsItem, getStories } from "@/lib/news";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

const paragraphKeys = ["p1", "p2", "p3"] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => newsItems.map(({ slug }) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = findNewsItem(slug);
  if (!item) return {};
  const t = await getTranslations({ locale, namespace: `News.items.${item.key}` });
  const path = `/news/${slug}`;
  return {
    title: t("title"),
    description: t("summary"),
    alternates: {
      canonical: `/${locale}${path}`,
      languages: Object.fromEntries(routing.locales.map((code) => [code, `/${code}${path}`])),
    },
    openGraph: {
      type: "article",
      title: t("title"),
      description: t("summary"),
      publishedTime: item.date,
      images: [{ url: item.image }],
    },
  };
}

/** News article — headline, lead image, body with pull quote, unit card and related stories. */
export default async function NewsArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const item = findNewsItem(slug);
  if (!item) notFound();
  setRequestLocale(locale);

  const t = await getTranslations(`News.items.${item.key}`);
  const tPage = await getTranslations("NewsPage");
  const tCommon = await getTranslations("Common");
  const tUnits = await getTranslations("Businesses.items");
  const unit = businesses.find((business) => business.key === item.key);
  const related = (await getStories(locale)).filter((story) => story.slug !== slug).slice(0, 3);
  const dateLabel = newsDateFormat(locale, "long").format(new Date(item.date));

  return (
    <>
      <PageHero
        compact
        homeHref={`/${locale}`}
        homeLabel={tCommon("home")}
        breadcrumbLabel={tCommon("breadcrumb")}
        parent={{ label: tPage("breadcrumb"), href: `/${locale}/news` }}
        breadcrumb={t("title")}
        eyebrow={unit?.plainName ?? tPage("eyebrow")}
        title={t("title")}
      >
        <ul className="text-on-navy mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <li className="flex items-center gap-2">
            <CalendarDays aria-hidden="true" className="text-gold size-4" />
            <time dateTime={item.date}>{dateLabel}</time>
          </li>
          <li className="flex items-center gap-2">
            <Clock aria-hidden="true" className="text-gold size-4" />
            {tPage("article.readTime")}
          </li>
        </ul>
      </PageHero>

      <article className="bg-white pt-10 pb-20 lg:pt-14 lg:pb-28">
        <div className="container-site">
          <Reveal>
            <div className="shadow-elevated relative aspect-[16/9] overflow-hidden rounded-[2rem] lg:aspect-[16/7]">
              <Image
                src={item.image}
                alt={t("imageAlt")}
                fill
                priority
                quality={85}
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
            <div className="max-w-3xl">
              <Reveal>
                <p className="text-navy-deep text-xl leading-relaxed font-semibold sm:text-2xl">
                  {t("summary")}
                </p>
              </Reveal>
              {paragraphKeys.map((key, index) => (
                <Reveal key={key}>
                  <p className="text-body mt-6 text-lg leading-relaxed">{t(`body.${key}`)}</p>
                  {index === 0 && (
                    <figure className="border-gold bg-surface my-10 rounded-e-2xl border-s-4 p-7">
                      <Quote aria-hidden="true" className="text-gold size-8" />
                      <blockquote className="text-navy-deep mt-3 text-xl leading-relaxed font-semibold">
                        {t("quote")}
                      </blockquote>
                      <figcaption className="text-body mt-4 text-sm font-medium">
                        — {t("quoteBy")}
                      </figcaption>
                    </figure>
                  )}
                </Reveal>
              ))}
              <Link
                href={`/${locale}/news`}
                className="text-navy hover:text-navy-deep mt-12 inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
              >
                <ArrowLeft aria-hidden="true" className="size-4 rtl:-scale-x-100" />
                {tPage("article.back")}
              </Link>
            </div>

            {unit && (
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <Reveal>
                  <div className="bg-mesh-navy shadow-glow-navy relative isolate overflow-hidden rounded-[1.75rem] p-7 text-white">
                    <div aria-hidden="true" className="bg-grid-light absolute inset-0 -z-10" />
                    <span
                      className={cn(
                        "grid size-12 place-items-center rounded-xl text-white",
                        unit.accent.tile,
                      )}
                    >
                      <unit.icon aria-hidden="true" className="size-6" />
                    </span>
                    <p className="text-gold mt-5 text-xs font-semibold tracking-wide uppercase">
                      {tPage("article.about")}
                    </p>
                    <h2 className="mt-1 text-2xl font-extrabold">
                      <bdi>{unit.plainName}</bdi>
                    </h2>
                    <p className="text-on-navy mt-3 text-sm leading-relaxed">
                      {tUnits(`${unit.key}.description`)}
                    </p>
                    <Link
                      href={unit.href ?? businessHref(locale, unit.key)}
                      className="bg-gold text-navy-deep hover:bg-gold-hover mt-6 inline-flex min-h-11 items-center rounded-full px-5 text-sm font-semibold transition-colors"
                    >
                      {tCommon("learnMore")}
                    </Link>
                  </div>
                </Reveal>
              </aside>
            )}
          </div>
        </div>
      </article>

      <section aria-labelledby="related-title" className="bg-surface py-20 lg:py-24">
        <div className="container-site">
          <SectionHeading
            id="related-title"
            eyebrow={tPage("article.relatedEyebrow")}
            title={tPage("article.related")}
          />
          <Stagger as="ul" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((story) => (
              <StaggerItem as="li" key={story.slug}>
                <StoryCard story={story} linkLabel={tCommon("readMore")} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
