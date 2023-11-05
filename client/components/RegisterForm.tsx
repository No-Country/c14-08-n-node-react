"use client";

import type { FieldValues } from "react-hook-form";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm, useController } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";
import Select from "react-select";

import { useAuthStore } from "@/store/auth";
import { handleError } from "@/utils/error/handleError";

import { validateDate, validatePhoneNumber } from "@/utils/validate";
import { registerCategoriesList, modalitiesList } from "@/constants";
import { roleIds } from "@/constants/roleIds";
import { Spinner } from ".";

const RegisterForm = () => {
  const { clientSignup, lawyerSignup, loadProfile } = useAuthStore(
    (state) => state,
  );

  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const [accountType, setAccountType] = useState<string | null>(null);
  const [responseError, setResponseError] = useState<string | null>(null);
  const [progress, setProgress] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
    getValues,
    trigger,
    control,
  } = useForm();

  const { field: categoryField } = useController({
    name: "category",
    control,
    rules: { required: "¡Especialidad requerida!" },
  });
  const {
    value: categoryValue,
    onChange: categoryOnChange,
    ...restCategoryField
  } = categoryField;

  const { field: modalityField } = useController({
    name: "modality",
    control,
    rules: { required: "¡Modalidad requerida!" },
  });
  const {
    value: modalityValue,
    onChange: modalityOnChange,
    ...restModalityField
  } = modalityField;

  const onSubmit = async (data: FieldValues) => {
    setResponseError(null);

    try {
      if (accountType === "client") {
        await clientSignup({
          rolId: roleIds[accountType],
          name: data.name,
          lastName: data.lastName,
          date: data.date,
          email: data.email,
          password: data.password,
        });
      }

      if (accountType === "lawyer") {
        await lawyerSignup({
          rolId: roleIds[accountType],
          name: data.name,
          lastName: data.lastName,
          date: data.date,
          email: data.email,
          password: data.password,
          cuitCuil: data.cuitCuil,
          category: data.category,
          rup: data.rup,
          price: data.price,
          modality: data.modality,
          phone: data.phone,
        });
      }

      await loadProfile();

      if (accountType === "client") {
        router.push("/");
      } else {
        router.push("/abogado/panel");
      }
    } catch (err: any) {
      const { error } = handleError(err);
      // setCurrentStep(1);
      // reset();
      // clearErrors();
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

    if (type === "lawyer") {
      reset({ ...getValues(), modality: undefined, category: undefined });
    } else {
      reset({
        name: getValues().name,
        lastName: getValues().lastName,
        date: getValues().date,
        email: getValues().email,
        password: getValues().password,
        confirmPassword: getValues().confirmPassword,
        modality: "1",
        category: "1",
      });
    }

    setCurrentStep(1);
  };

  const handlePreviousStep = () => {
    clearErrors();

    setCurrentStep((prevState) => prevState - 1);
  };

  const handleNextStep = () => {
    const inputsToCheck = [];

    if (currentStep === 1) {
      inputsToCheck.push("name", "lastName", "date");
    } else if (currentStep === 2) {
      inputsToCheck.push("email", "password", "confirmPassword");
    } else if (currentStep === 3) {
      inputsToCheck.push("cuilCuit", "category", "rup");
    } else if (currentStep === 4) {
      inputsToCheck.push("price", "modality", "phone");
    }

    trigger(inputsToCheck);

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
                          required: "¡Nombre requerido!",
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
                          required: "¡Apellido requerido!",
                          minLength: {
                            value: 8,
                            message:
                              "El apellido debe tener al menos 8 caracteres.",
                          },
                          onChange: () => {
                            setResponseError(null);
                            clearErrors("lastName");
                          },
                          onBlur: () => {
                            setResponseError(null);
                          },
                        })}
                        type="text"
                        placeholder="Apellido"
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
                          required: "¡Fecha de nacimiento requerida!",
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
                            clearErrors("email");
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
                            clearErrors("password");
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
                            clearErrors("confirmPassword");
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
              {currentStep === 3 && accountType === "lawyer" && (
                <div className="flex flex-col gap-[20px]">
                  <div>
                    <label className="flex flex-col">
                      <span className="pl-[1px] text-[18px] font-semibold">
                        CUIT/CUIL:
                      </span>
                      <input
                        {...register("cuitCuil", {
                          required: "¡CUIT/CUIL requerido!",
                          pattern: {
                            value:
                              /^(20|23|27|30|33)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/g,
                            message: "¡CUIT/CUIL invalido!",
                          },
                          onChange: () => {
                            setResponseError(null);
                            clearErrors("cuitCuil");
                          },
                          onBlur: () => {
                            setResponseError(null);
                          },
                        })}
                        type="text"
                        placeholder="20111111117"
                        className="h-[40px] rounded-[5px] border border-gray-700 px-[6px] text-[16px]"
                      />
                    </label>
                    {errors?.cuitCuil?.message && (
                      <p className="mt-[3px] text-red-500">
                        {errors.cuitCuil.message as string}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="flex flex-col">
                      <span className="pl-[1px] text-[18px] font-semibold">
                        Especialidad:
                      </span>
                      <Select
                        placeholder="Selecciona"
                        isClearable
                        className="h-[40px] rounded-[5px] border border-gray-700 text-[16px]"
                        options={registerCategoriesList}
                        value={
                          categoryValue
                            ? registerCategoriesList.find(
                                (x) => x.value === categoryValue,
                              )
                            : categoryValue
                        }
                        onChange={(option) => {
                          categoryOnChange(option ? option.value : option);
                          clearErrors("category");
                        }}
                        // onBlur={() => setResponseError(null)}
                        {...restCategoryField}
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            border: 0,
                            boxShadow: "none",
                          }),
                        }}
                      />
                    </label>
                    {errors?.category?.message && (
                      <p className="mt-[3px] text-red-500">
                        {errors.category.message as string}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="flex flex-col">
                      <span className="pl-[1px] text-[18px] font-semibold">
                        Registro Único Profesional:
                      </span>
                      <input
                        {...register("RUP", {
                          required: "¡Registro requerido!",
                          onChange: () => {
                            setResponseError(null);
                          },
                          onBlur: () => {
                            setResponseError(null);
                          },
                        })}
                        type="text"
                        defaultValue="1111 1111"
                        readOnly
                        placeholder="1111 1111"
                        className="h-[40px] rounded-[5px] border border-gray-700 px-[6px] text-[16px]"
                      />
                    </label>
                    {errors?.rup?.message && (
                      <p className="mt-[3px] text-red-500">
                        {errors.rup.message as string}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {currentStep === 4 && accountType === "lawyer" && (
                <div className="flex flex-col gap-[20px]">
                  <div>
                    <label className="flex flex-col">
                      <span className="pl-[1px] text-[18px] font-semibold">
                        Honorarios por consulta:
                      </span>
                      <input
                        {...register("price", {
                          required: "¡Precio requerido!",
                          min: {
                            value: 1,
                            message: "El precio debe ser mayor o igual a 1.",
                          },
                          onChange: () => {
                            setResponseError(null);
                            clearErrors("price");
                          },
                          onBlur: () => {
                            setResponseError(null);
                          },
                        })}
                        type="number"
                        min={1}
                        placeholder="20000"
                        className="h-[40px] rounded-[5px] border border-gray-700 px-[6px] text-[16px]"
                      />
                    </label>
                    {errors?.price?.message && (
                      <p className="mt-[3px] text-red-500">
                        {errors.price.message as string}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="flex flex-col">
                      <span className="pl-[1px] text-[18px] font-semibold">
                        Modalidad:
                      </span>
                      <Select
                        placeholder="Selecciona"
                        isClearable
                        className="h-[40px] rounded-[5px] border border-gray-700 text-[16px]"
                        options={modalitiesList}
                        value={
                          modalityValue
                            ? modalitiesList.find(
                                (x) => x.value === modalityValue,
                              )
                            : modalityValue
                        }
                        onChange={(option) => {
                          modalityOnChange(option ? option.value : option);
                          clearErrors("modality");
                        }}
                        {...restModalityField}
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            border: 0,
                            boxShadow: "none",
                          }),
                        }}
                      />
                    </label>
                    {errors?.modality?.message && (
                      <p className="mt-[3px] text-red-500">
                        {errors.modality.message as string}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="flex flex-col">
                      <span className="pl-[1px] text-[18px] font-semibold">
                        Numero de teléfono:
                      </span>
                      {/* TODO: Fix onchange should clear errors */}
                      <input
                        {...register("phone", {
                          required: "¡Teléfono requerido!",
                          validate: validatePhoneNumber,
                          onChange: () => {
                            setResponseError(null);
                            clearErrors("phone");
                          },
                          onBlur: () => {
                            setResponseError(null);
                          },
                        })}
                        type="text"
                        placeholder="111111111"
                        className="h-[40px] rounded-[5px] border border-gray-700 px-[6px] text-[16px]"
                      />
                    </label>
                    {errors?.phone?.message && (
                      <p className="mt-[3px] text-red-500">
                        {errors.phone.message as string}
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
                      className="flex h-[50px] w-full cursor-pointer items-center justify-center rounded-[10px] border border-gray-700 bg-white text-center font-bold text-black"
                    >
                      Volver
                    </div>
                  )}
                  {currentStep > 0 &&
                    !(currentStep === 2 && accountType === "client") &&
                    !(currentStep === 4 && accountType === "lawyer") && (
                      <div
                        onClick={handleNextStep}
                        className="flex h-[50px] w-full cursor-pointer items-center justify-center rounded-[10px] border border-gray-700 bg-gray-700 text-center font-bold text-white"
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
                  className="flex-center relative mb-[20px] h-[50px] w-full rounded-[10px] border border-gray-700 bg-gray-700 text-center font-bold text-white"
                >
                  {!isSubmitting ? (
                    <p className="absolute">Crear Cuenta</p>
                  ) : (
                    <Spinner className="absolute bottom-0 left-0 right-0 top-0 m-auto h-6 w-6 border-white" />
                  )}
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
