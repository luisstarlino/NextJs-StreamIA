/**
* @LuisStarlino
* Created AT: 24/11/2024 | 18:18
*/

"use client";

//------------------------------------------------
// --- IMPORT'S
//------------------------------------------------
import { columnsCategory } from '@/types/tables/columnsCategory';
import { DataTable } from '@/components/table/Databable';
import LoaderSpinner from '@/components/LoaderSpinner';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import useLoadingPage from '@/hooks/use-loading';


const CategoryPage = () => {

  //------------------------------------------------
  // --- CONST'S
  //------------------------------------------------
  const categories = useQuery(api.categories.getAllCategories);
  const router = useRouter();

  const loadingController = useLoadingPage();

  useEffect(() => {
    if (loadingController.isOpen) return loadingController.onClose();
  }, [])

  const sendTo = (link: string) => {
    loadingController.onOpen();
    router.push(link)
  }

  if (!categories) return <LoaderSpinner />;

  return (
    <div className='mt-9 flex flex-col gap-9'>
      <section className='flex flex-col gap-5'>
        <div className='flex justify-between'>
          <h1 className='text-20 font-bold text-white-1'>All Categories</h1>
          <Button className='text-16 text-black-2 border-white-1 border-2 bg-white-1 hover:bg-transparent hover:text-white-1 hover:transition-colors'
            variant={"default"}
            size={"lg"}
            onClick={() => sendTo('/system')}
          >
            BACK TO SYSTEM
          </Button>
        </div>

        <DataTable columns={columnsCategory} data={categories!} searchKey='name' dynamicPlaceHolder="Filter by name..." />
      </section>
    </div>
  )
}

export default CategoryPage;