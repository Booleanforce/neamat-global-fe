import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { cn } from "@neamat/ui/lib/utils";
import { SynergySection } from "@/components/businesses/synergy-section";
import { UnitShowcase } from "@/components/businesses/unit-showcase";
import { PageHero } from "@/components/common/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { businesses } from "@/content/businesses";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/businesses", "BusinessesPage", "/images/pages/businesses.webp");
}

/** Our Businesses — the four companies in depth, how they work together, CTA. */
export default async function BusinessesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("BusinessesPage");
  const tCommon = await getTranslations("Common");

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
        image={{ src: "/images/pages/businesses.webp", alt: t("imageAlt") }}
      >
        <nav aria-label={t("jumpLabel")} className="mt-9">
          <ul className="flex flex-wrap gap-2.5">
            {businesses.map(({ key, plainName, icon: Icon, accent }) => (
              <li key={key}>
                <a
                  href={`#${key}`}
                  className="glass-dark inline-flex min-h-11 items-center gap-2 rounded-full ps-1.5 pe-4 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                >
                  <span
                    className={cn(
                      "grid size-8 place-items-center rounded-full text-white",
                      accent.tile,
                    )}
                  >
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <bdi>{plainName}</bdi>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>
      {businesses.map((business, index) => (
        <UnitShowcase key={business.key} business={business} index={index} />
      ))}
      <SynergySection />
      <div className="bg-white pt-20 lg:pt-28">
        <CtaBand />
      </div>
    </>
  );
}
