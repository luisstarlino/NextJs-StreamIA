/**
* @LuisStarlino
* Created AT: 27/10/2024 | 23:30
*/

"use client";

//------------------------------------------------
// --- IMPORT'S
//------------------------------------------------
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from 'react'

const MobileNav = () => {

  //------------------------------------------------
  // CONST'S
  //------------------------------------------------
  const pathName = usePathname();

  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image src={'/icons/hamburger.svg'} width={30} height={30} alt="menu" className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent side={"left"} className="border-none bg-black-1">

          {/* ICON */}
          <Link href={'/'} className='flex cursor-pointer items-center gap-1 pb-10 pl-4'>
            <Image src={'/icons/logo.svg'} alt='logo' width={23} height={27} />
            <h1 className='text-34 font-extrabold text-white-1 ml-2'>Stream IA</h1>
          </Link>

          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>

              {/* Routes */}
              <nav className="flex h-full flex-col gap-6 text-white-1 ">
                {sidebarLinks.map(({ route, label, imgURL }) => {

                  let isActive = pathName === route || pathName.startsWith(`${route}/`)

                  return (
                    <SheetClose key={route} asChild>
                      <Link href={route} key={label}
                        className={
                          cn('flex gap-3 items-center py-4 max-lg:px-4 justify-start',
                            { 'bg-nav-focus border-r-4 border-orange-1': isActive } // --- Do something, is is Active!!
                          )}
                      >
                        <Image src={imgURL} alt={label} width={24} height={24} />
                        <p>{label}</p>
                      </Link>
                    </SheetClose>
                  )
                })}
              </nav>
            </SheetClose>
          </div>

        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav;