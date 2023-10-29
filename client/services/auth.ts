import axios from "@/lib/axios";

export const requestSignup = async (
  rolId: string,
  name: string,
  lastName: string,
  // date: string,
  email: string,
  password: string,
) => {
  // let formDataBody = new FormData();

  // formDataBody.append("rolId", rolId);
  // formDataBody.append("name", name);
  // formDataBody.append("lastName", lastName);
  // formDataBody.append("email", email);
  // formDataBody.append("password", password);

  // return await axios.post("/users/create", formDataBody);

  const response = await axios.post("/users/create", {
    rolId,
    name,
    lastName,
    email,
    password,
  });

  return response;
};

export const requestLogin = async (email: string, password: string) => {
  return await axios.post("/users/login", {
    email,
    password,
  });
};

export const requestProfile = async () => {
  return await axios.get("/users/public/perfil");
};
