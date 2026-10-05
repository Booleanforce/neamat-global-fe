import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CircleCheck, MapPin, ShieldCheck, Store, Wrench } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@neamat/ui/components/brand/reveal";
import { SectionEyebrow } from "@neamat/ui/components/brand/section-eyebrow";

const roles = [
  { key: "admin", icon: ShieldCheck },
  { key: "dealer", icon: Store },
  { key: "technician", icon: Wrench },
] as const;

/**
 * NEAMAT CARE page — navy chapter: the platform's three roles beside a technician photo with a
 * floating live-job card (illustrative UI, not live data).
 */
export async function PlatformSection() {
  const t = await getTranslations("CarePage.platform");

  return (
    <section
      aria-labelledby="platform-title"
      className="bg-mesh-navy relative isolate overflow-hidden py-20 lg:py-28"
    >
      <div aria-hidden="true" className="bg-grid-light mask-fade-b absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="bg-unit-neamatcare/25 glow absolute -start-32 top-10 -z-10 size-[420px] rounded-full"
      />

      <div className="container-site grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal direction="start" className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-1 ring-white/15">
            <Image
              src="/images/pages/care-technician.webp"
              alt={t("imageAlt")}
              fill
              quality={85}
              sizes="(min-width: 1024px) 520px, 90vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="from-navy-ink/70 absolute inset-0 bg-linear-to-t via-transparent to-transparent"
            />
          </div>

          <div
            aria-hidden="true"
            className="glass-light shadow-elevated animate-float-slow absolute -end-2 bottom-8 w-64 rounded-2xl p-4 motion-reduce:animate-none sm:-end-8"
          >
            <div className="flex items-center justify-between">
              <span className="text-navy-deep text-xs font-bold">{t("job.title")}</span>
              <span className="bg-success/15 text-navy-deep rounded-full px-2 py-0.5 text-[10px] font-bold">
                {t("job.status")}
              </span>
            </div>
            <p className="text-body mt-2 flex items-center gap-1.5 text-xs">
              <MapPin className="text-unit-neamatcare size-3.5" />
              {t("job.eta")}
            </p>
            <div className="bg-surface mt-3 h-1.5 overflow-hidden rounded-full">
              <div className="bg-unit-neamatcare h-full w-2/3 rounded-full" />
            </div>
          </div>
          <div
            aria-hidden="true"
            className="glass-light shadow-elevated animate-float-slow absolute -start-2 top-8 flex items-center gap-2 rounded-2xl px-4 py-3 [animation-delay:1.5s] motion-reduce:animate-none sm:-start-8"
          >
            <CircleCheck className="fill-success size-5 text-white" />
            <span className="text-navy-deep text-xs font-bold">{t("job.verified")}</span>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionEyebrow tone="dark">{t("eyebrow")}</SectionEyebrow>
            <h2
              id="platform-title"
              className="mt-4 text-3xl leading-[1.12] font-extrabold tracking-tight text-white sm:text-4xl lg:text-[44px]"
            >
              {t("title")} <span className="text-gradient-gold">{t("titleHighlight")}</span>
            </h2>
            <p className="text-on-navy mt-4 max-w-xl text-base leading-relaxed">
              {t("description")}
            </p>
          </Reveal>
          <Stagger as="ul" className="mt-10 grid gap-4">
            {roles.map(({ key, icon: Icon }) => (
              <StaggerItem as="li" key={key}>
                <div className="glass-dark flex items-start gap-4 rounded-2xl p-5 transition-colors hover:bg-white/10">
                  <span className="bg-gold text-navy-deep shadow-glow-gold grid size-12 shrink-0 place-items-center rounded-xl">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <span>
                    <span className="block text-lg font-bold text-white">
                      {t(`roles.${key}.title`)}
                    </span>
                    <span className="text-on-navy mt-1 block text-sm leading-relaxed">
                      {t(`roles.${key}.text`)}
                    </span>
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
