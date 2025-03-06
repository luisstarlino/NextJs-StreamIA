/* eslint-disable no-unused-vars */

import { Dispatch, SetStateAction } from "react";

import { Id } from "@/convex/_generated/dataModel";

export interface EmptyStateProps {
    title: string;
    search?: boolean;
    buttonText?: string;
    buttonLink?: string;
}

export interface TopPodcastersProps {
    _id: Id<"users">;
    _creationTime: number;
    email: string;
    imageUrl: string;
    clerkId: string;
    name: string;
    podcast: {
        podcastTitle: string;
        podcastId: Id<"podcasts">;
    }[];
    totalPodcasts: number;
}

export interface PodcastProps {
    _id: Id<"podcasts">;
    _creationTime: number;
    audioStorageId: Id<"_storage"> | null;
    user: Id<"users">;
    podcastTitle: string;
    podcastDescription: string;
    audioUrl: string | null;
    imageUrl: string | null;
    imageStorageId: Id<"_storage"> | null;
    author: string;
    authorId: string;
    authorImageUrl: string;
    voicePrompt: string;
    imagePrompt: string | null;
    voiceType: string;
    audioDuration: number;
    views: number;
}

export interface ProfilePodcastProps {
    podcasts: PodcastProps[];
    listeners: number;
}

export interface GeneratePodcastProps {
    voiceType: string | null;
    setAudio: Dispatch<SetStateAction<string>>;
    audio: string;
    setAudioStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
    voicePrompt: string;
    setVoicePrompt: Dispatch<SetStateAction<string>>;
    setAudioDuration: Dispatch<SetStateAction<number>>;
}

export interface GenerateThumbnailProps {
    setImage: Dispatch<SetStateAction<string>>;
    setImageStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
    image: string;
    imagePrompt: string;
    setImagePrompt: Dispatch<SetStateAction<string>>;
}

export interface LatestPodcastCardProps {
    imgUrl: string;
    title: string;
    duration: string;
    index: number;
    audioUrl: string;
    author: string;
    views: number;
    podcastId: Id<"podcasts">;
}

export interface PodcastDetailPlayerProps {
    audioUrl?: string | undefined;
    title: string;
    author: string;
    isOwner: boolean;
    imageUrl?: string | undefined;
    podcastId: Id<"podcasts">;
    imageStorageId?: Id<"_storage"> | undefined;
    audioStorageId?: Id<"_storage"> | undefined;
    authorImageUrl: string;
    authorId: string;
}

export interface AudioProps {
    title: string;
    audioUrl: string | undefined;
    author: string;
    imageUrl: string | undefined;
    podcastId: Id<"podcasts"> | string;
}

export interface AudioContextType {
    audio: AudioProps | undefined;
    setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>;
}

export interface PodcastCardProps {
    imgUrl: string;
    title: string;
    description: string;
    podcastId: Id<"podcasts">;
}

export interface CarouselProps {
    fansLikeDetail: TopPodcastersProps[];
}

export interface ProfileCardProps {
    podcastData: ProfilePodcastProps;
    imageUrl: string;
    userFirstName: string;
}

export type UseDotButtonType = {
    selectedIndex: number;
    scrollSnaps: number[];
    onDotButtonClick: (index: number) => void;
};


/*
* *********************************************************************
* --- ONLY TABLE COMPONETS BELLOW
* *********************************************************************
* */

//------------------------------------------------
// --- PODCAST PROPS 
//------------------------------------------------


//------------------------------------------------
// --- PROFILE CARD PROPS
//------------------------------------------------
export interface ProfileDetailPlayerProps {
    randomPodcast: {
        audioUrl?: string | undefined;
        title: string;
        imageUrl?: string | undefined;
        author: string;
        podcastId: Id<"podcasts">;
    }
    imageStorageId?: string | undefined;
    fullName: string | undefined;
    profile_id: Id<"users">;
    isMyProfile: boolean;
    listeners: number;
    authorId: string;
}

//------------------------------------------------
// --- CATEGORY CARD PROPS
//------------------------------------------------
export interface FilterByCategories {
    data: CategoryProps[];
    handleSearch: (t: string) => void;
    valueSearch: string;
}

export interface CategoryProps {
    name: string;
    description: string;
    _id: Id<"categories">;
    _creationTime: number;
}