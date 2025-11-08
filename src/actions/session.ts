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

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
}

export async function decrypt(session: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload;
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

export async function getSession(): Promise<SessionPayload | null> {
  const sessionCookie = (await cookies()).get(cookieConfig.name)?.value;
  if (!sessionCookie) {
    return null;
  }
  const session = await decrypt(sessionCookie);
  if (!session) {
    return null;
  }
  return session;
}

export async function verifySession() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/signin");
  }
  return session;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieConfig.name);

  redirect("/auth/signin");
}
