/**
* @LuisStarlino
* Created AT: 27/10/2024 | 10:30
*/

"use client";

//------------------------------------------------
// --- IMPORT'S
//------------------------------------------------
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';
import { useDebounce } from '@/lib/useDebounce';

const SearchBar = () => {

    //------------------------------------------------
    // --- CONST'S
    //------------------------------------------------
    const [search, setSearch] = useState("");
    const pathName = usePathname();
    const router = useRouter();

    const debounceValue = useDebounce(search, 500);

    //------------------------------------------------
    // --- USEEFFECT'S
    //------------------------------------------------
    useEffect(() => {
        if (debounceValue) {
            router.push(`/discover?search=${debounceValue}`);
        } else if (!debounceValue && pathName == '/discover') router.push('/discover');


    }, [router, pathName, debounceValue])

    return (
        <div className='relative mt-8 block'>
            <Input
                className='input-class py-6 pl-12 focus-visible:ring-offset-orange-1'
                placeholder='Search for podcast'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onLoad={() => setSearch('')}

            />
            <Image src={'/icons/search.svg'} alt='search' height={20} width={20} className='absolute left-4 top-3.5' />
        </div>
    )
}

export default SearchBar