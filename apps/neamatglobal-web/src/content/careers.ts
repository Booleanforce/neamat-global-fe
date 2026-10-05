import type { BusinessKey } from "./businesses";

/**
 * Open roles on the Careers page. Titles/summaries live in messages (`CareersPage.roles.items.<key>`).
 * NOTE: sample openings — replace with the client's real vacancies (or an ATS feed) before launch.
 */
export type RoleLocation = "riyadh" | "dhaka";
export type RoleType = "fullTime" | "contract";

export type OpenRole = {
  key: string;
  unit: BusinessKey;
  location: RoleLocation;
  type: RoleType;
};

export const openRoles: OpenRole[] = [
  { key: "waterEngineer", unit: "neopure", location: "riyadh", type: "fullTime" },
  { key: "serviceLead", unit: "neamatcare", location: "riyadh", type: "fullTime" },
  { key: "hvacTechnician", unit: "neamatcare", location: "riyadh", type: "fullTime" },
  { key: "productManager", unit: "propertyos", location: "dhaka", type: "fullTime" },
  { key: "fullstackEngineer", unit: "booleanforce", location: "dhaka", type: "fullTime" },
  { key: "productDesigner", unit: "booleanforce", location: "dhaka", type: "contract" },
];
