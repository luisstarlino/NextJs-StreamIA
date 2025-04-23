"use client";

import useLoadingPage from '@/hooks/use-loading';
import React, { useEffect } from 'react'
import { SignIn } from '@clerk/nextjs'

const page = () => {

  useEffect(() => {
    if (loadingController.isOpen) return loadingController.onClose();
  }, []);

  const loadingController = useLoadingPage();

  return (
    <div className='flex-center glassmorphism-auth h-screen w-full'>
      <SignIn />
    </div>
  )
}

export default page