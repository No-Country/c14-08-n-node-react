"use client";

import { useState } from "react";
import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { SearchBarList } from ".";
import { LawyerSearchBarProps } from "@/types";

const LawyerSearchBar = ({
  initialQueryId,
  selectedCategory,
  selectedFormat,
  isExpress,
}: LawyerSearchBarProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState("");

  const [query, setQuery] = useState({
    string: initialQueryId.replace("-", " "),
    id: "",
  });

  return (
    <>
      <div className="main-container">
        <div className="relative my-[46px] h-[58px] py-[6px]">
          <div className="absolute top-0 z-20 flex h-full w-full items-center justify-center gap-[34px] rounded-[12px] bg-gray-700 px-[12px]">
            <div className="absolute bottom-[-20px] w-full">
              {isEditing && (
                <SearchBarList
                  query={query}
                  setQuery={setQuery}
                  setIsEditing={setIsEditing}
                  isLinkList={true}
                  selectedCategory={selectedCategory}
                  selectedFormat={selectedFormat}
                  isExpress={isExpress}
                />
              )}
            </div>
            <div className="flex w-full min-w-0 gap-[34px]">
              <input
                onFocus={() => setIsEditing(true)}
                value={query.string}
                onChange={(e) =>
                  setQuery({
                    id: "",
                    string: e.target.value,
                  })
                }
                className="flex-1 rounded-[5px] bg-white px-[15px]"
              />
              <Link
                href={`?category=${
                  query.id ? query.id : query.string.replace(" ", "-")
                }`}
              >
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-full rounded-full bg-gray-400 p-[10px] text-[20px] font-bold  text-black  max-sm:text-[16px] max-xs:text-[14px]"
                >
                  <FaMagnifyingGlass className="text-gray-700" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {isEditing && (
          <div
            onClick={() => {
              setQuery({
                string: initialQueryId.replace("-", " "),
                id: "",
              });
              setIsEditing(false);
            }}
            className="bg-search fixed left-0 top-0 z-10 h-screen w-screen"
          />
        )}
      </div>
    </>
  );
};

export default LawyerSearchBar;
