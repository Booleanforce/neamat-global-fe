import { getTranslations } from "next-intl/server";
import { Cpu, Network, ShieldCheck, TrendingUp } from "lucide-react";
import { Stagger, StaggerItem } from "@neamat/ui/components/brand/reveal";
import { SectionHeading } from "@/components/common/section-heading";

const items = [
  { key: "technology", icon: Cpu },
  { key: "network", icon: Network },
  { key: "standards", icon: ShieldCheck },
  { key: "growth", icon: TrendingUp },
] as const;

/** Navy chapter — how the four companies reinforce each other. */
export async function SynergySection() {
  const t = await getTranslations("BusinessesPage.synergy");

  return (
    <section
      aria-labelledby="synergy-title"
      className="bg-mesh-navy relative isolate overflow-hidden py-20 lg:py-28"
    >
      <div aria-hidden="true" className="bg-grid-light mask-fade-b absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="bg-gold/20 glow absolute -end-32 top-0 -z-10 size-[420px] rounded-full"
      />
      <div className="container-site">
        <SectionHeading
          id="synergy-title"
          tone="dark"
          eyebrow={t("eyebrow")}
          title={
            <>
              {t("title")} <span className="text-gradient-gold">{t("titleHighlight")}</span>
            </>
          }
          description={t("description")}
        />
        <Stagger as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ key, icon: Icon }) => (
            <StaggerItem as="li" key={key}>
              <article className="glass-dark group h-full rounded-[1.5rem] p-7 transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-white/10">
                <span className="bg-gold/15 text-gold ring-gold/30 grid size-12 place-items-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-110">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">{t(`items.${key}.title`)}</h3>
                <p className="text-on-navy mt-2 text-sm leading-relaxed">
                  {t(`items.${key}.text`)}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
