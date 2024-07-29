"use client";
import SearchIcon from "@/assets/icons/icon-search.svg";
import UserIcon from "@/assets/icons/icon-user.svg";
import SectorIcon from "@/assets/icons/icon-sector.svg";
import Datepicker from "react-tailwindcss-datepicker";
import { useState } from "react";

const filterItems = [
  {
    text: "Joe Regan",
    Icon: UserIcon,
  },
  {
    text: "Réseau, Design, Informatique",
    Icon: SectorIcon,
  },
];
const FilterBoard = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <div className="bg-white shadow-dark rounded-[10px] px-[14px] py-3 flex justify-between lg:items-center flex-col lg:flex-row gap-[10px] lg:gap-0">
      <div className="relative">
        <div className="absolute h-full flex items-center left-[18px]">
          <SearchIcon className="" />
        </div>
        <input
          placeholder="Search procedure"
          className="border w-full min-w-[300px] border-gainsboro bg-ghost-white rounded-lg pl-[51px] pr-4 py-[9px] font-normal text-base placeholder:text-slate-gray text-dark-blue focus-visible:outline-light-silver"
        />
      </div>
      <div className="flex gap-[10px] flex-col lg:flex-row">
        {filterItems.map(({ text, Icon }) => {
          return (
            <button
              key={text}
              className="whitespace-nowrap bg-ghost-white text-sm/6 font-medium text-slate-gray font-inter flex items-center gap-2 border border-lavender-gray rounded-lg pl-3 pr-[18px] py-[9px]"
            >
              {text}
              <Icon />
            </button>
          );
        })}
        <Datepicker
          value={value}
          placeholder="Select Date"
          primaryColor="indigo"
          containerClassName="[&_button]:top-0 relative"
          inputClassName="whitespace-nowrap py-3 bg-ghost-white text-sm/6 font-medium text-slate-gray font-inter flex items-center gap-2 border border-lavender-gray rounded-lg pl-3 pr-[18px] focus-visible:outline-light-silver"
          onChange={handleValueChange}
        />
      </div>
    </div>
  );
};

export default FilterBoard;
