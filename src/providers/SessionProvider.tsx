import UserStoreInitializer from "@/components/user-store-initializer";
import { getSession } from "@/actions/session";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function SessionProvider({
	children,
}: {
	children: ReactNode;
}) {
	const user = await getSession();

	if (!user) {
		// passar para middleware
		redirect("/auth/signin");
	}
	return (
		<>
			<UserStoreInitializer user={user} />
			{children}
		</>
	);
}