"use server";

const apiUrl = process.env.API_BASE_URL;

export default async function getUserAchievements(userId: number) {
  const response = await fetch(`${apiUrl}/achievements/me?userId=${userId}`);
  if (!response.ok) {
    let errorMessage = "Failed to fetch achievements";
    const contentType = response.headers.get("Content-Type");

    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      errorMessage = errorData.message || JSON.stringify(errorData);
    } else {
      errorMessage = await response.text();
    }
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data;
}
