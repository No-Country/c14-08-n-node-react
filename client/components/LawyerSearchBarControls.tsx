"use client";

import { useState } from "react";

import { LawyerSearchBarControlsProps } from "@/types";

const LawyerSearchBarControls = ({
  selectedFormat,
  isExpress,
}: LawyerSearchBarControlsProps) => {
  const [formatIsOpen, setFormatIsOpen] = useState(false);
  const [currentSelection, setCurrentSelection] = useState("");

  return (
    <div className="flex gap-[10px]">
      <div className="relative">
        <div
          onClick={() => setFormatIsOpen(true)}
          className={`cursor-pointer rounded-[5px] border border-gray-700 px-[14px] py-[7px] ${
            formatIsOpen ? "z-40" : "z-0"
          }`}
        >
          {!selectedFormat ? "Modalidad" : selectedFormat}
        </div>
        {formatIsOpen && (
          <div className="absolute bottom-[-20px] left-0">
            <div className="relative">
              <div
                className={`absolute rounded-[5px] border border-gray-700 bg-white px-[14px] py-[7px] ${
                  formatIsOpen ? "z-40" : "z-10"
                }`}
              >
                <form onSubmit={() => {}}>
                  <label className="flex gap-3">
                    <input
                      type="checkbox"
                      checked={currentSelection === "onsite"}
                      onChange={() => setCurrentSelection("onsite")}
                    />
                    Presencial
                  </label>
                  <label className="flex gap-3">
                    <input
                      type="checkbox"
                      checked={currentSelection === "remote"}
                      onChange={() => setCurrentSelection("remote")}
                    />
                    Remoto
                  </label>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      {formatIsOpen && (
        <div
          onClick={() => setFormatIsOpen(false)}
          className={`fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-30 ${
            formatIsOpen ? "z-30" : "z-10"
          }`}
        />
      )}
    </div>
  );
};

export default LawyerSearchBarControls;
