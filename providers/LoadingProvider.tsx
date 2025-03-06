"use client";

import { useEffect, useState } from "react";
import PreviewModal from "@/components/LoadingPageModal";
// import PreviewModal from "@/components/dus/Modal/LoadingPageModal";

const LoadingPageProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[])

    if(!isMounted) return null;


    return(
        <>
            <PreviewModal/>
        </>
    )
}

export default LoadingPageProvider;