"use client";
import React from "react";
import WorkingBoard from "../project/working-board";
import FilterBoard from "../reusable/filter-board";
import { DateValueType } from "react-tailwindcss-datepicker";
import { useSearchParams } from "next/navigation";

const MainBoard = () => {
  const searchParams = useSearchParams();
  function updateSorting(sortOrder: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (sortOrder === "") {
      params.delete("search");
    } else {
      params.set("search", sortOrder);
    }

    window.history.pushState(null, "", `?${params.toString()}`);
  }
  function updateSortingDate(date: DateValueType) {
    const params = new URLSearchParams(searchParams.toString());
    if (date?.startDate === null) {
      params.delete("startDate");
      params.delete("endDate");
    } else {
      params.set("startDate", date?.startDate + "");
      params.set("endDate", date?.endDate + "");
    }

    window.history.pushState(null, "", `?${params.toString()}`);
  }
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSorting(event.target.value);
  };
  const handleValueChange = (newValue: DateValueType) => {
    if (newValue && typeof newValue !== "string") {
      updateSortingDate(newValue);
    } else {
      const date = {
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(11)),
      };
      updateSortingDate(date);
    }
  };
  return (
    <>
      <FilterBoard
        handleValueChange={handleValueChange}
        handleSearchChange={handleSearchChange}
      />
      <WorkingBoard />
    </>
  );
};

export default MainBoard;
