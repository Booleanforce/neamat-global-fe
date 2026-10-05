import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Headset, Mail } from "lucide-react";
import { Reveal } from "@neamat/ui/components/brand/reveal";
import { PageHero } from "@/components/common/page-hero";
import { QuickLinks } from "@/components/common/quick-links";
import { SectionHeading } from "@/components/common/section-heading";
import { FaqTabs } from "@/components/help/faq-tabs";
import { contactInfo } from "@/config/site";
import { getDirection, routing, type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/help", "HelpPage", "/images/pages/help.webp");
}

/** Help Center — categorised FAQs and a route to a person when the answer isn't there. */
export default async function HelpPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("HelpPage");
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
        image={{ src: "/images/pages/help.webp", alt: t("imageAlt") }}
      />

      <section
        aria-labelledby="faq-title"
        className="bg-mesh-light relative isolate overflow-hidden py-20 lg:py-28"
      >
        <div
          aria-hidden="true"
          className="bg-dots-gold absolute -start-24 bottom-20 -z-10 size-72 rounded-full opacity-50"
        />
        <div className="container-site">
          <SectionHeading
            id="faq-title"
            eyebrow={t("faq.eyebrow")}
            title={t("faq.title")}
            description={t("faq.description")}
          />
          <div className="mt-12">
            <FaqTabs dir={getDirection(locale as Locale)} />
          </div>

          <Reveal>
            <div className="bg-mesh-navy shadow-glow-navy relative isolate mt-16 flex flex-col gap-6 overflow-hidden rounded-[2rem] p-8 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between">
              <div aria-hidden="true" className="bg-grid-light absolute inset-0 -z-10" />
              <div className="flex items-start gap-4">
                <span className="bg-gold text-navy-deep shadow-glow-gold grid size-14 shrink-0 place-items-center rounded-2xl">
                  <Headset aria-hidden="true" className="size-7" />
                </span>
                <div>
                  <h2 className="text-2xl font-extrabold">{t("still.title")}</h2>
                  <p className="text-on-navy mt-1 text-sm leading-relaxed">{t("still.text")}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/support`}
                  className="bg-gold text-navy-deep hover:bg-gold-hover inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors"
                >
                  {t("still.support")}
                  <ArrowRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
                </Link>
                <a
                  href={`mailto:${contactInfo.supportEmail}`}
                  className="glass-dark inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                >
                  <Mail aria-hidden="true" className="size-4" />
                  {t("still.email")}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <QuickLinks exclude="help" />
    </>
  );
}
