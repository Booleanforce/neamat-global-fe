import type { LucideIcon } from "lucide-react";
import { Stagger, StaggerItem } from "@neamat/ui/components/brand/reveal";
import { cn } from "@neamat/ui/lib/utils";

export type ProcessStep = { icon: LucideIcon; title: string; text: string };

/** Numbered process (booking, hiring, support) joined by a gold connector line on large screens. */
export function ProcessSteps({
  steps,
  tone = "light",
}: {
  steps: ProcessStep[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="via-gold/60 absolute inset-x-[12%] top-14 hidden h-px bg-linear-to-r from-transparent to-transparent lg:block"
      />
      <Stagger
        as="ol"
        className={cn(
          "relative grid gap-6 sm:grid-cols-2",
          steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4",
        )}
      >
        {steps.map(({ icon: Icon, title, text }, index) => (
          <StaggerItem as="li" key={title}>
            <article
              className={cn(
                "group relative h-full rounded-[1.5rem] p-7 text-center transition-transform duration-300 hover:-translate-y-1",
                dark
                  ? "glass-dark"
                  : "shadow-card ring-border hover:shadow-elevated bg-white ring-1",
              )}
            >
              <span className="relative mx-auto grid size-16 place-items-center">
                <span
                  aria-hidden="true"
                  className="bg-gold/30 absolute inset-0 rounded-full blur-md transition-opacity duration-300 group-hover:opacity-100 lg:opacity-60"
                />
                <span className="bg-gold text-navy-deep shadow-glow-gold relative grid size-16 place-items-center rounded-full">
                  <Icon aria-hidden="true" className="size-7" />
                </span>
                <span
                  className={cn(
                    "absolute -end-1 -top-1 grid size-7 place-items-center rounded-full text-xs font-extrabold ring-2",
                    dark
                      ? "bg-navy-deep ring-gold text-white"
                      : "bg-navy-deep text-gold ring-white",
                  )}
                >
                  {index + 1}
                </span>
              </span>
              <h3 className={cn("mt-6 text-lg font-bold", dark ? "text-white" : "text-navy-deep")}>
                {title}
              </h3>
              <p
                className={cn("mt-2 text-sm leading-relaxed", dark ? "text-on-navy" : "text-body")}
              >
                {text}
              </p>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
