import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, BriefcaseBusiness, CircleHelp, Headset, Mail } from "lucide-react";
import { Stagger, StaggerItem } from "@neamat/ui/components/brand/reveal";
import { SectionHeading } from "@/components/common/section-heading";

const links = [
  { key: "contact", icon: Mail, path: "/contact" },
  { key: "support", icon: Headset, path: "/support" },
  { key: "help", icon: CircleHelp, path: "/help" },
  { key: "careers", icon: BriefcaseBusiness, path: "/careers" },
] as const;

type QuickLinkKey = (typeof links)[number]["key"];

/** "Still looking for something?" — cross-links between the utility pages (current one excluded). */
export async function QuickLinks({ exclude }: { exclude: QuickLinkKey }) {
  const t = await getTranslations("QuickLinks");
  const locale = await getLocale();
  const visible = links.filter((link) => link.key !== exclude);

  return (
    <section aria-labelledby="quick-links-title" className="bg-surface py-20 lg:py-24">
      <div className="container-site">
        <SectionHeading
          id="quick-links-title"
          align="center"
          eyebrow={t("eyebrow")}
          title={t("title")}
        />
        <Stagger as="ul" className="mt-12 grid gap-5 md:grid-cols-3">
          {visible.map(({ key, icon: Icon, path }) => (
            <StaggerItem as="li" key={key}>
              <Link
                href={`/${locale}${path}`}
                className="group shadow-card ring-border hover:shadow-elevated relative flex h-full flex-col rounded-2xl bg-white p-7 ring-1 transition-[transform,box-shadow] duration-300 hover:-translate-y-1"
              >
                <span className="bg-navy text-gold group-hover:bg-gold group-hover:text-navy-deep grid size-12 place-items-center rounded-xl transition-colors duration-300">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <span className="text-navy-deep mt-5 text-lg font-bold">{t(`${key}.title`)}</span>
                <span className="text-body mt-2 text-sm leading-relaxed">{t(`${key}.text`)}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="text-navy absolute end-6 top-7 size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100"
                />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
