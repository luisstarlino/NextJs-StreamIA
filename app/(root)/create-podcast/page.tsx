/**
* @LuisStarlino
* Created AT: 06/10/2024 | 17:15
*/

"use client";

//------------------------------------------------
// --- IMPORTS'S
//------------------------------------------------
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { string, z } from "zod"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import GeneratePodcast from "@/components/GeneratePodcast"
import GenerateThumbnail from "@/components/GenerateThumbnail"
import { Loader } from "lucide-react"
import { Id } from "@/convex/_generated/dataModel"
import { toast } from "@/hooks/use-toast"
import { useAction, useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useRouter } from "next/navigation";


//------------------------------------------------
// --- CONST'S
//------------------------------------------------
const openIaVoices = ['allow', 'shimmer', 'nova', 'echo', 'fable', 'onyx'];


const formSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
})

const CreatePodcast = () => {
  const router = useRouter();
  //------------------------------------------------
  // --- CONST'S
  //------------------------------------------------
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null);
  const [imagePrompt, setImagePrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioUrl, setAudioUrl] = useState<string>("");


  const [voiceType, setVoiceType] = useState<string | null>(null);
  const [voicePrompt, setVoicePrompt] = useState<string>("")

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const allCategories = useQuery(api.categories.getAllCategories);
  const [chooseCategory, setChooseCategory] = useState<Id<"categories"> | null>(null);

  const createPodcast = useMutation(api.podcasts.createPodcast);

  //------------------------------------------------
  // --- FORM
  //------------------------------------------------
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: ""
    },
  })

  //------------------------------------------------
  // --- ON SUBMIT
  //------------------------------------------------
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      if (!audioUrl || !imageUrl || !voiceType) {
        toast({ variant: "destructive", title: "Please, generate audio and image" });
        setIsSubmitting(false);
        throw new Error("Please, generate audio and image");
      }

      //const getCategoryById = useQuery(api.categories.getCategoryById, { id: "jd7fztr9cd3fxqxst1xwsmf9t5730cy4" });

      // --- Creating a podcast
      const podcast = await createPodcast({
        title: data.title,
        description: data.description,
        audioUrl,
        imageUrl,
        voiceType,
        imagePrompt,
        voicePrompt,
        views: 0,
        audioDuration,
        audioStorageId: audioStorageId!,
        imageStorageId: imageStorageId!,
        categoryId: chooseCategory!
      });
      toast({ title: "Podcast Created!" });
      router.push("/");

    } catch (error) {
      console.log(error);
      toast({ title: "Error!", variant: "destructive" })
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mt-10 flex flex-col">
      <h1 className='text-20 font-bold text-white-1'>Create Podcast</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">

          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">

            {/* TITLE */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">Title</FormLabel>
                  <FormControl>
                    <Input className="input-class focus:ring-offset-orange-1" placeholder="Type your Title here" {...field} />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />

            {/* CATEGORY */}
            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-white-1">Select Category</Label>
              <Select onValueChange={(v: Id<"categories">) => setChooseCategory(v)}>
                <SelectTrigger className={cn('text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1')}>
                  <SelectValue placeholder="Choose Category" className="placehoder:text-gray-1" />
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
                  {allCategories?.map((category) => (
                    <SelectItem key={category._id} value={category._id} className="capitalize focus:bg-orange-1">
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* IA VOICE */}
            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-white-1">Select IA Voice!</Label>
              <Select onValueChange={(v) => setVoiceType(v)}>
                <SelectTrigger className={cn('text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1')}>
                  <SelectValue placeholder="Select Ia Voice" className="placehoder:text-gray-1" />
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
                  {openIaVoices.map((category) => (
                    <SelectItem key={category} value={category} className="capitalize focus:bg-orange-1">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
                {voiceType && <audio src={`/${voiceType}.mp3`} autoPlay className="hidden" />}
              </Select>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">Description</FormLabel>
                  <FormControl>
                    <Textarea className="input-class focus:ring-offset-orange-1" placeholder="Write a short podcast description" {...field} />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col pt-10">

            {/* Generate Podcast */}
            <GeneratePodcast
              setAudioStorageId={setAudioStorageId}
              setAudio={setAudioUrl}
              voiceType={voiceType}
              audio={audioUrl}
              voicePrompt={voicePrompt}
              setVoicePrompt={setVoicePrompt}
              setAudioDuration={setAudioDuration}
            />

            {/* Generate Thumbnail */}
            <GenerateThumbnail
              setImage={setImageUrl}
              setImageStorageId={setImageStorageId}
              image={imageUrl}
              imagePrompt={imagePrompt}
              setImagePrompt={setImagePrompt}
            />

            <div className="mt-10 w-full">
              <Button type="submit" className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1 hover:border-orange-1">
                {isSubmitting ?
                  <>
                    Sending <Loader size={20} className="animate-spin mr-l" />
                  </> :
                  "Submit & Publish Podcast"
                }
              </Button>
            </div>

          </div>
        </form>
      </Form>
    </section>
  )
}

export default CreatePodcast;