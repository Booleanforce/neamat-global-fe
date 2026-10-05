import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Building, Clock, Factory, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@neamat/ui/components/brand/reveal";
import { SectionEyebrow } from "@neamat/ui/components/brand/section-eyebrow";
import { PageHero } from "@/components/common/page-hero";
import { QuickLinks } from "@/components/common/quick-links";
import { ContactForm } from "@/components/contact/contact-form";
import { contactInfo, telHref } from "@/config/site";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/contact", "ContactPage", "/images/pages/contact.webp");
}

/** Contact — enquiry form beside direct channels and both offices. */
export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ContactPage");
  const tCommon = await getTranslations("Common");

  const offices = [
    { key: "riyadh", icon: Building, phone: contactInfo.phoneSaudi },
    { key: "dhaka", icon: Factory, phone: contactInfo.phoneBangladesh },
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
        image={{ src: "/images/pages/contact.webp", alt: t("imageAlt") }}
      />

      <section
        aria-labelledby="contact-form-title"
        className="bg-mesh-light relative isolate overflow-hidden py-20 lg:py-28"
      >
        <div
          aria-hidden="true"
          className="bg-dots-gold absolute -end-24 top-24 -z-10 size-72 rounded-full opacity-50"
        />
        <div className="container-site grid gap-8 lg:grid-cols-[1fr_1.45fr] lg:gap-10">
          {/* Direct channels + offices */}
          <Reveal direction="start" className="h-full">
            <aside className="bg-mesh-navy shadow-glow-navy relative isolate flex h-full flex-col overflow-hidden rounded-[2rem] p-7 text-white sm:p-9">
              <div aria-hidden="true" className="bg-grid-light absolute inset-0 -z-10" />
              <div
                aria-hidden="true"
                className="bg-gold/25 glow absolute -end-20 -bottom-20 -z-10 size-72 rounded-full"
              />
              <SectionEyebrow tone="dark">{t("direct.eyebrow")}</SectionEyebrow>
              <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">{t("direct.title")}</h2>
              <p className="text-on-navy mt-3 text-sm leading-relaxed">{t("direct.text")}</p>

              <ul className="mt-8 grid gap-3">
                <li>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="glass-dark group flex min-h-14 items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-white/10"
                  >
                    <span className="bg-gold text-navy-deep grid size-11 shrink-0 place-items-center rounded-xl">
                      <Mail aria-hidden="true" className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="text-on-navy block text-xs">{t("direct.email")}</span>
                      <span className="block truncate font-semibold" dir="ltr">
                        {contactInfo.email}
                      </span>
                    </span>
                  </a>
                </li>
                <li className="glass-dark flex items-center gap-4 rounded-2xl p-4">
                  <span className="bg-gold/15 text-gold grid size-11 shrink-0 place-items-center rounded-xl">
                    <Clock aria-hidden="true" className="size-5" />
                  </span>
                  <span>
                    <span className="text-on-navy block text-xs">{t("direct.hours")}</span>
                    <span className="block font-semibold">{t("direct.hoursValue")}</span>
                  </span>
                </li>
              </ul>

              <h3 className="text-gold mt-10 text-xs font-bold tracking-[0.14em] uppercase">
                {t("offices.title")}
              </h3>
              <ul className="mt-4 grid gap-4">
                {offices.map(({ key, icon: Icon, phone }) => (
                  <li key={key} className="border-gold border-s-2 ps-4">
                    <p className="flex items-center gap-2 font-bold">
                      <Icon aria-hidden="true" className="text-gold size-4" />
                      {t(`offices.${key}.name`)}
                      <span className="bg-gold/15 text-gold rounded-full px-2 py-0.5 text-[10px] font-bold">
                        {t(`offices.${key}.role`)}
                      </span>
                    </p>
                    <p className="text-on-navy mt-1.5 flex items-start gap-2 text-sm">
                      <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                      {t(`offices.${key}.address`)}
                    </p>
                    <a
                      href={telHref(phone)}
                      className="text-on-navy mt-1 inline-flex min-h-9 items-center gap-2 text-sm hover:text-white"
                    >
                      <Phone aria-hidden="true" className="size-4" />
                      <span dir="ltr">{phone}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>

          {/* Form */}
          <Reveal direction="end">
            <div className="shadow-elevated ring-border rounded-[2rem] bg-white p-7 ring-1 sm:p-10">
              <h2
                id="contact-form-title"
                className="text-navy-deep text-2xl font-extrabold tracking-tight sm:text-3xl"
              >
                {t("form.title")}
              </h2>
              <p className="text-body mt-2 text-sm leading-relaxed">{t("form.description")}</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <QuickLinks exclude="contact" />
    </>
  );
}
