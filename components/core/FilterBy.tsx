/**
* @LuisStarlino
* Created AT: 28/10/2024 | 17:20
*/

"use client";

//------------------------------------------------
// --- IMPORT'S
//------------------------------------------------
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Check, ChevronsUpDown, FilterIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterByCategories } from "@/types";
import LoaderSpinner from "../LoaderSpinner";


const FilterBy = ({ data, handleSearch, valueSearch }: FilterByCategories) => {

    //------------------------------------------------
    // --- IMPORT'S
    //------------------------------------------------
    const [open, setOpen] = useState(false);

    if (!data) return <LoaderSpinner />;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="bg-black-1 rounded-[6px] border-white-5">
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] flex gap-2 justify-start text-white-1 font-bold items-center"
                >
                    <FilterIcon className="ml-2 h-4 w-4 shrink-0 opacity-80" color="white" />
                    {valueSearch ?
                        data.find((category) => category._id === valueSearch)?.description
                        : "Select category"
                    }

                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-white-1">
                <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>

                            {data.map((c) => (
                                <CommandItem
                                    key={c._id}
                                    value={c._id}
                                    className="cursor-pointer"
                                    onSelect={(currentValue) => {
                                        handleSearch(currentValue === valueSearch ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            valueSearch === c._id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {c.description}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )

}

export default FilterBy;