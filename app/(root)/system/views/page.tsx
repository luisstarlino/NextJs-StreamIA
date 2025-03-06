/* ****************************************************************************************
* @Author: Luis Starlino
* @Date: 2024-12-13 20:35
**************************************************************************************** */

"use client";

// ===== IMPORTS =====
import { useQuery } from "convex/react";
import { Bar, BarChart, CartesianGrid, Label, Pie, PieChart, XAxis } from "recharts"

import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import LoaderSpinner from "@/components/LoaderSpinner";
import { DataTable } from "@/components/table/Databable";
import { columnsViews } from "@/types/tables/columnsViews";
import { ChartContainer, type ChartConfig, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";

const ViewsListPage = () => {

    // ===== CONSTANTS =====
    const router = useRouter();
    const dataViews = useQuery(api.podcasts.getAllPodcastsViews);

    // ===== LOADING WHEN GET DATA 
    if (!dataViews) return <LoaderSpinner />;
    console.log(dataViews);

    // ===== CHARTS =====
    const renderViewByCategory = () => {

        const chartCateogryConfig = {
            views: {
                label: "Category Name",
                color: "#F97535",
            }
        } satisfies ChartConfig;

        return (
            <Card className="w-1/2">
                <CardHeader>
                    <CardTitle className="text-20 font-bold text-white-1">10 Moust Popular Categories.</CardTitle>
                    <p className="text-12 font-normal text-white-2 italic">Group by views.</p>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartCateogryConfig} className="min-h-[200px] w-full">
                        <BarChart accessibilityLayer data={dataViews.categoryChart}>
                            <CartesianGrid vertical={false} stroke="#FFFFFF33" />
                            <XAxis
                                dataKey="categoryName"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />

                            <Bar dataKey="views" fill="var(--color-views)" radius={4} />
                            {/* <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} /> */}
                        </BarChart>
                    </ChartContainer>
                </CardContent>

            </Card>
        )
    }

    function renderPieChart() {

        // ===== DUMMY TEMP TABLE
        const chartData = [
            { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
            { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
            { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
            { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
            { browser: "other", visitors: 190, fill: "var(--color-other)" },
        ]

        const chartConfig = {
            visitors: {
                label: "Visitors",
            },
            chrome: {
                label: "Chrome",
                color: "#F97535",
            },
            safari: {
                label: "Safari",
                color: "hsl(var(--chart-2))",
            },
            firefox: {
                label: "Firefox",
                color: "hsl(var(--chart-3))",
            },
            edge: {
                label: "Edge",
                color: "hsl(var(--chart-4))",
            },
            other: {
                label: "Other",
                color: "hsl(var(--chart-5))",
            },
        } satisfies ChartConfig

        // const totalVisitors = useMemo(() => {
        //     return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
        // }, [])


        return (
            <Card className="w-1/2">
                <CardHeader className="items-center pb-0 text-white-1">
                    <CardTitle>Browser Trending</CardTitle>
                    <CardDescription>January - June</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[250px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={chartData}
                                dataKey="visitors"
                                nameKey="browser"
                                innerRadius={60}
                                strokeWidth={5}
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-white-1 text-3xl font-bold"
                                                    >
                                                        1989
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-white-1 text-white"
                                                    >
                                                        Visitors
                                                    </tspan>
                                                </text>
                                            )
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        )
    }


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
                <p className="text-24 font-semibold text-white-1 mt-1">Top Charts</p>
                <div className="flex flex-row justify-between gap-5">

                    {renderViewByCategory()}
                    {renderPieChart()}
                    {/* <Card className="w-1/2">
                        <CardHeader>
                            <p className="text-14 font-normal text-white-2 mb-3">Total Views</p>
                            <CardTitle className="text-20 font-bold text-white-1">+5000.</CardTitle>
                            <p className="text-12 font-normal text-white-2 italic">+100 from last month.</p>
                        </CardHeader>
                        <CardContent>
                            {renderDummyChart()}
                        </CardContent>

                    </Card> */}
                </div>
                <DataTable columns={columnsViews} data={dataViews.table!} searchKey='_id' dynamicPlaceHolder="Filter by name..." />
            </section>
        </div>
    )


}

export default ViewsListPage;