"use client";

import PlayerCard from "./components/PlayerCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { userData, geralRankingData, turmaRankingData } from "@/assets/data";

export default function RankingScreen() {
  return (
    <div className="flex flex-col items-center min-h-screen max-h-[1280px] max-w-[800px] mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8  text-white">
      <header className="relative flex justify-center items-center mb-4 sm:mb-6 w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-center">
          Ranking
        </h1>
      </header>

      <Tabs defaultValue="geral" className="w-full max-w-full">
        <TabsList className="flex justify-center w-full sm:w-3/4 md:w-1/2 mx-auto gap-4 sm:gap-8 md:gap-12 lg:gap-20 mb-4 sm:mb-6">
          <TabsTrigger
            value="turma"
            className="text-xl sm:text-xl px-3 sm:px-4 py-2"
          >
            Turma
          </TabsTrigger>
          <TabsTrigger
            value="geral"
            className="text-sm sm:text-xl px-3 sm:px-4 py-2"
          >
            Geral
          </TabsTrigger>
        </TabsList>

        <TabsContent value="turma" className="mt-4 sm:mt-6">
          <div className="flex flex-col gap-2 sm:gap-3 h-[320px] sm:h-[380px] md:h-[420px] overflow-y-auto">
            {turmaRankingData.map((player) => (
              <PlayerCard
                key={`turma-${player.rank}`}
                rank={player.rank}
                name={player.name}
                points={player.points}
                trophy={player.trophy}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="geral" className="mt-4 sm:mt-6">
          <div className="flex flex-col gap-2 sm:gap-3 h-[320px] sm:h-[380px] md:h-[420px] overflow-y-auto">
            {geralRankingData.map((player) => (
              <PlayerCard
                key={`geral-${player.rank}`}
                rank={player.rank}
                name={player.name}
                points={player.points}
                trophy={player.trophy}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <hr className="border-t-2 border-white my-4 sm:my-6 w-full" />

      <div className="mt-2 sm:mt-4 w-full">
        <PlayerCard {...userData} isUser={true} />
      </div>
    </div>
  );
}
