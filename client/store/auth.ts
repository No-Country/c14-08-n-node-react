import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { requestLogin, requestProfile } from "@/services/auth";
import { CustomError } from "@/utils/error/customError";

type LoginUser = {
  email: string;
  password: string;
};

type State = {
  token: string;
  profile: any;
};

type Actions = {
  login: ({ email, password }: LoginUser) => void;
  loadProfile: () => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: "",
      profile: "",
      login: async (user) => {
        const { data } = await requestLogin(user.email, user.password);

        if (!data.token) {
          throw new CustomError("Credenciales inválidas!");
        }

        set((state) => ({
          token: data.token,
        }));
      },
      loadProfile: async () => {
        const { data } = await requestProfile();

        console.log("data", data.id);

        if (!data.id) {
          throw new Error();
        }

        set((state) => ({ profile: { ...data } }));
      },
    }),
    {
      name: "auth",
      partialize: (state) => ({ token: state.token, profile: state.profile }),
    },
  ),
);
