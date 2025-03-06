import { GeneratePodcastProps } from '@/types'
import React, { useState } from 'react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { v4 as uuidV4 } from 'uuid';
import { generateUploadUrl } from '@/convex/files';
import { useToast } from "@/hooks/use-toast"
import { useUploadFiles } from '@xixixao/uploadstuff/react';


//------------------------------------------------
// --- GENERATE PODCAST FUNCTION
//------------------------------------------------
const useGeneratePodcast = (p: GeneratePodcastProps) => {
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const getPodcastAudio = useAction(api.openia.generateAudioAction);

    // --- Toast Messages
    const { toast } = useToast();

    // --- upload process
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const { startUpload } = useUploadFiles(generateUploadUrl);

    // --- audio process
    const getAudioUrl = useMutation(api.podcasts.getUrl);

    const generatePodcast = async () => {
        setIsGenerating(true);
        p.setAudio('');

        if (!p.voiceType) {
            toast({
                title: "Please, provider a voice type to generate a Podcast!"
            });
            return setIsGenerating(false);
        }

        try {

            const resp = await getPodcastAudio({
                voice: p.voiceType,
                input: p.voicePrompt
            });

            const blob = new Blob([resp], { type: 'audio/mpeg' });
            const fileName = `podcast-${uuidV4()}.mp3`;
            const file = new File([blob], fileName, { type: 'audio/mpeg' });

            const uploaded = await startUpload([file]);
            const storageId = (uploaded[0].response as any).storageId;

            p.setAudioStorageId(storageId);

            const audioUrl = await getAudioUrl({ storageId });
            p.setAudio(audioUrl!);

            setIsGenerating(false);

            toast({ title: "Podcast generating successfully" });

        } catch (error) {
            console.log("Error generating podcast: ", error);
            toast({
                title: "Error creating a podcast",
                variant: 'destructive'
            });
            setIsGenerating(false);

        }
    }



    // --- returns
    return { isGenerating, generatePodcast }
}
//------------------------------------------------


const GeneratePodcast = (props: GeneratePodcastProps) => {

    //------------------------------------------------
    // --- CONST'S
    //------------------------------------------------
    const { isGenerating, generatePodcast } = useGeneratePodcast(props);

    return (
        <div>
            <div className='flex flex-col gap-2.5'>
                <Label className='text-16 font-bold text-white-1'>
                    IA prompts to generate podcast
                </Label>
                <Textarea
                    className='input-class font-light focus-visible:ring-offset-orange-1'
                    placeholder='Provide text to generate audio'
                    rows={5}
                    value={props.voicePrompt}
                    onChange={e => props.setVoicePrompt(e.target.value)}
                />
            </div>


            {/* GENERATE BTN */}
            <div className='mt-5 w-full max-w-[200px]'>
                <Button type="button" className="text-16 bg-orange-1 py-4 font-bold text-white-1" onClick={generatePodcast}>
                    {isGenerating ?
                        <>
                            Generating <Loader size={20} className="animate-spin mr-l" />
                        </> :
                        "Generate Audio"
                    }
                </Button>
            </div>

            {/* LISTENIG AREA */}
            {props.audio && (
                <audio
                    controls
                    src={props.audio}
                    autoPlay
                    className='mt-5'
                    onLoadedMetadata={(e) => props.setAudioDuration(e.currentTarget.duration)}
                />
            )}
        </div>
    )
}

export default GeneratePodcast