"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";

import { LawyerSearchControlProps } from "@/types";
import { useSearchParams, usePathname } from "next/navigation";

const LawyerSearchControlFormat = ({
  isOpen,
  setIsOpen,
  handleCloseControl,
  currentSelection,
}: LawyerSearchControlProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const expressSelection = searchParams.get("express");

  const [newSelection, setNewSelection] = useState("");

  useEffect(() => {
    if (currentSelection) {
      setNewSelection(currentSelection);
    } else {
      setNewSelection("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!currentSelection) {
      setNewSelection("");
    }
  }, [currentSelection]);

  const formatTitle = (title: string) => {
    if (title === "onsite") {
      return "Presencial";
    } else {
      return "Remoto";
    }
  };

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen("format")}
        className={`flex cursor-pointer items-center gap-1 rounded-[5px] border border-gray-700 px-[14px] py-[7px] ${
          isOpen ? "z-40" : "z-0"
        } ${
          (newSelection || currentSelection) &&
          "bg-gray-700 font-bold text-white"
        }`}
      >
        <>
          {newSelection
            ? formatTitle(newSelection)
            : !currentSelection
            ? "Modalidad"
            : formatTitle(currentSelection)}
          {(newSelection || currentSelection) && (
            <Link
              onClick={(e) => {
                e.stopPropagation();
                handleCloseControl;
              }}
              href={`${pathname}?${
                expressSelection ? `express=${expressSelection}` : ""
              }`}
            >
              <FaXmark />
            </Link>
          )}
        </>
      </div>
      {isOpen && (
        <div className="absolute bottom-[-20px] left-0">
          <div className="relative">
            <div
              className={`absolute rounded-[5px] border border-gray-700 bg-white px-[14px] py-[7px] ${
                isOpen ? "z-40" : "z-10"
              }`}
            >
              <label
                className={`flex cursor-pointer gap-3 ${
                  newSelection === "onsite" && "font-bold"
                }`}
              >
                <input
                  type="checkbox"
                  checked={newSelection === "onsite"}
                  onChange={() => setNewSelection("onsite")}
                  className="cursor-pointer"
                />
                Presencial
              </label>
              <label
                className={`flex cursor-pointer gap-3 ${
                  newSelection === "remote" && "font-bold"
                }`}
              >
                <input
                  type="checkbox"
                  checked={newSelection === "remote"}
                  onChange={() => setNewSelection("remote")}
                  className="cursor-pointer"
                />
                Remoto
              </label>
              <div className="mt-[20px] flex gap-[10px]">
                <button
                  type="button"
                  onClick={handleCloseControl}
                  className="flex-1 px-[24px] py-[10px]"
                >
                  Cancelar
                </button>
                <button
                  className={`disabled flex-1 rounded-[5px]  ${
                    !newSelection
                      ? "bg-gray-300 text-[#333333]"
                      : "bg-gray-700 font-bold text-white"
                  }`}
                >
                  <Link
                    onClick={() => setTimeout(() => handleCloseControl(), 200)}
                    href={`?format=${newSelection}`}
                    className="px-[24px] py-[10px]"
                  >
                    Confirmar
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyerSearchControlFormat;
