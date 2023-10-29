import { StateCreator } from "zustand";
import axios from "axios";
import { endpoints } from "../constants/endpoints";

export interface UserState {
  currentUser: any;
  role: any;
  token: any;
  signUpClient: (data: object) => Promise<void>;
  login: (data: object) => Promise<boolean>;
}

export const CreateUser: StateCreator<UserState> = (set: any) => ({
  currentUser: null,
  role: null,
  token: null,
  signUpClient: async (data) => {
    try {
      console.log(data);
      const res = await fetch(endpoints.singIn, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status === 201) {
        console.log("user created");
      }
    } catch (err) {
      throw err;
    }
  },
  login: async (data) => {
    let respuesta = false;
    console.log(data);
    try {
      const res = await fetch(endpoints.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status === 201) {
        console.log("logged in");
        console.log(res);
        respuesta = true;
      }
      return respuesta;
      set({
        currentUser: res.body,
      });
    } catch (err) {
      throw err;
    }
  },
});
