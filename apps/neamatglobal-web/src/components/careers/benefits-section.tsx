import { getTranslations } from "next-intl/server";
import { Globe2, GraduationCap, HeartPulse, Rocket, Sparkles, Trophy } from "lucide-react";
import { Stagger, StaggerItem } from "@neamat/ui/components/brand/reveal";
import { cn } from "@neamat/ui/lib/utils";
import { SectionHeading } from "@/components/common/section-heading";

const benefits = [
  { key: "growth", icon: Rocket, tile: "bg-gold/20 text-gold-deep ring-gold/35" },
  { key: "impact", icon: Sparkles, tile: "bg-navy/10 text-navy ring-navy/20" },
  {
    key: "global",
    icon: Globe2,
    tile: "bg-unit-neopure/12 text-unit-neopure ring-unit-neopure/25",
  },
  {
    key: "learning",
    icon: GraduationCap,
    tile: "bg-unit-propertyos/12 text-unit-propertyos ring-unit-propertyos/25",
  },
  {
    key: "wellbeing",
    icon: HeartPulse,
    tile: "bg-unit-neamatcare/12 text-unit-neamatcare ring-unit-neamatcare/25",
  },
  {
    key: "recognition",
    icon: Trophy,
    tile: "bg-unit-booleanforce/12 text-unit-booleanforce ring-unit-booleanforce/25",
  },
] as const;

/** Careers — why work with us. */
export async function BenefitsSection() {
  const t = await getTranslations("CareersPage.benefits");

  return (
    <section
      aria-labelledby="benefits-title"
      className="bg-mesh-light relative isolate overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28"
    >
      <div
        aria-hidden="true"
        className="bg-dots-gold absolute -end-24 top-1/3 -z-10 size-72 rounded-full opacity-50"
      />
      <div className="container-site">
        <SectionHeading
          id="benefits-title"
          align="center"
          eyebrow={t("eyebrow")}
          title={
            <>
              {t("title")} <span className="text-gradient-navy">{t("titleHighlight")}</span>
            </>
          }
          description={t("description")}
        />
        <Stagger as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ key, icon: Icon, tile }) => (
            <StaggerItem as="li" key={key}>
              <article className="group shadow-card ring-border hover:shadow-elevated h-full rounded-2xl bg-white p-7 ring-1 transition-[transform,box-shadow] duration-300 hover:-translate-y-1">
                <span
                  className={cn(
                    "grid size-12 place-items-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-110",
                    tile,
                  )}
                >
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="text-navy-deep mt-5 text-lg font-bold">{t(`items.${key}.title`)}</h3>
                <p className="text-body mt-2 text-sm leading-relaxed">{t(`items.${key}.text`)}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
