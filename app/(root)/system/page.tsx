/**
* @LuisStarlino
* Created AT: 15/11/2024 | 11:05
*/

'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SiAudiobookshelf } from "react-icons/si";
import { BiSolidCategory } from "react-icons/bi";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
//------------------------------------------------
// IMPORTS
//------------------------------------------------
import React from 'react'

const System = () => {

    //------------------------------------------------
    // IMPORTS
    //------------------------------------------------
    const router = useRouter();


    const dummyOpts = [
        {
            id: 1,
            title: "Categories",
            desc: "Edit, Add or Remove from the system",
            link: 'system/category/',
            icon: () => <BiSolidCategory size={100} className='items-center' />
        },
        {
            id: 2,
            title: "Views",
            desc: "Count, statistics and analysis",
            link: 'system/views/',
            icon: () => <SiAudiobookshelf size={100} className='items-center' />
        },
        // {
        //     id: 2,
        //     title: "Profiles",
        //     desc: "See All Analys"
        // },
    ]

    return (
        <div className='mt-9 flex flex-col gap-9'>
            <section className='flex flex-col gap-5'>
                <h1 className='text-20 font-bold text-white-1'>System Managment</h1>
                <div className='podcast_grid'>
                    {dummyOpts.map((o) => (

                        <Card
                            key={o.id}
                            onClick={() => router.push(o.link)}
                            className="p-10 bg-orange-1 border-none hover:bg-white-1 transition-all cursor-pointer hover:text-orange-1 text-white-1"
                        >
                            <figure>
                                {/* <Image src={'/icons/system/category.png'} width={100} height={100} alt={o.title} className='aspect-square h-fit w-full rounded-xl 2xl:size-[200px] object-contain'/> */}
                                <div className='flex flex-col items-center gap-3'>
                                    <o.icon/>
                                    <h1 className='text-16 truncate font-bold'>{o.title}</h1>
                                    <h2 className='text-12 truncate font-normal capitalize'>{o.desc}</h2>
                                </div>
                            </figure>
                            {/* <CardHeader>
                                    <CardTitle>{o.title}</CardTitle>
                                    <CardDescription>{o.desc}</CardDescription>
                                </CardHeader> */}

                        </Card>

                    ))}
                </div>
            </section>
        </div>
    )
}

export default System;