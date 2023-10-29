"use client";

import { useState, useEffect } from "react";

import { LawyerCard } from ".";

import { ILawyer, LawyerListProps } from "@/types";

import DUMMY_LAWYERS from "@/data/lawyers.json";
import { unformatQueryString } from "@/utils/format";

const LawyerList = ({
  selectedCategory,
  selectedFormat,
  isExpress,
}: LawyerListProps) => {
  const [lawyers, setLawyers] = useState<ILawyer[]>([]);

  const unformattedSelectedCategory = unformatQueryString(selectedCategory);

  useEffect(() => {
    let filteredLawyers = DUMMY_LAWYERS;

    if (selectedCategory !== "cualquier-especialidad") {
      filteredLawyers = DUMMY_LAWYERS.filter((lawyer) =>
        lawyer.categoryStrings.some((c) =>
          c.includes(unformattedSelectedCategory),
        ),
      );
    }

    if (selectedFormat === "onsite" || selectedFormat === "remote") {
      filteredLawyers = filteredLawyers.filter(
        (lawyer) => lawyer[selectedFormat],
      );
    }

    setLawyers(filteredLawyers);
  }, [selectedCategory, selectedFormat]);

  return (
    <div className="main-container my-[46px] grid grid-cols-2 gap-[10px] max-md:flex max-md:flex-col">
      {lawyers.map((laywer) => (
        <LawyerCard key={laywer.id} {...laywer} />
      ))}
    </div>
  );
};

export default LawyerList;
