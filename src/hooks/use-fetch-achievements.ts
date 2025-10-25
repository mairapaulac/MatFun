"use client"

import { useQuery } from "@tanstack/react-query";
import { IUserAchievements } from "@/types/types";
import getUserAchievements from "@/actions/achievement";

export default function useFetchUserAchievements(userId: number | undefined) {

    return useQuery({

        queryKey:["userAchievements", userId],

        queryFn: async()=>{

            if (!userId) return []; // Return empty array if no userId

            const data = await getUserAchievements(userId)

            return data as IUserAchievements[] 

        },

        staleTime: 1000 * 60 * 5, // 5 minutes

    })

}