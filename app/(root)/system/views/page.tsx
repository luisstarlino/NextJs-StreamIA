/**
* @LuisStarlino
* Created AT: 13/12/2024 | 20:35
*/

"use client";

import LoaderSpinner from "@/components/LoaderSpinner";
//------------------------------------------------
// --- IMPORT'S
//------------------------------------------------
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table/Databable";
import { columnsViews } from "@/types/tables/columnsViews";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ViewsListPage = () => {

    //------------------------------------------------
    // --- CONST'S
    //------------------------------------------------
    const podcasts = useQuery(api.podcasts.getAllPodcastsViews);

    const router = useRouter();

    if (!podcasts) return <LoaderSpinner />;

    return (
        <div className='mt-9 flex flex-col gap-9'>

            <section className='flex flex-col gap-5'>
                <div className='flex justify-between'>
                    <h1 className='text-20 font-bold text-white-1'>Views Analysis</h1>
                    <Button className='text-16 text-black-2 border-white-1 border-2 bg-white-1 hover:bg-transparent hover:text-white-1 hover:transition-colors'
                        variant={"default"}
                        size={"lg"}
                        onClick={() => router.push('/system')}
                    >
                        BACK TO SYSTEM
                    </Button>
                </div>

                <hr />
                <div className="flex flex-col gap-5">
                    <Card className="w-[350px]">
                        <CardHeader>
                            <CardTitle>Total Views</CardTitle>
                            <CardDescription>+5000.</CardDescription>
                            <CardDescription>+100 from last month.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            
                        </CardContent>

                    </Card>
                </div>

                <DataTable columns={columnsViews} data={podcasts!} searchKey='name' dynamicPlaceHolder="Filter by name..." />
            </section>
        </div>
    )


}

export default ViewsListPage;