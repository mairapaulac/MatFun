"use server";

import { verifySession } from "./session";
import { IMatchResultPayload } from "@/types/types";

const apiUrl = process.env.API_BASE_URL;

export async function submitGameResult(payload: IMatchResultPayload) {
  try {
    const { token } = await verifySession();

    if (!token) {
      return { error: "User not authenticated" };
    }

    const response = await fetch(`${apiUrl}/matches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...payload }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return console.error("failed to submit game data", errorData)
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return {
      error: "An unexpected error occurred while submitting the game result.",
    };
  }
}
