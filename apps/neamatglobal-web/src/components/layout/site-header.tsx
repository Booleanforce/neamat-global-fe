"use client";

import { useLocale, useTranslations } from "next-intl";
import { Header } from "@neamat/ui/components/brand/header";
import type { LanguageOption, NavLink } from "@neamat/ui/lib/types";
import { businessHref } from "@/config/site";
import { businesses } from "@/content/businesses";
import { usePathname } from "@/i18n/navigation";
import { getDirection, localeLabels, routing, type Locale } from "@/i18n/routing";
import { useAppDispatch } from "@/store/hooks";
import { openSearch } from "@/store/slices/ui-slice";

/** Binds the shared Header to next-intl (labels, locale-aware hrefs, language switch). */
export function SiteHeader() {
  const t = useTranslations("Header");
  const tCommon = useTranslations("Common");
  const tBusinesses = useTranslations("Businesses.items");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const home = `/${locale}`;
  const nav: NavLink[] = [
    { label: t("nav.home"), href: home },
    { label: t("nav.about"), href: `${home}/about` },
    {
      label: t("nav.businesses"),
      href: `${home}/businesses`,
      children: businesses.map((business) => ({
        label: business.plainName,
        href: business.href ?? businessHref(locale, business.key),
        description: tBusinesses(`${business.key}.category`),
      })),
    },
    { label: t("nav.presence"), href: `${home}/global-presence` },
    { label: t("nav.careers"), href: `${home}/careers` },
    { label: t("nav.news"), href: `${home}/news` },
    { label: t("nav.contact"), href: `${home}/contact` },
  ];

  const languages: LanguageOption[] = routing.locales.map((code) => ({
    code,
    label: localeLabels[code],
    href: `/${code}${pathname === "/" ? "" : pathname}`,
    active: code === locale,
  }));

  const activeHref = pathname === "/" ? home : `${home}${pathname}`;

  return (
    <Header
      homeHref={home}
      logoLabel={tCommon("logoLabel")}
      nav={nav}
      activeHref={activeHref}
      languages={languages}
      languageLabel={t("language")}
      cta={{ label: t("cta"), href: `${home}/contact` }}
      searchLabel={t("search")}
      onSearch={() => dispatch(openSearch())}
      menuLabel={t("menu")}
      menuDescription={t("menuDescription")}
      navLabel={t("navLabel")}
      dir={getDirection(locale)}
    />
  );
}
