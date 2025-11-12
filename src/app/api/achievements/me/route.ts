
import { NextRequest, NextResponse } from "next/server";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: NextRequest) {
  const token = req.headers.get("Authorization");
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const result = await fetch(`${apiUrl}/achievements/me?userId=${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      },
    });
    const data = await result.json();
    if (result.ok) {
      return NextResponse.json(data, { status: 200 });
    }
    return NextResponse.json({ error: "erro" }, { status: result.status });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
