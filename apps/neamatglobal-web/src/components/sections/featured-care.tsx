import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Building2, CircleCheck, Droplet, Hotel, House, Sparkles } from "lucide-react";
import { GoldPillButton } from "@neamat/ui/components/brand/gold-pill-button";
import { Reveal, Stagger, StaggerItem } from "@neamat/ui/components/brand/reveal";
import { SectionEyebrow } from "@neamat/ui/components/brand/section-eyebrow";
import { Card, CardContent, CardHeader, CardTitle } from "@neamat/ui/components/ui/card";
import { cn } from "@neamat/ui/lib/utils";
import { careHref, sections } from "@/config/site";

const services = [
  {
    key: "water",
    icon: Droplet,
    tile: "bg-unit-neopure/12 text-unit-neopure ring-unit-neopure/25",
  },
  {
    key: "home",
    icon: House,
    tile: "bg-unit-neamatcare/12 text-unit-neamatcare ring-unit-neamatcare/25",
  },
  {
    key: "property",
    icon: Hotel,
    tile: "bg-unit-propertyos/12 text-unit-propertyos ring-unit-propertyos/25",
  },
  { key: "facility", icon: Building2, tile: "bg-navy/10 text-navy ring-navy/20" },
] as const;

const checklist = ["scheduled", "verified", "warranty", "history", "booking"] as const;

/** Section 5 — Featured Business: NEAMAT CARE ("Your Home. Our Care."). */
export async function FeaturedCare() {
  const t = await getTranslations("Featured");
  const locale = await getLocale();

  return (
    <section
      id={sections.care}
      aria-labelledby="care-title"
      className="bg-mesh-light relative isolate scroll-mt-20 overflow-hidden py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="bg-dots-gold absolute -start-24 bottom-10 -z-10 size-72 rounded-full opacity-50"
      />

      <div className="container-site">
        <Reveal>
          <div className="shadow-elevated ring-border relative overflow-hidden rounded-[2rem] bg-white ring-1 lg:grid lg:grid-cols-[1.15fr_1fr]">
            {/* Copy */}
            <div className="relative p-7 sm:p-10 lg:p-14">
              <div
                aria-hidden="true"
                className="bg-unit-neamatcare/10 glow absolute -start-24 -top-24 size-64 rounded-full"
              />
              <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>

              <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
                <div className="flex items-center gap-3">
                  <span className="bg-unit-neamatcare shadow-card relative grid size-16 shrink-0 place-items-center rounded-2xl text-white">
                    <span
                      aria-hidden="true"
                      className="bg-unit-neamatcare absolute inset-0 -z-10 rounded-2xl opacity-50 blur-lg"
                    />
                    <House aria-hidden="true" className="size-8" />
                  </span>
                  <p className="leading-tight">
                    <span className="text-navy-deep block text-2xl font-extrabold" dir="ltr">
                      NEAMAT <span className="text-unit-neamatcare">CARE</span>
                    </span>
                    <span className="text-muted-text mt-1 block max-w-44 text-xs">
                      {t("brandTagline")}
                    </span>
                  </p>
                </div>
              </div>

              <h2
                id="care-title"
                className="text-navy-deep mt-8 text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl"
              >
                {t("title")} <span className="text-gradient-gold">{t("titleLine2")}</span>
              </h2>
              <p className="text-body mt-4 max-w-md text-base leading-relaxed">
                {t("description")}
              </p>

              <Stagger as="ul" className="mt-9 grid gap-3 sm:grid-cols-2">
                {services.map(({ key, icon: Icon, tile }) => (
                  <StaggerItem as="li" key={key}>
                    <div className="group bg-surface ring-border hover:shadow-card-hover flex h-full items-start gap-3 rounded-2xl p-4 ring-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:-translate-y-1 hover:bg-white">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "grid size-11 shrink-0 place-items-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-110",
                          tile,
                        )}
                      >
                        <Icon className="size-5" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-navy-deep text-sm font-bold">
                          {t(`services.${key}.title`)}
                        </h3>
                        <p className="text-body mt-1 text-xs leading-snug">
                          {t(`services.${key}.description`)}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>

              <GoldPillButton
                href={careHref(locale)}
                variant="navy"
                size="lg"
                className="shadow-glow-navy mt-10"
              >
                {t("cta")}
              </GoldPillButton>
            </div>

            {/* Photo + floating checklist */}
            <div className="relative min-h-[380px] sm:min-h-[460px]">
              <Image
                src="/images/featured/family.webp"
                alt={t("imageAlt")}
                fill
                quality={85}
                // The panel is taller than 3:2, so object-cover renders the photo ~1.5× the
                // panel height wide — size for that, not the column width.
                sizes="(min-width: 1024px) 1400px, (min-width: 640px) 100vw, 720px"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="from-navy-deep/50 absolute inset-0 bg-linear-to-t via-transparent to-transparent lg:bg-linear-to-r lg:from-white/30 lg:via-transparent rtl:lg:bg-linear-to-l"
              />

              <Card className="animate-float-slow glass-light shadow-elevated absolute end-4 top-4 w-60 gap-2 rounded-2xl py-4 ring-0 motion-reduce:animate-none sm:end-6 sm:top-6">
                <CardHeader className="flex items-center gap-2 px-4">
                  <span className="bg-gold text-navy-deep grid size-7 place-items-center rounded-lg">
                    <Sparkles aria-hidden="true" className="size-4" />
                  </span>
                  <CardTitle className="text-navy-deep text-[13px] font-bold">
                    {t("checklist.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4">
                  <ul className="grid gap-2.5">
                    {checklist.map((item) => (
                      <li
                        key={item}
                        className="text-navy-deep flex items-center gap-2 text-xs font-medium"
                      >
                        <CircleCheck
                          aria-hidden="true"
                          className="fill-success size-4 shrink-0 text-white"
                        />
                        {t(`checklist.items.${item}`)}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
