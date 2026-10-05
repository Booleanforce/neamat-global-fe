import { getTranslations } from "next-intl/server";
import { Mail } from "lucide-react";
import { Reveal } from "@neamat/ui/components/brand/reveal";
import { SectionEyebrow } from "@neamat/ui/components/brand/section-eyebrow";
import { NewsletterSignup } from "@/components/layout/newsletter-signup";

/** Navy newsletter call-out for the newsroom. */
export async function NewsletterBand() {
  const t = await getTranslations("NewsPage.newsletter");

  return (
    <section aria-labelledby="newsletter-title" className="bg-white pb-20 lg:pb-28">
      <div className="container-site">
        <Reveal>
          <div className="bg-mesh-navy shadow-glow-navy relative isolate grid gap-10 overflow-hidden rounded-[2rem] px-6 py-12 sm:px-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-16">
            <div aria-hidden="true" className="bg-grid-light absolute inset-0 -z-10" />
            <div
              aria-hidden="true"
              className="bg-gold/25 glow absolute -end-24 -bottom-24 -z-10 size-80 rounded-full"
            />
            <div>
              <span className="bg-gold text-navy-deep shadow-glow-gold mb-6 grid size-14 place-items-center rounded-2xl">
                <Mail aria-hidden="true" className="size-7" />
              </span>
              <SectionEyebrow tone="dark">{t("eyebrow")}</SectionEyebrow>
              <h2
                id="newsletter-title"
                className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl"
              >
                {t("title")}
              </h2>
              <p className="text-on-navy mt-3 max-w-lg text-base leading-relaxed">
                {t("description")}
              </p>
            </div>
            <div className="glass-dark rounded-2xl p-6">
              <NewsletterSignup />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
