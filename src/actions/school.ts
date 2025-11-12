"use server";

export async function getSchools() {

	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/school`);
	const data = await res.json();
	return data
}
export async function getGradesFromSchools(schoolId:number) {

	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/support/escolas/${schoolId}/anos`);

	const data = await res.json();
	return data
}

//fazer dropdown disso aqui abaixo
export async function getClassesFromGrade(gradeId:number ) {

	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/support/anos/${gradeId}/turmas`) 

	const data = await res.json();
	return data
}