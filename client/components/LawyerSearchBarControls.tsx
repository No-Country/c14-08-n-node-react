"use client";

import { useState } from "react";

import { LawyerSearchBarControlsProps } from "@/types";

const LawyerSearchBarControls = ({
  selectedFormat,
  isExpress,
}: LawyerSearchBarControlsProps) => {
  const [formatIsOpen, setFormatIsOpen] = useState(false);
  return (
    <div className="flex gap-[10px]">
      <div className="relative">
        <div
          onClick={() => setFormatIsOpen(true)}
          className="cursor-pointer rounded-[5px] border border-gray-700 p-[7px]"
        >
          {!selectedFormat ? "Modalidad" : selectedFormat}
        </div>

        <div className="absolute bottom-[-20px] left-0">
          <div className="relative">
            <div
              className={`absolute rounded-[5px] border border-gray-700 bg-white p-[7px] ${
                formatIsOpen ? "z-40" : "z-0"
              }`}
            >
              <ul>
                <li onClick={() => setFormatIsOpen(false)}>Presencial</li>
                <li onClick={() => setFormatIsOpen(false)}>Remoto</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {formatIsOpen && (
        <div
          onClick={() => setFormatIsOpen(false)}
          className={`fixed left-0 top-0 z-10 h-screen w-screen bg-black ${
            formatIsOpen ? "z-30" : "z-0"
          }`}
        />
      )}
    </div>
  );
};

export default LawyerSearchBarControls;
