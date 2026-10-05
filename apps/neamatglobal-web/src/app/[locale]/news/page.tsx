import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { LeadStory } from "@/components/news/lead-story";
import { NewsBrowser } from "@/components/news/news-browser";
import { NewsletterBand } from "@/components/news/newsletter-band";
import { businesses } from "@/content/businesses";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";
import { getStories } from "@/lib/news";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/news", "NewsPage", "/images/pages/news.webp");
}

/** Newsroom — lead story, filterable story grid, newsletter. */
export default async function NewsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("NewsPage");
  const tCommon = await getTranslations("Common");
  const stories = await getStories(locale);
  const [lead] = stories;

  return (
    <>
      <PageHero
        homeHref={`/${locale}`}
        homeLabel={tCommon("home")}
        breadcrumbLabel={tCommon("breadcrumb")}
        breadcrumb={t("breadcrumb")}
        eyebrow={t("eyebrow")}
        title={t("title")}
        titleHighlight={t("titleHighlight")}
        subtitle={t("subtitle")}
        image={{ src: "/images/pages/news.webp", alt: t("imageAlt") }}
      />

      <section aria-label={t("latest")} className="bg-mesh-light py-20 lg:py-24">
        <div className="container-site">
          {lead && <LeadStory story={lead} eyebrow={t("latest")} linkLabel={t("readStory")} />}
        </div>
      </section>

      <section aria-labelledby="all-news-title" className="bg-white py-20 lg:py-24">
        <div className="container-site">
          <SectionHeading id="all-news-title" eyebrow={t("all.eyebrow")} title={t("all.title")} />
          <div className="mt-10">
            <NewsBrowser
              stories={stories}
              filters={[
                { key: "all", label: t("all.filterAll") },
                ...businesses.map((business) => ({
                  key: business.key,
                  label: business.plainName,
                })),
              ]}
              filterLabel={t("all.filterLabel")}
              linkLabel={tCommon("readMore")}
              emptyLabel={t("all.empty")}
              resultsTemplate={t.raw("all.results") as string}
            />
          </div>
        </div>
      </section>

      <NewsletterBand />
    </>
  );
}
