"use client";

import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";
import Select from "react-select";
import { useParams } from "next/navigation";

import { requestLawyerDetail } from "@/services/auth";

import { modalitiesList, lawyerHours } from "@/constants";
import { ILawyer } from "@/types";

const LawyerBooking = () => {
  const { id } = useParams();

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [lawyer, setLawyer] = useState<ILawyer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      const { data } = await requestLawyerDetail(id as string);
      console.log(data);
      setLawyer(data);
      setIsLoading(false);
    })();
  }, [id]);

  console.log(lawyer);

  return (
    <>
      {!isLoading && (
        <div className="main-container py-[80px]">
          <form
            action="
      "
          >
            <div className="flex justify-center gap-[60px]">
              <div className="flex flex-1 justify-end">
                <div>
                  <p>Seleccioná el día:</p>
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
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
                </div>
              </div>
              <div className="flex flex-1">
                <div className="flex w-[90%] max-w-[350px] flex-col gap-[16px]">
                  <div>
                    <p>Seleccioná el horario:</p>
                    <Select
                      isDisabled={!selectedDate}
                      placeholder={
                        selectedDate
                          ? "Seleccioná el horario"
                          : "Seleccioná primero el día"
                      }
                      isClearable
                      className="h-[40px] rounded-[5px] border border-gray-700 text-[16px]"
                      options={lawyerHours}
                      // value={
                      //   categoryValue
                      //     ? registerCategoriesList.find(
                      //         (x) => x.value === categoryValue,
                      //       )
                      //     : categoryValue
                      // }
                      // onChange={(option) => {
                      //   categoryOnChange(option ? option.value : option);
                      //   clearErrors("category");
                      // }}
                      // // onBlur={() => setResponseError(null)}
                      // {...restCategoryField}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          border: 0,
                          boxShadow: "none",
                        }),
                      }}
                    />
                  </div>
                  <div>
                    <p>Seleccioná la modalidad:</p>
                    <Select
                      isDisabled={!selectedDate}
                      placeholder={
                        selectedDate
                          ? "Seleccioná la modalidad"
                          : "Seleccioná primero el día"
                      }
                      isClearable
                      className="h-[40px] rounded-[5px] border border-gray-700 text-[16px]"
                      options={modalitiesList}
                      // value={
                      //   categoryValue
                      //     ? registerCategoriesList.find(
                      //         (x) => x.value === categoryValue,
                      //       )
                      //     : categoryValue
                      // }
                      // onChange={(option) => {
                      //   categoryOnChange(option ? option.value : option);
                      //   clearErrors("category");
                      // }}
                      // // onBlur={() => setResponseError(null)}
                      // {...restCategoryField}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          border: 0,
                          boxShadow: "none",
                        }),
                      }}
                    />
                  </div>
                  <div className="mt-[30px] flex flex-col">
                    <button className="mb-[20px]  h-[50px] w-full rounded-[10px] border border-gray-700 bg-gray-700 text-center font-bold text-white">
                      Confirmar
                    </button>
                    <button
                      // className="flex h-[50px] w-full cursor-pointer items-center justify-center rounded-[10px] border border-gray-700 bg-white text-center font-bold text-black"
                      className="mb-[20px]  h-[50px] w-full rounded-[10px] border border-gray-700 bg-gray-700 text-center font-bold text-white"
                    >
                      Volver
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
