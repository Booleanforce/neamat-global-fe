"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BriefcaseBusiness, MapPin } from "lucide-react";
import { cn } from "@neamat/ui/lib/utils";
import { FilterChips, type FilterOption } from "@/components/common/filter-chips";

export type RoleView = {
  key: string;
  title: string;
  summary: string;
  unitName: string;
  unitTile: string;
  location: string;
  locationKey: string;
  type: string;
  applyHref: string;
};

/** Careers — open roles list with a location filter; each row opens an application email. */
export function OpenRoles({
  roles,
  filters,
  filterLabel,
  applyLabel,
  emptyLabel,
  resultsTemplate,
}: {
  roles: RoleView[];
  filters: FilterOption[];
  filterLabel: string;
  applyLabel: string;
  emptyLabel: string;
  resultsTemplate: string;
}) {
  const [active, setActive] = useState("all");
  const reduce = useReducedMotion();
  const visible = active === "all" ? roles : roles.filter((role) => role.locationKey === active);

  return (
    <div>
      <FilterChips options={filters} active={active} onChange={setActive} label={filterLabel} />
      <p aria-live="polite" className="sr-only">
        {resultsTemplate.replace("{count}", String(visible.length))}
      </p>

      {visible.length === 0 ? (
        <p className="text-body mt-8 rounded-2xl border border-dashed p-10 text-center">
          {emptyLabel}
        </p>
      ) : (
        <ul className="mt-8 grid gap-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((role) => (
              <motion.li
                key={role.key}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <article className="group shadow-card ring-border hover:shadow-elevated hover:ring-gold/60 relative flex flex-col gap-5 rounded-2xl bg-white p-6 ring-1 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 sm:p-7 md:flex-row md:items-center">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase",
                          role.unitTile,
                        )}
                      >
                        <bdi>{role.unitName}</bdi>
                      </span>
                    </div>
                    <h3 className="text-navy-deep mt-3 text-xl font-bold">{role.title}</h3>
                    <p className="text-body mt-1.5 text-sm leading-relaxed">{role.summary}</p>
                    <ul className="text-body mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
                      <li className="flex items-center gap-1.5">
                        <MapPin aria-hidden="true" className="text-navy size-4" />
                        {role.location}
                      </li>
                      <li className="flex items-center gap-1.5">
                        <BriefcaseBusiness aria-hidden="true" className="text-navy size-4" />
                        {role.type}
                      </li>
                    </ul>
                  </div>
                  <a
                    href={role.applyHref}
                    className="bg-navy-deep group-hover:bg-gold group-hover:text-navy-deep inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-white transition-colors after:absolute after:inset-0 after:content-['']"
                  >
                    {applyLabel}
                    <span className="sr-only"> — {role.title}</span>
                    <ArrowUpRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
                  </a>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
