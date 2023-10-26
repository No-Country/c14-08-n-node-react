import { CustomError } from "./customError";

interface ICustomError {
  message: string;
}

export const handleError = (err: ICustomError | Error) => {
  if (err instanceof CustomError) {
    return { error: err.message };
  }

  console.log(err.message);

  return {
    error: "¡Ups! Algo salió mal. Inténtalo de nuevo más tarde.",
  };
};
