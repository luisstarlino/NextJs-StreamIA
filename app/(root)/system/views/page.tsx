/* ****************************************************************************************
 * @Author: Luis Starlino
 * @Date: 2024-12-13 20:35
 **************************************************************************************** */

"use client";

// ===== IMPORTS =====
import { useQuery } from "convex/react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import LoaderSpinner from "@/components/LoaderSpinner";
import { DataTable } from "@/components/table/Databable";
import { columnsViews } from "@/types/tables/columnsViews";
import { ChartContainer, type ChartConfig, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ViewsListPage = () => {

    // ===== CONSTANTS =====
    const router = useRouter();
    const podcasts = useQuery(api.podcasts.getAllPodcastsViews);

    // ===== LOADING WHEN GET DATA 
    if (!podcasts) return <LoaderSpinner />;

    // ===== CHARTS =====
    const chartData = [
        { month: "January", desktop: 186, mobile: 80 },
        { month: "February", desktop: 305, mobile: 200 },
        { month: "March", desktop: 237, mobile: 120 },
        { month: "April", desktop: 73, mobile: 190 },
        { month: "May", desktop: 209, mobile: 130 },
        { month: "June", desktop: 214, mobile: 140 },
    ]

    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "#2563eb",
        },
        mobile: {
            label: "Mobile",
            color: "#60a5fa",
        },
    } satisfies ChartConfig;

    const renderDummyChart = () => (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />

                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
        </ChartContainer>
    )




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
                    <Card className="w-[450px]">
                        <CardHeader>
                            <p className="text-14 font-normal text-white-2 mb-3">Total Views</p>
                            <CardTitle className="text-20 font-bold text-white-1">+5000.</CardTitle>
                            <p className="text-12 font-normal text-white-2 italic">+100 from last month.</p>
                        </CardHeader>
                        <CardContent>
                            {renderDummyChart()}
                        </CardContent>

                    </Card>
                </div>

                <DataTable columns={columnsViews} data={podcasts!} searchKey='name' dynamicPlaceHolder="Filter by name..." />
            </section>
        </div>
    )


}

export default ViewsListPage;