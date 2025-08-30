'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
 
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
      <h1 className="text-white text-7xl">MAT <span className="text-[#F43F5E]">FUN</span></h1>
      <Button  className="mt-10" onClick={()=>{router.push('http://localhost:3000/auth/signin')}}>Entrar</Button>
    </div>
  );
}
