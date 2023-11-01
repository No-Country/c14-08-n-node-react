"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { requestLawyerDetail } from "@/services/auth";

import { LawyerRating } from ".";

import { ILawyer } from "@/types";

const LawyerDetail = () => {
  const [lawyer, setLawyer] = useState<ILawyer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      const { data } = await requestLawyerDetail(id as string);

      setLawyer(data);
      setIsLoading(false);
    })();
  }, [id]);

  console.log(lawyer);

  return (
    <div className="main-container my-[35px]">
      {!isLoading && lawyer && (
        <>
          <h1 className="mb-[10px] text-[18px] max-sm:text-center">
            Conocé un poco más a
            <span className="capitalize">{` ${lawyer.name}`}</span>
          </h1>
          {/* <div className="flex justify-end">{lawyer?.rating}</div> */}
          <div className="flex w-full flex-col items-center">
            {lawyer?.imageUrl ? (
              <Image
                src={lawyer.imageUrl}
                alt="profile picture"
                height={108}
                width={108}
                className="absolute rounded-full"
              />
            ) : (
              <div className="h-[108px] w-[108px] rounded-full bg-gray-700" />
            )}
            <div className="mt-[10px] w-full border-b-[1px] border-black">
              <p className="text-center text-[18px] font-bold capitalize">
                {lawyer.name} {lawyer.lastName}
              </p>
            </div>
            <p className="mt-[5px] text-[15px] capitalize">
              {lawyer.lawyer[0].type[0].name}
            </p>
          </div>
          <div className="mt-[10px] flex justify-between gap-[12px] max-sm:flex-col">
            <div className="rounded-[5px] bg-gray-700 px-[12px] py-[8px] text-white">
              <p className="text-center">Valor consulta:</p>
              <p className="text-center">${lawyer.lawyer[0].price}</p>
            </div>
            <div className="rounded-[5px] bg-gray-700 px-[12px] py-[8px] text-white">
              <p className="text-center">Modalidad:</p>
              <p className="text-center">
                {lawyer.lawyer[0]?.modality[0].name === "remote"
                  ? "Remoto"
                  : "Presencial"}
              </p>
            </div>
          </div>
          <p className="mt-[42px] text-[15px] font-bold">Se destaca en</p>
          <p className="mt-[12px]">{lawyer.lawyer[0].description}.</p>
          <button className="mt-[20px] w-full rounded-[8px] border-[1px] border-gray-500 p-[8px] text-center text-[15px]">
            Ver reseña de pacientes
          </button>
          <Link href={`${lawyer.id}/reservar`}>
            <button className="mt-[24px] w-full rounded-[10px] bg-gray-700 py-[18px] text-center text-[15px] font-bold text-white">
              Reservar Turno
            </button>
          </Link>
          <Link href="/busqueda/cualquier-especialidad">
            <button className="mt-[14px] w-full rounded-[10px] bg-gray-700 py-[18px] text-center text-[15px] font-bold text-white">
              Volver
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default LawyerDetail;
