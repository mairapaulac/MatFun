"use client";

import PlayerCard from "./components/PlayerCard";
import { userData, geralRankingData, turmaRankingData } from "@/assets/data";
import { useState } from "react";

export default function RankingScreen() {
  const [activeTab, setActiveTab] = useState("geral"); 

  const displayedData =
    activeTab === "geral" ? geralRankingData : turmaRankingData;
  return (
    <div className="flex flex-col items-center   min-h-screen justify-center text-white ">
      <header className="relative flex justify-center items-center mb-4">
        <h1 className="text-5xl font-extrabold tracking-tight">Ranking</h1>
      </header>

      <nav className="flex justify-center items-baseline gap-6 mb-8">
        <div className="text-center">
          <button
            onClick={() => setActiveTab("turma")}
            className={
              activeTab === "turma"
                ? "text-3xl font-bold"
                : "text-xl text-blue-200/80 font-medium"
            }
          >
            turma
          </button>

          {activeTab === "turma" && (
            <div className="w-full h-1 bg-yellow-400 mx-auto mt-1 rounded-full" />
          )}
        </div>

        <div className="text-center">
          <button
            onClick={() => setActiveTab("geral")}
            className={
              activeTab === "geral"
                ? "text-3xl font-bold"
                : "text-xl text-blue-200/80 font-medium"
            }
          >
            geral
          </button>
          {activeTab === "geral" && (
            <div className="w-full h-1 bg-yellow-400 mx-auto mt-1 rounded-full" />
          )}
        </div>
      </nav>

      <div className="flex flex-col gap-5">
        {displayedData.map((player) => (
          <PlayerCard
            key={`${activeTab}-${player.rank}`}
            rank={player.rank}
            name={player.name}
            points={player.points}
            trophy={player.trophy}
          />
        ))}
      </div>

      <hr className="border-t-2 border-white my-6" />

      <div className="mt-4">
        <PlayerCard {...userData} />
      </div>
    </div>
  );
}
