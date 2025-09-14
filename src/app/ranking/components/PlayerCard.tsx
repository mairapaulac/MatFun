import { Trophy, UserCircle } from "lucide-react";
import { IPlayerCard } from "@/types/types";


export default function PlayerCard({ rank, name, points, trophy,isUser }:IPlayerCard) {
  

  return (
    <div
      className={`flex items-center gap-2 w-full ${
        isUser ? "min-w-[450px] bg-white/20 p-3 shadow-lg" : "min-w-[400px] bg-white/10 p-2"
      } border-2 border-white rounded-md`}
    >
      <span
        className={`font-bold text-center ${isUser ? "text-4xl w-12" : "text-3xl w-10"}`}
      >
        {rank}
      </span>
      <div
        className={`rounded-full border-2 border-white flex items-center justify-center ${
          isUser ? "size-16" : "size-14"
        }`}
      >
        <UserCircle
          className={`${isUser ? "size-12" : "size-10"} text-white`}
          strokeWidth={1.5}
        />
      </div>
      <div className="flex-grow">
        <p className={`font-medium ${isUser ? "text-3xl" : "text-2xl"}`}>{name}</p>
        <p className={`text-gray-300 ${isUser ? "text-lg" : "text-md"}`}>
          {points} Pontos
        </p>
      </div>
      {trophy && (
        <Trophy
          className={`text-yellow-400 ${isUser ? "size-10" : "size-8"}`}
          fill="currentColor"
        />
      )}
    </div>
  );
}