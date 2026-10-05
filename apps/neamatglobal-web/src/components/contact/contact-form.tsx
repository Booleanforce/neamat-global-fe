"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { CircleCheck, Loader2, Send } from "lucide-react";
import { z } from "zod";
import { Button } from "@neamat/ui/components/ui/button";
import { Checkbox } from "@neamat/ui/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@neamat/ui/components/ui/field";
import { Input } from "@neamat/ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@neamat/ui/components/ui/select";
import { Textarea } from "@neamat/ui/components/ui/textarea";
import { sendContactMessage } from "@/lib/api/contact";

export const contactTopics = ["general", "partnership", "care", "careers", "media"] as const;

const inputClass = "h-12 rounded-xl bg-white px-4 text-base";

/**
 * Contact form — React Hook Form + Zod (messages localised), shadcn Field primitives.
 * The site is static, so the message is posted to the configured provider endpoint, which must
 * re-validate it server-side.
 */
export function ContactForm({ defaultTopic }: { defaultTopic?: (typeof contactTopics)[number] }) {
  const t = useTranslations("ContactPage.form");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const schema = z.object({
    name: z
      .string()
      .trim()
      .min(2, { error: t("errors.name") }),
    email: z.email({ error: t("errors.email") }),
    phone: z
      .string()
      .trim()
      .refine((value) => value === "" || /^[+\d][\d\s()-]{6,}$/.test(value), {
        error: t("errors.phone"),
      }),
    company: z.string().trim(),
    topic: z.enum(contactTopics, { error: t("errors.topic") }),
    message: z
      .string()
      .trim()
      .min(20, { error: t("errors.message") }),
    consent: z.boolean().refine((value) => value, { error: t("errors.consent") }),
  });
  type ContactValues = z.infer<typeof schema>;

  const form = useForm<ContactValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      topic: defaultTopic ?? "general",
      message: "",
      consent: false,
    },
  });
  const { isSubmitting } = form.formState;

  async function onSubmit(values: ContactValues) {
    setStatus("idle");
    try {
      await sendContactMessage(values);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-center py-12 text-center">
        <span className="bg-success/15 grid size-16 place-items-center rounded-full">
          <CircleCheck aria-hidden="true" className="fill-success size-9 text-white" />
        </span>
        <h3 className="text-navy-deep mt-6 text-2xl font-extrabold">{t("success.title")}</h3>
        <p className="text-body mt-2 max-w-sm">{t("success.text")}</p>
        <Button
          type="button"
          variant="outline-navy"
          size="pill"
          className="mt-8"
          onClick={() => setStatus("idle")}
        >
          {t("success.again")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup className="gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contact-name">{t("name")}</FieldLabel>
                <Input
                  {...field}
                  id="contact-name"
                  autoComplete="name"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={fieldState.invalid ? "contact-name-error" : undefined}
                  className={inputClass}
                />
                {fieldState.invalid && (
                  <FieldError id="contact-name-error" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contact-email">{t("email")}</FieldLabel>
                <Input
                  {...field}
                  id="contact-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  dir="ltr"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={fieldState.invalid ? "contact-email-error" : undefined}
                  className={inputClass}
                />
                {fieldState.invalid && (
                  <FieldError id="contact-email-error" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contact-phone">
                  {t("phone")} <span className="text-body font-normal">{t("optional")}</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="contact-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  dir="ltr"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={fieldState.invalid ? "contact-phone-error" : undefined}
                  className={inputClass}
                />
                {fieldState.invalid && (
                  <FieldError id="contact-phone-error" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="company"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="contact-company">
                  {t("company")} <span className="text-body font-normal">{t("optional")}</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="contact-company"
                  autoComplete="organization"
                  className={inputClass}
                />
              </Field>
            )}
          />
        </div>

        <Controller
          name="topic"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-topic">{t("topic")}</FieldLabel>
              <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="contact-topic"
                  aria-invalid={fieldState.invalid}
                  onBlur={field.onBlur}
                  className="h-12! w-full rounded-xl bg-white px-4 text-base"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  {contactTopics.map((topic) => (
                    <SelectItem key={topic} value={topic} className="min-h-10">
                      {t(`topics.${topic}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-message">{t("message")}</FieldLabel>
              <Textarea
                {...field}
                id="contact-message"
                rows={5}
                placeholder={t("messagePlaceholder")}
                aria-invalid={fieldState.invalid}
                aria-describedby={fieldState.invalid ? "contact-message-error" : undefined}
                className="min-h-36 rounded-xl bg-white px-4 py-3 text-base"
              />
              {fieldState.invalid && (
                <FieldError id="contact-message-error" errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="consent"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="contact-consent"
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                  onBlur={field.onBlur}
                  aria-invalid={fieldState.invalid}
                  aria-describedby={fieldState.invalid ? "contact-consent-error" : undefined}
                  className="mt-0.5 size-5"
                />
                <FieldLabel htmlFor="contact-consent" className="text-body text-sm font-normal">
                  {t("consent")}
                </FieldLabel>
              </div>
              {fieldState.invalid && (
                <FieldError id="contact-consent-error" errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p role="status" aria-live="polite" className="text-destructive text-sm">
            {status === "error" && t("error")}
          </p>
          <Button
            type="submit"
            variant="gold"
            size="pill-lg"
            disabled={isSubmitting}
            className="shadow-glow-gold"
          >
            {isSubmitting ? (
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            ) : (
              <Send aria-hidden="true" className="size-4 rtl:-scale-x-100" />
            )}
            {isSubmitting ? t("sending") : t("submit")}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
