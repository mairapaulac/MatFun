"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { IUserSessionData } from "@/types/types";

interface SessionPayload extends IUserSessionData {
  expires: Date;
}

const secretKey = process.env.AUTH_SECRET || "teste";

const key = new TextEncoder().encode(secretKey);

const cookieConfig = {
  name: "session",
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as "lax" | "strict" | "none",
    path: "/",
  },
  duration: 24 * 60 * 60 * 1000, 
};

export async function encrypt(payload: {
  email: string;
  expires: Date;
}): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
}

export async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Falha na verificação do JWT:", error);
    return null;
  }
}

export async function createSession(user: IUserSessionData) {
  const expires = new Date(Date.now() + cookieConfig.duration);
  const sessionPayload: SessionPayload = { ...user, expires };
  const session = await encrypt(sessionPayload);

  (await cookies()).set(cookieConfig.name, session, {
    ...cookieConfig.options,
    expires,
  });
}

export async function verifySession(token: string | undefined): Promise<IUserSessionData> {
  if (!token) {
    redirect("/auth/signin");
  }

  const session = await decrypt(token);

  if (!session) {
    redirect("/auth/signin");
  }

  const user: IUserSessionData = {
    id: session.id as number,
    email: session.email as string,
    name: session.fullName as string,
    classId: session.roleId as number,
    token: session.token as string,
  };

  return user;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieConfig.name);

  redirect("/auth/signin");
}
