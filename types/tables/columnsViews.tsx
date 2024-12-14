"use client";

// ===== IMPORTS =====
import { PodcastViewProps } from "@/types/schemas/podcastTypes";
import moment from 'moment';
import { ColumnDef } from "@tanstack/react-table"

export const columnsViews: ColumnDef<PodcastViewProps>[] = [
    {
        accessorKey: "_id",
        header: "Id",
    },
    {
        accessorKey: "podcastTitle",
        header: "Title",
    },
    {
        accessorKey: "_creationTime",
        header: "Created At",
        cell: ({row}) => moment(row.original._creationTime).format("YYYY-MM-DD HH:mm")
    },
    {
        accessorKey: "views",
        header: "Views",
    },
    // {
    //     id: "actions",
    //     header: "Actions",
    //     cell: ({ row }) => <CellActionsCat data={row.original} />
    // },
]

export interface CellActionsCategory {
    data: PodcastViewProps
}