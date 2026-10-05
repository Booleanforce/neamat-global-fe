import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalDocument } from "@/components/legal/legal-document";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type PageProps = { params: Promise<{ locale: string }> };

const privacySections = [
  "scope",
  "collect",
  "use",
  "share",
  "retention",
  "rights",
  "security",
  "cookies",
  "changes",
] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/privacy", "PrivacyPage");
}

/** Privacy Policy. */
export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDocument namespace="PrivacyPage" sections={privacySections} updated="2026-10-01" />;
}
