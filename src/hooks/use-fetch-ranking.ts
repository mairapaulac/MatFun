
import { useQuery } from "@tanstack/react-query";
import { IRankingPlayers } from "@/types/types";
import { getRankingAll, getRankingClass } from "@/actions/ranking";

export const useFetchRankingGeral = () => {
    return useQuery({
        queryKey:["rankingGeral"],
        queryFn: async ()=>{
            const res = await getRankingAll()
            return res as IRankingPlayers[]
        }
    })
};


export const useFetchRankingTurma = (classId:number | undefined | null) => {
    return useQuery({
        queryKey:["rankingTurma", classId],
        queryFn: async ()=>{
            if (!classId) return [];
            const res = await getRankingClass(classId)
            return res as IRankingPlayers[]
        },
        enabled: !!classId,
    })
}