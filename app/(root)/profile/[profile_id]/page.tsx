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
import FilterBy from "@/components/core/FilterBy";
import PodcastCard from "@/components/PodcastCard";
import { PodcastProps } from "@/types";
import { Id } from "@/convex/_generated/dataModel";
import { getRandomInt } from "@/lib/utils";

const ProfileDetails = ({ params: { profile_id } }: { params: { profile_id: string } }) => {

    //------------------------------------------------
    // --- CONST'S
    //------------------------------------------------
    const allPodcasts = useQuery(api.podcasts.getPodcastByAuthorId, { authorId: profile_id });
    const userData = useQuery(api.users.getUserById, { clerkId: profile_id });
    const { toast } = useToast(); // --- Toast Messages
    const { user } = useUser();

    //------------------------------------------------
    // --- SEARCH ENGINE
    //------------------------------------------------
    const [searchValue, setSearchValue] = useState<string>("");
    const [filterList, setFilterList] = useState<any>();

    
    useEffect(() => {

        if (searchValue === "") return setFilterList(allPodcasts?.podcasts);

        let applyFilter = allPodcasts?.podcasts.filter((p) => p.categoryId == searchValue);
        setFilterList(applyFilter);
    }, [searchValue]);

    useEffect(() => {
        if (!filterList) setFilterList(allPodcasts?.podcasts);
    }, [allPodcasts?.podcasts]);


    //------------------------------------------------
    // --- HANDLE PROFILE
    //------------------------------------------------
    const isMyProfile = user?.id == userData?.clerkId;
    const randomPodcast = allPodcasts?.podcasts[getRandomInt(allPodcasts?.podcasts?.length)];

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

            {/* ALL PODCASTS FROM THIS USER */}
            <section className='mt-14 flex flex-col gap-5'>
                <hr />

                {/* Name and Select By Category */}
                <div className="flex items-center justify-between">
                    <h1 className='text-20 font-bold text-white-1'>All</h1>
                    <FilterBy
                        data={allPodcasts?.categories!}
                        handleSearch={(t) => setSearchValue(t)}
                        valueSearch={searchValue}
                    />
                </div>

                
                {filterList?.length! > 0 ?

                    <div className='podcast_grid'>
                        {filterList?.map(({ _id, description, imageUrl, title }: {
                            _id: Id<"podcasts">, description: string, imageUrl: string, title: string
                        }) => (
                            <PodcastCard
                                key={_id}
                                imgUrl={imageUrl!}
                                title={title}
                                description={description}
                                podcastId={_id}
                            />
                        ))}
                    </div>
                    :
                    <EmptyState title="No podcasts found1" search={false} />
                }



            </section>

        </section>
    )
}

export default ProfileDetails;