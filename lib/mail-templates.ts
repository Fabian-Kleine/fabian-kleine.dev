const escapeHtml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

const layout = (title: string, body: string) => `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: sans-serif;
            line-height: 1.6;
            color: #fff;
            margin: 0;
            padding: 0;
            background-color: #0a0a0a;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff0f;
            border: solid 1px #ffffff1f;
            border-radius: 5px;
        }

        p {
            font-size: 16px;
        }
    </style>
</head>

<body>
    <div class="container">
${body}

        <footer>
            <p style="font-size: 12px; color: #999;">This is an automated message. Please do not reply to this email.</p>
            <p style="font-size: 12px; color: #999;">&copy; ${new Date().getFullYear()} <a href="https://fabian-kleine.dev" style="color: #999;">Fabian Kleine</a></p>
        </footer>
    </div>
</body>

</html>`;

export interface ContactMailData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

/** Notification sent to me with the contents of the contact form. */
export function contactToTemplate(data: ContactMailData) {
    const name = escapeHtml(data.name);
    const email = escapeHtml(data.email);
    const subject = escapeHtml(data.subject);
    const message = escapeHtml(data.message).replace(/\r?\n/g, "<br>");

    return layout(
        `New contact request from ${name}`,
        `        <h1>Message received from ${name}</h1>

        <p>${message}</p>

        <h2>Info</h2>

        <table border="1" style="border-collapse: collapse; width: 100%; margin-top: 10px;">
            <tr>
                <td style="padding: 5px;">Name</td>
                <td style="padding: 5px;">${name}</td>
            </tr>
            <tr>
                <td style="padding: 5px;">Email</td>
                <td style="padding: 5px;">${email}</td>
            </tr>
            <tr>
                <td style="padding: 5px;">Subject</td>
                <td style="padding: 5px;">${subject}</td>
            </tr>
        </table>

        <br>

        <a href="mailto:${email}" style="display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #fff; color: #0a0a0a; text-decoration: none; border-radius: 5px; text-align: center;">Reply</a>`
    );
}

/** Confirmation sent back to the person who filled in the contact form. */
export function contactFromTemplate(data: Pick<ContactMailData, "name">) {
    const name = escapeHtml(data.name);

    return layout(
        "Thank you for your message! I will get back to you soon.",
        `        <h1>Hello ${name},</h1>

        <p>Thank you for your message! I will get back to you soon.</p>

        <p>Best regards,<br>Fabian Kleine</p>`
    );
}
