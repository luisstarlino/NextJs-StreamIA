/**
* @LuisStarlino
* Created AT: 20/10/2024 | 19:20
*/

"use client";

//------------------------------------------------
// --- IMPORT'S
//------------------------------------------------
import { Id } from '@/convex/_generated/dataModel'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import React from 'react'
import PodcastDetailsPlayer from '@/components/PodcastDetailsPlayer';
import LoaderSpinner from '@/components/LoaderSpinner';
import PodcastCard from '@/components/PodcastCard';
import EmptyState from '@/components/EmptyState';
import { useUser } from '@clerk/nextjs';

const PodcastDetails = ({ params: { podcast_id } }: { params: { podcast_id: Id<"podcasts"> } }) => {
    const { user } = useUser();

    //------------------------------------------------
    // --- CONST'S
    //------------------------------------------------
    const similarPodcasts = useQuery(api.podcasts.getPodcastByVoiceType, { podcastId: podcast_id });
    const podcast = useQuery(api.podcasts.getPodcastById, { podcastId: podcast_id })
    const isOwner = user?.id == podcast?.authorId;

    if (!similarPodcasts || !podcast) return <LoaderSpinner />


    return (
        <section className='flex w-full flex-col'>
            <header className='mt-9 flex items-center justify-between'>
                <h1 className='text-20 font-bold text-white-1'>
                    Currenty Playing
                </h1>
                <figure className='flex gap-3'>
                    <Image
                        src={"/icons/headphone.svg"}
                        width={24}
                        height={24}
                        alt='headphone'
                    />
                    <h2 className='text-16 font-bold text-white-1'>
                        {podcast?.views}
                    </h2>
                </figure>
            </header>

            {/* PLAYER DETAILS */}
            <PodcastDetailsPlayer
                isOwner={isOwner}
                podcastId={podcast._id}
                {...podcast}
            />

            <p className='text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center'>{podcast?.description}</p>

            <div className='flex flex-col gap-8'>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-18 font-bold text-white-1'>Transcription</h1>
                    <p className='text-16 font-medium text-white-2'>{podcast?.voicePrompt}</p>
                </div>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-18 font-bold text-white-1'>Thumbnail Prompt</h1>
                    <p className='text-16 font-medium text-white-2'>{podcast?.imagePrompt}</p>
                </div>
            </div>

            <section className='mt-8 flex flex-col gap-5'>
                <h1 className='text-20 font-bold text-white-1'>Similar Podcasts</h1>
                {similarPodcasts && similarPodcasts.length > 0 ? (
                    <div className='podcast_grid'>
                        {similarPodcasts?.map(({ _id, description, imageUrl, title }) => (
                            <PodcastCard
                                key={_id}
                                imgUrl={imageUrl!}
                                title={title}
                                description={description}
                                podcastId={_id}
                            />
                        ))}
                    </div>
                ) : (
                    <>
                        <EmptyState title={"No similar podcasts found"} buttonLink={"/discover"} buttonText={"Discover more podcasts"} />
                    </>
                )}
            </section>
        </section>
    )
}

export default PodcastDetails