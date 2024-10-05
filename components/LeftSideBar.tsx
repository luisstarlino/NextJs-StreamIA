/**
* @LuisStarlino
* Created AT: 29/09/2024 | 19:00
*/

'use client';

//------------------------------------------------
// IMPORTS
//------------------------------------------------
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

const LeftSideBar = () => {

    //------------------------------------------------
    // CONST'S
    //------------------------------------------------
    const pathName = usePathname();
    const router = useRouter();


    return (
        <section className='left_sidebar'>
            <nav className='flex flex-col gap-6'>

                {/* ICON */}
                <Link href={'/'} className='flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center'>
                    <Image src={'/icons/logo.svg'} alt='logo' width={23} height={27} />
                    <h1 className='text-34 text-white font-extrabold max-lg:hidden'>Stream IA</h1>
                </Link>

                {/* Routes */}
                {sidebarLinks.map(({ route, label, imgURL }) => {

                    let isActive = pathName === route || pathName.startsWith(`${route}/`)

                    return (
                        <Link href={route} key={label}
                            className={
                                cn('flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start',
                                    { 'bg-nav-focus border-r-4 border-orange-1': isActive } // --- Do something, is is Active!!
                            )}
                        >
                            <Image src={imgURL} alt={label} width={24} height={24} />
                            <p>{label}</p>
                        </Link>
                    )
                })}
            </nav>
        </section>
    )
}

export default LeftSideBar;