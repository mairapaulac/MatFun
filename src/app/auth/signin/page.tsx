"use client";

import SignInForm from "./components/signInForm";
import Image from "next/image";
export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <Image
        className="w-auto h-auto max-w-[350px] sm:max-w-[400px] md:max-w-[550px] lg:max-w-[650px] mb-4 sm:mb-6 md:mb-8"
        src={"/logomatfun.svg"}
        width={300}
        height={75}
        alt="MatFun's logo"
        sizes="(max-width: 640px) 250px, (max-width: 768px) 350px, (max-width: 1024px) 450px, 400px"
      />
      <SignInForm />
    </div>
  )
}