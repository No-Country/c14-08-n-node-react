"use client";

import { useState, useEffect } from "react";
import { requestSearch } from "@/services/search";

import { LawyerCard } from ".";

import { ILawyer, LawyerListProps } from "@/types";

import { unformatQueryString } from "@/utils/format";

const LawyerList = ({
  selectedCategory,
  selectedFormat,
  isExpress,
}: LawyerListProps) => {
  const [lawyers, setLawyers] = useState<ILawyer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const unformattedSelectedCategory = unformatQueryString(selectedCategory);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      const queryParams: string[] = [];

      if (selectedCategory && selectedCategory !== "cualquier-especialidad") {
        queryParams.push(`name=${unformattedSelectedCategory}`);
      }

      if (selectedFormat === "onsite" || selectedFormat === "remote") {
        queryParams.push(`type=${selectedFormat}`);
      }

      const queryString =
        queryParams.length > 0 ? "?" + queryParams.join("&") : "";

      console.log(queryString);

      const { data } = await requestSearch(queryString);

      setLawyers(data);
      setIsLoading(false);
    })();
  }, [unformattedSelectedCategory, selectedFormat]);

  return (
    <div className="main-container my-[46px] grid grid-cols-2 gap-[10px] max-md:flex max-md:flex-col">
      {!isLoading && (
        <>
          {lawyers.map((lawyer) => (
            <LawyerCard key={lawyer.id} {...lawyer} />
          ))}
        </>
      )}
    </div>
  );
};

export default LawyerList;
