/**
* @LuisStarlino
* Created AT: 26/10/2024 | 18:20
*/
"use client"

//------------------------------------------------
// --- IMPORT'S
//------------------------------------------------
import { AudioContextType, AudioProps } from "@/types";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";


const AudioContext = createContext<AudioContextType | undefined>(undefined);

const AudioProvider = ({ children }: { children: React.ReactNode }) => {

    //------------------------------------------------
    // --- CONST'S
    //------------------------------------------------
    const [audio, setAudio] = useState<AudioProps | undefined>();
    const pathName = usePathname();

    //------------------------------------------------
    // --- USEEFFECT'S
    //------------------------------------------------
    useEffect(() => {
        // --- When the user gonna create a new, stop music
        if (pathName === '/create-podcast') setAudio(undefined);
    }, [pathName]);

    return (
        <AudioContext.Provider value={{ audio, setAudio }}>
            {children}
        </AudioContext.Provider>
    )
}

export const useAudio = () => {
    const context = useContext(AudioContext);

    if(!context) throw new Error('useAudio must be used wihtin an AudioProvider!');

    return context;
}

export default AudioProvider;