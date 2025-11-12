
import { NextRequest, NextResponse } from "next/server";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const result = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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
