import { Trophy, UserCircle } from "lucide-react";
import { IPlayerCard } from "@/types/types";


export default function PlayerCard({ rank, name, points, trophy }:IPlayerCard) {
  

  return (
    <div className="flex items-center gap-4 w-full min-w-[400px]">
      <span className="text-3xl font-bold w-10 text-center">{rank}</span>
      <div className="size-14 rounded-full border-2 border-white flex items-center justify-center bg-white/10">
        <UserCircle className="size-10 text-white" strokeWidth={1.5} />
      </div>
      <div className="flex-grow">
        <p className="text-xl font-bold">{name}</p>
        <p className="text-sm text-gray-300">{points} Pontos</p>
      </div>
      {trophy && (
        <Trophy
          className={`size-8 text-yellow-400`}
          fill="currentColor"
        />
      )}
    </div>
  );
}