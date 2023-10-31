import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  requestLogin,
  requestProfile,
  requestClientSignup,
  requestLawyerSignup,
} from "@/services/auth";
import { CustomError } from "@/utils/error/customError";

interface Client {
  rolId: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  date: string;
}

interface Lawyer extends Client {
  cuitCuil: string;
  category: string;
  rup: string;
  price: string;
  modality: string;
  phone: string;
}

type LoginUser = {
  email: string;
  password: string;
};

type State = {
  token: string;
  profile: any;
  isAuthenticated: boolean;
  authIsReady: boolean;
};

type Actions = {
  setAuth: () => void;
  clientSignup: ({
    rolId,
    name,
    lastName,
    date,
    email,
    password,
  }: Client) => void;
  lawyerSignup: ({
    rolId,
    name,
    lastName,
    date,
    email,
    password,
    cuitCuil,
    category,
    rup,
    price,
    modality,
    phone,
  }: Lawyer) => void;
  login: ({ email, password }: LoginUser) => void;
  loadProfile: () => void;
  logout: () => void;
};

const initialState = {
  token: "",
  profile: "",
  isAuthenticated: false,
  authIsReady: false,
};

export const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      token: "",
      profile: "",
      isAuthenticated: false,
      authIsReady: false,
      setAuth: () => set((state) => ({ authIsReady: true })),
      clientSignup: async (user) => {
        const { data } = await requestClientSignup(
          user.rolId,
          user.name,
          user.lastName,
          user.date,
          user.email,
          user.password,
        );

        set((state) => ({
          token: data.token,
        }));
      },
      lawyerSignup: async (user) => {
        const { data } = await requestLawyerSignup(
          user.rolId,
          user.name,
          user.lastName,
          user.date,
          user.email,
          user.password,
          user.cuitCuil,
          user.category,
          user.rup,
          user.price,
          user.modality,
          user.phone,
        );

        set((state) => ({
          token: data.token,
        }));
      },
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

        if (!data.id) {
          throw new Error();
        }

        set((state) => ({ profile: { ...data }, isAuthenticated: true }));
      },
      logout: () => {
        set((state) => ({ ...initialState, authIsReady: true }));
      },
    }),
    {
      name: "auth",
      partialize: (state) => ({
        token: state.token,
        profile: state.profile,
        isAuthenticated: state.isAuthenticated,
      }),
      skipHydration: true,
      onRehydrateStorage: (state) => {
        console.log("hydration starts");

        // optional
        return (state, error) => {
          if (error) {
            console.log("an error happened during hydration");
          } else {
            console.log("hydration finished", state);
          }
        };
      },
    },
  ),
);
