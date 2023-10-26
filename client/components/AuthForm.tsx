"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { handleError } from "@/utils/error/handleError";

import type { FieldValues } from "react-hook-form";
const AuthForm = () => {
  const { login, loadProfile } = useAuthStore((state) => state);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors,
    getValues,
  } = useForm();

  const [responseError, setResponseError] = useState<string | null>(null);

  const onSubmit = async (data: FieldValues) => {
    setResponseError(null);
    try {
      await login({
        email: data.email,
        password: data.password,
      });

      await loadProfile();

      router.push("/");
    } catch (err: any) {
      const { error } = handleError(err);
      reset();
      clearErrors();
      setResponseError(error);
    }
  };

  const errorRender =
    Object.values(errors).length > 0
      ? Object.values(errors)[0]?.message
      : responseError
      ? responseError
      : undefined;

  return (
    <section>
      <div className="py my-[52px] bg-gray-300 py-[20px]">
        <div className="main-container">
          <h1 className="text-[32px] font-semibold">Ingreso</h1>
          <div className="flex justify-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative w-[90%] max-w-[374px] rounded-[5px] bg-white px-[20px] py-[10px]"
            >
              <h2 className="text-[24px]">Te damos la bienvenida</h2>
              <p className="mb-[32px] text-[18px]">
                Ingresa tus datos para poder administrar tu agenda de turnos
              </p>
              <div className="flex flex-col gap-[20px]">
                <label className="flex flex-col">
                  <span className="pl-[1px] text-[18px] font-semibold">
                    Email:
                  </span>
                  <input
                    {...register("email", {
                      required: "¡Email requerido!",
                      onBlur: () => setResponseError(null),
                    })}
                    type="email"
                    placeholder="Email"
                    className="h-[40px] rounded-[5px] border border-gray-700 px-[6px] text-[16px]"
                  />
                </label>
                <label className="flex flex-col">
                  <span className="pl-[1px] text-[18px] font-semibold">
                    Password:
                  </span>
                  <input
                    {...register("password", {
                      required: "¡Contraseña requerida!",
                      onBlur: () => setResponseError(null),
                    })}
                    type="password"
                    placeholder="Password"
                    className="h-[40px] rounded-[5px] border border-gray-700 px-[6px] text-[16px]"
                  />
                </label>
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="mb-[20px] mt-[70px] h-[50px] w-full rounded-[10px] bg-gray-700 text-center font-bold text-white"
              >
                Ingresar
              </button>
              {(Object.values(errors).length > 0 || responseError) && (
                <div className="flex justify-center text-[14px] text-red-500">
                  {errorRender as string}
                </div>
              )}
              <p className="mt-[30px] text-center text-[14px] underline">
                Ayuda con el ingreso
              </p>
              <div className="mt-[16px] text-center">
                <Link href="/registro" className="text-[14px] underline">
                  ¿No tenés cuenta?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
