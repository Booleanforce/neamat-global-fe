export type ContactMessage = {
  name: string;
  email: string;
  phone: string;
  company: string;
  topic: string;
  message: string;
  consent: boolean;
};

/**
 * Contact form submission. The marketing site is static, so this posts to the configured form
 * provider / API endpoint (`NEXT_PUBLIC_CONTACT_ENDPOINT`), which must validate the payload again.
 * Without an endpoint (local development) it resolves after a short delay so the UI can be reviewed.
 */
export async function sendContactMessage(message: ContactMessage): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...message, source: "neamatglobal.com" }),
  });

  if (!response.ok) {
    throw new Error(`Contact request failed with ${response.status}`);
  }
}
