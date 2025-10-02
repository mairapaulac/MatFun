import { Trophy, UserCircle, Medal } from "lucide-react"; 
import { IPlayerCard } from "@/types/types";

const getRankStyle = (rank: number) => {
  if (rank === 1) {
    return {
      border: "border-yellow-400",
      shadow: "shadow-[0_0_15px_rgba(251,191,36,0.4)]",
      textColor: "text-yellow-400",
    };
  }
  if (rank === 2) {
    return {
      border: "border-slate-300",
      shadow: "shadow-[0_0_15px_rgba(203,213,225,0.4)]",
      textColor: "text-slate-300",
    };
  }
  if (rank === 3) {
    return {
      border: "border-amber-700",
      shadow: "shadow-[0_0_15px_rgba(180,83,9,0.4)]",
      textColor: "text-amber-600",
    };
  }
  return { border: "border-white/20", shadow: "", textColor: "text-white" };
};


export default function PlayerCard({ rank, name, points, trophy, isUser }: IPlayerCard) {
  const rankStyle = getRankStyle(rank);

  return (
    <div
      className={`flex items-center gap-3 w-full p-3 sm:p-4 rounded-2xl shadow-lg backdrop-blur-md transition-all duration-300 
      ${isUser 
        ? "bg-gradient-to-r bg-[#2b3f7a]  border-white/30 shadow-2xl border-2" 
        : `bg-white/10 border ${rankStyle.border} ${rankStyle.shadow}` 
      }`}
    >
      <span
        className={`font-bold text-center  
        ${isUser 
          ? "text-2xl sm:text-3xl md:text-4xl w-10 sm:w-12 md:w-14 text-white" 
          : `text-xl sm:text-2xl md:text-3xl w-8 sm:w-10 md:w-12 ${rank <= 3 ? rankStyle.textColor : 'text-white'}`
        }`}
      >
        {rank}
      </span>

      <div
        className={`rounded-full flex items-center justify-center bg-gradient-to-br from-[#2B3A67] to-[#1D2D58] 
        ${isUser 
          ? "size-14 sm:size-16 md:size-18" 
          : "size-12 sm:size-14 md:size-16"
        }`}
      >
        <UserCircle
          className={`${isUser ? "size-9 sm:size-11 md:size-12" : "size-7 sm:size-9 md:size-10"} text-white`}
          strokeWidth={1.5}
        />
      </div>

      <div className="flex-grow min-w-0">
        <p
          className={`truncate font-medium 
          ${isUser 
            ? "text-lg sm:text-2xl md:text-3xl text-white" 
            : "text-base sm:text-xl md:text-2xl text-white"
          }`}
        >
          {name}
        </p>
        <p
          className={`font-medium text-rose-200 
          ${isUser 
            ? "text-sm sm:text-base md:text-lg" 
            : "text-xs sm:text-sm md:text-base"
          }`}
        >
          {points} Pontos
        </p>
      </div>

      <div className="flex-shrink-0">
        {trophy && (
          <Trophy
            className={`text-yellow-400 
            ${isUser 
              ? "size-7 sm:size-9 md:size-10" 
              : "size-6 sm:size-7 md:size-8"
            }`}
            fill="currentColor"
          />
        )}
        {!trophy && !isUser && rank <= 3 && (
          <Medal
            className={`${rankStyle.textColor} 
            ${isUser
              ? "size-7 sm:size-9 md:size-10"
              : "size-6 sm:size-7 md:size-8"
            }`}
            fill="currentColor"
          />
        )}
      </div>
    </div>
  );
}