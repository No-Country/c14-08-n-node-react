import axios from ".";

// const setHeaderAuthToken = (token: string) => {
//   if (token) {
//     axios.defaults.headers.common["x-auth-token"] = token;
//   } else {
//     delete axios.defaults.headers.common["x-auth-token"];
//   }
// };

export const loginRequest = async (email: string, password: string) => {
  return axios.post("", {
    email,
    password,
  });
};

export const profileRequest = async () => {
  return await axios.get("");
};
