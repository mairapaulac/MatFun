
import { NextRequest, NextResponse } from "next/server";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const classId = searchParams.get("classId");

  if (!classId) {
    return NextResponse.json({ error: "Missing classId" }, { status: 400 });
  }

  try {
    const result = await fetch(`${apiUrl}/ranking/turma?classId=${classId}`, {
      headers: {
        "Content-Type": "application/json",
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
