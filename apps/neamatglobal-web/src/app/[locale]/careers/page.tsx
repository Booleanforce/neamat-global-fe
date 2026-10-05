import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  BriefcaseBusiness,
  FileText,
  Globe2,
  Handshake,
  LayoutGrid,
  MessagesSquare,
  Send,
  UsersRound,
} from "lucide-react";
import { GoldPillButton } from "@neamat/ui/components/brand/gold-pill-button";
import { Reveal } from "@neamat/ui/components/brand/reveal";
import { BenefitsSection } from "@/components/careers/benefits-section";
import { CultureSection } from "@/components/careers/culture-section";
import { OpenRoles } from "@/components/careers/open-roles";
import { PageHero } from "@/components/common/page-hero";
import { ProcessSteps } from "@/components/common/process-steps";
import { SectionHeading } from "@/components/common/section-heading";
import { StatsBand } from "@/components/common/stats-band";
import { CtaBand } from "@/components/sections/cta-band";
import { contactInfo } from "@/config/site";
import { businesses } from "@/content/businesses";
import { openRoles } from "@/content/careers";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/careers", "CareersPage", "/images/pages/careers.webp");
}

/** Careers — why join, culture, open roles, hiring process. */
export default async function CareersPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CareersPage");
  const tCommon = await getTranslations("Common");

  const roles = openRoles.map((role) => {
    const unit = businesses.find((business) => business.key === role.unit);
    const title = t(`roles.items.${role.key}.title`);
    return {
      key: role.key,
      title,
      summary: t(`roles.items.${role.key}.summary`),
      unitName: unit?.plainName ?? "",
      unitTile: unit?.accent.tile ?? "bg-navy",
      location: t(`roles.locations.${role.location}`),
      locationKey: role.location,
      type: t(`roles.types.${role.type}`),
      applyHref: `mailto:${contactInfo.careersEmail}?subject=${encodeURIComponent(title)}`,
    };
  });

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
        image={{ src: "/images/pages/careers.webp", alt: t("imageAlt") }}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <GoldPillButton href="#open-roles" size="lg" className="shadow-glow-gold">
            {t("ctaRoles")}
          </GoldPillButton>
        </div>
      </PageHero>

      <StatsBand
        locale={locale}
        stats={[
          { icon: BriefcaseBusiness, value: openRoles.length, label: t("stats.roles") },
          { icon: LayoutGrid, value: 4, label: t("stats.units") },
          { icon: Globe2, value: 2, label: t("stats.countries") },
          { icon: UsersRound, value: 1000, suffix: "+", label: t("stats.team") },
        ]}
      />

      <BenefitsSection />
      <CultureSection />

      <section
        id="open-roles"
        aria-labelledby="roles-title"
        className="bg-surface scroll-mt-24 py-20 lg:py-28"
      >
        <div className="container-site">
          <SectionHeading
            id="roles-title"
            eyebrow={t("roles.eyebrow")}
            title={
              <>
                {t("roles.title")}{" "}
                <span className="text-gradient-navy">{t("roles.titleHighlight")}</span>
              </>
            }
            description={t("roles.description")}
          />
          <div className="mt-10">
            <OpenRoles
              roles={roles}
              filters={[
                { key: "all", label: t("roles.filterAll") },
                { key: "riyadh", label: t("roles.locations.riyadh") },
                { key: "dhaka", label: t("roles.locations.dhaka") },
              ]}
              filterLabel={t("roles.filterLabel")}
              applyLabel={t("roles.apply")}
              emptyLabel={t("roles.empty")}
              resultsTemplate={t.raw("roles.results") as string}
            />
          </div>
          <Reveal>
            <div className="border-gold/50 mt-8 flex flex-col items-start gap-4 rounded-2xl border border-dashed bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div>
                <p className="text-navy-deep text-lg font-bold">{t("roles.open.title")}</p>
                <p className="text-body mt-1 text-sm">{t("roles.open.text")}</p>
              </div>
              <a
                href={`mailto:${contactInfo.careersEmail}`}
                className="bg-gold text-navy-deep hover:bg-gold-hover inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors"
              >
                <Send aria-hidden="true" className="size-4 rtl:-scale-x-100" />
                {t("roles.open.cta")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="hiring-title" className="bg-white py-20 lg:py-28">
        <div className="container-site">
          <SectionHeading
            id="hiring-title"
            align="center"
            eyebrow={t("process.eyebrow")}
            title={t("process.title")}
            description={t("process.description")}
          />
          <div className="mt-14">
            <ProcessSteps
              steps={[
                {
                  icon: FileText,
                  title: t("process.steps.apply.title"),
                  text: t("process.steps.apply.text"),
                },
                {
                  icon: MessagesSquare,
                  title: t("process.steps.talk.title"),
                  text: t("process.steps.talk.text"),
                },
                {
                  icon: UsersRound,
                  title: t("process.steps.meet.title"),
                  text: t("process.steps.meet.text"),
                },
                {
                  icon: Handshake,
                  title: t("process.steps.welcome.title"),
                  text: t("process.steps.welcome.text"),
                },
              ]}
            />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
