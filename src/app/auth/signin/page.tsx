"use client";

import SignInForm from "./components/signInForm";
import Image from "next/image";
export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <Image
        className="w-auto h-auto max-w-[250px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[400px] mb-4 sm:mb-6 md:mb-8"
        src={"/logo-matfun.svg"}
        width={300}
        height={75}
        alt="MatFun's logo"
        sizes="(max-width: 640px) 250px, (max-width: 768px) 350px, (max-width: 1024px) 450px, 400px"
      />
      <h1 className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-3xl sm:text-5xl md:text-7xl lg:text-6xl text-white text-center">
        MAT <span className="text-[#F43F5E]">FUN</span>
      </h1>
      <SignInForm />
    </div>
  )
}