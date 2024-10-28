/**
* @LuisStarlino
* Created AT: 26/10/2024 | 15:20
*/

"use client";

//------------------------------------------------
// --- IMPORT'S
//------------------------------------------------
import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import Carousel from '@/components/Carousel';
import Header from '@/components/Header';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import LoaderSpinner from './LoaderSpinner';
import { useRouter } from 'next/navigation';

const RightSideBar = () => {

  //------------------------------------------------
  // --- CONST'S
  //------------------------------------------------
  const topPodcasters = useQuery(api.users.getTopUserByPodcastCount);
  const router = useRouter();
  const { user } = useUser();

  if (!topPodcasters) return <LoaderSpinner />

  return (
    <section className='right_sidebar text-white-1'>
      <SignedIn>
        <Link href={`profile/${user?.id}`} className='flex gap-3 pb-12'>
          <UserButton />
          <div className='flex w-full items-center justify-between'>
            <h1 className='text-16 truncate font-semibold text-white-1'>{user?.firstName} {user?.lastName}</h1>
            <Image src={'/icons/right-arrow.svg'} alt='arrow' height={24} width={24} />
          </div>
        </Link>
      </SignedIn>
      <section>
        <Header headerTitle={"Fans Like you"} />
        <Carousel fansLikeDetail={topPodcasters!} />
      </section>
      <section className='flex flex-col gap-8 pt-12'>
        <Header headerTitle={"Top Podcastrs"} />
        <div className='flex flex-col gap-6'>
          {topPodcasters?.slice(0, 4).map((p) => (
            <div key={p._id} className='flex cursor-pointer justify-between' onClick={() => router.replace(`/profile/${p.clerkId}`)}>
              <figure className='flex items-center gap-2'>
                <Image src={p.imageUrl} alt={p.name} width={44} height={44} className='aspect-square rounded-lg' />
                <h2 className='text-14 font-semibold text-white-1'>{p.name}</h2>
              </figure>
              <div className='flex items-center'>
                <p className='font-normal'>{p.totalPodcasts > 1 ? 'podcasts' : 'podcast'} </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}

export default RightSideBar;