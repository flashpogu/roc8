import { create } from "zustand";

type AuthStore = {
  userID: number;
  setUserID: (userID: number) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  userID: 0,
  setUserID: (userID: number) => set({ userID }),
}));
