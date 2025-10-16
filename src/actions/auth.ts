"use server";

import { createSession } from "@/actions/session";
import { signInSchema} from "@/lib/schemas";
import { IUserSessionData } from "@/types/types";
import { z } from "zod";

type SignInInputs = z.infer<typeof signInSchema>;

const apiUrl = process.env.API_BASE_URL;  //definir no .env 


export async function signInUserAction(payload: SignInInputs): Promise<{
	success: boolean;
	message: string;
	error?: string;
	data?: Omit<IUserSessionData, "token">;
}> {
	//TODO: usar api do next
	try {
		const res = await fetch(`${apiUrl}/user/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});

		if (!res.ok) {
			const message = await res.text();
			return {
				success: false,
				message: "Erro ao fazer login, por favor tente novamente.",
				error: JSON.parse(message),
			};
		}
		const data = await res.json();
		const user = {
			id: data.id,
			name: data.fullName,
			email: data.email,
			classId: data.roleId,
		};

		await createSession(data);
		return {
			success: true,
			message: "Autenticado com sucesso.",
			data: user,
		};
	} catch (e) {
		console.error("Error during user login (catch block):", e);
		return {
			success: false,
			message: "Ocorreu um erro, por favor tente novamente.",
		};
	}
}