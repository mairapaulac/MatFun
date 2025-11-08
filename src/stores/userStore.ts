import {IUserSessionData } from "@/types/types";
import { create } from "zustand";

type UserStore = {
	userData: Omit<IUserSessionData, "token"> | null;
	isUserLoggedIn: boolean;
	setUser: (data: Omit<IUserSessionData, "token"> | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
	userData: null,
	isUserLoggedIn: false,
	setUser: (data) => set(() => ({ userData: data })),
}));
