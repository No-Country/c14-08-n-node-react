import axios from "@/lib/axios";

// const setHeaderAuthToken = (token: string) => {
//   if (token) {
//     axios.defaults.headers.common["x-auth-token"] = token;
//   } else {
//     delete axios.defaults.headers.common["x-auth-token"];
//   }
// };

// type LoginData = {
//   token?: string;
//   response?: string;
// };

export const requestLogin = async (email: string, password: string) => {
  return await axios.post("/users/login", {
    email,
    password,
  });
};

export const requestProfile = async () => {
  return await axios.get("/users/public/perfil");
};
