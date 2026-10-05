import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalDocument } from "@/components/legal/legal-document";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type PageProps = { params: Promise<{ locale: string }> };

const termsSections = [
  "acceptance",
  "about",
  "use",
  "ip",
  "services",
  "links",
  "liability",
  "law",
  "changes",
] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/terms", "TermsPage");
}

/** Terms & Conditions. */
export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDocument namespace="TermsPage" sections={termsSections} updated="2026-10-01" />;
}
