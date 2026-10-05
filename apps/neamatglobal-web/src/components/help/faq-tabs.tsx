import { getTranslations } from "next-intl/server";
import { Building2, CalendarClock, House, ShieldCheck, type LucideIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@neamat/ui/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@neamat/ui/components/ui/tabs";

const categories: { key: string; icon: LucideIcon }[] = [
  { key: "general", icon: Building2 },
  { key: "care", icon: House },
  { key: "bookings", icon: CalendarClock },
  { key: "privacy", icon: ShieldCheck },
];

const questionKeys = ["q1", "q2", "q3", "q4"] as const;

/** Help Center FAQ — category tabs (vertical on desktop) each holding an accordion. */
export async function FaqTabs({ dir }: { dir: "ltr" | "rtl" }) {
  const t = await getTranslations("HelpPage.faq");

  return (
    <Tabs
      defaultValue="general"
      orientation="vertical"
      dir={dir}
      className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12"
    >
      <TabsList
        aria-label={t("categoriesLabel")}
        className="flex h-auto! w-full flex-row flex-wrap gap-2 bg-transparent p-0 lg:flex-col lg:flex-nowrap lg:items-stretch"
      >
        {categories.map(({ key, icon: Icon }) => (
          <TabsTrigger
            key={key}
            value={key}
            className="text-navy-deep ring-border data-active:bg-navy-deep data-active:ring-navy-deep hover:bg-surface data-active:hover:bg-navy-deep h-auto min-h-12 flex-none justify-start gap-3 rounded-2xl bg-white px-4 py-3 text-start text-sm font-semibold ring-1 after:hidden data-active:text-white data-active:shadow-none lg:w-full"
          >
            <Icon aria-hidden="true" className="size-5! shrink-0" />
            {t(`categories.${key}`)}
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.map(({ key }) => (
        <TabsContent key={key} value={key} className="mt-0">
          <h3 className="text-navy-deep text-2xl font-extrabold">{t(`categories.${key}`)}</h3>
          <Accordion type="single" collapsible defaultValue="q1" className="mt-6 gap-3">
            {questionKeys.map((question) => (
              <AccordionItem
                key={question}
                value={question}
                className="ring-border data-[state=open]:shadow-card data-[state=open]:ring-gold/60 rounded-2xl border-0 bg-white px-5 ring-1 not-last:border-b-0"
              >
                <AccordionTrigger className="text-navy-deep min-h-14 items-center py-4 text-base font-semibold hover:no-underline">
                  {t(`items.${key}.${question}.q`)}
                </AccordionTrigger>
                <AccordionContent className="text-body pb-5 text-[15px] leading-relaxed">
                  {t(`items.${key}.${question}.a`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      ))}
    </Tabs>
  );
}
