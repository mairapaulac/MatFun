"use server";

import { createSession } from "@/actions/session";
import { signInSchema, signUpSchema} from "@/lib/schemas";
import { IUserSessionData } from "@/types/types";
import { z } from "zod";

type SignInInputs = z.infer<typeof signInSchema>;
type SignUpInputs = z.infer<typeof signUpSchema>
const apiUrl = process.env.API_BASE_URL;  //definir no .env 


export async function signInUserAction(payload: SignInInputs): Promise<{
	success: boolean;
	message: string;
	error?: string;
	data?: Omit<IUserSessionData, "token">;
}> {
	//TODO: usar api do next
	try {
		const res = await fetch(`${apiUrl}/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});

		if (!res.ok) {
			const errorText = await res.text();
			console.error("API Error Response:", errorText);
			console.error("API Error Status:", res.status);
			//eslint-disable-next-line
			let errorJson: any = {};
			try {
				errorJson = JSON.parse(errorText);
			} catch (e) {
				console.error("Failed to parse API error response as JSON.");
				errorJson = { raw: errorText };
			}
			return {
				success: false,
				message: `Erro ${res.status} ao fazer login. Por favor, verifique o console do servidor para mais detalhes.`,
				error: errorJson,
			};
		}
		const data = await res.json();
    	console.log("API Response Data:", data); //para depuração
		const sessionData: IUserSessionData = {
			id: data.user.userId,
			name: data.user.name,
			email: data.user.email,
      gradeName: data.user.gradeName,
      classLetter: data.user.classLetter,
	  classId:data.user.classId,
      token: data.token
		};

		await createSession(sessionData);
		return {
			success: true,
			message: "Autenticado com sucesso.",
			data: {
        id: data.user.userId,
        name: data.user.name,
        email: data.user.email,
        gradeName: data.user.gradeName,
        classLetter: data.user.classLetter,
		classId:data.user.classId,
      },
		};
	} catch (e) {
		console.error("Error during user login (catch block):", e);
		return {
			success: false,
			message: "Ocorreu um erro, por favor tente novamente.",
		};
	}
}

export async function registerUserAction(payload : SignUpInputs): Promise<{
	success: boolean;
	message?: string;
	data?: Omit<IUserSessionData, "token">;
	error?: unknown;
}> {
	try {
		const apiPayload = {
			name: payload.name,
			email: payload.email,
			senha: payload.senha,
			dataNascimento: new Date(payload.dataNascimento),
			classId: Number(payload.class)
			
		};

		const res = await fetch(`${apiUrl}/auth/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(apiPayload),
		});

		if (!res.ok) {
			const errorText = await res.text();
			console.error("API Error Response:", errorText);
			console.error("API Error Status:", res.status);
			//eslint-disable-next-line
			let errorJson: any = {};
			try {
				errorJson = JSON.parse(errorText);
			} catch (e) {
				console.error("Failed to parse API error response as JSON.");
				errorJson = { raw: errorText };
			}
			return {
				success: false,
				message: `Erro ${res.status} ao registrar. Por favor, verifique o console do servidor para mais detalhes.`,
				error: errorJson,
			};
		}

		const data = await res.json();
		console.log("resposta da API:", data); //para depuração

		const sessionData: IUserSessionData = {
			id: data.user.userId,
			name: data.user.name,
			email: data.user.email,
			gradeName: data.user.gradeName,
			classLetter: data.user.classLetter,
			classId: Number(payload.class),
			token: data.token
		};

		await createSession(sessionData);

		return {
			success: true,
			message: "registrado com sucesso.",
			data: {
				id: data.user.userId,
				name: data.user.name,
				email: data.user.email,
				gradeName: data.user.gradeName,
				classLetter: data.user.classLetter,
				classId: Number(payload.class),
			},
		};
	} catch (e) {
		console.error("erro durante cadastro (catch):", e);
		return {
			success: false,
			error: e
		};
	}
}