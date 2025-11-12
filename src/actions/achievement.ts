"use server";
import { verifySession } from "./session";

export default async function getUserAchievements(userId: number) {
  const {token} =await verifySession(); 
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/achievements/me?userId=${userId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
  if (!response.ok) {
    throw new Error( "Failed to fetch achievements");
  }

  const data = await response.json();
  return data;
}
