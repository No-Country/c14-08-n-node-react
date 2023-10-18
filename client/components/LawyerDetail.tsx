"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { LawyerRating } from ".";

import { ILawyer } from "@/types";

import DUMMY_LAWYERS from "@/data/lawyers.json";

const LawyerDetail = () => {
  const [lawyer, setLaywer] = useState<ILawyer | null>(null);

  useEffect(() => {}, []);

  return (
    <div className="main-container">
      <h1 className="mb-[10px] mt-[35px] text-[18px]">Conocé un poco más a</h1>
      <div className="flex justify-end">{lawyer?.rating}</div>
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
          <p className="text-center text-[18px] font-bold">Full Name</p>
        </div>
        <p className="mt-[5px] text-[15px]">Specialty</p>
      </div>
      <div className="flex justify-between">
        <div>
          <p className="text-center">Consulta plus</p>
          <p className="text-center">$5000</p>
        </div>
        <div>
          <p className="text-center">Consulta básica</p>
          <p className="text-center">$5000</p>
        </div>
      </div>
      <p className="mt-[42px] text-[15px] font-bold">Se destaca en</p>
      <p className="mt-[26px]">{lawyer?.description}</p>
      <button className="mt-[20px] w-full rounded-[8px] border-[1px] border-gray-500 p-[8px] text-center text-[15px]">
        Ver reseña de pacientes
      </button>
      <button className="mt-[24px] w-full rounded-[10px] bg-gray-700 py-[18px] text-center text-[15px] font-bold text-white">
        Reservar Turno
      </button>
      <Link href="/busqueda">
        <button className="mt-[14px] w-full rounded-[10px] bg-gray-700 py-[18px] text-center text-[15px] font-bold text-white">
          Volver
        </button>
      </Link>
    </div>
  );
};

export default LawyerDetail;
