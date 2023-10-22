"use client";

import { useState } from "react";
import Link from "next/link";

import { SearchBarList } from ".";

import { formatQueryString } from "@/utils/format";

const HomeSearchBar = () => {
  const [query, setQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="mt-[42px] flex w-full gap-[34px] max-md:flex-col max-md:items-center max-xs:mt-[20px] max-xs:gap-[10px]">
      <div className="flex h-[58px] w-full flex-1 items-center rounded-[15px] bg-white/[.5] py-[10px] max-md:py-[0] ">
        <button className="ml-[15px] rounded-[8px] bg-gray-300 px-[40px] py-[12px] text-[15px] font-medium text-black max-md:hidden">
          Más cercanos
        </button>
        <div className="relative flex h-full flex-1 items-center">
          <input
            value={query}
            onFocus={() => setIsEditing(true)}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => setTimeout(() => setIsEditing(false), 100)}
            type="text"
            size={1}
            className="w-full px-[15px] text-[15px] font-bold text-black max-md:h-[48px] max-xs:h-[30px]"
          />
          {isEditing && (
            <div className="absolute bottom-[-20px] w-full">
              <SearchBarList query={query} setQuery={setQuery} />
            </div>
          )}
        </div>
      </div>
      <Link
        href={`/busqueda/${
          query ? formatQueryString(query) : "cualquier-especialidad"
        }`}
        className="max-md:min-w-full"
      >
        <button className="h-[58px] w-full rounded-[8px] bg-gray-400 text-[20px] font-bold text-black max-md:h-[48px] max-md:py-0 max-sm:text-[16px] max-xs:h-[30px] max-xs:text-[14px] md:px-[120px]">
          Buscar
        </button>
      </Link>
    </div>
  );
};

export default HomeSearchBar;
