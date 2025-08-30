"use client";

import React from "react";
import SignInForm from "./components/signInForm";
import Image from "next/image";
export default function SignInPage() {
  return (
    <div className="flex flex-col items-center   min-h-screen ">
      <Image
        className="pt-20 "
        src={"/logo-matfun.svg"}
        width={400}
        height={100}
        alt="MatFun's logo"
      ></Image>
      <h1 className="pt-3 pb-28 text-6xl text-white">
        MAT <span className="text-[#F43F5E]">FUN</span>
      </h1>
      <SignInForm></SignInForm>
    </div>
  );
}
