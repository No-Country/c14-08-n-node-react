import React from "react";

interface SpinnerProps {
  className?: string;
}

const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div
      className={`h-12 w-12 animate-spin rounded-full
border-2 border-solid border-black border-t-transparent ${className}`}
    />
  );
};

export default Spinner;
