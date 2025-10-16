import UserStoreInitializer from "@/components/user-store-initializer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";


export default async function SessionProvider({
	children,
}: {
	children: ReactNode;
}) {
	let user = null;
	const cookieStore = await cookies();
	const sessionCookie = cookieStore.get("session")?.value;

	if (sessionCookie) {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,  //TODO: definir no .env
			{
				headers: { Cookie: `session=${sessionCookie}` },
			}
		);
		user = await res.json();
		user = {
			id: user.id,
			name: user.fullName,
			email: user.email,
			classId: user.roleId,
		};
	} else {
		redirect("/auth/signin");
	}
	return (
		<>
			<UserStoreInitializer user={user} />
			{children}
		</>
	);
}