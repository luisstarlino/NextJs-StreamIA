/*
 * ***************************************************************************************
 * File: podcastType.ts
 * @Author: Luis Starlino
 * @Date: 2024-12-14
 * @Description: Contains all types related to the primitive type 'Podcast' (using in convex)
 * 
 * Ps: This is a new standard adopted during the development of the project. New structures
 *     will be created like this, and old ones will be rewritten where possible.
 * ***************************************************************************************
*/

// ===== IMPORTS =====
import { Id } from "@/convex/_generated/dataModel";


export interface PodcastViewProps {
    _id: Id<"podcasts">;
    _creationTime: number;
    podcastTitle: string;
    views: number;
    audioDuration: number;
}