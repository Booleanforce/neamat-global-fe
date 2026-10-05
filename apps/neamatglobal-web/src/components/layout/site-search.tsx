"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@neamat/ui/components/ui/dialog";
import { careHref } from "@/config/site";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeSearch } from "@/store/slices/ui-slice";

/**
 * Header search (shadcn Dialog, open state in Redux). Until full-text search exists it offers
 * quick jumps to every section of the site.
 */
export function SiteSearch() {
  const open = useAppSelector((state) => state.ui.searchOpen);
  const dispatch = useAppDispatch();
  const t = useTranslations("Header");
  const locale = useLocale();
  const home = `/${locale}`;

  const links = [
    { label: t("nav.about"), href: `${home}/about` },
    { label: t("nav.businesses"), href: `${home}/businesses` },
    { label: "NEAMAT CARE", href: careHref(locale) },
    { label: t("nav.presence"), href: `${home}/global-presence` },
    { label: t("nav.news"), href: `${home}/news` },
    { label: t("nav.careers"), href: `${home}/careers` },
    { label: t("nav.contact"), href: `${home}/contact` },
  ];

  return (
    <Dialog open={open} onOpenChange={(next) => !next && dispatch(closeSearch())}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-navy-deep">{t("search")}</DialogTitle>
          <DialogDescription>{t("menuDescription")}</DialogDescription>
        </DialogHeader>
        <ul className="grid gap-0.5">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => dispatch(closeSearch())}
                className="text-navy-deep hover:bg-surface flex min-h-11 items-center justify-between rounded-md px-3 text-sm font-medium"
              >
                {link.label}
                <ArrowRight
                  aria-hidden="true"
                  className="text-muted-text size-4 rtl:-scale-x-100"
                />
              </Link>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
