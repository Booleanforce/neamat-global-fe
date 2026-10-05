import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Reveal } from "@neamat/ui/components/brand/reveal";
import { cn } from "@neamat/ui/lib/utils";
import type { Story } from "./story-card";

/** The newest story, presented as a wide split card at the top of the newsroom. */
export function LeadStory({
  story,
  eyebrow,
  linkLabel,
}: {
  story: Story;
  eyebrow: string;
  linkLabel: string;
}) {
  return (
    <Reveal>
      <article className="group shadow-elevated ring-border relative grid overflow-hidden rounded-[2rem] bg-white ring-1 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
          <Image
            src={story.image.src}
            alt={story.image.alt}
            fill
            quality={85}
            sizes="(min-width: 1024px) 720px, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
        <div className="relative flex flex-col justify-center p-7 sm:p-10 lg:p-12">
          <div
            aria-hidden="true"
            className="bg-gold/15 glow absolute -end-16 -top-16 size-48 rounded-full"
          />
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-gold/20 text-navy-deep rounded-full px-3 py-1 text-xs font-bold">
              {eyebrow}
            </span>
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase",
                story.categoryClassName,
              )}
            >
              <bdi>{story.category}</bdi>
            </span>
          </div>
          <h2 className="text-navy-deep mt-5 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
            {story.title}
          </h2>
          <time
            dateTime={story.date}
            className="text-body mt-4 flex items-center gap-1.5 text-sm font-medium"
          >
            <CalendarDays aria-hidden="true" className="size-4" />
            {story.dateLabel}
          </time>
          <p className="text-body mt-4 text-base leading-relaxed">{story.summary}</p>
          <Link
            href={story.href}
            className="bg-navy-deep hover:bg-navy shadow-glow-navy mt-8 inline-flex min-h-12 w-fit items-center gap-2 rounded-full px-6 text-[15px] font-semibold text-white transition-colors after:absolute after:inset-0 after:content-['']"
          >
            {linkLabel}
            <span className="sr-only"> — {story.title}</span>
            <ArrowRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}
