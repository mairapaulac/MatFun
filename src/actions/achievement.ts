"use server";
import { verifySession } from "./session";

const apiUrl = process.env.API_BASE_URL;

export default async function getUserAchievements(userId: number) {
  const {token} =await verifySession(); 
  const response = await fetch(`${apiUrl}/achievements/me?userId=${userId}`, {
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
