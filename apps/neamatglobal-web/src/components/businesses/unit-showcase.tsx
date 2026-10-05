import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { CircleCheck } from "lucide-react";
import { GoldPillButton } from "@neamat/ui/components/brand/gold-pill-button";
import { Reveal, Stagger, StaggerItem } from "@neamat/ui/components/brand/reveal";
import { cn } from "@neamat/ui/lib/utils";
import { careHref } from "@/config/site";
import type { Business } from "@/content/businesses";

const featureKeys = ["f1", "f2", "f3", "f4"] as const;

/**
 * One business unit on the Our Businesses page: photo with a floating stat card and the unit's
 * colour glow, beside copy, features and CTA. Odd units mirror the layout.
 */
export async function UnitShowcase({ business, index }: { business: Business; index: number }) {
  const t = await getTranslations("BusinessesPage.units");
  const tItems = await getTranslations("Businesses.items");
  const locale = await getLocale();
  const Icon = business.icon;
  const reversed = index % 2 === 1;
  const key = business.key;

  const cta =
    key === "neamatcare"
      ? { href: careHref(locale), variant: "gold" as const }
      : { href: `/${locale}/contact`, variant: "navy" as const };

  return (
    <section
      id={key}
      aria-labelledby={`${key}-title`}
      className={cn(
        "relative isolate scroll-mt-24 overflow-hidden py-20 lg:py-28",
        reversed ? "bg-surface" : "bg-white",
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "glow absolute top-1/4 -z-10 size-[420px] rounded-full opacity-[0.12]",
          business.accent.tile,
          reversed ? "-end-40" : "-start-40",
        )}
      />
      <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Photo */}
        <Reveal direction={reversed ? "end" : "start"} className={cn(reversed && "lg:order-2")}>
          <div className="relative">
            <div
              aria-hidden="true"
              className={cn(
                "absolute -inset-3 -z-10 rotate-2 rounded-[2.25rem] opacity-20",
                business.accent.tile,
              )}
            />
            <div className="group shadow-elevated relative aspect-[4/3] overflow-hidden rounded-[2rem]">
              <Image
                src={business.image}
                alt={tItems(`${key}.imageAlt`)}
                fill
                quality={85}
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="from-navy-ink/50 absolute inset-0 bg-linear-to-t via-transparent to-transparent"
              />
            </div>
            <div
              className={cn(
                "glass-light shadow-elevated animate-float-slow absolute -bottom-6 flex items-center gap-3 rounded-2xl px-5 py-4 motion-reduce:animate-none",
                reversed ? "-start-2 sm:-start-6" : "-end-2 sm:-end-6",
              )}
            >
              <span
                className={cn(
                  "grid size-11 place-items-center rounded-xl text-white",
                  business.accent.tile,
                )}
              >
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <span>
                <span className="text-navy-deep block text-2xl leading-none font-extrabold">
                  {t(`${key}.stat.value`)}
                </span>
                <span className="text-body mt-1 block text-xs font-medium">
                  {t(`${key}.stat.label`)}
                </span>
              </span>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="text-navy/10 text-6xl leading-none font-black">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-bold tracking-wide text-white uppercase",
                  business.accent.tile,
                )}
              >
                {tItems(`${key}.category`)}
              </span>
            </div>
            <h2
              id={`${key}-title`}
              className="text-navy-deep mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl"
            >
              <bdi>
                {business.name.base}
                <span className={business.accent.text}>{business.name.accent}</span>
              </bdi>
            </h2>
            <p className="text-navy-deep mt-4 text-xl leading-snug font-semibold">
              {t(`${key}.headline`)}
            </p>
            <p className="text-body mt-4 text-base leading-relaxed">{t(`${key}.text`)}</p>
          </Reveal>

          <Stagger as="ul" className="mt-8 grid gap-3 sm:grid-cols-2">
            {featureKeys.map((feature) => (
              <StaggerItem as="li" key={feature}>
                <div className="ring-border flex h-full items-start gap-3 rounded-xl bg-white p-4 ring-1">
                  <CircleCheck
                    aria-hidden="true"
                    className={cn("mt-0.5 size-5 shrink-0", business.accent.text)}
                  />
                  <span className="text-navy-deep text-sm font-medium">
                    {t(`${key}.features.${feature}`)}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <GoldPillButton
              href={cta.href}
              variant={cta.variant}
              size="lg"
              className={cn(
                "mt-9",
                cta.variant === "gold" ? "shadow-glow-gold" : "shadow-glow-navy",
              )}
            >
              {t(`${key}.cta`)}
            </GoldPillButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
