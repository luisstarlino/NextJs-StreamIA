/**************************************************************************************
// @LuisStarlino | 31/03/2024 23"53
/***************************************************************************************/
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CellActionsCategory } from "@/types/tables/columnsCategory";
// import { DEFAULT_MESSAGES } from "@/configs/Constants";
// import { CellActionsColorProps, CellActionsFreteProps } from "@/types/TClient";
// import axios from "axios";
// import { AlertModal } from "@/components/dus/AlertModal";
// import useLoadingPage from "@/hooks/use-loading-page";

export const CellActionsCat: React.FC<CellActionsCategory> = ({ data }) => {

    //------------------------------------------------
    // CONST'S
    //------------------------------------------------
    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState(false);
    const url = `/system/category//${data?._id}`;
    const [loading, setLoading] = useState(false);


    // --- Se estiver aberto, vai fechar ele
    // useEffect(() => {
    //     if (loadingModal.isOpen) loadingModal.onClose();
    // }, [])

    //------------------------------------------------
    // CHANGE PAGE
    //------------------------------------------------
    const changeP = () => {
        // loadingModal.onOpen();
        router.push(url);
    }

    //------------------------------------------------
    // ON COPY FUNCTION
    //------------------------------------------------
    const onCopy = () => {
        navigator.clipboard.writeText(`${window.location.origin}${url}`);
        toast.success("Category Link Copy!");
    }

    return (
        <>
            {/* <AlertModal
                isOpen={open} onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            /> */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className="h-8 w-8 p-0">
                        {/* <span className="sr-only">Abrir Opções</span> */}
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white-1">
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuItem onClick={changeP} className=" cursor-pointer">
                        <Edit className="mr-2 h-4 w-4" />Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onCopy} className=" cursor-pointer">
                        <Copy className="mr-2 h-4 w-4" />Copy URL
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
};