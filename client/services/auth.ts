import axios from "@/lib/axios";

// const setHeaderAuthToken = (token: string) => {
//   if (token) {
//     axios.defaults.headers.common["x-auth-token"] = token;
//   } else {
//     delete axios.defaults.headers.common["x-auth-token"];
//   }
// };

export const requestLogin = async (email: string, password: string) => {
  return axios.post("/users/login", {
    email,
    password,
  });
};

export const profileRequest = async () => {
  return await axios.get("");
};
