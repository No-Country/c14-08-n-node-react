"use client";

import { useState, useEffect } from "react";
import { requestSearch } from "@/services/search";

import { LawyerCard } from ".";

import { ILawyer, LawyerListProps } from "@/types";

import { unformatQueryString } from "@/utils/format";
import { Spinner } from ".";

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

      const { data } = await requestSearch(queryString);

      setLawyers(data);
      setIsLoading(false);
    })();
  }, [unformattedSelectedCategory, selectedFormat]);

  return (
    <div className="main-container relative my-[46px] grid min-h-screen grid-cols-2 gap-[10px] max-md:flex max-md:flex-col">
      {isLoading && (
        <Spinner className="absolute left-0 right-0 top-0 m-auto" />
      )}
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
