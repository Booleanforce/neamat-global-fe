import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, House } from "lucide-react";
import { GoldPillButton } from "@neamat/ui/components/brand/gold-pill-button";
import { Reveal } from "@neamat/ui/components/brand/reveal";
import { siteConfig } from "@/config/site";

/** NEAMAT CARE page closing band — book on the product site or talk to the team. */
export async function CarePlatformCta() {
  const t = await getTranslations("CarePage.cta");
  const locale = await getLocale();

  return (
    <section aria-labelledby="care-cta-title" className="bg-white py-20 lg:py-28">
      <div className="container-site">
        <Reveal>
          <div className="bg-mesh-navy shadow-glow-navy relative isolate overflow-hidden rounded-[2rem] lg:grid lg:grid-cols-[1.3fr_1fr]">
            <div aria-hidden="true" className="bg-grid-light absolute inset-0 -z-10" />
            <div
              aria-hidden="true"
              className="bg-unit-neamatcare/30 glow absolute -start-24 -bottom-24 -z-10 size-96 rounded-full"
            />
            <div className="p-8 sm:p-12 lg:p-16">
              <span className="bg-unit-neamatcare grid size-14 place-items-center rounded-2xl text-white">
                <House aria-hidden="true" className="size-7" />
              </span>
              <h2
                id="care-cta-title"
                className="mt-6 text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
              >
                {t("title")} <span className="text-gradient-gold">{t("titleHighlight")}</span>
              </h2>
              <p className="text-on-navy mt-4 max-w-lg text-base leading-relaxed">
                {t("description")}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <GoldPillButton
                  href={siteConfig.careUrl}
                  external
                  size="lg"
                  className="shadow-glow-gold"
                >
                  {t("primary")}
                </GoldPillButton>
                <Link
                  href={`/${locale}/support`}
                  className="glass-dark inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/15"
                >
                  {t("secondary")}
                  <ArrowRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
                </Link>
              </div>
            </div>
            <div className="relative hidden min-h-[360px] lg:block">
              <Image
                src="/images/pages/care-electrical.webp"
                alt={t("imageAlt")}
                fill
                sizes="(min-width: 1024px) 520px, 0px"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="from-navy-deep absolute inset-0 bg-linear-to-r to-transparent rtl:bg-linear-to-l"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
