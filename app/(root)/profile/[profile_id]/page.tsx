/**
* @LuisStarlino
* Created AT: 20/10/2024 | 23:50
*/

"use client";

//------------------------------------------------
// --- IMPORT'S
//------------------------------------------------
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/hooks/use-toast"
import LoaderSpinner from "@/components/LoaderSpinner";
import EmptyState from "@/components/EmptyState";
import { useUser } from "@clerk/nextjs";
import ProfileDetailPlayer from "@/components/profile/ProfileDetailsPlayer";

const ProfileDetails = ({ params: { profile_id } }: { params: { profile_id: string } }) => {

    //------------------------------------------------
    // --- CONST'S
    //------------------------------------------------
    const userData = useQuery(api.users.getUserById, { clerkId: profile_id });
    const allPodcasts = useQuery(api.podcasts.getPodcastByAuthorId, { authorId: profile_id });
    const { toast } = useToast(); // --- Toast Messages
    const { user } = useUser();


    //------------------------------------------------
    // --- HANDLE PROFILE
    //------------------------------------------------
    const isMyProfile = user?.id == userData?.clerkId;
    const randomPodcast = allPodcasts?.podcasts[0]; // TODO: MAKE THIS FUNCTION RANDOM

    console.log(randomPodcast);


    return (
        <section className='flex w-full flex-col'>

            {/* HEADER */}
            <header className='mt-9 flex items-center justify-between'>
                <h1 className='text-20 font-bold text-white-1'>
                    {isMyProfile ? 'My Profile' : 'Profile'}
                </h1>
            </header>

            {/* USER NOT FOUND */}
            {!userData && <EmptyState title="Profile not found" search={false} buttonText="Back to home" buttonLink="/" />}

            {/* PROFILE CARD */}
            <ProfileDetailPlayer
                randomPodcast={{
                    author: randomPodcast?.author!,
                    podcastId: randomPodcast?._id!,
                    title: randomPodcast?.title!,
                    audioUrl: randomPodcast?.audioUrl,
                    imageUrl: randomPodcast?.imageUrl,
                }}
                isMyProfile={isMyProfile}
                authorId={userData?.clerkId!}
                imageStorageId={userData?.imageUrl!}
                fullName={`${userData?.name}`}
                listeners={allPodcasts?.listeners ?? 0}
                profile_id={userData?._id!}
            />

        </section>
    )
}

export default ProfileDetails;