import { getTranslations } from "next-intl/server";
import { AirVent, Building2, Droplet, Hotel, Sparkles, Zap } from "lucide-react";
import { Stagger, StaggerItem } from "@neamat/ui/components/brand/reveal";
import { cn } from "@neamat/ui/lib/utils";
import { SectionHeading } from "@/components/common/section-heading";

const services = [
  { key: "water", icon: Droplet, tile: "bg-unit-neopure text-white" },
  { key: "ac", icon: AirVent, tile: "bg-navy text-white" },
  { key: "electrical", icon: Zap, tile: "bg-unit-booleanforce text-white" },
  { key: "cleaning", icon: Sparkles, tile: "bg-unit-neamatcare text-white" },
  { key: "property", icon: Hotel, tile: "bg-unit-propertyos text-white" },
  { key: "facility", icon: Building2, tile: "bg-gold text-navy-deep" },
] as const;

const tagKeys = ["t1", "t2", "t3"] as const;

/** NEAMAT CARE page — the six service lines. */
export async function CareServices() {
  const t = await getTranslations("CarePage.services");

  return (
    <section
      aria-labelledby="care-services-title"
      className="bg-mesh-light relative isolate overflow-hidden py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="bg-dots-gold absolute -start-24 top-1/3 -z-10 size-72 rounded-full opacity-50"
      />
      <div className="container-site">
        <SectionHeading
          id="care-services-title"
          eyebrow={t("eyebrow")}
          title={
            <>
              {t("title")} <span className="text-gradient-navy">{t("titleHighlight")}</span>
            </>
          }
          description={t("description")}
        />
        <Stagger as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ key, icon: Icon, tile }) => (
            <StaggerItem as="li" key={key}>
              <article className="group shadow-card ring-border hover:shadow-elevated relative h-full overflow-hidden rounded-[1.5rem] bg-white p-7 ring-1 transition-[transform,box-shadow] duration-300 hover:-translate-y-1">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -end-10 -top-10 size-32 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150",
                    tile,
                  )}
                />
                <span
                  className={cn(
                    "shadow-card relative grid size-14 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3",
                    tile,
                  )}
                >
                  <Icon aria-hidden="true" className="size-7" />
                </span>
                <h3 className="text-navy-deep mt-6 text-xl font-bold">{t(`items.${key}.title`)}</h3>
                <p className="text-body mt-2 text-sm leading-relaxed">{t(`items.${key}.text`)}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {tagKeys.map((tag) => (
                    <li
                      key={tag}
                      className="bg-surface text-navy-deep rounded-full px-3 py-1 text-xs font-medium"
                    >
                      {t(`items.${key}.tags.${tag}`)}
                    </li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
