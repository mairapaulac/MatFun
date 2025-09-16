import { Trophy, UserCircle } from "lucide-react";
import { IPlayerCard } from "@/types/types";


export default function PlayerCard({ rank, name, points, trophy,isUser }:IPlayerCard) {
  

  return (
    <div
      className={`flex items-center gap-2 w-full ${
        isUser ? "bg-black/20 p-2 sm:p-3 shadow-lg" : "bg-white/20 p-1.5 sm:p-2"
      } border-2 border-white/30 rounded-md backdrop-blur-sm`}
    >
      <span
        className={`font-bold text-center text-white ${
          isUser
            ? "text-2xl sm:text-3xl md:text-4xl w-8 sm:w-10 md:w-12"
            : "text-xl sm:text-2xl md:text-3xl w-6 sm:w-8 md:w-10"
        }`}
      >
        {rank}
      </span>

      <div
        className={`rounded-full border-2 border-white/50 flex items-center justify-center ${
          isUser ? "size-12 sm:size-14 md:size-16" : "size-10 sm:size-12 md:size-14"
        }`}
      >
        <UserCircle
          className={`${isUser ? "size-8 sm:size-10 md:size-12" : "size-6 sm:size-8 md:size-10"} text-white`}
          strokeWidth={1.5}
        />
      </div>

      <div className="flex-grow min-w-0">
        <p
          className={`font-medium truncate text-white ${
            isUser ? "text-lg sm:text-2xl md:text-3xl" : "text-base sm:text-xl md:text-2xl"
          }`}
        >
          {name}
        </p>

        <p
          className={`text-gray-200 ${isUser ? "text-sm sm:text-base md:text-lg" : "text-xs sm:text-sm md:text-base"}`}
        >
          {points} Pontos
        </p>
      </div>

      {trophy && (
        <Trophy
          className={`text-yellow-400 flex-shrink-0 ${
            isUser ? "size-6 sm:size-8 md:size-10" : "size-5 sm:size-6 md:size-8"
          }`}
          fill="currentColor"
        />
      )}
    </div>
  );
}