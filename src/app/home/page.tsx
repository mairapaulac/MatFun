"use client";

import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import { StatCard, AchievementCard } from "@/app/home/components";
import { AchievementCardSkeleton } from "@/components/AchievementCardSkeleton";
import {
  Trophy,
  Gamepad2,
  BrainCircuit,
  BookMarked,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useFetchUserAchievements from "@/hooks/use-fetch-achievements";
import { useUserStore } from "@/stores/userStore";

import { modules } from "../module/page";

export default function HomePage() {
  const router = useRouter();
  const { userData } = useUserStore();
  const userId = userData?.id;
  const {data: achievements, isLoading} = useFetchUserAchievements(userId)
  const totalQuestions =
    achievements
      ?.filter((a) => a.achievementName !== "Guerreiro Matemático") // exclui a conquista específica
      .reduce((sum, item) => sum + (item.currentValue || 0), 0) || 0;

  const achievementsData = achievements?.filter(
    (a) => a.achievementName !== "Guerreiro Matemático" && a.currentValue > 0
  );

  const bestModule =
    achievementsData && achievementsData.length > 0
      ? achievementsData.reduce((best, current) => {
          return current.currentValue > best.currentValue ? current : best;
        })
      : null;

  const moduleTitles: { [key: string]: string } = {};
  modules.forEach(module => {
    moduleTitles[module.id] = module.title;
  });

  const displayModuleName = bestModule ? moduleTitles[bestModule.achievementName] || bestModule.achievementName : "Nenhum";
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

        <div className="mb-4 space-y-5 flex-1 max-h-[400px] md:max-h-[620px] lg:max-h-[500px] overflow-y-auto custom-scrollbar" style={{ animationDelay: "0.3s" }}>
          {isLoading ? (
            <div className="flex flex-col gap-4">
              <AchievementCardSkeleton />
              <AchievementCardSkeleton />
              <AchievementCardSkeleton />
              <AchievementCardSkeleton />
              <AchievementCardSkeleton className="md:hidden" />
            </div>
          ) : achievements && achievements.length > 0 ? (
            achievements.map((achievement) => (
              <AchievementCard
                key={achievement.achievementId}
                achievement={achievement}
              />
            ))
          ) : (
            <p className="text-gray-300 text-center italic">
              Sem conquistas.
            </p>
          )}
        </div>

        <div className="mb-6 sm:mb-8 grid grid-cols-2 gap-3 sm:gap-4 animate-slide-in-up">
          <StatCard
            icon={BookMarked}
            title={totalQuestions.toString()}
            subtitle="questões acertadas"
            iconColor="#3B82F6"
            className="h-[80px] sm:h-[100px] md:h-[110px]"
          />
          <StatCard
            icon={BrainCircuit}
            title={displayModuleName}
            subtitle="módulo favorito"
            iconColor="#10B981"
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
