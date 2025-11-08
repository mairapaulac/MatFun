'use client'
import PlayerCard from "./components/PlayerCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Users, Globe } from "lucide-react";
import Navbar from "./components/Navbar";
import { useFetchRankingGeral, useFetchRankingTurma } from "@/hooks/use-fetch-ranking";
import RankingList from "./components/RankingList";
import { useUserStore } from "@/stores/userStore";

export default function RankingScreen() {
  const { userData: session } = useUserStore();
  const { data: players, isLoading: isLoadingRanking, isError }= useFetchRankingGeral()
  const { data: classPlayers, isLoading: isLoadingClassRanking} = useFetchRankingTurma(session?.classId)

  const currentUserRank = players?.find(player => player.user.userId === session?.id);

  return (
    <div className="flex flex-col items-center min-h-screen max-h-[1280px] max-w-screen mx-auto px-0 py-0 text-white relative overflow-hidden bg-pattern">
      <Navbar   />
      <Tabs defaultValue="geral" className="w-full max-w-[800px] z-10 pt-2 md:pt-6 ">
        <div className="bg-[#2B3A67] rounded-2xl p-2 mb-8 shadow-xl border-1 border-gray-400">
          <TabsList className="flex justify-center w-full gap-4">
            <TabsTrigger
              value="geral"
              className="flex items-center gap-2 text-xl px-6 py-3 rounded-xl transition-all duration-300 hover:bg-white/10">
              <Globe className="size-5" />Geral</TabsTrigger>
            <TabsTrigger
              value="turma"
              className="flex items-center gap-2 text-xl px-6 py-3 rounded-xl transition-all duration-300 hover:bg-white/10">
              <Users className="size-5" />Turma</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="geral" className="mt-0 max-w-[800px]">
          <div className="bg-gradient-to-r from-[#2B3A67] via-[#314991] to-[#2B3A67] rounded-2xl p-4 shadow-md border-3 border-gray-300/30">
            <div className="flex items-center gap-2 mb-4 text-white">
              <Globe className="size-5" />
              <h2 className="text-xl font-normal">Ranking Geral</h2>
            </div>
            <RankingList players={players} isLoading={isLoadingRanking} isError={isError} />
          </div>
        </TabsContent>
        <TabsContent value="turma" className="mt-0 max-w-[800px]">
          <div className="bg-gradient-to-r from-[#2B3A67] via-[#314991] to-[#2B3A67] rounded-2xl p-4 shadow-md border-2 border-gray-200/30">
            <div className="flex items-center gap-2 mb-4 text-white">
              <Users className="size-5" />
              <h2 className="text-xl font-normal">Ranking da Turma</h2>
            </div>
            <RankingList players={classPlayers} isLoading={isLoadingClassRanking} isError={isError} />
          </div>
        </TabsContent>
      </Tabs>

      <div className="w-full z-10 mt-2 max-w-[800px]">
        <div className="bg-gradient-to-r from-[#2B3A67] via-[#314991] to-[#2B3A67] rounded-2xl p-4 shadow-xl border-2 border-white/20">
          {currentUserRank && <PlayerCard rank={currentUserRank.rank} name={currentUserRank.user.name} points={currentUserRank.score} />}
        </div>
      </div>
    </div>
  )
}