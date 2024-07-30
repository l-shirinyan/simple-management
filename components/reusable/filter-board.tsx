"use client";
import SearchIcon from "@/assets/icons/icon-search.svg";
import UserIcon from "@/assets/icons/icon-user.svg";
import SectorIcon from "@/assets/icons/icon-sector.svg";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { useState } from "react";
import InputField from "./custom-input";
import DropDown from "./dropdown";
import { TAGS, USERS } from "@/utils/constant";
const userOptions = USERS.map(({ name, id }) => {
  return { key: id, value: name };
});
const filterItems = [
  {
    options: userOptions,
    Icon: UserIcon,
    selectText: "Select assigneer",
  },
  {
    options: TAGS,
    Icon: SectorIcon,
    selectText: "Select tags",
  },
];

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

const FilterBoard = () => {
  const [value, setValue] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

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
    <div className="bg-white shadow-dark rounded-[10px] px-[14px] py-3 flex justify-between lg:items-center flex-col lg:flex-row gap-[10px]">
      <div className="relative">
        <div className="absolute h-full flex items-center left-[18px]">
          <SearchIcon className="" />
        </div>
        <InputField
          placeholder="Search procedure"
          className="pl-[51px] min-w-[300px]"
          name="search"
        />
      </div>
      <div
        className="flex gap-[10px] flex-col lg:flex-row lg:h-[44px]"
        id="filter_options"
      >
        {filterItems.map(({ options, Icon, selectText }, idx) => (
          <DropDown
            key={idx}
            options={options}
            multi={true}
            selectText={selectText}
            name="search"
            Icon={() => <Icon />}
          />
        ))}
        <div className="datepicker">
          <Datepicker
            value={value}
            placeholder="Select Date"
            primaryColor="indigo"
            containerClassName="[&_button]:top-0 relative"
            inputClassName="date_input whitespace-nowrap py-[9px] bg-ghost-white text-sm/6 font-medium text-slate-gray font-inter flex items-center gap-2 border border-lavender-gray rounded-lg pl-3 pr-[18px] focus-visible:outline-light-silver w-full"
            onChange={handleValueChange}
            maxDate={new Date()}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBoard;
