import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { GoldPillButton } from "@neamat/ui/components/brand/gold-pill-button";
import { LogoMark } from "@neamat/ui/components/brand/logo";
import { Reveal } from "@neamat/ui/components/brand/reveal";
import { SectionEyebrow } from "@neamat/ui/components/brand/section-eyebrow";

/** Closing call-to-action band ("climax CTA") shown above the footer on Home and About. */
export async function CtaBand() {
  const t = await getTranslations("Cta");
  const locale = await getLocale();

  return (
    <section aria-labelledby="cta-title" className="bg-white pb-20 lg:pb-28">
      <div className="container-site">
        <Reveal>
          <div className="bg-mesh-navy shadow-glow-navy relative isolate overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-12 lg:py-20">
            <div aria-hidden="true" className="bg-grid-light absolute inset-0 -z-10" />
            <div
              aria-hidden="true"
              className="bg-gold/30 glow absolute start-1/2 -bottom-32 -z-10 size-[480px] -translate-x-1/2 rounded-full"
            />
            <LogoMark className="absolute -end-10 -top-10 -z-10 size-56 text-white/5 rtl:-scale-x-100" />

            <div className="mx-auto flex max-w-2xl flex-col items-center">
              <SectionEyebrow tone="dark">{t("eyebrow")}</SectionEyebrow>
              <h2
                id="cta-title"
                className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
              >
                {t("title")}
              </h2>
              <p className="text-on-navy mt-4 text-base leading-relaxed">{t("description")}</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <GoldPillButton href={`/${locale}/contact`} size="lg" className="shadow-glow-gold">
                  {t("primary")}
                </GoldPillButton>
                <Link
                  href={`/${locale}/businesses`}
                  className="glass-dark inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/15"
                >
                  {t("secondary")}
                  <ArrowRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
