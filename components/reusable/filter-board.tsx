"use client";
import SearchIcon from "@/assets/icons/icon-search.svg";
import UserIcon from "@/assets/icons/icon-user.svg";
import SectorIcon from "@/assets/icons/icon-sector.svg";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import InputField from "./custom-input";
import DropDown from "./dropdown";
import { TAGS, USERS } from "@/utils/constant";
import { useMutationQuery } from "@/queries";
import { DateRange } from "@/types";
import { debounceFunc } from "@/utils/helpers";
const userOptions = USERS.map(({ name, id }) => {
  return { key: id, value: name };
});
const filterItems = [
  {
    options: userOptions,
    Icon: UserIcon,
    selectText: "Select assigneer",
    name: "users",
  },
  {
    options: TAGS,
    Icon: SectorIcon,
    selectText: "Select tags",
    name: "tags",
  },
];

interface IFilterBoard {
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: DateRange;
  handleValueChange: (newValue: DateValueType) => void;
}
const FilterBoard: React.FC<IFilterBoard> = ({
  handleSearchChange,
  handleValueChange,
  value,
}) => {
  const handle = debounceFunc(handleSearchChange, 500);
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
          onChange={handle}
        />
      </div>
      <div
        className="flex gap-[10px] flex-col lg:flex-row lg:h-[44px]"
        id="filter_options"
      >
        {filterItems.map(({ options, Icon, selectText, name }, idx) => (
          <DropDown
            key={idx}
            options={options}
            multi={true}
            selectText={selectText}
            name={name}
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
