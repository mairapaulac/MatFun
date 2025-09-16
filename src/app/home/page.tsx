"use client";

import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import { Card, StatCard } from "@/components/dashboard";
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
    <div className="flex flex-col w-full min-h-screen bg-[#24366b] overflow-x-hidden">
      <Navbar />

      <main className="flex-1 px-4 py-6 max-w-[780px] mx-auto w-full flex flex-col min-h-0 overflow-x-hidden">
        <div className="mb-4 sm:mb-6 flex items-center w-full">
          <Button
            onClick={() => router.push("/ranking")}
            className="w-full h-[50px] max-w-[420px] mx-auto rounded-4xl "
          > 
             <Trophy className="h-8 w-8"></Trophy> 
            <span className="text-3xl">Ranking</span>
          </Button>
        </div>

        <div className="mb-4 sm:mb-6 space-y-5 sm:space-y-4 flex-1 min-h-0">
          <Card className="w-full h-[90px] sm:h-[130px] flex items-center gap-3 sm:gap-4 p-4 sm:p-6">
            <div className="flex-shrink-0">
              <Sword className="w-6 h-6 sm:w-8 sm:h-8 text-[#2B3A67]" />
            </div>
            <div className="flex-1">
              <h3
                className="text-xl sm:text-2xl font-semibold mb-1"
                style={{ color: "rgba(29, 45, 88, 0.75)" }}
              >
                Guerreiro da Matemática
              </h3>
              <p className="text-sm sm:text-base font-medium text-black mb-1">
                132 de 200
              </p>
              <p className="text-xs sm:text-sm" style={{ color: "#F43F5E" }}>
                Acerte 200 questões
              </p>
            </div>
          </Card>

          <Card className="w-full h-[90px] sm:h-[130px] flex items-center gap-3 sm:gap-4 p-4 sm:p-6">
            <div className="flex-shrink-0">
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-[#2B3A67]" />
            </div>
            <div className="flex-1">
              <h3
                className="text-xl sm:text-2xl font-semibold mb-1"
                style={{ color: "rgba(29, 45, 88, 0.75)" }}
              >
                Ninja das Frações
              </h3>
              <p className="text-sm sm:text-base font-medium text-black mb-1">
                47 de 100
              </p>
              <p className="text-xs sm:text-sm" style={{ color: "#F43F5E" }}>
                Acerte 100 questões de frações
              </p>
            </div>
          </Card>

          <Card className="w-full h-[90px] sm:h-[130px] flex items-center gap-3 sm:gap-4 p-4 sm:p-6">
            <div className="flex-shrink-0">
              <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-[#2B3A67]" />
            </div>
            <div className="flex-1">
              <h3
                className="text-xl sm:text-2xl font-semibold mb-1"
                style={{ color: "rgba(29, 45, 88, 0.75)" }}
              >
                Especialista em Multiplicação
              </h3>
              <p className="text-sm sm:text-base font-medium text-black mb-1">
                89 de 100
              </p>
              <p className="text-xs sm:text-sm" style={{ color: "#F43F5E" }}>
                Acerte 100 questões de multiplicação
              </p>
            </div>
          </Card>
        </div>

        <div className="mb-6 sm:mb-8 grid grid-cols-2 gap-3 sm:gap-4">
          <StatCard
            icon={BrainCircuit}
            title="7 dias"
            subtitle="seguidos jogados"
            iconColor="#10B981"
            className="h-[80px] sm:h-[90px]"
          />
          <StatCard
            icon={BookMarked}
            title="156"
            subtitle="questões acertadas"
            iconColor="#3B82F6"
            className="h-[80px] sm:h-[90px]"
          />
        </div>

        <div className="flex justify-center mt-auto">
          <Button
            onClick={() => router.push("/question")} // Adicionado onClick
            className="w-full max-w-[690px] h-[50px] sm:h-[70px] rounded-full"
          >
            <Gamepad2 size={90}></Gamepad2>
            <span className="text-3xl">Jogar</span>
          </Button>
        </div>
      </main>
    </div>
  );
}
