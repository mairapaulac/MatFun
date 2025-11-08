"use client";

import { useUserStore } from "@/stores/userStore";
import { IUserSessionData } from "@/types/types";
import { useEffect, useRef } from "react";

export default function UserStoreInitializer({
	user,
}: {
	user: Omit<IUserSessionData, "token"> | null;
}) {
	const initialized = useRef(false);
	const { setUser } = useUserStore();

	useEffect(() => {
		if (!initialized.current) {
			setUser(user);
			initialized.current = true;
		}
	}, [user, setUser, initialized]);

	return null;
}
