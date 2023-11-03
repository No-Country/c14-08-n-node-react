"use client";

import { Field, FieldValues, useForm } from "react-hook-form";

import { IBookItem } from "@/types";
import { formatPrice } from "@/utils/format";

interface BookingItemProps extends IBookItem {
  isClient: boolean;
  handleAcceptRemoteBooking: (link: string, bookingId: string) => void;
  handleDeclineBooking: (id: string) => void;
}

const BookingItem = ({
  id,
  fecha,
  time,
  client,
  lawyer,
  modality,
  status,
  isClient,
  handleDeclineBooking,
  handleAcceptRemoteBooking,
}: BookingItemProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const onConfirmRemote = (data: FieldValues) => {
    handleAcceptRemoteBooking(data.link, id);
  };

  return (
    <div className="rounded-[10px] border border-black bg-white px-[30px] py-[10px]">
      <div className="flex-between flex gap-[24px] max-xs:flex-col-reverse  max-xs:gap-[12px]">
        <div>
          <p className="text-[20px] font-bold">Detalles:</p>
          <ul className="mt-[10px]">
            <li>Abogado:</li>
            <li>Fecha: {fecha}</li>
            <li>Hora: {time}</li>
            <li>Precio Consulta: ${formatPrice(lawyer.price)}</li>
            <li>
              Modalidad: {modality.name === "onsite" ? "Presencial" : "Remoto"}
            </li>
            <li>Estado: {status.name}</li>
          </ul>
        </div>
        <div className="flex-center flex-col">
          <div className="flex-center flex h-[80px] w-[80px] overflow-hidden rounded-full bg-[#c4cce0]">
            <img
              src={isClient ? lawyer.imagen : client.imagen}
              alt="user profile image"
            />
          </div>
        </div>
      </div>
      {isClient && status.name === "Pending" && (
        <div className="mt-[10px]  border-t border-black pt-[10px] max-xs:flex-col-reverse max-xs:gap-[8px]">
          {modality.name === "remote" && (
            <form className="mb-[10px]">
              <div>
                <label className="flex flex-col">
                  <span className="pl-[1px] text-[18px] font-semibold">
                    Link de reunion:
                  </span>
                  <input
                    {...register("link", {
                      required: "¡Link requerido!",
                      onChange: () => {
                        clearErrors("link");
                      },
                      onBlur: () => {},
                    })}
                    type="text"
                    placeholder="Link"
                    className="h-[40px] rounded-[5px] border border-gray-700 px-[6px] text-[16px]"
                  />
                </label>
                {errors?.link?.message && (
                  <p className="mt-[3px] text-red-500">
                    {errors.link.message as string}
                  </p>
                )}
              </div>
            </form>
          )}
          <div className="flex gap-[24px]  max-xs:flex-col-reverse">
            <div className="flex max-md:flex-1">
              <button
                onClick={() => handleDeclineBooking(id)}
                className="min-w-[125.266px] rounded-[5px] bg-gray-700 px-[24px] py-[15px] font-bold text-white max-md:w-full max-md:min-w-0"
              >
                Rechazar
              </button>
            </div>
            <div className="flex max-md:flex-1">
              <button
                onClick={handleSubmit(onConfirmRemote)}
                className=" min-w-[125.266px] rounded-[5px] bg-gray-700 px-[24px] py-[15px] font-bold text-white max-md:w-full max-md:min-w-0"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingItem;
