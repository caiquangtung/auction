import React from "react";
import Heading from "./Heading";
import { useParamsStore } from "@/hooks/useParamsStore";
import { FaTimes } from "react-icons/fa"; 

type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
};

export default function EmptyFilter({
  title = "No matches for this filter",
  subtitle = "Try changing or resetting the filter",
  showReset = false,
}: Props) {
  const reset = useParamsStore(state => state.reset);
  return (
    <div className="h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg">
      <Heading title={title} subtitle={subtitle} center />
      {showReset && (
        <button onClick={reset} className="mt-4 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded">
          <FaTimes className="h-4 w-4" /> 
          Remove Filters
        </button>
      )}
    </div>
  );
}
