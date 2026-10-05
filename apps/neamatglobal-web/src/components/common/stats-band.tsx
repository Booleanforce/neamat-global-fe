import type { LucideIcon } from "lucide-react";
import { CountUp, Stagger, StaggerItem } from "@neamat/ui/components/brand/reveal";

export type Stat = {
  icon: LucideIcon;
  /** Animated number; omit for a text-only value. */
  value?: number;
  suffix?: string;
  /** Static value shown instead of a number (e.g. "Riyadh"). */
  text?: string;
  label: string;
};

/**
 * Glass stat strip that overlaps the bottom of a PageHero (pull it up with the negative margin)
 * — four count-up figures with icon tiles.
 */
export function StatsBand({ stats, locale }: { stats: Stat[]; locale: string }) {
  return (
    <div className="relative z-10 -mt-12 lg:-mt-16">
      <div className="container-site">
        <Stagger
          as="ul"
          className="shadow-elevated ring-border grid grid-cols-2 overflow-hidden rounded-[1.75rem] bg-white ring-1 lg:grid-cols-4"
        >
          {stats.map(({ icon: Icon, value, suffix, text, label }) => (
            <StaggerItem
              as="li"
              key={label}
              className="border-border flex items-center gap-4 border-b p-5 odd:border-e sm:p-7 lg:border-e lg:border-b-0 lg:last:border-e-0"
            >
              <span className="bg-navy shadow-glow-navy text-gold grid size-12 shrink-0 place-items-center rounded-2xl">
                <Icon aria-hidden="true" className="size-6" />
              </span>
              <span className="min-w-0">
                <span className="text-navy-deep block text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {value !== undefined ? (
                    <CountUp to={value} suffix={suffix} locale={locale} />
                  ) : (
                    text
                  )}
                </span>
                <span className="text-body mt-0.5 block text-sm leading-snug">{label}</span>
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}
