import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Quote } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@neamat/ui/components/brand/reveal";
import { SectionEyebrow } from "@neamat/ui/components/brand/section-eyebrow";

const pillars = ["ownership", "curiosity", "care"] as const;

/** Careers — navy culture chapter: team photo collage, a quote and three working principles. */
export async function CultureSection() {
  const t = await getTranslations("CareersPage.culture");

  return (
    <section
      aria-labelledby="culture-title"
      className="bg-mesh-navy relative isolate overflow-hidden py-20 lg:py-28"
    >
      <div aria-hidden="true" className="bg-grid-light mask-fade-b absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="bg-gold/20 glow absolute -end-32 bottom-0 -z-10 size-[420px] rounded-full"
      />
      <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal direction="start" className="relative">
          <div className="grid grid-cols-[1.1fr_1fr] gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] ring-1 ring-white/15">
              <Image
                src="/images/pages/careers-culture.webp"
                alt={t("imageAlt")}
                fill
                quality={85}
                sizes="(min-width: 1024px) 320px, 50vw"
                className="object-cover"
              />
            </div>
            <div className="mt-12 grid gap-4">
              <div className="relative aspect-square overflow-hidden rounded-[1.75rem] ring-1 ring-white/15">
                <Image
                  src="/images/pages/careers.webp"
                  alt={t("imageAlt2")}
                  fill
                  sizes="(min-width: 1024px) 280px, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="bg-gold text-navy-deep shadow-glow-gold rounded-[1.75rem] p-5">
                <p className="text-3xl font-extrabold">{t("badge.value")}</p>
                <p className="mt-1 text-sm font-semibold">{t("badge.label")}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionEyebrow tone="dark">{t("eyebrow")}</SectionEyebrow>
            <h2
              id="culture-title"
              className="mt-4 text-3xl leading-[1.12] font-extrabold tracking-tight text-white sm:text-4xl lg:text-[44px]"
            >
              {t("title")} <span className="text-gradient-gold">{t("titleHighlight")}</span>
            </h2>
            <figure className="glass-dark mt-8 rounded-2xl p-6">
              <Quote aria-hidden="true" className="text-gold size-7" />
              <blockquote className="mt-3 text-lg leading-relaxed font-medium text-white">
                {t("quote")}
              </blockquote>
              <figcaption className="text-on-navy mt-3 text-sm">— {t("quoteBy")}</figcaption>
            </figure>
          </Reveal>
          <Stagger as="ul" className="mt-8 grid gap-4 sm:grid-cols-3">
            {pillars.map((key) => (
              <StaggerItem as="li" key={key}>
                <div className="border-gold h-full border-s-2 ps-4">
                  <h3 className="font-bold text-white">{t(`pillars.${key}.title`)}</h3>
                  <p className="text-on-navy mt-1 text-sm leading-relaxed">
                    {t(`pillars.${key}.text`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
