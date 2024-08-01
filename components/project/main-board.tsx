"use client";
import React, { useState } from "react";
import { COLUMNS } from "@/utils/constant";
import { cn, debounceFunc } from "@/utils/helpers";
import WorkingBoard from "../project/working-board";
import FilterBoard from "../reusable/filter-board";
import { DateValueType } from "react-tailwindcss-datepicker";
import { DateRange } from "@/types";

const MainBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleValueChange = (newValue: DateValueType) => {
    if (newValue && typeof newValue !== "string") {
      setValue(newValue as DateRange);
    } else {
      setValue({
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(11)),
      });
    }
  };
  return (
    <>
      <FilterBoard
        value={value}
        handleValueChange={handleValueChange}
        handleSearchChange={handleSearchChange}
      />
      <div className="py-[30px] overflow-x-auto overflow-y-hidden">
        <div
          className="grid grid-cols-4 gap-[30px] min-w-[1200px] w-full"
          id="boards"
        >
          {COLUMNS.map(({ pointColor, title }, idx) => {
            return (
              <div
                key={idx}
                className="flex items-center gap-[10px] sticky top-0 bg-light-silver pb-5"
              >
                <div className={cn(pointColor, "size-4 rounded-full")}></div>
                <h5 className="text-sm font-black text-dark-blue">{title}</h5>
              </div>
            );
          })}
        </div>
        <WorkingBoard searchTerm={searchTerm} value={value} />
      </div>
    </>
  );
};

export default MainBoard;
