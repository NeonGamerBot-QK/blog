export default {
    async email(message, env, ctx) {
        try {
            console.log("Email received from:", message.from);
            const rawBody = await new Response(message.raw).text();
            try {
                // Read the raw email body as text

                // Reply to the sender
                await message.reply({
                    to: message.from,
                    from: message.to,
                    // subject: "Re: " + (message.headers.get("subject") || ""),
                    // text: "hello world",
                });
            } catch (e) {
                console.error("Failed to reply to email:", e);
            }
            // Send info to webhook
            const emailInfo = {
                from: message.from,
                to: message.to,
                subject: message.headers.get("subject") || "",
                date: message.headers.get("date") || "",
                messageId: message.headers.get("message-id") || "",
                body: rawBody,
                headers: Object.fromEntries(message.headers),
            };

            console.log("Sending email info to webhook:", emailInfo);

            await fetch(env.WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(emailInfo, null, 2),
            });

        } catch (err) {
            console.error("Failed to handle email:", err);
        }
    },
};
