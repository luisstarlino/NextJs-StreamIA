/**
* @LuisStarlino
* Created AT: 20/10/2024 | 12:00
*/

//------------------------------------------------
// --- IMPORTS'S
//------------------------------------------------
import { ConvexError, v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

export const getCategoryById = query({
    args: { categoryId: v.string() },
    handler: async (ctx, args) => {

        const category = await ctx.db
            .query("categories")
            .filter((q) => q.eq(q.field("_id"), args.categoryId))
            .unique();

        if (!category) {
            return null;
        }

        return category;
    }
})

export const createCategory = mutation({
    args: {
        name: v.string(),
        description: v.string()
    },
    handler: async (ctx, args) => {

        // --- Has user connected?
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new ConvexError("Not authenticated");

        // --- Has user on the DB?
        const user = await ctx.db.query("users").filter((q) => q.eq(q.field("email"), identity.email)).collect(); // --- Match by EMAIL
        if (user.length == 0) throw new ConvexError("User not found!");

        const category = await ctx.db.insert("categories", {
            name: args.name,
            description: args.description,
            createdBy: user[0]._id
        });

        return category;
    }
})

export const getAllCategories = query({
    handler: async (ctx) => {
        return await ctx.db.query("categories").order("asc").collect();
    },
});

export const updateCategory = mutation({
    args: {
        name: v.string(),
        description: v.string(),
        id: v.id("categories")
    },
    handler: async (ctx, args) => {

        const category = await ctx.db.get(args.id);

        if (!category) {
            return {success: false, message: "Not found"}
        }

        await ctx.db.patch(args.id, {
            name: args.name,
            description: args.description,
        });

        return {success: true, message: "Updated Completed"}
    },
});