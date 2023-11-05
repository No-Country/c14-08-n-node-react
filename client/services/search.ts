import axios from "@/lib/axios";

export const requestSearch = async (query: string) => {
  const response = await axios.get(`/users/filtrar${query}`);

  console.log(response);

  return response;
};
