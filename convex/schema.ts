import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    podcasts: defineTable({
        user: v.id('users'),
        title: v.string(),
        description: v.string(),
        audioUrl: v.optional(v.string()),
        audioStorageId: v.optional(v.id('_storage')),
        imageUrl: v.optional(v.string()),
        imageStorageId: v.optional(v.id('_storage')),
        author: v.string(),
        authorId: v.string(),
        authorImageUrl: v.string(),
        voicePrompt: v.string(),
        imagePrompt: v.string(),
        voiceType: v.string(),
        audioDuration: v.number(),
        views: v.number(),
        categoryId: v.optional(v.id('categories')),
    })
    .searchIndex('search_author', { searchField: 'author' })
    .searchIndex('search_title', { searchField: 'title' })
    .searchIndex('search_body', { searchField: 'description' })
    .searchIndex('search_category', { searchField: 'categoryId' })
    ,
    users: defineTable({
        email: v.string(),
        imageUrl: v.string(),
        clerkId: v.string(),
        name: v.string()
    }),
    categories: defineTable({
        name: v.string(),
        description: v.string(),
    })
})