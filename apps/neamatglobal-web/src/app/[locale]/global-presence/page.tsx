import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Building, Factory, LayoutGrid, UsersRound } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { StatsBand } from "@/components/common/stats-band";
import { FutureMarkets } from "@/components/presence/future-markets";
import { MarketProfiles } from "@/components/presence/market-profiles";
import { CtaBand } from "@/components/sections/cta-band";
import { GlobalPresence } from "@/components/sections/global-presence";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(
    locale,
    "/global-presence",
    "PresencePage",
    "/images/hero/riyadh-skyline.webp",
  );
}

/** Global Presence — country profiles, the route map and future markets. */
export default async function GlobalPresencePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("PresencePage");
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
        image={{ src: "/images/hero/riyadh-skyline.webp", alt: t("imageAlt") }}
      />
      <StatsBand
        locale={locale}
        stats={[
          { icon: Building, text: t("stats.hq.value"), label: t("stats.hq.label") },
          { icon: Factory, text: t("stats.ops.value"), label: t("stats.ops.label") },
          { icon: LayoutGrid, value: 4, label: t("stats.units") },
          { icon: UsersRound, value: 1000, suffix: "+", label: t("stats.team") },
        ]}
      />
      <MarketProfiles />
      <GlobalPresence showCta={false} />
      <FutureMarkets />
      <CtaBand />
    </>
  );
}
