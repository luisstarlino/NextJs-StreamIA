/**************************************************************************************
// @LuisStarlino | 17/03/2024 15"16
/***************************************************************************************/
"use client";

import { Fragment } from "react";
import useLoadingPage from "@/hooks/use-loading";
import { Dialog, Transition } from "@headlessui/react";



const PreviewModal = () => {
    //------------------------------------------------
    // CONST'S
    //------------------------------------------------
    const previewModal = useLoadingPage();

    return (

        <Transition show={previewModal.isOpen} appear as={Fragment}>
            <Dialog as="div" className={"relative z-10"} onClose={() => { }} static>
                <div className="fixed inset-0 bg-black-1 bg-opacity-75" />

                <div className="fixed inset-0 overflow-y-auto  ">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition
                            show={true}
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className={"w-full  max-w-3xl overflow-hidden rounded-lg text-left align-middle"}>
                                <div className="flex w-full items-center overflow-hidden
                                        justify-center
                                        px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                    <div role="status" className="w-screen items-center flex justify-center">
                                        <div className="w-40 h-40 rounded-full animate-spin border-2  border-white border-t-transparent"></div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default PreviewModal;