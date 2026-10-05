import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowUpRight,
  CalendarCheck,
  ClipboardList,
  Headset,
  Mail,
  MessageCircle,
  Phone,
  SearchCheck,
  Timer,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@neamat/ui/components/brand/reveal";
import { cn } from "@neamat/ui/lib/utils";
import { PageHero } from "@/components/common/page-hero";
import { ProcessSteps } from "@/components/common/process-steps";
import { QuickLinks } from "@/components/common/quick-links";
import { SectionHeading } from "@/components/common/section-heading";
import { careHref, contactInfo, telHref } from "@/config/site";
import { businesses } from "@/content/businesses";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/support", "SupportPage", "/images/pages/support.webp");
}

/** Customer Support — contact channels, help per business unit and how requests are handled. */
export default async function SupportPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SupportPage");
  const tCommon = await getTranslations("Common");

  const channels = [
    {
      key: "phone",
      icon: Phone,
      href: telHref(contactInfo.phoneSaudi),
      value: contactInfo.phoneSaudi,
      ltr: true,
    },
    {
      key: "email",
      icon: Mail,
      href: `mailto:${contactInfo.supportEmail}`,
      value: contactInfo.supportEmail,
      ltr: true,
    },
    { key: "chat", icon: MessageCircle, href: null, value: t("channels.chat.value"), ltr: false },
    {
      key: "booking",
      icon: CalendarCheck,
      href: careHref(locale),
      value: t("channels.booking.value"),
      ltr: false,
    },
  ] as const;

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
        image={{ src: "/images/pages/support.webp", alt: t("imageAlt") }}
      />

      {/* Channels overlap the hero */}
      <div className="relative z-10 -mt-12 lg:-mt-16">
        <div className="container-site">
          <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map(({ key, icon: Icon, href, value, ltr }) => {
              const body = (
                <>
                  <span className="bg-navy text-gold group-hover:bg-gold group-hover:text-navy-deep grid size-12 place-items-center rounded-xl transition-colors duration-300">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <span className="text-navy-deep mt-5 block text-lg font-bold">
                    {t(`channels.${key}.title`)}
                  </span>
                  <span className="text-body mt-1 block text-sm">{t(`channels.${key}.text`)}</span>
                  <span
                    className="text-navy mt-4 block truncate text-sm font-semibold"
                    dir={ltr ? "ltr" : undefined}
                  >
                    {value}
                  </span>
                </>
              );
              const cardClass =
                "group shadow-elevated ring-border relative block h-full rounded-[1.5rem] bg-white p-6 ring-1 transition-transform duration-300 hover:-translate-y-1";
              return (
                <StaggerItem as="li" key={key}>
                  {href ? (
                    <Link href={href} className={cardClass}>
                      {body}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="text-navy absolute end-5 top-6 size-5 rtl:-scale-x-100"
                      />
                    </Link>
                  ) : (
                    <div className={cardClass}>{body}</div>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>

      <section
        aria-labelledby="units-support-title"
        className="bg-mesh-light relative isolate overflow-hidden pt-20 pb-20 lg:pt-28 lg:pb-28"
      >
        <div className="container-site">
          <SectionHeading
            id="units-support-title"
            eyebrow={t("units.eyebrow")}
            title={
              <>
                {t("units.title")}{" "}
                <span className="text-gradient-navy">{t("units.titleHighlight")}</span>
              </>
            }
            description={t("units.description")}
          />
          <Stagger as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {businesses.map(({ key, plainName, icon: Icon, accent }) => (
              <StaggerItem as="li" key={key}>
                <article className="group shadow-card ring-border hover:shadow-elevated relative flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white p-7 ring-1 transition-[transform,box-shadow] duration-300 hover:-translate-y-1">
                  <span
                    aria-hidden="true"
                    className={cn("absolute inset-x-0 top-0 h-1.5", accent.tile)}
                  />
                  <span
                    className={cn(
                      "grid size-12 place-items-center rounded-xl text-white",
                      accent.tile,
                    )}
                  >
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <h3 className="text-navy-deep mt-5 text-xl font-bold">
                    <bdi>{plainName}</bdi>
                  </h3>
                  <p className="text-body mt-2 text-sm leading-relaxed">
                    {t(`units.items.${key}`)}
                  </p>
                  <a
                    href={`mailto:${contactInfo.supportEmail}?subject=${encodeURIComponent(plainName)}`}
                    className={cn(
                      "mt-auto inline-flex min-h-11 items-center gap-1.5 pt-5 text-sm font-semibold",
                      accent.text,
                    )}
                  >
                    {t("units.cta")}
                    <span className="sr-only"> — {plainName}</span>
                    <ArrowUpRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
                  </a>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section
        aria-labelledby="process-title"
        className="bg-mesh-navy relative isolate overflow-hidden py-20 lg:py-28"
      >
        <div aria-hidden="true" className="bg-grid-light mask-fade-b absolute inset-0 -z-10" />
        <div className="container-site">
          <SectionHeading
            id="process-title"
            tone="dark"
            align="center"
            eyebrow={t("process.eyebrow")}
            title={
              <>
                {t("process.title")}{" "}
                <span className="text-gradient-gold">{t("process.titleHighlight")}</span>
              </>
            }
          />
          <div className="mt-14">
            <ProcessSteps
              tone="dark"
              steps={[
                {
                  icon: ClipboardList,
                  title: t("process.steps.log.title"),
                  text: t("process.steps.log.text"),
                },
                {
                  icon: SearchCheck,
                  title: t("process.steps.assign.title"),
                  text: t("process.steps.assign.text"),
                },
                {
                  icon: Headset,
                  title: t("process.steps.resolve.title"),
                  text: t("process.steps.resolve.text"),
                },
              ]}
            />
          </div>
          <Reveal>
            <ul className="mt-12 flex flex-wrap justify-center gap-3">
              {(["hours", "response", "languages"] as const).map((key) => (
                <li
                  key={key}
                  className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white"
                >
                  <Timer aria-hidden="true" className="text-gold size-4" />
                  {t(`process.chips.${key}`)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <QuickLinks exclude="support" />
    </>
  );
}
