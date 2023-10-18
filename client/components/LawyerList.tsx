"use client";

import { useState, useEffect } from "react";

import { LawyerCard } from ".";

import { ILawyer } from "@/types";

import DUMMY_LAWYERS from "@/data/lawyers.json";

const LawyerList = () => {
  const [lawyers, setLawyers] = useState<ILawyer[]>([]);

  useEffect(() => {
    setLawyers(DUMMY_LAWYERS);
  }, []);

  return (
    <div className="main-container my-[46px] grid grid-cols-2 gap-[10px] max-md:flex max-md:flex-col">
      {lawyers.map((laywer) => (
        <LawyerCard key={laywer.id} {...laywer} />
      ))}
    </div>
  );
};

export default LawyerList;
