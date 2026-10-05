import { getTranslations } from "next-intl/server";
import { Eye, HandHeart, Target } from "lucide-react";
import { Stagger, StaggerItem } from "@neamat/ui/components/brand/reveal";
import { cn } from "@neamat/ui/lib/utils";

const pillars = [
  { key: "mission", icon: Target, featured: false },
  { key: "vision", icon: Eye, featured: true },
  { key: "promise", icon: HandHeart, featured: false },
] as const;

/** About page — Mission / Vision / Promise cards (centre card highlighted in navy). */
export async function PillarsSection() {
  const t = await getTranslations("AboutPage.pillars");

  return (
    <section
      aria-label={`${t("mission.title")}, ${t("vision.title")}, ${t("promise.title")}`}
      className="bg-white py-20 lg:py-24"
    >
      <div className="container-site">
        <Stagger as="ul" className="grid gap-6 md:grid-cols-3">
          {pillars.map(({ key, icon: Icon, featured }) => (
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
                <span
                  className={cn(
                    "grid size-14 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                    featured
                      ? "bg-gold text-navy-deep shadow-glow-gold"
                      : "bg-navy shadow-glow-navy text-white",
                  )}
                >
                  <Icon aria-hidden="true" className="size-7" />
                </span>
                <h2
                  className={cn(
                    "mt-6 text-2xl font-extrabold",
                    featured ? "text-white" : "text-navy-deep",
                  )}
                >
                  {t(`${key}.title`)}
                </h2>
                <p
                  className={cn(
                    "mt-3 text-base leading-relaxed",
                    featured ? "text-on-navy" : "text-body",
                  )}
                >
                  {t(`${key}.text`)}
                </p>
                <span
                  aria-hidden="true"
                  className="bg-gold/15 glow absolute -end-6 -bottom-6 -z-10 size-32 rounded-full transition-opacity group-hover:opacity-100"
                />
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
