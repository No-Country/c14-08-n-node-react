import { CustomError } from "./customError";

interface ICustomError {
  message: string;
}

export const handleError = (err: ICustomError | Error) => {
  if (err instanceof CustomError) {
    return { error: err.message };
  }

  console.log("error", err);

  return {
    error: "¡Ups! Algo salió mal. Inténtalo de nuevo más tarde.",
  };
};
