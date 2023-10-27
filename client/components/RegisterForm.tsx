"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";

import { useAuthStore } from "@/store/auth";
import { handleError } from "@/utils/error/handleError";

import type { FieldValues } from "react-hook-form";

const RegisterForm = () => {
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
    trigger,
  } = useForm();

  const [currentStep, setCurrentStep] = useState(0);
  const [accountType, setAccountType] = useState<string | null>(null);
  const [responseError, setResponseError] = useState<string | null>(null);
  const [progress, setProgress] = useState(false);

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

  useEffect(() => {
    if (currentStep === 0 && accountType) {
      setAccountType(null);
      clearErrors();
    }
  }, [currentStep]);

  const handleAccountTypePick = (type: string) => {
    clearErrors();
    setAccountType(type);
    setCurrentStep(1);
  };

  const handlePreviousStep = () => {
    clearErrors();

    setCurrentStep((prevState) => prevState - 1);
  };

  const handleNextStep = () => {
    trigger();

    setTimeout(() => setProgress(true), 200);
  };

  useEffect(() => {
    if (progress) {
      if (Object.keys(errors).length > 0) {
        setProgress(false);
        return;
      } else {
        clearErrors();
        setProgress(false);
        setCurrentStep((prevState) => prevState + 1);
      }
    }
  }, [progress]);

  const validateDate = (value: string) => {
    console.log(value);
    const selected = new Date(value).getFullYear();
    const now = new Date().getFullYear();
    return now - selected >= 18 || "Debés tener al menos 18 años para acceder.";
  };

  console.log(errors);

  return (
    <section>
      <div className="min-h-screen bg-gray-300 py-[20px]">
        <div className="main-container">
          <h1 className="text-[32px] font-semibold">Registro</h1>
          <div className="flex justify-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative w-[90%] max-w-[374px] rounded-[5px] bg-white px-[20px] py-[10px]"
            >
              <h2 className="text-[24px]">Te damos la bienvenida</h2>
              <p className="mb-[32px] text-[18px]">
                Ingresá tus datos para poder crearte una cuenta:
              </p>
              {accountType && (
                <p className="mb-[10px] text-center text-[18px]">
                  {accountType === "client" ? "Cliente" : "Abogado"}
                </p>
              )}
              {currentStep === 0 && (
                <>
                  <p className="mb-[10px] text-center text-[14px]">
                    Elegí qué tipo de cuenta querés crearte:
                  </p>
                  <div className="gap flex flex-col gap-[20px]">
                    <div
                      onClick={() => {
                        handleAccountTypePick("client");
                      }}
                      className="flex cursor-pointer items-center justify-between rounded-[5px] border border-gray-700 px-[12px] py-[10px] text-[18px] font-semibold"
                    >
                      <p>Cliente</p>
                      <FaArrowRightLong />
                    </div>
                    <div
                      onClick={() => {
                        handleAccountTypePick("lawyer");
                      }}
                      className="flex cursor-pointer items-center justify-between rounded-[5px] border border-gray-700 px-[12px] py-[10px] text-[18px] font-semibold"
                    >
                      <p>Abogado</p>
                      <FaArrowRightLong />
                    </div>
                  </div>
                </>
              )}
              {currentStep === 1 && (
                <div className="flex flex-col gap-[20px]">
                  <div>
                    <label className="flex flex-col">
                      <span className="pl-[1px] text-[18px] font-semibold">
                        Nombre:
                      </span>
                      <input
                        {...register("name", {
                          required: "Nombre requerido!",
                          onChange: () => {
                            setResponseError(null);
                            clearErrors("name");
                          },
                          onBlur: () => {
                            setResponseError(null);
                          },
                        })}
                        type="text"
                        placeholder="Nombre"
                        className="h-[40px] rounded-[5px] border border-gray-700 px-[6px] text-[16px]"
                      />
                    </label>
                    {errors?.name?.message && (
                      <p className="mt-[3px] text-red-500">
                        {errors.name.message as string}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="flex flex-col">
                      <span className="pl-[1px] text-[18px] font-semibold">
                        Apellido:
                      </span>
                      <input
                        {...register("lastName", {
                          required: "Apellido requerido!",
                          onChange: () => {
                            setResponseError(null);
                            clearErrors("lastName");
                          },
                          onBlur: () => {
                            setResponseError(null);
                          },
                        })}
                        type="text"
                        placeholder="Password"
                        className="h-[40px] rounded-[5px] border border-gray-700 px-[6px] text-[16px]"
                      />
                    </label>
                    {errors?.lastName?.message && (
                      <p className="mt-[3px] text-red-500">
                        {errors.lastName.message as string}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="flex flex-col">
                      <span className="pl-[1px] text-[18px] font-semibold">
                        Fecha de Nacimiento:
                      </span>
                      <input
                        {...register("date", {
                          required: "Fecha de nacimiento requerida!",
                          validate: validateDate,
                          onChange: () => {
                            setResponseError(null);
                            clearErrors("date");
                          },
                          onBlur: () => {
                            setResponseError(null);
                          },
                        })}
                        type="date"
                        className="h-[40px] rounded-[5px] border border-gray-700 px-[6px] text-[16px]"
                      />
                    </label>
                    {errors?.date?.message && (
                      <p className="mt-[3px] text-red-500">
                        {errors.date.message as string}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <div className="flex flex-col gap-[20px]">
                  <div>
                    <label className="flex flex-col">
                      <span className="pl-[1px] text-[18px] font-semibold">
                        Email:
                      </span>
                      <input
                        {...register("email", {
                          required: "¡Email requerido!",
                          onChange: () => {
                            setResponseError(null);
                          },
                          onBlur: () => {
                            setResponseError(null);
                          },
                        })}
                        type="email"
                        placeholder="Email"
                        className="h-[40px] rounded-[5px] border border-gray-700 px-[6px] text-[16px]"
                      />
                    </label>
                    {errors?.email?.message && (
                      <p className="mt-[3px] text-red-500">
                        {errors.email.message as string}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="flex flex-col">
                      <span className="pl-[1px] text-[18px] font-semibold">
                        Contraseña:
                      </span>
                      <input
                        {...register("password", {
                          required: "¡Contraseña requerida!",
                          onChange: () => {
                            setResponseError(null);
                          },
                          onBlur: () => {
                            setResponseError(null);
                          },
                        })}
                        type="password"
                        placeholder="Password"
                        className="h-[40px] rounded-[5px] border border-gray-700 px-[6px] text-[16px]"
                      />
                    </label>
                    {errors?.password?.message && (
                      <p className="mt-[3px] text-red-500">
                        {errors.password.message as string}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="flex flex-col">
                      <span className="pl-[1px] text-[18px] font-semibold">
                        Confirmá contraseña:
                      </span>
                      <input
                        {...register("confirmPassword", {
                          required: "¡Debés confirmar contraseña!",
                          validate: (value) => {
                            return (
                              value === getValues("password") ||
                              "¡Las contraseñas no son iguales!"
                            );
                          },
                          onChange: () => {
                            setResponseError(null);
                          },
                          onBlur: () => {
                            setResponseError(null);
                          },
                        })}
                        type="password"
                        placeholder="Password"
                        className="h-[40px] rounded-[5px] border border-gray-700 px-[6px] text-[16px]"
                      />
                    </label>
                    {errors?.confirmPassword?.message && (
                      <p className="mt-[3px] text-red-500">
                        {errors.confirmPassword.message as string}
                      </p>
                    )}
                  </div>
                </div>
              )}
              <div className="mb-[20px] mt-[70px] flex w-full flex-col gap-[20px]">
                <>
                  {currentStep !== 0 && (
                    <div
                      onClick={handlePreviousStep}
                      className="flex h-[50px] w-full cursor-pointer items-center justify-center rounded-[10px] bg-gray-700 text-center font-bold text-white"
                    >
                      Volver
                    </div>
                  )}
                  {currentStep > 0 &&
                    !(currentStep === 2 && accountType === "client") && (
                      <div
                        onClick={handleNextStep}
                        className="flex h-[50px] w-full cursor-pointer items-center justify-center rounded-[10px] bg-gray-700 text-center font-bold text-white"
                      >
                        Siguiente
                      </div>
                    )}
                </>
              </div>
              {((currentStep === 2 && accountType === "client") ||
                (currentStep === 4 && accountType === "lawyer")) && (
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="mb-[20px]  h-[50px] w-full rounded-[10px] bg-gray-700 text-center font-bold text-white"
                >
                  Ingresar
                </button>
              )}
              {responseError && (
                <div className="flex justify-center text-[14px] text-red-500">
                  {responseError}
                </div>
              )}
              <p className="mt-[30px] text-center text-[14px] underline">
                Ayuda con el registro
              </p>
              <div className="mt-[16px] text-center">
                <Link href="/ingreso" className="text-[14px] underline">
                  ¿Ya tenés cuenta?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
