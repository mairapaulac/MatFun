"use client";

import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import { Card, StatCard } from "@/app/home/components";
import {
  Trophy,
  Sword,
  Target,
  Calculator,
  Gamepad2,
  BrainCircuit,
  BookMarked,
} from "lucide-react";
import { Button } from "@/components/ui/button";
export default function HomePage() {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#24366b] bg-pattern overflow-x-hidden overflow-y-auto">
      <Navbar />

      <main className="flex-1 px-2 py-3 max-w-[740px] mx-auto w-full flex flex-col">
        <div className="mb-8 flex items-center w-full animate-slide-in-up">
          <Button
            onClick={() => router.push("/ranking")}
            className="w-full h-[50px] max-w-[420px] mx-auto rounded-4xl cursor-pointer gap-3 active:scale-95 transition-all duration-200"
          >
            <Trophy className="size-8" />
            <span className="text-3xl">Ranking</span>
          </Button>
        </div>

        <div className="mb-8 space-y-5 flex-1" style={{ animationDelay: "0.3s" }}>
          <Card className="w-full h-auto min-h-[110px] flex items-center gap-2 p-2 sm:p-6 animate-slide-in-up active:scale-95 transition-all duration-200">
            <div className="flex-shrink-0 bg-[#314991] p-3 rounded-xl">
              <Sword className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-normal mb-2 text-[#2B3A67] ">
                Guerreiro Matemático
              </h3>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-[#22C55E] h-full rounded-full transition-all duration-500"
                    style={{ width: "66%" }}
                  />
                </div>
                <span className="text-base font-normal text-[#2B3A67] whitespace-nowrap">
                  132/200
                </span>
              </div>
              <p className="text-md font-medium text-[#F43F5E]">
                Acerte 200 questões para desbloquear
              </p>
            </div>
          </Card>

          <Card
            className="w-full h-auto min-h-[110px] flex items-center gap-4 p-2 sm:p-6 animate-slide-in-up"
          >
            <div className="flex-shrink-0 bg-[#F43F5E] p-3 rounded-xl">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-normal mb-2 text-[#2B3A67]">
                Ninja das Frações
              </h3>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-[#F43F5E]  h-full rounded-full transition-all duration-500"
                    style={{ width: "47%" }}
                  />
                </div>
                <span className="text-base font-normal text-[#2B3A67] whitespace-nowrap">
                  47/100
                </span>
              </div>
              <p className="text-md font-medium text-[#F43F5E]">
                Acerte 100 questões de frações
              </p>
            </div>
          </Card>

          <Card className="w-full h-auto min-h-[110px] flex items-center gap-4 p-2 sm:p-6 animate-slide-in-up active:scale-95 transition-all duration-200">
            <div className="flex-shrink-0 bg-[#3B82F6] p-3 rounded-xl">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-normal mb-2 text-[#2B3A67]">
                Mago da Multiplicação
              </h3>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] h-full rounded-full transition-all duration-500"
                    style={{ width: "89%" }}
                  />
                </div>
                <span className="text-base font-normal text-[#2B3A67] whitespace-nowrap">
                  89/100
                </span>
              </div>
              <p className="text-md font-medium text-[#F43F5E]">
                Acerte 100 questões de multiplicação
              </p>
            </div>
          </Card>
        </div>

        <div className="mb-6 sm:mb-8 grid grid-cols-2 gap-3 sm:gap-4 animate-slide-in-up">
          <StatCard
            icon={BrainCircuit}
            title="7 dias"
            subtitle="seguidos jogados"
            iconColor="#10B981"
            className="h-[80px] sm:h-[100px] md:h-[110px]"
          />
          <StatCard
            icon={BookMarked}
            title="156"
            subtitle="questões acertadas"
            iconColor="#3B82F6"
            className="h-[80px] sm:h-[100px] md:h-[110px]"
          />
        </div>

        <div
          className="flex justify-center  mt-auto "
          style={{ animationDelay: "0.5s" }}
        >
          <Button
            onClick={() => router.push("/module")} // Redirect to module selection
            className="active:scale-95 transition-all duration-200 w-full max-w-[690px] h-[50px] sm:h-[70px] md:h-[70px] rounded-full cursor-pointer gap-3"
          >
            <Gamepad2 className="size-8" />
            <span className="text-3xl">Jogar</span>
          </Button>
        </div>
      </main>
    </div>
  );
}
