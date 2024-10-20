/**
* @LuisStarlino
* Created AT: 19/10/2024 | 15:40
*/

//------------------------------------------------
// --- IMPORT'S
//------------------------------------------------
import { useUploadFiles } from '@xixixao/uploadstuff/react';
import { useAction, useMutation } from 'convex/react';
import { GenerateThumbnailProps } from '@/types';
import React, { useRef, useState } from 'react'
import { api } from '@/convex/_generated/api';
import { useToast } from "@/hooks/use-toast"
import { Textarea } from './ui/textarea';
import { Loader } from 'lucide-react';
import { Button } from './ui/button'
import { v4 as uuidV4 } from 'uuid';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const GenerateThumbnail = ({ setImage, setImageStorageId, image, imagePrompt, setImagePrompt }: GenerateThumbnailProps) => {

  //------------------------------------------------
  // --- CONST'S
  //------------------------------------------------
  const [isIAThumnail, setIsIAThumnail] = useState<Boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<Boolean>(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // --- upload process
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);

  // --- get url process
  const getImageUrl = useMutation(api.podcasts.getUrl);
  const handleGenerateThumbnail = useAction(api.openia.generateThumbnailAction);

  //------------------------------------------------
  // --- HANDLE IMAGE (SEND TO CONVEX)
  //------------------------------------------------
  const handleImage = async (blob: Blob, fileName: string) => {
    setIsImageLoading(true);
    setImage('');

    try {
      const file = new File([blob], fileName, { type: 'image/png' });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setImageStorageId(storageId);

      const imageUrl = await getImageUrl({ storageId });
      setImage(imageUrl!);

      toast({ title: "Thumbnail generating successfully!" });
    } catch (e) {
      console.log(e);
      toast({ title: 'Error generating thumbnail', variant: 'destructive' });
    } finally {
      setIsImageLoading(false);
    }
  }

  //------------------------------------------------
  // --- GENERATE IMAGE FUNCTION
  //------------------------------------------------
  const generateImage = async () => {
    try {

      const resp = await handleGenerateThumbnail({ prompt: imagePrompt });
      const blob = new Blob([resp], { type: 'image/png' });
      handleImage(blob, `thumbnail-${uuidV4()}.png`);

    } catch (error) {
      console.log(error);
      toast({ title: "Error generating thumbnail", variant: 'destructive' })
    }
  }
  //------------------------------------------------
  // --- UPLOAD IMAGE FUNCTION
  //------------------------------------------------
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault(); // --- To not reload page, after upload image
    try {
      const files = e?.target?.files;
      if (!files) return;

      // --- Get the file and create a new Blob
      const file = files[0];
      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));

      handleImage(blob, file.name);

    } catch (error) {
      console.log(error);
      toast({ title: "Error uploading image!", variant: "destructive" });
    }
  }

  return (
    <>
      <div className='generate_thumbnail'>
        <Button
          type='button'
          variant="plain"
          onClick={() => setIsIAThumnail(true)}
          className={cn('', { 'bg-black-6': isIAThumnail })}
        >
          Use IA to generate Thumbnail
        </Button>
        <Button
          type='button'
          variant="plain"
          onClick={() => setIsIAThumnail(false)}
          className={cn('', { 'bg-black-6': !isIAThumnail })}
        >
          Upload custom image
        </Button>
      </div>
      {isIAThumnail ?
        // ---- GENERATE IMAGE
        <div className='flex flex-col gap-5'>
          <div className='mt-5 flex flex-col gap-2.5'>
            <Label className='text-16 font-bold text-white-1'>
              IA prompts to generate Thumbnail
            </Label>
            <Textarea
              className='input-class font-light focus-visible:ring-offset-orange-1'
              placeholder='Provide text to generate thumbnail'
              rows={5}
              value={imagePrompt}
              onChange={e => setImagePrompt(e.target.value)}
            />
          </div>

          <div className='w-full max-w-[200px]'>
            <Button type="submit" className="text-16 bg-orange-1 py-4 font-bold text-white-1" onClick={generateImage}>
              {isImageLoading ?
                <>
                  Generating <Loader size={20} className="animate-spin mr-l" />
                </> :
                "Generate Thumbnail"
              }
            </Button>
          </div>
        </div> :

        // ---- UPLOADING IMAGE
        <div className='image_div' onClick={() => imageRef?.current?.click()}>
          <Input
            type='file'
            className='hidden'
            onChange={(e) => uploadImage(e)}
            ref={imageRef}
          />
          {!isImageLoading ?
            <Image src={"/icons/upload-image.svg"} alt='upload' width={40} height={40} />
            :
            <div className='text-16 flex-center font-medium text-white-1'>
              Uploading <Loader size={20} className="animate-spin mr-l" />
            </div>
          }
          <div className='flex flex-col items-center gap-1'>
            <h2 className='text-12 font-bold text-orange-1'>Click to Upload</h2>
            <p className='text-12 font-normal text-gray-1'>SVG, PNG, JPG or GIF (max 1080x1080px)</p>
          </div>
        </div>
      }
      {image &&
        <div className='w-full flex-center'>
          <Image src={image} width={200} height={200} className='mt-5' alt='thumnail' />
        </div>
      }
    </>
  )
}

export default GenerateThumbnail