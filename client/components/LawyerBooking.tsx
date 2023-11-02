"use client";

import type { FieldValues } from "react-hook-form";

import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";
import Select from "react-select";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, useController } from "react-hook-form";

import { useAuthStore } from "@/store/auth";
import { requestCreateBooking } from "@/services/booking";
import { requestLawyerDetail } from "@/services/auth";
import { handleError } from "@/utils/error/handleError";

import { lawyerHours } from "@/constants";
import { ILawyer } from "@/types";
import { capitalizeFirstLetter, formatDate } from "@/utils/format";

const LawyerBooking = () => {
  const { id } = useParams();
  const router = useRouter();

  const { profile } = useAuthStore((state) => state);

  const [lawyer, setLawyer] = useState<ILawyer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [responseError, setResponseError] = useState<string | null>(null);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
    control,
    getValues,
  } = useForm();

  const { field: dateField } = useController({
    name: "date",
    control,
    rules: { required: "¡Fecha requerida!" },
  });
  const {
    value: dateValue,
    onChange: dateOnChange,
    ...restDateField
  } = dateField;

  const { field: timeField } = useController({
    name: "time",
    control,
    rules: { required: "¡Horario requerido!" },
  });
  const {
    value: timeValue,
    onChange: timeOnChange,
    ...restTimeField
  } = timeField;

  const { field: modalityField } = useController({
    name: "modality",
    control,
    rules: { required: "¡Horario requerido!" },
  });
  const {
    value: modalityValue,
    onChange: modalityOnChange,
    ...restModalityField
  } = modalityField;

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      const { data } = await requestLawyerDetail(id as string);
      setLawyer(data);
      setIsLoading(false);
    })();
  }, [id]);

  useEffect(() => {
    if (getValues().date) {
    }
  }, [getValues().date]);

  let availableModalities: { value: string; label: string }[] = [];

  if (lawyer?.lawyer) {
    availableModalities = lawyer?.lawyer[0].modality.map(
      (mod: { id: string; name: string }) => ({
        value: mod.id,
        label: mod.name === "onsite" ? "Presencial" : "Remoto",
      }),
    );
  }
  console.log(profile);
  const onSubmit = async (data: FieldValues) => {
    setResponseError(null);

    const formattedDate = formatDate(data.date);

    try {
      if (lawyer) {
        await requestCreateBooking(
          profile.client[0].id,
          lawyer.lawyer[0].id,
          data.time,
          formattedDate,
          data.modality,
        );
      }

      router.push("/cliente/turnos");
    } catch (err: any) {
      const { error } = handleError(err);

      setResponseError(error);
    }
  };

  return (
    <>
      {!isLoading && lawyer && (
        <div className="main-container py-[80px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center gap-[60px] max-md:flex-col">
              <div className="flex flex-1 justify-end max-md:justify-center">
                <div>
                  <p>Seleccioná el día:</p>
                  <DayPicker
                    mode="single"
                    selected={dateValue}
                    onSelect={(option) => {
                      dateOnChange(option);
                      clearErrors("date");
                    }}
                    {...restDateField}
                    showOutsideDays
                    locale={es}
                    weekStartsOn={0}
                    modifiers={{
                      disabled: [
                        {
                          dayOfWeek: [0, 6],
                        },
                        {
                          before: tomorrow,
                        },
                      ],
                    }}
                    styles={{
                      caption: { textTransform: "capitalize" },
                    }}
                  />
                  {errors?.date?.message && (
                    <p className="mt-[3px] text-red-500">
                      {errors.date.message as string}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-1 max-md:justify-center">
                <div className="flex w-[90%] max-w-[350px] flex-col gap-[16px]">
                  <div>
                    <p>Seleccioná el horario:</p>
                    <Select
                      isDisabled={!getValues().date}
                      placeholder={
                        getValues().date
                          ? "Seleccioná el horario"
                          : "Seleccioná primero el día"
                      }
                      isClearable
                      className="h-[40px] rounded-[5px] border border-gray-700 text-[16px]"
                      options={lawyerHours}
                      value={
                        timeValue
                          ? lawyerHours.find((x) => x.value === timeValue)
                          : timeValue
                      }
                      onChange={(option) => {
                        timeOnChange(option ? option.value : option);
                        clearErrors("time");
                      }}
                      {...restTimeField}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          border: 0,
                          boxShadow: "none",
                        }),
                      }}
                    />
                    {errors?.time?.message && (
                      <p className="mt-[3px] text-red-500">
                        {errors.time.message as string}
                      </p>
                    )}
                  </div>
                  <div>
                    <p>Seleccioná la modalidad:</p>
                    <Select
                      isDisabled={!getValues().date}
                      placeholder={
                        getValues().date
                          ? "Seleccioná la modalidad"
                          : "Seleccioná primero el día"
                      }
                      isClearable
                      className="h-[40px] rounded-[5px] border border-gray-700 text-[16px]"
                      options={availableModalities}
                      value={
                        modalityValue
                          ? availableModalities.find(
                              (x) => x.value === modalityValue,
                            )
                          : modalityValue
                      }
                      onChange={(option) => {
                        modalityOnChange(option ? option.value : option);
                        clearErrors("category");
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
                    {errors?.modality?.message && (
                      <p className="mt-[3px] text-red-500">
                        {errors.modality.message as string}
                      </p>
                    )}
                  </div>
                  <div className="mt-[30px] flex flex-col">
                    <button
                      type="submit"
                      className="mb-[20px]  h-[50px] w-full rounded-[10px] border border-gray-700 bg-gray-700 text-center font-bold text-white"
                    >
                      Confirmar
                    </button>
                    <button
                      type="button"
                      // className="flex h-[50px] w-full cursor-pointer items-center justify-center rounded-[10px] border border-gray-700 bg-white text-center font-bold text-black"
                      className="mb-[20px]  h-[50px] w-full rounded-[10px] border border-gray-700 bg-gray-700 text-center font-bold text-white"
                    >
                      <Link href={`/abogados/${lawyer.id}`}>Volver</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default LawyerBooking;
