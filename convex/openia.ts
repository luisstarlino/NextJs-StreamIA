import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from 'openai';
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const openaiNewKey = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY_IMAGE
})

export const generateAudioAction = action({
    args: { input: v.string(), voice: v.string() },
    handler: async (_, { voice, input }) => {

        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: voice as SpeechCreateParams['voice'],
            input: input,
        });

        const buffer = await mp3.arrayBuffer();

        return buffer;
    },
});

export const generateThumbnailAction = action({
    args: { prompt: v.string() },
    handler: async (_, { prompt }) => {
        const resp = await openaiNewKey.images.generate({
            model: "dall-e-3",
            prompt,
            size: '1024x1024',
            quality: 'standard',
            n: 1
        })

        const url = resp.data[0]?.url;

        if (!url) throw new Error("Error generating a Thumbnail");

        const imageResp = await fetch(url);
        const buffer = await imageResp.arrayBuffer();

        return buffer;
    }
})