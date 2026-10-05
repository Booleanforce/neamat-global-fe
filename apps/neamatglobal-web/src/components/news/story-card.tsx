import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Card } from "@neamat/ui/components/ui/card";
import { cn } from "@neamat/ui/lib/utils";

export type Story = {
  slug: string;
  href: string;
  title: string;
  summary: string;
  image: { src: string; alt: string };
  date: string;
  dateLabel: string;
  category: string;
  categoryClassName: string;
  unitKey: string;
};

/** Vertical news card for the newsroom grid (shadcn Card, image zoom, whole card clickable). */
export function StoryCard({ story, linkLabel }: { story: Story; linkLabel: string }) {
  return (
    <Card className="group shadow-card ring-border hover:shadow-elevated relative h-full gap-0 overflow-hidden rounded-[1.5rem] bg-white py-0 transition-[transform,box-shadow] duration-300 hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={story.image.src}
          alt={story.image.alt}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <span
          className={cn(
            "absolute start-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase",
            story.categoryClassName,
          )}
        >
          <bdi>{story.category}</bdi>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <time
          dateTime={story.date}
          className="text-body flex items-center gap-1.5 text-xs font-medium"
        >
          <CalendarDays aria-hidden="true" className="size-3.5" />
          {story.dateLabel}
        </time>
        <h3 className="text-navy-deep text-lg leading-snug font-bold">{story.title}</h3>
        <p className="text-body line-clamp-3 text-sm leading-relaxed">{story.summary}</p>
        <Link
          href={story.href}
          className="text-navy mt-auto inline-flex min-h-11 w-fit items-center gap-1.5 pt-2 text-sm font-semibold after:absolute after:inset-0 after:content-['']"
        >
          {linkLabel}
          <span className="sr-only"> — {story.title}</span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:rotate-45 rtl:-scale-x-100"
          />
        </Link>
      </div>
    </Card>
  );
}
