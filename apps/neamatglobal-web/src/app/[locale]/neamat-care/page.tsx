import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  ClipboardCheck,
  Home,
  Globe2,
  Languages,
  Smartphone,
  UsersRound,
  UserRoundCheck,
  Wrench,
} from "lucide-react";
import { GoldPillButton } from "@neamat/ui/components/brand/gold-pill-button";
import { CarePlatformCta } from "@/components/care/care-cta";
import { CareServices } from "@/components/care/care-services";
import { PlatformSection } from "@/components/care/platform-section";
import { PageHero } from "@/components/common/page-hero";
import { ProcessSteps } from "@/components/common/process-steps";
import { SectionHeading } from "@/components/common/section-heading";
import { StatsBand } from "@/components/common/stats-band";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type PageProps = { params: Promise<{ locale: string }> };

const highlights = ["scheduled", "verified", "warranty", "booking"] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/neamat-care", "CarePage", "/images/featured/family.webp");
}

/** NEAMAT CARE — services, how booking works, the platform's roles and a booking CTA. */
export default async function NeamatCarePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CarePage");
  const tCommon = await getTranslations("Common");
  const tFeatured = await getTranslations("Featured");

  return (
    <>
      <PageHero
        homeHref={`/${locale}`}
        homeLabel={tCommon("home")}
        breadcrumbLabel={tCommon("breadcrumb")}
        breadcrumb="NEAMAT CARE"
        eyebrow={t("eyebrow")}
        title={tFeatured("title")}
        titleHighlight={tFeatured("titleLine2")}
        subtitle={t("subtitle")}
        image={{ src: "/images/featured/family.webp", alt: tFeatured("imageAlt") }}
      >
        <ul className="mt-7 flex flex-wrap gap-2">
          {highlights.map((key) => (
            <li
              key={key}
              className="glass-dark inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white"
            >
              <CircleCheck aria-hidden="true" className="text-gold size-4" />
              {tFeatured(`checklist.items.${key}`)}
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-wrap gap-3">
          <GoldPillButton href={siteConfig.careUrl} external size="lg" className="shadow-glow-gold">
            {t("ctaPrimary")}
          </GoldPillButton>
          <Link
            href={`/${locale}/contact`}
            className="glass-dark inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/15"
          >
            {t("ctaSecondary")}
            <ArrowRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
          </Link>
        </div>
      </PageHero>

      <StatsBand
        locale={locale}
        stats={[
          { icon: Wrench, value: 6, label: t("stats.services") },
          { icon: UsersRound, value: 3, label: t("stats.roles") },
          { icon: Languages, value: 3, label: t("stats.languages") },
          { icon: Globe2, value: 2, label: t("stats.countries") },
        ]}
      />

      <CareServices />

      <section aria-labelledby="how-title" className="bg-white py-20 lg:py-28">
        <div className="container-site">
          <SectionHeading
            id="how-title"
            align="center"
            eyebrow={t("how.eyebrow")}
            title={t("how.title")}
            description={t("how.description")}
          />
          <div className="mt-14">
            <ProcessSteps
              steps={[
                {
                  icon: Smartphone,
                  title: t("how.steps.book.title"),
                  text: t("how.steps.book.text"),
                },
                {
                  icon: UserRoundCheck,
                  title: t("how.steps.match.title"),
                  text: t("how.steps.match.text"),
                },
                { icon: Home, title: t("how.steps.visit.title"), text: t("how.steps.visit.text") },
                {
                  icon: ClipboardCheck,
                  title: t("how.steps.after.title"),
                  text: t("how.steps.after.text"),
                },
              ]}
            />
          </div>
        </div>
      </section>

      <PlatformSection />
      <CarePlatformCta />
    </>
  );
}
