"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CategoryProps } from ".."
import { CellActionsCat } from "@/components/table/cells/cellsCategory"

export const columnsCategory: ColumnDef<CategoryProps>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    // {
    //     accessorKey: "_id",
    //     header: "Id",
    // },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <CellActionsCat data={row.original} />
    },
]

export interface CellActionsCategory {
    data: CategoryProps
}