/**
* @LuisStarlino
* Created AT: 20/10/2024 | 12:00
*/

//------------------------------------------------
// --- IMPORTS'S
//------------------------------------------------
import { ConvexError, v } from "convex/values";
import { internalMutation, query } from "./_generated/server";

export const getCategoryById = query({
    args: { id: v.string() },
    handler: async (ctx, args) => {
        const category = await ctx.db.query("categories").filter((q) => q.eq(q.field("_id"), args.id)).unique();

        if(!category) throw new ConvexError("Category not found");

        return category;
    }
})