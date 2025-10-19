import { IRankingPlayers } from "@/types/types";
import PlayerCard from "./PlayerCard";

interface RankingListProps {
  players: IRankingPlayers[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export default function RankingList({ players, isLoading, isError }: RankingListProps) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching ranking.</div>;
  }

  return (
    <div className="flex flex-col gap-3 h-[450px] overflow-y-auto pr-2 custom-scrollbar">
      {players?.map((player) => (
        <PlayerCard
          key={player.user.userId}
          rank={player.rank}
          name={player.user.name}
          points={player.score}
        />
      ))}
    </div>
  );
}
