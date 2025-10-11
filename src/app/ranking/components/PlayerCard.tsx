import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface PlayerCardProps {
  rank: number;
  name: string;
  points: number;
  avatar?: string;
}

export default function PlayerCard({ rank, name, points, avatar }: PlayerCardProps) {
  const isTopThree = rank <= 3;

  const getTrophyColor = () => {
    if (rank === 1) return "text-yellow-500";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-amber-600";
    return "text-[#2B3A67]";
  };

  const getRankBadgeStyles = () => {
    if (rank === 1) return "bg-yellow-50 border-yellow-400 text-yellow-500";
    if (rank === 2) return "bg-gray-50 border-gray-400 text-gray-500";
    if (rank === 3) return "bg-amber-50 border-amber-500 text-amber-600";
    return "bg-gray-100 border-gray-300 text-[#2B3A67]";
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-between gap-4 p-4 rounded-2xl transition-all duration-300 hover:scale-[1.01] border bg-white shadow-sm",
        isTopThree ? "border-blue-200 shadow-md" : "border-gray-200 hover:shadow-md"
      )}
      style={{ animationDelay: `${rank * 0.05}s` }}
    >
      <div className="flex items-center gap-4 min-w-0"> 
        {/* Rank Badge */}
        <div
          className={cn(
            "flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full font-bold text-lg sm:text-xl border-2 shrink-0",
            getRankBadgeStyles()
          )}
        >
          {rank}
        </div>

        {/* <div className="relative shrink-0">
          <div className=" hidden sm:flex w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-100 to-purple-100   overflow-hidden border border-gray-300 shadow-inner">
            {avatar ? (
              <Image
                src={avatar}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl sm:text-2xl font-bold text-[#2B3A67] ">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div> */}

        {/* Player Info */}
        <div className="flex flex-col min-w-0">
          <h3 className="font-semibold text-lg sm:text-2xl text-[#2B3A67] text-nowrap"> {/* Ajuste no tamanho da fonte e peso para melhor UI */}
            {name}
          </h3>
          <p className="text-md text-gray-500">
            {rank === 1
              ? "1º Lugar"
              : rank === 2
              ? "2º Lugar"
              : rank === 3
              ? "3º Lugar"
              : `${rank}º Lugar`}
          </p>
        </div>
      </div>

      {/* Pontos + Troféu */}
      <div className="flex items-center gap-3 shrink-0"> 
        {/* Container de Pontos */}
        <div className="flex flex-col items-center justify-center bg-[#F7F8FA] border border-gray-200 rounded-lg px-2 py-1 md:p-3 shadow-inner"> {/* ❌ REMOVIDO: min-w-[80px] */}
          <span className="font-bold text-xl sm:text-2xl text-[#2B3A67] leading-none">
            {points.toLocaleString()}
          </span>
          <span className="text-xs text-gray-500">pontos</span>
        </div>

        {/* Trophy à direita */}
        {isTopThree && (
          <div className={cn("flex items-center justify-center", getTrophyColor())}>
            <Trophy className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" />
          </div>
        )}
      </div>
    </div>
  );
}