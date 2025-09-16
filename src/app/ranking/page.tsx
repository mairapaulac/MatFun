"use client";

import PlayerCard from "./components/PlayerCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { userData, geralRankingData, turmaRankingData } from "@/assets/data";

export default function RankingScreen() {
  return (
    <div className="flex flex-col items-center   min-h-screen max-h-[1280px] justify-center text-white ">
      <header className="relative flex justify-center items-center mb-4 w-[450px]  ">
        <h1 className="text-7xl font-light ">Ranking</h1>
      </header>

      <Tabs defaultValue="geral" className="w-full max-w-md">
        <TabsList className="flex justify-center w-1/2 mx-auto gap-20">
          <TabsTrigger value="turma">Turma</TabsTrigger>
          <TabsTrigger value="geral">Geral</TabsTrigger>
        </TabsList>

        <TabsContent value="turma" className="mt-6">
          <div className="flex flex-col gap-3">
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

        <TabsContent value="geral" className="mt-6">
          <div className="flex flex-col gap-3">
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

      <hr className="border-t-2 border-white my-6" />

      <div className="mt-4">
        <PlayerCard {...userData} isUser={true} />
      </div>
    </div>
  );
}
