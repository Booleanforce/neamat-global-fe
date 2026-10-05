import { getLocale, getTranslations } from "next-intl/server";
import { CalendarDays, Mail } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { contactInfo } from "@/config/site";
import { newsDateFormat } from "@/lib/metadata";

type LegalDocumentProps = {
  namespace: "PrivacyPage" | "TermsPage";
  sections: readonly string[];
  /** ISO date of the last revision. */
  updated: string;
};

/**
 * Legal page template (Privacy, Terms): compact hero, sticky table of contents and numbered
 * sections. Section paragraphs are message arrays (`sections.<key>.body`).
 */
export async function LegalDocument({ namespace, sections, updated }: LegalDocumentProps) {
  const t = await getTranslations(namespace);
  const tLegal = await getTranslations("Legal");
  const tCommon = await getTranslations("Common");
  const locale = await getLocale();

  return (
    <>
      <PageHero
        compact
        homeHref={`/${locale}`}
        homeLabel={tCommon("home")}
        breadcrumbLabel={tCommon("breadcrumb")}
        breadcrumb={t("breadcrumb")}
        eyebrow={tLegal("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      >
        <p className="glass-dark mt-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white">
          <CalendarDays aria-hidden="true" className="text-gold size-4" />
          {tLegal("updated")}{" "}
          <time dateTime={updated}>{newsDateFormat(locale, "long").format(new Date(updated))}</time>
        </p>
      </PageHero>

      <div className="bg-white py-16 lg:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav
              aria-labelledby="toc-title"
              className="bg-surface ring-border rounded-2xl p-5 ring-1"
            >
              <h2
                id="toc-title"
                className="text-navy-deep text-xs font-bold tracking-[0.14em] uppercase"
              >
                {tLegal("contents")}
              </h2>
              <ol className="mt-4 grid gap-1">
                {sections.map((key, index) => (
                  <li key={key}>
                    <a
                      href={`#${key}`}
                      className="text-body hover:text-navy-deep flex min-h-10 items-center gap-3 rounded-lg px-2 text-sm hover:bg-white"
                    >
                      <span className="text-navy w-5 shrink-0 text-xs font-bold tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {t(`sections.${key}.title`)}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="max-w-3xl">
            <p className="text-navy-deep text-lg leading-relaxed font-medium">{t("intro")}</p>
            {sections.map((key, index) => (
              <section key={key} id={key} aria-labelledby={`${key}-title`} className="scroll-mt-28">
                <h2
                  id={`${key}-title`}
                  className="text-navy-deep border-border mt-12 flex items-baseline gap-3 border-t pt-10 text-2xl font-extrabold"
                >
                  <span className="text-navy text-base tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {t(`sections.${key}.title`)}
                </h2>
                {(t.raw(`sections.${key}.body`) as string[]).map((paragraph) => (
                  <p key={paragraph} className="text-body mt-4 text-base leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            <div className="bg-mesh-navy relative isolate mt-14 overflow-hidden rounded-2xl p-7 text-white">
              <div aria-hidden="true" className="bg-grid-light absolute inset-0 -z-10" />
              <h2 className="text-xl font-bold">{tLegal("questions")}</h2>
              <p className="text-on-navy mt-2 text-sm leading-relaxed">{tLegal("questionsText")}</p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="bg-gold text-navy-deep hover:bg-gold-hover mt-5 inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors"
              >
                <Mail aria-hidden="true" className="size-4" />
                <span dir="ltr">{contactInfo.email}</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
