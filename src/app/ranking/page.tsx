import PlayerCard from "./components/PlayerCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { userData, geralRankingData, turmaRankingData } from "@/assets/data";
import { Users, Globe } from "lucide-react";
import Navbar from "./components/Navbar";
export default function RankingScreen() {
  return (
    <div className="flex flex-col items-center min-h-screen max-h-[1280px] max-w-screen mx-auto px-0 py-0 text-white relative overflow-hidden bg-pattern">
      <Navbar   />
      <Tabs defaultValue="geral" className="w-full max-w-[800px] z-10 pt-2 md:pt-6 ">
        <div className="bg-[#2B3A67] rounded-2xl p-2 mb-8 shadow-xl border-1 border-gray-400">
          <TabsList className="flex justify-center w-full gap-4">
            <TabsTrigger
              value="turma"
              className="flex items-center gap-2 text-xl px-6 py-3 rounded-xl transition-all duration-300 hover:bg-white/10">
              <Users className="size-5" />Turma</TabsTrigger>
            <TabsTrigger
              value="geral"
              className="flex items-center gap-2 text-xl px-6 py-3 rounded-xl transition-all duration-300 hover:bg-white/10">
              <Globe className="size-5" />Geral</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="turma" className="mt-0 max-w-[800px]">
          <div className=" bg-gradient-to-r from-[#293864] via-[#334a91] to-[#293864] rounded-2xl p-4 shadow-md border-1 border-gray-400 ">
            <div className="flex items-center gap-2 mb-4 text-white">
              <Users className="size-5" />
              <h2 className="text-xl font-normal">Ranking da Turma</h2>
            </div>

            <div className="flex flex-col gap-3 h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              {turmaRankingData.map((player) => (
                <PlayerCard
                  key={`turma-${player.rank}`}
                  rank={player.rank}
                  name={player.name}
                  points={player.points}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Conteúdo: Ranking Geral */}
        <TabsContent value="geral" className="mt-0">
          <div className=" bg-gradient-to-r from-[#293864] via-[#334a91] to-[#293864] rounded-2xl p-4 shadow-md border-1 border-gray-400">
            <div className="flex items-center gap-2 mb-4 text-white">
              <Globe className="size-5" />
              <h2 className="text-xl font-normal">Ranking Geral</h2>
            </div>

            <div className="flex flex-col gap-3 h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              {geralRankingData.map((player) => (
                <PlayerCard
                  key={`geral-${player.rank}`}
                  rank={player.rank}
                  name={player.name}
                  points={player.points}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="w-full z-10 mt-2 max-w-[800px]">
        <div className="bg-[#2B3A67] rounded-2xl p-4 shadow-xl border-1 border-gray-400">
          <PlayerCard {...userData}  />
        </div>
      </div>
    </div>
  )
}
