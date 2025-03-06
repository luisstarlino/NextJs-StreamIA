"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import PodcastCard from '@/components/PodcastCard';
import { Button } from '@/components/ui/button';
import { podcastData } from '@/constants';
import React, { useEffect } from 'react'
import useLoadingPage from "@/hooks/use-loading";

const Home = () => {

  const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);

  const loadingController = useLoadingPage();

  useEffect(() => {
    if (loadingController.isOpen) return loadingController.onClose();
  }, []);

  return (
    <div className='mt-9 flex flex-col gap-9'>
      <section className='flex flex-col gap-5'>
        <h1 className='text-20 font-bold text-white-1'>Trending Podcast</h1>

        {/* <Button onClick={() => loadingController.onOpen()} className="border-white-1 bg-red-50">A</Button> */}

        <div className='podcast_grid'>
          {trendingPodcasts?.map(({ _id, description, imageUrl, title }) => (
            <PodcastCard
              key={_id}
              imgUrl={imageUrl!}
              title={title}
              description={description}
              podcastId={_id}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home;