/**
* @LuisStarlino
* Created AT: 28/10/2024 | 09:30
*/

"use client";

//------------------------------------------------
// --- IMPORT'S
//------------------------------------------------
import { ProfileDetailPlayerProps } from "@/types";
import { useAudio } from '@/providers/AudioProvider';
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import Image from "next/image";
import LoaderSpinner from "../LoaderSpinner";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

const ProfileDetailPlayer = (p: ProfileDetailPlayerProps) => {

    //------------------------------------------------
    // --- CONST'S
    //------------------------------------------------
    const [showMiniMenu, setShowMiniMenu] = useState(false);
    const { setAudio } = useAudio();
    const { toast } = useToast();

    //------------------------------------------------
    // ON COPY FUNCTION
    //------------------------------------------------
    const onCopy = () => {
        navigator.clipboard.writeText(p?.profile_id);
        toast({ description: "Perfil Copiado para a área de transferência!", title: "StreamIA Informa:" });
        setShowMiniMenu(false);
    }


    //------------------------------------------------
    // --- START RAMDOM PLAY
    //------------------------------------------------    
    const handlePlay = () => {
        setAudio({
            title: p.randomPodcast.title,
            audioUrl: p.randomPodcast.audioUrl,
            imageUrl: p.randomPodcast.imageUrl,
            author: p.randomPodcast.author,
            podcastId: p.randomPodcast.author,
        });
    };

    if (!p?.imageStorageId) return <LoaderSpinner />;

    return (
        <div className="mt-6 flex w-full justify-between max-md:justify-center">

            {/* HEADER */}
            <div className="flex flex-col gap-8 max-md:items-center md:flex-row">
                <Image
                    src={p?.imageStorageId}
                    width={250}
                    height={250}
                    alt="Podcast image"
                    className="aspect-square rounded-lg"
                />
                <div className="flex w-full flex-col gap-5 max-md:items-center md:gap-9">
                    <article className="flex flex-col gap-2 max-md:items-center">

                        {/* Verified Creator */}
                        <div className="flex flex-row gap-2 items-center">
                            <Image
                                src={'/icons/verified.svg'}
                                alt="verified_icon"
                                width={15}
                                height={15}
                                className="size-[15px] rounded-full object-cover"
                            />
                            <span className="text-white-1 text-14 font-thin">Verified Creator!</span>
                        </div>


                        <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">
                            {p.fullName}
                        </h1>

                        <div>
                            <figure className='flex gap-1 items-center'>
                                <Image
                                    src={"/icons/headphone.svg"}
                                    width={24}
                                    height={24}
                                    alt='headphone'
                                    className="mr-2"
                                />
                                <h2 className='text-18 font-bold text-white-1'>{p.listeners}</h2>
                                <h2 className='text-18 font-normal text-white-1'>Listeners on Total</h2>
                            </figure>
                        </div>
                    </article>

                    {/* PLAY RANDOM PODCAST */}
                    <Button
                        onClick={handlePlay}
                        className="text-16 w-full max-w-[250px] bg-orange-1 font-extrabold text-white-1"
                    >
                        <Image
                            src="/icons/Play.svg"
                            width={20}
                            height={20}
                            alt="random"
                        />&nbsp; Play a Random Podcast
                    </Button>
                </div>
            </div>

            {/* OPTIONS ON PROFILE */}
            <div className="relative mt-2">
                <Image
                    src="/icons/three-dots.svg"
                    width={30}
                    height={30}
                    alt="Three dots icon"
                    className="cursor-pointer"
                    onClick={() => setShowMiniMenu((prev) => !prev)}
                />
                {showMiniMenu && (
                    <div
                        className="absolute -left-40 -top-1 z-10 flex w-43 cursor-pointer justify-center gap-2 rounded-md bg-black-6 py-1.5 hover:bg-black-2 flex-col"
                    >
                        <section className="flex items-center justify-start gap-3 p-4" onClick={onCopy}>
                            <Copy color="white" className="h-4 w-4" />
                            <h2 className="text-16 font-normal text-white-1">Share Profile</h2>
                        </section>

                        <section className="flex items-center justify-start gap-3 p-4">
                            <Image
                                src="/icons/delete.svg"
                                width={16}
                                height={16}
                                alt="Delete icon"
                            />
                            <h2 className="text-16 font-normal text-white-1">Delete my Profile</h2>
                        </section>


                        {/* DIVIDER HERE */}
                        {/* <section>
                            <Image
                                src="/icons/delete.svg"
                                width={16}
                                height={16}
                                alt="Delete icon"
                            />
                            <h2 className="text-16 font-normal text-white-1">Delete</h2>
                        </section> */}
                    </div>
                )}
            </div>

        </div>
    );
};

export default ProfileDetailPlayer;