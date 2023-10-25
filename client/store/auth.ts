import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  token: string;
  profile: any;
};

type Actions = {
  setToken: (token: string) => void;
  setProfile: (profile: any) => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: "",
      profile: "",
      setToken: (token: string) => set((state) => ({ token })),
      setProfile: (profile: any) => set((state) => ({ profile })),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, profile: state.profile }),
    },
  ),
);
