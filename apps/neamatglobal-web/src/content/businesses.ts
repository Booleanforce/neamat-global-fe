import { Building2, Droplet, House, Power, type LucideIcon } from "lucide-react";

/**
 * Business units shown in "Our Businesses". Copy lives in messages (`Businesses.items.<key>`);
 * structural data lives here so it can later move to a CMS without touching components.
 */
export type BusinessKey = "neopure" | "propertyos" | "booleanforce" | "neamatcare";

export type Business = {
  key: BusinessKey;
  name: { base: string; accent?: string };
  plainName: string;
  icon: LucideIcon;
  /** Token utilities for the unit's logo colour (defined in @neamat/ui globals.css). */
  accent: { tile: string; text: string; hoverTile: string };
  image: string;
  /** External site once each unit launches; `null` → its section on the Our Businesses page. */
  href: string | null;
};

export const businesses: Business[] = [
  {
    key: "neopure",
    name: { base: "Nea", accent: "Pure" },
    plainName: "NeaPure",
    icon: Droplet,
    accent: {
      tile: "bg-unit-neopure",
      text: "text-unit-neopure",
      hoverTile: "group-hover:bg-unit-neopure",
    },
    image: "/images/businesses/neopure.webp",
    href: null,
  },
  {
    key: "propertyos",
    name: { base: "Property", accent: "OS" },
    plainName: "PropertyOS",
    icon: Building2,
    accent: {
      tile: "bg-unit-propertyos",
      text: "text-unit-propertyos",
      hoverTile: "group-hover:bg-unit-propertyos",
    },
    image: "/images/businesses/propertyos.webp",
    href: null,
  },
  {
    key: "booleanforce",
    name: { base: "Boolean", accent: "Force" },
    plainName: "BooleanForce",
    icon: Power,
    accent: {
      tile: "bg-unit-booleanforce",
      text: "text-unit-booleanforce",
      hoverTile: "group-hover:bg-unit-booleanforce",
    },
    image: "/images/businesses/booleanforce.webp",
    href: null,
  },
  {
    key: "neamatcare",
    name: { base: "NEAMAT ", accent: "CARE" },
    plainName: "NEAMAT CARE",
    icon: House,
    accent: {
      tile: "bg-unit-neamatcare",
      text: "text-unit-neamatcare",
      hoverTile: "group-hover:bg-unit-neamatcare",
    },
    image: "/images/businesses/neamat-care.webp",
    href: null,
  },
];
