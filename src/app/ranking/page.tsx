"use client"

import PlayerCard from "./components/PlayerCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { userData, geralRankingData, turmaRankingData } from "@/assets/data";
import { Users, Globe } from "lucide-react";
import Navbar from "./components/Navbar";
import { motion } from "framer-motion"; // MODIFICAÇÃO: Importar framer-motion

export default function RankingScreen() {
  return (
    <div className="flex flex-col items-center min-h-screen max-w-screen mx-auto px-0 py-0 text-white relative overflow-hidden bg-[#24366b] bg-pattern">
      <Navbar />

      <Tabs defaultValue="geral" className="w-full max-w-[800px] z-10 pt-2 md:pt-6">
        <div className="bg-[#2e4486] rounded-2xl p-2 mb-8 shadow-xl">
          <TabsList className="flex justify-center w-full gap-4 bg-transparent ">
            <TabsTrigger
              value="turma"
              className="flex items-center gap-2 text-xl px-6 py-3 rounded-xl transition-all duration-300 hover:bg-[#24366b]/80 data-[state=active]:bg-[#24366b]" // MODIFICAÇÃO: Estilo de aba ativa
            >
              <Users className="size-5" />
              Turma
            </TabsTrigger>
            <TabsTrigger
              value="geral"
              className="flex items-center gap-2 text-xl px-6 py-3 rounded-xl transition-all duration-300 hover:bg-[#24366b]/80 data-[state=active]:bg-[#24366b]" // MODIFICAÇÃO: Estilo de aba ativa
            >
              <Globe className="size-5" />
              Geral
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="turma" className="mt-0 max-w-[800px] border-white/10 border-1 rounded-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-[#2e4486] rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-gray-200">
                <Users className="size-5" />
                <h2 className="text-xl font-normal">Ranking da Turma</h2>
              </div>
              <div className="flex flex-col gap-3 h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                {turmaRankingData.map((player, index) => (
                  <motion.div
                    key={`turma-${player.rank}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <PlayerCard
                      rank={player.rank}
                      name={player.name}
                      points={player.points}
                      trophy={player.trophy}
                      isUser={player.name === userData.name} 
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="geral" className="mt-0 border-white/10 border-1 rounded-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-[#2e4486] rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-gray-100">
                <Globe className="size-5" />
                <h2 className="text-xl font-normal">Ranking Geral</h2>
              </div>
              <div className="flex flex-col gap-3 h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                {geralRankingData.map((player, index) => (
                  <motion.div
                    key={`geral-${player.rank}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <PlayerCard
                      rank={player.rank}
                      name={player.name}
                      points={player.points}
                      trophy={player.trophy}
                      isUser={player.name === userData.name} 
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>

      <div className="w-full z-10 mt-2 max-w-[800px]">
        <div className="bg-[#2e4486] rounded-2xl p-4 shadow-xl border border-white/20 ">
          <PlayerCard {...userData} isUser={true} />
        </div>
      </div>
    </div>
  );
}