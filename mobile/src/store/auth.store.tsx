import { create } from "zustand";

type User = {
  id: string;
  name: string;
  role: "PATIENT" | "DOCTOR";
  specialty?: string;
};

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));