"use server"
export async function getRankingAll() {
    const res =  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ranking/geral`)

    if(!res.ok){
        console.log(res.statusText)
        throw new Error("Failed to fetch ranking")
    }
    const data = res.json()
    return data;
}

export async  function getRankingClass(classId:number | null){
    const res =  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ranking/turma?classId=${classId}`)

    if(!res.ok){
        console.log(res.statusText)
        throw new Error("Failed to fetch ranking")
    }
    const data = res.json()
    return data;
}