import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { LogoMark } from "@neamat/ui/components/brand/logo";
import { Reveal } from "@neamat/ui/components/brand/reveal";
import { SectionEyebrow } from "@neamat/ui/components/brand/section-eyebrow";
import { cn } from "@neamat/ui/lib/utils";

type PageHeroProps = {
  homeHref: string;
  homeLabel: string;
  breadcrumbLabel: string;
  breadcrumb: string;
  /** Optional middle crumb (e.g. News on an article page). */
  parent?: { label: string; href: string };
  eyebrow: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  /** Photo fading in from the end side; omitted on text-only pages (legal). */
  image?: { src: string; alt: string };
  /** Actions or meta rendered under the subtitle (CTAs, chips, dates). */
  children?: ReactNode;
  /** Shorter padding for utility pages. */
  compact?: boolean;
};

/** Inner-page hero: navy mesh, photo fading in from the end side, breadcrumb and gradient title. */
export function PageHero({
  homeHref,
  homeLabel,
  breadcrumbLabel,
  breadcrumb,
  parent,
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  image,
  children,
  compact = false,
}: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="bg-mesh-navy relative isolate overflow-hidden">
      {image ? (
        <div className="absolute inset-y-0 end-0 -z-20 w-full lg:w-3/5">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            quality={85}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="from-navy-deep/90 to-navy-deep/70 lg:from-navy-deep lg:via-navy-deep/60 lg:to-navy-deep/20 absolute inset-0 bg-linear-to-b lg:bg-linear-to-r rtl:lg:bg-linear-to-l"
          />
        </div>
      ) : (
        <LogoMark className="absolute -end-16 -bottom-24 -z-10 size-96 text-white/5 rtl:-scale-x-100" />
      )}
      <div aria-hidden="true" className="bg-grid-light mask-fade-b absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="bg-gold/25 glow absolute -start-32 bottom-0 -z-10 size-[420px] rounded-full"
      />

      <div className={cn("container-site", compact ? "py-16 lg:py-20" : "py-20 lg:py-28")}>
        <Reveal>
          <nav aria-label={breadcrumbLabel}>
            <ol className="text-on-navy flex flex-wrap items-center gap-1.5 text-sm">
              <li>
                <Link href={homeHref} className="hover:text-gold">
                  {homeLabel}
                </Link>
              </li>
              {parent && (
                <>
                  <li aria-hidden="true">
                    <ChevronRight className="size-4 rtl:-scale-x-100" />
                  </li>
                  <li>
                    <Link href={parent.href} className="hover:text-gold">
                      {parent.label}
                    </Link>
                  </li>
                </>
              )}
              <li aria-hidden="true">
                <ChevronRight className="size-4 rtl:-scale-x-100" />
              </li>
              <li aria-current="page" className="line-clamp-1 font-semibold text-white">
                {breadcrumb}
              </li>
            </ol>
          </nav>
        </Reveal>
        <div className={cn("mt-8", image ? "max-w-2xl" : "max-w-3xl")}>
          <Reveal delay={0.08}>
            <SectionEyebrow tone="dark">{eyebrow}</SectionEyebrow>
          </Reveal>
          <Reveal delay={0.16}>
            <h1
              id="page-title"
              className={cn(
                "mt-5 leading-[1.06] font-extrabold tracking-tight text-balance text-white",
                compact ? "text-4xl sm:text-5xl" : "text-4xl sm:text-5xl lg:text-6xl",
              )}
            >
              {title}
              {titleHighlight && (
                <>
                  {" "}
                  <span className="text-gradient-gold">{titleHighlight}</span>
                </>
              )}
            </h1>
          </Reveal>
          {subtitle && (
            <Reveal delay={0.24}>
              <p className="text-on-navy mt-6 max-w-xl text-lg leading-relaxed">{subtitle}</p>
            </Reveal>
          )}
          {children && <Reveal delay={0.32}>{children}</Reveal>}
        </div>
      </div>
    </section>
  );
}
