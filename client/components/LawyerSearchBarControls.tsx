"use client";

import { useState } from "react";

import { IInitialControlState, LawyerSearchBarControlsProps } from "@/types";
import { LawyerSearchControlFormat } from ".";

const initialControlState: IInitialControlState = {
  format: false,
};

const LawyerSearchBarControls = ({
  selectedFormat,
  isExpress,
}: LawyerSearchBarControlsProps) => {
  const [controlIsOpen, setControlIsOpen] = useState(initialControlState);

  const modalIsOpen = Object.values(controlIsOpen).some(
    (value) => value === true,
  );

  const handleOpenControl = (key: string) => {
    setControlIsOpen((prevState) => ({ ...prevState, [key]: true }));
  };

  const handleCloseControl = () => {
    setControlIsOpen(initialControlState);
  };

  return (
    <div className="flex gap-[10px]">
      <LawyerSearchControlFormat
        isOpen={controlIsOpen.format}
        setIsOpen={handleOpenControl}
        handleCloseControl={handleCloseControl}
        currentSelection={selectedFormat ? selectedFormat : ""}
      />
      {modalIsOpen && (
        <div
          onClick={() => setControlIsOpen(initialControlState)}
          className={`fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-30 ${
            modalIsOpen ? "z-30" : "z-10"
          }`}
        />
      )}
    </div>
  );
};

export default LawyerSearchBarControls;
