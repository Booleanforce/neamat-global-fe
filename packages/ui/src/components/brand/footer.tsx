import type { ReactNode } from "react";
import { Separator } from "@neamat/ui/components/ui/separator";
import { FooterColumn } from "@neamat/ui/components/brand/footer-column";
import { Logo } from "@neamat/ui/components/brand/logo";
import { SocialLinks } from "@neamat/ui/components/brand/social-links";
import type { FooterLinkGroup, SocialLink } from "@neamat/ui/lib/types";

export type FooterProps = {
  homeHref: string;
  logoLabel: string;
  tagline: string;
  columns: FooterLinkGroup[];
  followTitle: string;
  socials: SocialLink[];
  /** The NewsletterForm (client) — passed in so the footer itself stays a server component. */
  newsletter: ReactNode;
  copyright: string;
  closingLine: string;
};

/**
 * Deep-navy footer: logo + tagline, link columns, Follow Us, newsletter, bottom bar with the
 * closing line and short gold rule.
 */
export function Footer({
  homeHref,
  logoLabel,
  tagline,
  columns,
  followTitle,
  socials,
  newsletter,
  copyright,
  closingLine,
}: FooterProps) {
  return (
    <footer className="bg-navy-ink text-on-navy relative isolate overflow-hidden">
      {/* Gold top edge, grid texture and a soft glow */}
      <span
        aria-hidden="true"
        className="via-gold absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent"
      />
      <div
        aria-hidden="true"
        className="bg-grid-light mask-fade-b absolute inset-0 -z-10 opacity-60"
      />
      <div
        aria-hidden="true"
        className="bg-navy-bright/30 glow absolute start-1/4 -top-40 -z-10 size-[420px] rounded-full"
      />
      <div className="container-site grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)_1fr_1.6fr] lg:gap-8 lg:py-14">
        <div className="md:col-span-2 lg:col-span-1">
          <Logo href={homeHref} label={logoLabel} tone="light" goldAccent />
          <p className="text-on-navy mt-4 text-xs">{tagline}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-2 lg:col-span-3 lg:grid-cols-3">
          {columns.map((column) => (
            <FooterColumn key={column.title} {...column} />
          ))}
        </div>

        <div>
          <h2 className="text-[13px] font-semibold text-white">{followTitle}</h2>
          <SocialLinks links={socials} className="-ms-3 mt-2" />
        </div>

        <div>{newsletter}</div>
      </div>

      <Separator className="bg-white/10" />

      <div className="container-site flex flex-col gap-3 py-5 text-[11px] sm:flex-row sm:items-center sm:justify-between">
        <p>{copyright}</p>
        <p className="flex items-center gap-3">
          <span>{closingLine}</span>
          <span aria-hidden="true" className="bg-gold h-px w-8" />
        </p>
      </div>
    </footer>
  );
}
