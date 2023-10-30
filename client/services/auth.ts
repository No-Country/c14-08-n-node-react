import axios from "@/lib/axios";

export const requestClientSignup = async (
  rolId: string,
  name: string,
  lastName: string,
  date: string,
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
    name: name.toLowerCase(),
    lastName: lastName.toLowerCase(),
    email: email.toLowerCase(),
    password,
  });

  return response;
};

export const requestLawyerSignup = async (
  rolId: string,
  name: string,
  lastName: string,
  date: string,
  email: string,
  password: string,
  cuitCuil: string,
  category: string,
  rup: string,
  price: string,
  modality: string,
  phone: string,
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
    name: name.toLowerCase(),
    lastName: lastName.toLowerCase(),
    email: email.toLowerCase(),
    password,
    cuitCuil,
    type: category.toLowerCase(),
    price: price.toLowerCase(),
    modality: modality.toLowerCase(),
    phone,
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

export const requestLawyerDetail = async (id: string) => {
  return await axios.get(`/users/${id}`);
};
