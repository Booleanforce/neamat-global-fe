import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Building, Factory, MapPin } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@neamat/ui/components/brand/reveal";
import { cn } from "@neamat/ui/lib/utils";
import { SectionHeading } from "@/components/common/section-heading";
import { businesses, type BusinessKey } from "@/content/businesses";

const markets: {
  key: "saudi" | "bangladesh";
  image: string;
  icon: typeof Building;
  units: BusinessKey[];
}[] = [
  {
    key: "saudi",
    image: "/images/presence/saudi-arabia.webp",
    icon: Building,
    units: ["neopure", "propertyos", "booleanforce", "neamatcare"],
  },
  {
    key: "bangladesh",
    image: "/images/presence/bangladesh.webp",
    icon: Factory,
    units: ["neopure", "propertyos", "booleanforce", "neamatcare"],
  },
];

const highlightKeys = ["h1", "h2", "h3"] as const;

/** Global Presence page — a profile card for each country we operate in. */
export async function MarketProfiles() {
  const t = await getTranslations("PresencePage.markets");
  const tPresence = await getTranslations("Presence.markets");

  return (
    <section
      aria-labelledby="markets-title"
      className="bg-mesh-light relative isolate overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28"
    >
      <div
        aria-hidden="true"
        className="bg-dots-gold absolute -end-24 top-20 -z-10 size-72 rounded-full opacity-50"
      />
      <div className="container-site">
        <SectionHeading
          id="markets-title"
          eyebrow={t("eyebrow")}
          title={
            <>
              {t("title")} <span className="text-gradient-navy">{t("titleHighlight")}</span>
            </>
          }
          description={t("description")}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {markets.map(({ key, image, icon: Icon, units }, index) => (
            <Reveal key={key} delay={index * 0.1} className="h-full">
              <article className="group shadow-elevated ring-border flex h-full flex-col overflow-hidden rounded-[2rem] bg-white ring-1">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={image}
                    alt={tPresence(`${key}.imageAlt`)}
                    fill
                    quality={85}
                    sizes="(min-width: 1024px) 640px, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="from-navy-ink/85 via-navy-deep/20 absolute inset-0 bg-linear-to-t to-transparent"
                  />
                  <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-gold flex items-center gap-1.5 text-sm font-semibold">
                        <MapPin aria-hidden="true" className="size-4" />
                        {t(`${key}.city`)}
                      </p>
                      <h3 className="mt-1 text-3xl font-extrabold text-white">
                        {tPresence(`${key}.name`)}
                      </h3>
                    </div>
                    <span className="glass-dark text-gold inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold">
                      <Icon aria-hidden="true" className="size-3.5" />
                      {tPresence(`${key}.role`)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <p className="text-body text-base leading-relaxed">{t(`${key}.text`)}</p>
                  <Stagger as="ul" className="mt-6 grid gap-3">
                    {highlightKeys.map((highlight) => (
                      <StaggerItem as="li" key={highlight}>
                        <div className="bg-surface flex items-start gap-3 rounded-xl p-4">
                          <span className="bg-gold mt-1.5 size-2 shrink-0 rounded-full" />
                          <span className="text-navy-deep text-sm font-medium">
                            {t(`${key}.highlights.${highlight}`)}
                          </span>
                        </div>
                      </StaggerItem>
                    ))}
                  </Stagger>
                  <div className="mt-auto pt-7">
                    <p className="text-body border-border border-t pt-5 text-xs font-semibold tracking-wide uppercase">
                      {t("unitsLabel")}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {units.map((unitKey) => {
                        const unit = businesses.find((business) => business.key === unitKey);
                        if (!unit) return null;
                        const UnitIcon = unit.icon;
                        return (
                          <li
                            key={unitKey}
                            className="ring-border text-navy-deep inline-flex items-center gap-1.5 rounded-full bg-white py-1 ps-1 pe-3 text-xs font-semibold ring-1"
                          >
                            <span
                              className={cn(
                                "grid size-6 place-items-center rounded-full text-white",
                                unit.accent.tile,
                              )}
                            >
                              <UnitIcon aria-hidden="true" className="size-3.5" />
                            </span>
                            <bdi>{unit.plainName}</bdi>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
