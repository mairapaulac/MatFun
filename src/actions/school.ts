"use server";

const apiUrl = process.env.API_BASE_URL;

export async function getSchools() {

	const res = await fetch(`${apiUrl}/support/escolas`);

	const data = await res.json();
	return data;
}
export async function getGradesFromSchools(schoolId:number) {

	const res = await fetch(`${apiUrl}/support/escolas/${schoolId}/anos`);

	const data = await res.json();
	return data;
}

//fazer dropdown disso aqui abaixo
export async function getClassesFromGrade(gradeId:number ) {

	const res = await fetch(`${apiUrl}/support/anos/${gradeId}/turmas`) 

	const data = await res.json();
	return data;
}