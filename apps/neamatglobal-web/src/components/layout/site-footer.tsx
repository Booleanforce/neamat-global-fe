import { getLocale, getTranslations } from "next-intl/server";
import { Footer } from "@neamat/ui/components/brand/footer";
import { businessHref } from "@/config/site";
import { businesses } from "@/content/businesses";
import { socialProfiles } from "@/content/social";
import { NewsletterSignup } from "./newsletter-signup";

/** Binds the shared Footer to localized copy and routes. */
export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const tHeader = await getTranslations("Common");
  const locale = await getLocale();
  const home = `/${locale}`;

  return (
    <Footer
      homeHref={home}
      logoLabel={tHeader("logoLabel")}
      tagline={t("tagline")}
      columns={[
        {
          title: t("columns.businesses"),
          links: businesses.map((business) => ({
            label: business.plainName,
            href: business.href ?? businessHref(locale, business.key),
          })),
        },
        {
          title: t("columns.company"),
          links: [
            { label: t("links.about"), href: `${home}/about` },
            { label: t("links.careers"), href: `${home}/careers` },
            { label: t("links.news"), href: `${home}/news` },
            { label: t("links.contact"), href: `${home}/contact` },
          ],
        },
        {
          title: t("columns.support"),
          links: [
            { label: t("links.help"), href: `${home}/help` },
            { label: t("links.customerSupport"), href: `${home}/support` },
            { label: t("links.privacy"), href: `${home}/privacy` },
            { label: t("links.terms"), href: `${home}/terms` },
          ],
        },
      ]}
      followTitle={t("follow")}
      socials={socialProfiles.map((profile) => ({
        ...profile,
        label: t(`social.${profile.platform}`),
      }))}
      newsletter={<NewsletterSignup />}
      copyright={t("copyright", { year: new Date().getFullYear() })}
      closingLine={t("closingLine")}
    />
  );
}
