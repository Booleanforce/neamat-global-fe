import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ChevronDown, Globe2, LayoutGrid, UsersRound } from "lucide-react";
import { GoldPillButton } from "@neamat/ui/components/brand/gold-pill-button";
import { CountUp, Reveal } from "@neamat/ui/components/brand/reveal";
import { businessHref, careHref, sections } from "@/config/site";
import { businesses } from "@/content/businesses";

/** Section 2 — immersive hero: skyline, layered navy/gold light, glass stats and business strip. */
export async function Hero() {
  const t = await getTranslations("Hero");
  const tBusinesses = await getTranslations("Businesses.items");
  const locale = await getLocale();

  const stats = [
    // Positioned to keep the Kingdom Centre tower (≈ end 34–42%) clear.
    { key: "units", to: 4, suffix: "", icon: LayoutGrid, className: "top-[14%] end-[5%]" },
    { key: "team", to: 1000, suffix: "+", icon: UsersRound, className: "top-[40%] end-[14%]" },
    { key: "markets", to: 2, suffix: "", icon: Globe2, className: "top-[64%] end-[3%]" },
  ] as const;

  return (
    <section aria-labelledby="hero-title" className="bg-navy-ink relative isolate overflow-hidden">
      {/* Photo + light layers */}
      <Image
        src="/images/hero/riyadh-skyline.webp"
        alt={t("imageAlt")}
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover object-[70%_60%] rtl:-scale-x-100"
      />
      <div
        aria-hidden="true"
        className="from-navy-ink/90 via-navy-deep/75 to-navy-deep/60 md:from-navy-ink md:via-navy-deep/80 md:to-navy/10 absolute inset-0 -z-20 bg-linear-to-b md:bg-linear-to-r rtl:md:bg-linear-to-l"
      />
      <div aria-hidden="true" className="bg-grid-light mask-fade-b absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="bg-gold/25 glow absolute -start-40 top-1/3 -z-10 size-[520px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="bg-navy-bright/40 glow absolute end-1/4 -top-40 -z-10 size-[420px] rounded-full"
      />

      <div className="container-site relative flex min-h-[620px] flex-col justify-center pt-20 pb-36 sm:min-h-[680px] lg:min-h-[740px] lg:pb-40">
        <div className="max-w-2xl">
          <Reveal>
            <p className="glass-dark text-on-navy inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-medium">
              <span className="relative flex size-2">
                <span className="animate-pulse-ring bg-gold absolute inset-0 rounded-full motion-reduce:animate-none" />
                <span className="bg-gold relative size-2 rounded-full" />
              </span>
              {t("badge")}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="text-gold mt-6 text-sm font-semibold tracking-wide sm:text-base">
              {t("eyebrow.solutions")} <span className="text-white">{t("eyebrow.people")}</span>{" "}
              {t("eyebrow.progress")} {t("eyebrow.together")}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <h1
              id="hero-title"
              className="mt-3 text-[42px] leading-[1.04] font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              {t("titleLine1")}
              <br />
              {t("titleLine2")}
              <br />
              <span className="text-gradient-gold">{t("titleHighlight")}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="text-on-navy mt-6 max-w-lg text-base leading-relaxed">
              {t("description")}
            </p>
          </Reveal>

          <Reveal delay={0.32} className="mt-9 flex flex-wrap items-center gap-3">
            <GoldPillButton href={`/${locale}/businesses`} size="lg" className="shadow-glow-gold">
              {t("cta")}
            </GoldPillButton>
            <Link
              href={careHref(locale)}
              className="glass-dark inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/15"
            >
              {t("secondaryCta")}
            </Link>
          </Reveal>
        </div>

        {/* Floating glass stats (desktop) */}
        <ul className="pointer-events-none absolute inset-0 hidden xl:block">
          {stats.map(({ key, to, suffix, icon: Icon, className }, index) => (
            <li key={key} className={`absolute ${className}`}>
              <Reveal delay={0.4 + index * 0.12} direction="end">
                <div className="animate-float glass-dark shadow-glow-navy flex items-center gap-3 rounded-2xl px-5 py-4 motion-reduce:animate-none">
                  <span className="bg-gold text-navy-deep shadow-glow-gold grid size-11 place-items-center rounded-xl">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="leading-tight">
                    <CountUp
                      to={to}
                      suffix={suffix}
                      locale={locale}
                      className="block text-2xl font-extrabold text-white"
                    />
                    <span className="text-on-navy block text-xs">{t(`stats.${key}`)}</span>
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      {/* Business-unit strip */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="container-site pb-6">
          <Reveal delay={0.5}>
            <nav
              aria-label={t("unitsLabel")}
              className="glass-dark grid grid-cols-2 gap-px overflow-hidden rounded-2xl md:grid-cols-4"
            >
              {businesses.map((business) => {
                const Icon = business.icon;
                return (
                  <Link
                    key={business.key}
                    href={business.href ?? businessHref(locale, business.key)}
                    className="group flex min-h-16 items-center gap-3 px-4 py-3 transition-colors hover:bg-white/10"
                  >
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-lg text-white transition-transform group-hover:scale-110 ${business.accent.tile}`}
                    >
                      <Icon aria-hidden="true" className="size-4.5" />
                    </span>
                    <span className="min-w-0 leading-tight">
                      <span className="block truncate text-sm font-bold text-white" dir="ltr">
                        {business.plainName}
                      </span>
                      <span className="text-on-navy block truncate text-[11px]">
                        {tBusinesses(`${business.key}.category`)}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </nav>
          </Reveal>
        </div>
      </div>

      <a
        href={`#${sections.businesses}`}
        className="text-on-navy absolute start-1/2 bottom-28 hidden -translate-x-1/2 flex-col items-center gap-1 text-[11px] lg:flex rtl:translate-x-1/2"
      >
        <span className="sr-only">{t("scroll")}</span>
        <ChevronDown
          aria-hidden="true"
          className="text-gold size-5 animate-bounce motion-reduce:animate-none"
        />
      </a>
    </section>
  );
}
