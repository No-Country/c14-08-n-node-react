import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { requestLogin } from "@/services/auth";

type LoginUser = {
  email: string;
  password: string;
};

type State = {
  token: string;
  profile: any;
};

type Actions = {
  setToken: (token: string) => void;
  setProfile: (profile: any) => void;
  login: (user: LoginUser) => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: "",
      profile: "",
      setToken: (token) => set((state) => ({ token })),
      setProfile: (profile) => set((state) => ({ profile })),
      login: async (user) => {
        const response = await requestLogin(user.email, user.password);

        console.log(response);

        // set((state) => ({ profile }));
      },
    }),
    {
      name: "auth",
      // storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, profile: state.profile }),
    },
  ),
);
