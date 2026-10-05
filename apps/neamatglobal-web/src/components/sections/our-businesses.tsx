import type { ReactNode } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { BusinessCard } from "@neamat/ui/components/brand/business-card";
import { Stagger, StaggerItem } from "@neamat/ui/components/brand/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { businessHref, sections } from "@/config/site";
import { businesses } from "@/content/businesses";

type OurBusinessesProps = {
  /** Override heading (the About page reuses the grid with its own copy). */
  eyebrow?: string;
  title?: ReactNode;
  id?: string;
};

/** Section 3 — Our Businesses: 4 → 2 → 1 column grid of vibrant unit cards. */
export async function OurBusinesses({
  eyebrow,
  title,
  id = sections.businesses,
}: OurBusinessesProps = {}) {
  const t = await getTranslations("Businesses");
  const tCommon = await getTranslations("Common");
  const locale = await getLocale();

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="bg-mesh-light relative isolate scroll-mt-20 overflow-hidden py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="bg-grid-navy mask-fade-b absolute inset-0 -z-10 opacity-60"
      />
      <div
        aria-hidden="true"
        className="bg-dots-gold absolute -end-20 top-10 -z-10 size-64 rounded-full opacity-60"
      />

      <div className="container-site">
        <SectionHeading
          id={`${id}-title`}
          eyebrow={eyebrow ?? t("eyebrow")}
          title={
            title ?? (
              <>
                {t("title")} <span className="text-gradient-navy">{t("titleHighlight")}</span>
              </>
            )
          }
          aside={
            <p className="text-body max-w-sm text-base leading-relaxed lg:text-end">{t("intro")}</p>
          }
        />

        <Stagger as="ul" className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {businesses.map((business, index) => {
            const Icon = business.icon;
            const href = business.href ?? businessHref(locale, business.key);
            return (
              <StaggerItem as="li" key={business.key}>
                <BusinessCard
                  index={String(index + 1).padStart(2, "0")}
                  name={business.name}
                  plainName={business.plainName}
                  category={t(`items.${business.key}.category`)}
                  description={t(`items.${business.key}.description`)}
                  icon={<Icon strokeWidth={2} />}
                  accent={business.accent}
                  image={{ src: business.image, alt: t(`items.${business.key}.imageAlt`) }}
                  href={href}
                  linkLabel={tCommon("learnMore")}
                />
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
