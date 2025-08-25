import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
      <h1 className="text-white text-7xl">MAT <span className="text-[#F43F5E]">FUN</span></h1>
      <Button  className="">Jogar</Button>
    </div>
  );
}
