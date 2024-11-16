"use client";
import { useParamsStore } from "@/hooks/useParamsStore";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  const setParams = useParamsStore((state) => state.setParams);
  const setSearchValue = useParamsStore((state) => state.setSearchValue);
  const searchValue = useParamsStore((state) => state.searchValue);
  function onChange(event: any) {
    setSearchValue(event.target.value);
  }
  function onSearch() {
    setParams({ searchTerm: searchValue });
  }
  return (
    <div className="flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm">
      <input
        type="text"
        placeholder="Search for cars by make, model or color"
        className="flex-grow pl-5 bg-transparent outline-none border-none focus:ring-0 focus:border-none text-sm text-gray-600"
        onChange={onChange}
        value={searchValue}
        onKeyDown={(e: any) =>{
            if (e.key === "Enter") {
                onSearch();
              }
        }}
      />
      <button onClick={onSearch} className="bg-red-400 text-white rounded-full p-2 cursor-pointer mr-2">
        <FaSearch size={20} />
      </button>
    </div>
  );
}