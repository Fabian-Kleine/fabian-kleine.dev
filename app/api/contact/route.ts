import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const body = await request.json()

    const { name, email, message, subject } = body;

    if (!name || !email || !message) {
        return new NextResponse("Missing fields", { status: 400 })
    }

    if (!process.env.PROXY_URL) {
        return new NextResponse("Server configuration error", { status: 500 });
    }

    try {
        const response = await fetch(`${process.env.PROXY_URL}/mail/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                from: email,
                content: message,
                subject,
            }),
        });

        if (!response.ok) {
            const errorText = await response.json();
            return new NextResponse(JSON.stringify(errorText), { status: 500 })
            // return new NextResponse("Failed to send message", { status: 500 })
        }

        if (response.status === 200) {
            return new NextResponse("Message sent successfully", { status: 200 })
        }
        return new NextResponse("Failed to send message", { status: 500 })
    } catch (error) {
        console.error("Error sending message:", error)
        return new NextResponse(JSON.stringify(error) || "Failed to send message", { status: 500 })
    }
}


