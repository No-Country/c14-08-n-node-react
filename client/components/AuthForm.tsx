"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    reset();
  };

  console.log(isSubmitting);

  return (
    <section>
      <div className="py my-[52px] bg-gray-300 py-[20px]">
        <div className="main-container">
          <h1 className="text-[32px] font-semibold">Ingreso</h1>
          <div className="flex justify-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-[90%] max-w-[354px]"
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
                    {...register("email", { required: "Email requerido" })}
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
                    {...register("email", { required: "Contraseña requerida" })}
                    type="password"
                    placeholder="Password"
                    className="h-[40px] rounded-[5px] border border-gray-700 px-[6px] text-[16px]"
                  />
                </label>
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="mt-[70px] h-[50px] w-full rounded-[10px] bg-gray-700 text-center font-bold text-white"
              >
                Ingresar
              </button>
              <p className="mt-[50px] text-center text-[14px] underline">
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
