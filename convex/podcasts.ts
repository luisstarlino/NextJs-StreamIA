import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "./_generated/api";

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
        categoryId: v.id("categories"),
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

export const getTrendingPodcasts = query({
    handler: async (ctx) => {
        const podcasts = await ctx.db.query('podcasts').collect();
        return podcasts;
    }
})

export const getPodcastById = query({
    args: { podcastId: v.id('podcasts') },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.podcastId);
    }
})

export const getPodcastByVoiceType = query({
    args: {
        podcastId: v.id("podcasts"),
    },
    handler: async (ctx, args) => {
        const podcast = await ctx.db.get(args.podcastId);

        return await ctx.db
            .query("podcasts")
            .filter((q) =>
                q.and(
                    q.eq(q.field("voiceType"), podcast?.voiceType),
                    q.neq(q.field("_id"), args.podcastId)
                )
            )
            .collect();
    },
});

export const getAllPodcasts = query({
    handler: async (ctx) => {
        return await ctx.db.query("podcasts").order("desc").collect();
    },
});

export const getPodcastByAuthorId = query({
    args: {
        authorId: v.string(),
    },
    handler: async (ctx, args) => {
        const podcasts = await ctx.db
            .query("podcasts")
            .filter((q) => q.eq(q.field("authorId"), args.authorId))
            .collect();

        const totalListeners = podcasts.reduce(
            (sum, podcast) => sum + podcast.views,
            0
        );


        let allCategories: any[] = [];

        for (const p of podcasts) {
            if (allCategories.find((c) => c?._id === p.categoryId) === undefined) {

                // --- Find the name of this category
                const categoryDetails = await ctx.db.query("categories").filter((q) => q.eq(q.field("_id"), p.categoryId)).unique();

                if (categoryDetails) {
                    allCategories.push(categoryDetails);
                }
            }
        }

        return { podcasts, listeners: totalListeners, categories: allCategories };
    },
});

export const getPodcastBySearch = query({
    args: {
        search: v.string(),
    },
    handler: async (ctx, args) => {
        if (args.search === "") {
            return await ctx.db.query("podcasts").order("desc").collect();
        }

        const authorSearch = await ctx.db
            .query("podcasts")
            .withSearchIndex("search_author", (q) => q.search("author", args.search))
            .take(10);

        if (authorSearch.length > 0) {
            return authorSearch;
        }

        const titleSearch = await ctx.db
            .query("podcasts")
            .withSearchIndex("search_title", (q) =>
                q.search("title", args.search)
            )
            .take(10);

        if (titleSearch.length > 0) {
            return titleSearch;
        }

        return await ctx.db
            .query("podcasts")
            .withSearchIndex("search_body", (q) =>
                q.search("description", args.search)
            )
            .take(10);
    },
});

export const updatePodcastViews = mutation({
    args: {
        podcastId: v.id("podcasts"),
    },
    handler: async (ctx, args) => {
        const podcast = await ctx.db.get(args.podcastId);

        if (!podcast) {
            throw new ConvexError("Podcast not found");
        }

        return await ctx.db.patch(args.podcastId, {
            views: podcast.views + 1,
        });
    },
});

export const deletePodcast = mutation({
    args: {
        podcastId: v.id("podcasts"),
        imageStorageId: v.optional(v.id("_storage")),
        audioStorageId: v.optional(v.id("_storage")),
    },
    handler: async (ctx, args) => {
        const podcast = await ctx.db.get(args.podcastId);

        if (!podcast) {
            throw new ConvexError("Podcast not found");
        }

        await ctx.storage.delete(args.imageStorageId!);
        await ctx.storage.delete(args.audioStorageId!);
        return await ctx.db.delete(args.podcastId);
    },
});


/*****************************************************************************************
 * @Author: Luis Starlino
 * @Date: 2024-12-14 08:00
 * @Description: Get all views informations to show in the system
 *****************************************************************************************/
export const getAllPodcastsViews = query({
    handler: async (ctx) => {

        // --- Get all
        const allP = await ctx.db.query("podcasts").order("desc").collect();

        return allP.map((p) => ({
            _creationTime: p._creationTime,
            audioDuration: p.audioDuration,
            podcastTitle: p.title,
            views: p.views,
            _id: p._id,
        }));
    },
});