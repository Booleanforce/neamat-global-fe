import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Building, Compass, Factory } from "lucide-react";
import { GoldPillButton } from "@neamat/ui/components/brand/gold-pill-button";
import { Reveal, Stagger, StaggerItem } from "@neamat/ui/components/brand/reveal";
import { WorldMap } from "@neamat/ui/components/brand/world-map";
import { SectionHeading } from "@/components/common/section-heading";
import { sections } from "@/config/site";

/** Section 6 — Global Presence: dark chapter with animated route map and market cards. */
export async function GlobalPresence({ showCta = true }: { showCta?: boolean } = {}) {
  const t = await getTranslations("Presence");
  const locale = await getLocale();

  const markets = [
    {
      key: "saudi",
      image: "/images/presence/saudi-arabia.webp",
      name: t("markets.saudi.name"),
      role: t("chips.hq"),
      icon: Building,
      imageAlt: t("markets.saudi.imageAlt"),
    },
    {
      key: "bangladesh",
      image: "/images/presence/bangladesh.webp",
      name: t("markets.bangladesh.name"),
      role: t("chips.ops"),
      icon: Factory,
      imageAlt: t("markets.bangladesh.imageAlt"),
    },
  ];

  return (
    <section
      id={sections.presence}
      aria-labelledby="presence-title"
      className="bg-mesh-navy relative isolate scroll-mt-20 overflow-hidden py-20 lg:py-28"
    >
      <div aria-hidden="true" className="bg-grid-light mask-fade-b absolute inset-0 -z-10" />

      <div className="container-site">
        <SectionHeading
          id="presence-title"
          tone="dark"
          eyebrow={t("eyebrow")}
          title={
            <>
              {t("title")} <span className="text-gradient-gold">{t("titleLine2")}</span>
            </>
          }
          description={t("description")}
          aside={
            showCta && (
              <GoldPillButton
                href={`/${locale}/global-presence`}
                size="lg"
                className="shadow-glow-gold"
              >
                {t("cta")}
              </GoldPillButton>
            )
          }
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="relative">
            <div
              aria-hidden="true"
              className="bg-navy-bright/40 glow absolute inset-[15%] -z-10 rounded-full"
            />
            <WorldMap
              tone="dark"
              maskSrc="/images/presence/world-land-mask.png"
              title={t("mapAlt")}
              markers={[
                {
                  label: t("markets.saudi.name"),
                  sublabel: t("markets.saudi.role"),
                  x: 56.4,
                  y: 41.7,
                  labelSide: "left",
                },
                {
                  label: t("markets.bangladesh.name"),
                  sublabel: t("markets.bangladesh.role"),
                  x: 67.4,
                  y: 40.6,
                },
              ]}
            />
          </Reveal>

          <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {markets.map(({ key, image, name, role, icon: Icon, imageAlt }) => (
              <StaggerItem as="li" key={key}>
                <figure className="group relative isolate h-44 overflow-hidden rounded-2xl ring-1 ring-white/15">
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    className="-z-10 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <div
                    aria-hidden="true"
                    className="from-navy-ink/90 via-navy-deep/30 absolute inset-0 -z-10 bg-linear-to-t to-transparent"
                  />
                  <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
                    <span className="text-lg font-bold text-white">{name}</span>
                    <span className="glass-dark text-gold inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
                      <Icon aria-hidden="true" className="size-3.5" />
                      {role}
                    </span>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
            <StaggerItem as="li">
              <div className="border-gold/40 text-on-navy flex h-full min-h-20 items-center gap-3 rounded-2xl border border-dashed px-5 py-4 text-sm">
                <span className="bg-gold/15 text-gold grid size-10 place-items-center rounded-xl">
                  <Compass aria-hidden="true" className="size-5" />
                </span>
                <span>
                  <span className="block font-bold text-white">{t("markets.future.name")}</span>
                  {t("chips.next")}
                </span>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
