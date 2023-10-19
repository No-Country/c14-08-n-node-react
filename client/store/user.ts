import { StateCreator } from 'zustand'
import axios from "axios";
import { endpoints } from "../constants/endpoints";

export interface UserState {
  currentUser: any;
  role: any;
  token: any;
  signUpClient: (data: object) => Promise<void>;
  login: (data: object) => Promise<void>;
}

export const CreateUser: StateCreator<UserState> = (set: any) => ({
  currentUser: null,
  role: null,
  token: null,
  signUpClient: async (data) => {
    console.log(data);
    try {
      console.log(data);
      const res = await axios.post(endpoints[0].url, data);
      set({
        currentUser: res.data.user,
        role: res.data.role,
        token: res.data.token,
      });
    } catch (err) {
      console.log(err);
    }
  },
  login: async (data) => {
    console.log(data);
    try {
      const res = await axios.post(endpoints[1].url, data);
      set({
        currentUser: res.data.user,
        role: res.data.role,
        token: res.data.token,
      });
    } catch (err) {
      console.log(err);
    }
  }
});
