"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FilterChips, type FilterOption } from "@/components/common/filter-chips";
import { StoryCard, type Story } from "./story-card";

/** Newsroom grid with business-unit filter chips (buttons with aria-pressed). */
export function NewsBrowser({
  stories,
  filters,
  filterLabel,
  linkLabel,
  emptyLabel,
  resultsTemplate,
}: {
  stories: Story[];
  filters: FilterOption[];
  filterLabel: string;
  linkLabel: string;
  emptyLabel: string;
  /** Live-region text, e.g. "{count} stories". */
  resultsTemplate: string;
}) {
  const [active, setActive] = useState("all");
  const reduce = useReducedMotion();
  const visible = active === "all" ? stories : stories.filter((story) => story.unitKey === active);

  return (
    <div>
      <FilterChips options={filters} active={active} onChange={setActive} label={filterLabel} />

      <p aria-live="polite" className="sr-only">
        {resultsTemplate.replace("{count}", String(visible.length))}
      </p>

      {visible.length === 0 ? (
        <p className="text-body mt-10 rounded-2xl border border-dashed p-10 text-center">
          {emptyLabel}
        </p>
      ) : (
        <motion.ul layout={!reduce} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((story) => (
              <motion.li
                key={story.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <StoryCard story={story} linkLabel={linkLabel} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
