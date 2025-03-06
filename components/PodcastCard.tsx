/**
* @LuisStarlino
* Created AT: 20/10/2024 | 19:20
*/

//------------------------------------------------
// --- IMPORT'S
//------------------------------------------------
import useLoadingPage from "@/hooks/use-loading";
import { useRouter } from 'next/navigation';
import { PodcastCardProps } from '@/types';
import Image from 'next/image';
import React from 'react'

const PodcastCard = ({ imgUrl, title, description, podcastId }: PodcastCardProps) => {

    //------------------------------------------------
    // --- CONST'S
    //------------------------------------------------
    const router = useRouter();
    const loadingController = useLoadingPage();

    //------------------------------------------------
    // --- HANDLE VIEW
    //------------------------------------------------
    const handleViews = async () => {

        // --- increase views
        loadingController.onOpen();

        // --- Go to details
        router.push(`/podcast/${podcastId}`, {
            scroll: true
        });

    }

    return (
        <div className='cursor-pointer' onClick={handleViews}>
            <figure className='flex flex-col gap-2'>
                <Image src={imgUrl} width={174} height={174} alt={title} className='aspect-square h-fit w-full rounded-xl 2xl:size-[200px]' />
                <div className='flex flex-col'>
                    <h1 className='text-16 truncate font-bold text-white-1'>{title}</h1>
                    <h2 className='text-12 truncate font-normal capitalize text-white-4'>{description}</h2>
                </div>
            </figure>
        </div>
    )
}

export default PodcastCard;