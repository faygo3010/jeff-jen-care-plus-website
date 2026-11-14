"use server";

import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";
import { addEnquiry } from "@/lib/enquiries";

export type QuoteState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const MAX = { name: 100, email: 150, phone: 40, service: 60, message: 2000 };

function clean(value: FormDataEntryValue | null, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendQuote(
  _prev: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  // Honeypot. Real people leave this empty; bots fill everything in.
  if (clean(formData.get("company"), 100)) {
    return { status: "success" };
  }

  const name = clean(formData.get("name"), MAX.name);
  const email = clean(formData.get("email"), MAX.email);
  const phone = clean(formData.get("phone"), MAX.phone);
  const service = clean(formData.get("service"), MAX.service);
  const message = clean(formData.get("message"), MAX.message);

  if (!name || (!email && !phone)) {
    return {
      status: "error",
      message: "Please give us your name, and a phone number or email so we can reply.",
    };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "That email address doesn't look right." };
  }

  // Saved for the admin panel first. If that works, the visitor sees
  // success even if the email below fails: the enquiry isn't lost.
  const saved = await addEnquiry({ name, email, phone, service, message })
    .then(() => true)
    .catch((err) => {
      console.error("Couldn't save the enquiry to the admin panel:", err);
      return false;
    });
  const fail = (text: string): QuoteState =>
    saved ? { status: "success" } : { status: "error", message: text };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_INBOX ?? siteConfig.email;
  const from = process.env.QUOTE_FROM ?? "onboarding@resend.dev";

  if (!apiKey) {
    console.error("RESEND_API_KEY is not set. Quote email was not sent.");
    if (saved) return { status: "success" };
    return {
      status: "error",
      message: `Sorry, the form isn't available right now. Please call ${siteConfig.phone} or email ${siteConfig.email}.`,
    };
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email || "Not given"],
    ["Phone", phone || "Not given"],
    ["About", service || "Not specified"],
  ];

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `${siteConfig.name} Website <${from}>`,
      to: [to],
      ...(email ? { replyTo: email } : {}),
      subject: `Website enquiry: ${service || "General enquiry"} from ${name}`,
      text: [
        ...rows.map(([k, v]) => `${k}: ${v}`),
        "",
        "Message:",
        message || "(none)",
      ].join("\n"),
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px">
          <h2 style="margin:0 0 16px">New website enquiry</h2>
          <table style="border-collapse:collapse;width:100%">
            ${rows
              .map(
                ([k, v]) =>
                  `<tr>
                     <td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap">${k}</td>
                     <td style="padding:6px 0"><strong>${escapeHtml(v)}</strong></td>
                   </tr>`,
              )
              .join("")}
          </table>
          <p style="margin:20px 0 6px;color:#666">Message</p>
          <p style="margin:0;white-space:pre-wrap">${
            escapeHtml(message) || "<em>(none)</em>"
          }</p>
          <p style="margin:24px 0 0;color:#999;font-size:12px">
            Sent from ${siteConfig.domain}. Reply directly, or call them back.
          </p>
        </div>`,
    });

    if (error) {
      console.error("Resend rejected the quote email:", error);
      return fail(
        `Sorry, we couldn't send that. Please call ${siteConfig.phone} or email ${siteConfig.email}.`,
      );
    }

    return { status: "success" };
  } catch (err) {
    console.error("Failed to send quote email:", err);
    return fail(
      `Sorry, something went wrong. Please call ${siteConfig.phone} or email ${siteConfig.email}.`,
    );
  }
}
