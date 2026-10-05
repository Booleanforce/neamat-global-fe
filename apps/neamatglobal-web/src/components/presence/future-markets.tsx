import { getTranslations } from "next-intl/server";
import { Compass, Globe2, Rocket } from "lucide-react";
import { Stagger, StaggerItem } from "@neamat/ui/components/brand/reveal";
import { cn } from "@neamat/ui/lib/utils";
import { SectionHeading } from "@/components/common/section-heading";

const regions = [
  { key: "gcc", icon: Rocket, status: "next", featured: true },
  { key: "southAsia", icon: Compass, status: "exploring", featured: false },
  { key: "mena", icon: Globe2, status: "longTerm", featured: false },
] as const;

/** Global Presence page — where the group plans to grow next. */
export async function FutureMarkets() {
  const t = await getTranslations("PresencePage.future");

  return (
    <section aria-labelledby="future-title" className="bg-white py-20 lg:py-28">
      <div className="container-site">
        <SectionHeading
          id="future-title"
          align="center"
          eyebrow={t("eyebrow")}
          title={
            <>
              {t("title")} <span className="text-gradient-navy">{t("titleHighlight")}</span>
            </>
          }
          description={t("description")}
        />
        <Stagger as="ul" className="mt-14 grid gap-6 md:grid-cols-3">
          {regions.map(({ key, icon: Icon, status, featured }) => (
            <StaggerItem as="li" key={key}>
              <article
                className={cn(
                  "group relative isolate h-full overflow-hidden rounded-[1.75rem] p-8 transition-transform duration-300 hover:-translate-y-1.5",
                  featured
                    ? "bg-mesh-navy shadow-glow-navy text-white"
                    : "bg-surface ring-border hover:shadow-elevated ring-1",
                )}
              >
                {featured && (
                  <div aria-hidden="true" className="bg-grid-light absolute inset-0 -z-10" />
                )}
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      "grid size-14 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110",
                      featured
                        ? "bg-gold text-navy-deep shadow-glow-gold"
                        : "bg-navy shadow-glow-navy text-white",
                    )}
                  >
                    <Icon aria-hidden="true" className="size-7" />
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-bold",
                      featured ? "bg-gold/15 text-gold" : "bg-navy/10 text-navy",
                    )}
                  >
                    {t(`status.${status}`)}
                  </span>
                </div>
                <h3
                  className={cn(
                    "mt-6 text-2xl font-extrabold",
                    featured ? "text-white" : "text-navy-deep",
                  )}
                >
                  {t(`regions.${key}.title`)}
                </h3>
                <p
                  className={cn(
                    "mt-3 text-sm leading-relaxed",
                    featured ? "text-on-navy" : "text-body",
                  )}
                >
                  {t(`regions.${key}.text`)}
                </p>
                <p
                  className={cn("mt-5 text-xs font-semibold", featured ? "text-gold" : "text-navy")}
                >
                  {t(`regions.${key}.countries`)}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
