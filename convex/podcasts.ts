import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const getUrl = mutation({
    args: {
        storageId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
        return await ctx.storage.getUrl(args.storageId)
    }
});

export const createPodcast = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        audioUrl: v.string(),
        imageUrl: v.string(),
        voiceType: v.string(),
        imagePrompt: v.string(),
        voicePrompt: v.string(),
        views: v.number(),
        audioDuration: v.number(),
        // categoryId: v.id("categories"),
        audioStorageId: v.id("_storage"),
        imageStorageId: v.id("_storage")
    },
    handler: async (ctx, args) => {
        // --- Has user connected?
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new ConvexError("Not authenticated");

        // --- Has user on the DB?
        const user = await ctx.db.query("users").filter((q) => q.eq(q.field("email"), identity.email)).collect(); // --- Match by EMAIL
        if (user.length == 0) throw new ConvexError("User not found!");

        const podcast = await ctx.db.insert("podcasts", {
            ...args,
            user: user[0]._id,
            author: user[0].name,
            authorId: user[0].clerkId,
            authorImageUrl: user[0].imageUrl
        });

        return podcast;
    }
})