"use client";

import { useState } from "react";
import Link from "next/link";

import { FaMagnifyingGlass } from "react-icons/fa6";

import { SearchBarList } from ".";

const LawyerSearchBar = ({ initialQueryId }: { initialQueryId: string }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [query, setQuery] = useState({
    string: initialQueryId.replace("-", " "),
    id: "",
  });

  return (
    <>
      <div className="main-container">
        <div className="z-20 mt-[46px] flex items-center justify-center gap-[34px] rounded-[12px] bg-gray-700 px-[40px] py-[13px]">
          <FaMagnifyingGlass className="text-white" />
          <div className="flex w-full gap-[34px] max-lg:flex-col">
            <input
              onFocus={() => setIsEditing(true)}
              onBlur={() => setIsEditing(false)}
              value={query.string}
              onChange={(e) =>
                setQuery({
                  id: "",
                  string: e.target.value,
                })
              }
              className="flex-1 rounded-[5px] bg-white px-[15px]"
            />
            {/* <div className="absolute bottom-[-20px] w-full">
            <SearchBarList query={query} setQuery={setQuery} />
          </div> */}
            <Link
              href={`?category=${
                query.id ? query.id : query.string.replace(" ", "-")
              }`}
              className="max-md:min-w-full"
            >
              <button className="h-[58px] w-full rounded-[8px] bg-gray-400 text-[20px] font-bold text-black max-md:h-[48px] max-md:py-0 max-sm:text-[16px] max-xs:h-[30px] max-xs:text-[14px] md:px-[120px]">
                Buscar
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* {isEditing && (
          <div className="fixed top-0 z-10 h-screen w-screen bg-gray-300"></div>
        )} */}
    </>
  );
};

export default LawyerSearchBar;
