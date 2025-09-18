"use client"

import PlayerCard from "./components/PlayerCard"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { userData, geralRankingData, turmaRankingData } from "@/assets/data"
import { Trophy, Users, Globe, TrendingUp } from "lucide-react"

export default function RankingScreen() {
  return (
    <div className="flex flex-col items-center min-h-screen max-h-[1280px] max-w-[800px] mx-auto px-6 py-8 text-white relative overflow-hidden">
      <header className="relative flex flex-col items-center mb-8 w-full z-10">
        <div className="flex items-center gap-4 mb-2">
          <Trophy className="size-12 text-yellow-400" fill="currentColor" />
          <h1 className="text-5xl md:text-6xl font-light text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Ranking
          </h1>
          
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <TrendingUp className="size-5" />
          <span className="text-lg font-medium">Classificação de Jogadores</span>
        </div>
      </header>

      <Tabs defaultValue="geral" className="w-full max-w-full z-10">
        <div className="glass-effect rounded-2xl p-2 mb-8 shadow-xl">
          <TabsList className="flex justify-center w-full gap-4 bg-transparent">
            <TabsTrigger
              value="turma"
              className="flex items-center gap-2 text-xl px-6 py-3 rounded-xl transition-all duration-300 hover:bg-white/10"
            >
              <Users className="size-5" />
              Turma
            </TabsTrigger>
            <TabsTrigger
              value="geral"
              className="flex items-center gap-2 text-xl px-6 py-3 rounded-xl transition-all duration-300 hover:bg-white/10"
            >
              <Globe className="size-5" />
              Geral
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="turma" className="mt-0">
          <div className="glass-effect rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-2 mb-4 text-gray-300">
              <Users className="size-5" />
              <h2 className="text-xl font-semibold">Ranking da Turma</h2>
            </div>
            <div className="flex flex-col gap-3 h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              {turmaRankingData.map((player, index) => (
                <PlayerCard
                  key={`turma-${player.rank}`}
                  rank={player.rank}
                  name={player.name}
                  points={player.points}
                  trophy={player.trophy}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="geral" className="mt-0">
          <div className="glass-effect rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-2 mb-4 text-gray-100">
              <Globe className="size-5" />
              <h2 className="text-xl font-normal">Ranking Geral</h2>
            </div>
            <div className="flex flex-col gap-3 h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              {geralRankingData.map((player, index) => (
                <PlayerCard
                  key={`geral-${player.rank}`}
                  rank={player.rank}
                  name={player.name}
                  points={player.points}
                  trophy={player.trophy}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      

      <div className="w-full z-10 mt-2">
        <div className="glass-effect rounded-2xl p-4 shadow-xl border-2 border-green-500/30">
          <PlayerCard {...userData} isUser={true} />
        </div>
      </div>

      
    </div>
  )
}
