"use server"
const apiUrl = process.env.API_BASE_URL;

export async function getRankingAll() {
    const res =  await fetch(`${apiUrl}/ranking/geral`)

    if(!res.ok){
        console.log(res.statusText)
        throw new Error("Failed to fetch ranking")
    }
    const data = res.json()
    return data;
}

export async  function getRankingClass(classId:number | null){
    const res =  await fetch(`${apiUrl}/ranking/turma?classId=${classId}`)

    if(!res.ok){
        console.log(res.statusText)
        throw new Error("Failed to fetch ranking")
    }
    const data = res.json()
    return data;
}