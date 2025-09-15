"use client";
import Navbar from "./components/Navbar";
import { Card, StatCard, DashboardButton } from "@/components/dashboard";
import { 
  Trophy, 
  Sword, 
  Target, 
  Calculator,
  Gamepad2,
  BrainCircuit,
  BookMarked
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#24366b]">
      <Navbar />
      
      <main className="flex-1 px-4 py-6 max-w-[800px] mx-auto w-full flex flex-col min-h-0">
        {/* Botão Ranking */}
        <div className="mb-4 sm:mb-6">
          <Link href="/ranking">
            <DashboardButton
              icon={Trophy}
              text="Ranking"
              className="w-full max-w-[420px] mx-auto"
              size="lg"
            />
          </Link>
        </div>

        {/* Container com 3 cards de achievements */}
        <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4 flex-1 min-h-0">
          {/* Guerreiro da Matemática */}
          <Card className="w-full h-[110px] sm:h-[130px] flex items-center gap-3 sm:gap-4 p-4 sm:p-6">
            <div className="flex-shrink-0">
              <Sword className="w-6 h-6 sm:w-8 sm:h-8 text-[#2B3A67]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-semibold mb-1" style={{ color: 'rgba(29, 45, 88, 0.75)' }}>
                Guerreiro da Matemática
              </h3>
              <p className="text-sm sm:text-base font-medium text-black mb-1">132 de 200</p>
              <p className="text-xs sm:text-sm" style={{ color: '#F43F5E' }}>
                Acerte 200 questões
              </p>
            </div>
          </Card>

          {/* Ninja das Frações */}
          <Card className="w-full h-[110px] sm:h-[130px] flex items-center gap-3 sm:gap-4 p-4 sm:p-6">
            <div className="flex-shrink-0">
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-[#2B3A67]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-semibold mb-1" style={{ color: 'rgba(29, 45, 88, 0.75)' }}>
                Ninja das Frações
              </h3>
              <p className="text-sm sm:text-base font-medium text-black mb-1">47 de 100</p>
              <p className="text-xs sm:text-sm" style={{ color: '#F43F5E' }}>
                Acerte 100 questões de frações
              </p>
            </div>
          </Card>

          {/* Especialista em Multiplicação */}
          <Card className="w-full h-[110px] sm:h-[130px] flex items-center gap-3 sm:gap-4 p-4 sm:p-6">
            <div className="flex-shrink-0">
              <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-[#2B3A67]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-semibold mb-1" style={{ color: 'rgba(29, 45, 88, 0.75)' }}>
                Especialista em Multiplicação
              </h3>
              <p className="text-sm sm:text-base font-medium text-black mb-1">89 de 100</p>
              <p className="text-xs sm:text-sm" style={{ color: '#F43F5E' }}>
                Acerte 100 questões de multiplicação
              </p>
            </div>
          </Card>
        </div>

        {/* Container com 2 cards de estatísticas */}
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

        {/* Botão Jogar - posicionado na parte inferior */}
        <div className="flex justify-center mt-auto">
          <Link href="/question">
            <DashboardButton
              icon={Gamepad2}
              text="Jogar"
              className="w-full max-w-[690px] h-[80px]"
              size="lg"
            />
          </Link>
        </div>
      </main>
    </div>
  );
}
