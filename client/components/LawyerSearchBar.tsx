"use client";

import { useState, useLayoutEffect } from "react";
import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";

import { SearchBarList, LawyerSearchBarControls } from ".";

import { LawyerSearchBarProps } from "@/types";
import { unformatQueryString, formatQueryString } from "@/utils/format";
import { checkAuth } from "@/utils/checkAuth";

const LawyerSearchBar = ({
  selectedCategory,
  selectedFormat,
  isExpress,
}: LawyerSearchBarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  useLayoutEffect(() => {
    const redirect = checkAuth(pathname.split("/")[1]);
    if (redirect.length > 0) {
      router.push(redirect);
    }
  }, []);

  const unformattedSelectedCategory = unformatQueryString(selectedCategory);

  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(unformattedSelectedCategory);

  return (
    <>
      <div className="main-container">
        <div className="relative mb-[23px] mt-[46px] h-[58px] py-[6px]">
          <div className="absolute top-0 z-20 flex h-full w-full items-center justify-center gap-[34px] rounded-[12px] bg-gray-700 px-[12px]">
            <div className="absolute bottom-[-20px] w-full">
              {isEditing && (
                <SearchBarList
                  query={editingValue}
                  setQuery={setEditingValue}
                  setIsEditing={setIsEditing}
                  isLinkList={true}
                />
              )}
            </div>
            <div className="flex w-full min-w-0 gap-[34px]">
              <input
                type="text"
                onFocus={() => setIsEditing(true)}
                value={isEditing ? editingValue : unformattedSelectedCategory}
                onChange={(e) => setEditingValue(e.target.value)}
                className="lawyer-search"
              />
              <Link
                onClick={() => {
                  setTimeout(() => setIsEditing(false), 200);
                }}
                href={`/busqueda/${
                  editingValue.length === 0
                    ? "cualquier-especialidad"
                    : formatQueryString(editingValue)
                }`}
              >
                <button className="w-full rounded-full bg-gray-400 p-[10px] text-[20px] font-bold  text-black  max-sm:text-[16px] max-xs:text-[14px]">
                  <FaMagnifyingGlass className="text-gray-700" />
                </button>
              </Link>
            </div>
          </div>
        </div>
        <LawyerSearchBarControls selectedFormat={selectedFormat} />

        {isEditing && (
          <div
            onClick={() => {
              setEditingValue(unformattedSelectedCategory);
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
