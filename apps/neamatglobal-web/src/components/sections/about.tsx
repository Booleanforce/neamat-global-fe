import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Gem, LayoutGrid, MapPin, UsersRound } from "lucide-react";
import { GoldPillButton } from "@neamat/ui/components/brand/gold-pill-button";
import { CountUp, Reveal, Stagger, StaggerItem } from "@neamat/ui/components/brand/reveal";
import { SectionEyebrow } from "@neamat/ui/components/brand/section-eyebrow";
import { sections } from "@/config/site";

/** Section 4 — About: navy mesh, glass stat cards with counters, framed HQ photo. */
export async function About() {
  const t = await getTranslations("About");
  const tPresence = await getTranslations("Presence.markets");
  const locale = await getLocale();

  const stats = [
    {
      key: "units",
      icon: LayoutGrid,
      value: <CountUp to={4} locale={locale} />,
      label: t("stats.units.label"),
    },
    {
      key: "team",
      icon: UsersRound,
      value: <CountUp to={1000} suffix="+" locale={locale} />,
      label: t("stats.team.label"),
    },
    {
      key: "markets",
      icon: MapPin,
      value: <CountUp to={2} locale={locale} />,
      label: t("stats.markets.label"),
    },
    { key: "vision", icon: Gem, value: "∞", label: t("stats.vision.label") },
  ];

  return (
    <section
      id={sections.about}
      aria-labelledby="about-title"
      className="bg-mesh-navy relative isolate scroll-mt-20 overflow-hidden py-20 lg:py-28"
    >
      <div aria-hidden="true" className="bg-grid-light mask-fade-b absolute inset-0 -z-10" />

      <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <SectionEyebrow tone="dark">{t("eyebrow")}</SectionEyebrow>
            <h2
              id="about-title"
              className="mt-4 text-3xl leading-[1.12] font-extrabold tracking-tight text-white sm:text-4xl lg:text-[44px]"
            >
              {t("title")} <span className="text-gradient-gold">{t("titleHighlight")}</span>
            </h2>
            <p className="text-on-navy mt-5 max-w-xl text-base leading-relaxed">
              {t("description")}
            </p>
          </Reveal>

          <Stagger as="ul" className="mt-10 grid grid-cols-2 gap-4">
            {stats.map(({ key, icon: Icon, value, label }) => (
              <StaggerItem as="li" key={key}>
                <div className="group glass-dark h-full rounded-2xl p-5 transition-colors hover:bg-white/10">
                  <span className="bg-gold/15 text-gold ring-gold/30 grid size-11 place-items-center rounded-xl ring-1 transition-transform group-hover:scale-110">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <p className="mt-4 text-3xl font-extrabold text-white">{value}</p>
                  <p className="text-on-navy mt-1 text-sm">{label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <GoldPillButton href={`/${locale}/about`} size="lg" className="shadow-glow-gold mt-10">
              {t("cta")}
            </GoldPillButton>
          </Reveal>
        </div>

        <Reveal direction="end" className="relative">
          <div
            aria-hidden="true"
            className="bg-gold/20 absolute -inset-6 -z-10 rounded-[2.5rem] blur-3xl"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-1 ring-white/15 sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/images/about/headquarters.webp"
              alt={t("imageAlt")}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="from-navy-ink/80 absolute inset-0 bg-linear-to-t via-transparent to-transparent"
            />
          </div>

          <div className="animate-float-slow glass-dark shadow-glow-navy absolute start-6 end-6 -bottom-6 flex items-center gap-4 rounded-2xl p-4 motion-reduce:animate-none sm:start-auto sm:w-80">
            <span className="bg-gold text-navy-deep grid size-12 shrink-0 place-items-center rounded-xl">
              <MapPin aria-hidden="true" className="size-6" />
            </span>
            <p className="text-sm leading-snug">
              <span className="block font-bold text-white">
                {tPresence("bangladesh.name")} · {tPresence("saudi.name")}
              </span>
              <span className="text-on-navy">
                {tPresence("bangladesh.role")} · {tPresence("saudi.role")}
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
