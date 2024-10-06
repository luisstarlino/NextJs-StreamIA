import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import type { WebhookEvent } from "@clerk/backend";
import { Webhook } from "svix";


const handleClerkWebhook = httpAction(async (ctx, request) => {
    const event = await validateRequest(request);
    if (!event) {
        return new Response("Invalid request", { status: 400 });
    }
    switch (event.type) {
        case "user.created":
            await ctx.runMutation(internal.users.createUser, {
                clerkId: event.data.id,
                email: event.data.email_addresses[0].email_address,
                imageUrl: event.data.image_url,
                name: event.data.first_name!,
            });
            break;
        case "user.updated":
            await ctx.runMutation(internal.users.updateUser, {
                clerkId: event.data.id,
                imageUrl: event.data.image_url,
                email: event.data.email_addresses[0].email_address,
            });
            break;
        case "user.deleted":
            await ctx.runMutation(internal.users.deleteUser, {
                clerkId: event.data.id as string,
            });
            break;
    }
    return new Response(null, {
        status: 200,
    });
});

const http = httpRouter();
http.route({
    path: "/clerk",
    method: "POST",
    handler: handleClerkWebhook,
});

async function validateRequest(
    req: Request
): Promise<WebhookEvent | undefined> {
    const payloadString = await req.text();

    const svixHeaders = {
        "svix-id": req.headers.get("svix-id")!,
        "svix-timestamp": req.headers.get("svix-timestamp")!,
        "svix-signature": req.headers.get("svix-signature")!,
    };
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
    let evt: Event | null = null;
    try {
        evt = wh.verify(payloadString, svixHeaders) as Event;
    } catch (_) {
        console.log("error verifying");
        return;
    }

    return evt as unknown as WebhookEvent;
}

export default http;

