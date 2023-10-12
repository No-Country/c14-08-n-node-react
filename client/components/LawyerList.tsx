"use client";

import { useState, useEffect } from "react";

import { LawyerCard } from ".";

import { ILawyer } from "@/types";

import DUMMY_LAWYERS from "@/data/laywers.json";

const LawyerList = () => {
  const [laywers, setLawyers] = useState<ILawyer[]>([]);

  useEffect(() => {
    setLawyers(DUMMY_LAWYERS);
  }, []);

  return (
    <div className="main-container my-[46px] flex flex-col gap-[10px]">
      {laywers.map((laywer) => (
        <LawyerCard key={laywer.id} {...laywer} />
      ))}
    </div>
  );
};

export default LawyerList;
