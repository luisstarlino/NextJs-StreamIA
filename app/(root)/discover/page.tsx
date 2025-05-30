/**
* @LuisStarlino
* Created AT: 27/10/2024 | 10:30
*/

"use client";

//------------------------------------------------
// --- IMPORT'S
//------------------------------------------------
import EmptyState from '@/components/EmptyState';
import LoaderSpinner from '@/components/LoaderSpinner';
import PodcastCard from '@/components/PodcastCard';
import SearchBar from '@/components/SearchBar';
import { api } from '@/convex/_generated/api';
import useLoadingPage from '@/hooks/use-loading';
import { useQuery } from 'convex/react';
import React, { useEffect } from 'react'

const Discover = ({ searchParams: { search } }: {
  searchParams: {
    search: string
  }
}) => {

  //------------------------------------------------
  // --- CONST'S
  //------------------------------------------------
  const podcastsData = useQuery(api.podcasts.getPodcastBySearch, {
    search: search || ""
  });

  const loadingController = useLoadingPage();

  useEffect(() => {
    if (loadingController.isOpen) return loadingController.onClose();
  }, [])

  return (
    <div className='flex flex-col gap-9'>

      {/* SearchBar */}
      <SearchBar />

      <div className='flex flex-col gap-9'>
        <h1 className='text-20 font-bold text-white-1'>
          {!search ? "Discover Trending Podcast" : `Search results for: `}
          {search && <span className='text-white-2'>{search}</span>}
        </h1>
        {podcastsData ? (
          <>
            {podcastsData.length > 0 ? (
              <div className='podcast_grid'>
                {podcastsData?.map(({ _id, description, imageUrl, title }) => (
                  <PodcastCard
                    key={_id}
                    imgUrl={imageUrl!}
                    title={title}
                    description={description}
                    podcastId={_id}
                  />
                ))}
              </div>
            )
              : (<EmptyState title='No results found' />)}
          </>
        ) : (<LoaderSpinner />)
        }
      </div>

    </div>
  )
}

export default Discover;