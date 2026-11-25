"use server";

import nodemailer from "nodemailer";
import { z } from "zod";
import { contactFromTemplate, contactToTemplate } from "@/lib/mail-templates";

const CONTACT_INBOX = "contact@fabian-kleine.dev";

const contactSchema = z.object({
    name: z.string().trim().min(1).max(200),
    email: z.string().trim().email().max(320),
    subject: z.string().trim().min(1).max(300),
    message: z.string().trim().min(1).max(10000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactResult = { success: true } | { success: false; error: string };

function createTransport() {
    const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;

    if (!MAIL_HOST || !MAIL_PORT || !MAIL_USER || !MAIL_PASS) {
        return null;
    }

    const port = parseInt(MAIL_PORT, 10);

    return nodemailer.createTransport({
        host: MAIL_HOST,
        port,
        secure: port === 465,
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
}

export async function sendContactMessage(input: ContactInput): Promise<ContactResult> {
    const parsed = contactSchema.safeParse(input);

    if (!parsed.success) {
        return { success: false, error: "Please fill in all fields correctly." };
    }

    const transporter = createTransport();

    if (!transporter) {
        console.error("Contact form: MAIL_HOST, MAIL_PORT, MAIL_USER or MAIL_PASS is not set");
        return { success: false, error: "Server configuration error. Please try again later." };
    }

    const data = parsed.data;
    const from = process.env.MAIL_USER;

    try {
        await transporter.sendMail({
            from,
            to: CONTACT_INBOX,
            replyTo: data.email,
            subject: `New contact request from ${data.name}: ${data.subject}`,
            html: contactToTemplate(data),
        });

        await transporter.sendMail({
            from,
            to: data.email,
            subject: "Thank you for your message!",
            html: contactFromTemplate(data),
        });

        return { success: true };
    } catch (error) {
        console.error("Error sending contact email:", error);
        return { success: false, error: "Failed to send message. Please try again later." };
    }
}
