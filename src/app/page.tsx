'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
 
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col space-y-4">
      <h1 className="text-white text-7xl">MAT <span className="text-[#F43F5E]">FUN</span></h1>
      <div className="flex flex-col space-y-3">
        <Button 
          className="w-48" 
          onClick={() => router.push('/auth/signin')}
        >
          Entrar
        </Button>
        <Button 
          variant="outline" 
          className="w-48 bg-transparent border-white text-white hover:bg-white hover:text-slate-900" 
          onClick={() => router.push('/question')}
        >
          Testar Questão
        </Button>
      </div>
    </div>
  );
}
