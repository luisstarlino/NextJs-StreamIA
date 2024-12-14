/**
* @LuisStarlino
* Created AT: 16/11/2024 | 14:40
*/

"use client";

import LoaderSpinner from '@/components/LoaderSpinner';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from 'convex/react';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    name: z.string().min(2),
    description: z.string().min(2),
})

const page = ({ params: { category_id } }: { params: { category_id: Id<"categories"> } }) => {

    const router = useRouter();

    //------------------------------------------------
    // --- CONST'S
    //------------------------------------------------
    const category = useQuery(api.categories.getCategoryById, { categoryId: category_id });
    if (category == undefined && category != null) return <LoaderSpinner />

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const createCategory = useMutation(api.categories.createCategory);
    const updateCategory = useMutation(api.categories.updateCategory);

    //------------------------------------------------
    // --- FORM
    //------------------------------------------------
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: ""
        },
    });
    const { reset } = form;

    // Atualiza os valores do formulário assim que a categoria é carregada
    useEffect(() => {
        if (category) {
            reset({
                name: category.name || "",
                description: category.description || "",
            });
        }
    }, [category, reset]);

    async function onSubmit(data: z.infer<typeof formSchema>) {

        try {
            setIsSubmitting(true);

            if (category?._id) {
                let reqSave = await updateCategory({
                    id: category?._id,
                    name: data.name,
                    description: data.description
                });

                toast({ title: reqSave.message });

            } else { // --- Creating a Category
                await createCategory({ name: data.name, description: data.description });
                toast({ title: "Category Created!" }); // --- Return
            }

            router.push("/");
        } catch (error) {
            console.log("ERROR");
            console.log(error);
            toast({ title: error?.toString(), variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }

    }



    return (
        <section className="mt-10 flex flex-col">

            <div className='flex justify-between'>
                <h1 className='text-20 font-bold text-white-1'>{!category ? "New Category" : `Edit Category ${category.name}`}</h1>
                <Button className='text-16 text-black-2 border-white-1 border-2 bg-white-1 hover:bg-transparent hover:text-white-1 hover:transition-colors'
                    variant={"default"}
                    size={"lg"}
                    onClick={() => router.push('/system/category')}
                >
                    BACK TO LIST
                </Button>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
                    <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">

                        {/* TITLE */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2.5">
                                    <FormLabel className="text-16 font-bold text-white-1">Name</FormLabel>
                                    <FormControl>
                                        <Input className="input-class focus:ring-offset-orange-1" placeholder="Type the name here" {...field} value={category?.name} />
                                    </FormControl>
                                    <FormMessage className="text-white-1" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2.5">
                                    <FormLabel className="text-16 font-bold text-white-1">Description</FormLabel>
                                    <FormControl>
                                        <Textarea className="input-class focus:ring-offset-orange-1" placeholder="Write a short description for this category" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-white-1" />
                                </FormItem>
                            )}
                        />

                        {/* BTN SUBMIT */}
                        <div className="mt-10 w-full">
                            <Button type="submit" className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1 hover:border-orange-1">
                                {isSubmitting ?
                                    <>
                                        Sending <Loader size={20} className="animate-spin mr-l" />
                                    </> :
                                    <>
                                        {!category ? "Create Category" : "Edit Category"}
                                    </>
                                }
                            </Button>
                        </div>

                    </div>
                </form>
            </Form>
        </section>
    )
}

export default page;