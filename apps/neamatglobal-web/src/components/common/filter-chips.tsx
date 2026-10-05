"use client";

import { Button } from "@neamat/ui/components/ui/button";
import { cn } from "@neamat/ui/lib/utils";

export type FilterOption = { key: string; label: string };

/** Single-select filter chips (toggle buttons with aria-pressed) used by the newsroom and careers. */
export function FilterChips({
  options,
  active,
  onChange,
  label,
}: {
  options: FilterOption[];
  active: string;
  onChange: (key: string) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const pressed = option.key === active;
        return (
          <Button
            key={option.key}
            type="button"
            variant="ghost"
            aria-pressed={pressed}
            onClick={() => onChange(option.key)}
            className={cn(
              "h-11 rounded-full px-5 text-sm font-semibold ring-1 transition-colors",
              pressed
                ? "bg-navy-deep ring-navy-deep hover:bg-navy-deep text-white hover:text-white"
                : "ring-border text-navy-deep hover:bg-surface bg-white",
            )}
          >
            <bdi>{option.label}</bdi>
          </Button>
        );
      })}
    </div>
  );
}
