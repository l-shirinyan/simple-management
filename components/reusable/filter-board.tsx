"use client";
import SearchIcon from "@/assets/icons/icon-search.svg";
import UserIcon from "@/assets/icons/icon-user.svg";
import SectorIcon from "@/assets/icons/icon-sector.svg";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import InputField from "./custom-input";
import DropDown from "./dropdown";
import { TAGS, USERS } from "@/utils/constant";
import { debounceFunc } from "@/utils/helpers";
import { useQueryParams } from "@/hooks/useQueryParams";
import CloseIcon from "@/assets/icons/icon-delete.svg";
import { useSearchParams } from "next/navigation";
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
  handleValueChange: (newValue: DateValueType) => void;
}
const FilterBoard: React.FC<IFilterBoard> = ({
  handleSearchChange,
  handleValueChange,
}) => {
  const handle = debounceFunc(handleSearchChange, 700);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const removeSearchParams = () => {
    params.delete("search");
    window.history.pushState(null, "", `?${params.toString()}`);
  };
  const { startDate, endDate, searchTerm } = useQueryParams();
  return (
    <div className="bg-white shadow-dark rounded-[10px] px-[14px] py-3 flex justify-between lg:items-center flex-col lg:flex-row gap-[10px]">
      <div className="relative">
        <div className="absolute h-full flex items-center left-[18px]">
          <SearchIcon className="" />
        </div>
        <InputField
          key={searchTerm}
          placeholder="Search procedure"
          className="pl-[51px] min-w-[300px]"
          name="search"
          onChange={handle}
          defaultValue={searchTerm as string}
        />
        <button
          onClick={removeSearchParams}
          className="absolute h-full flex items-center right-[18px] top-0 size-5 text-gray-400"
        >
          <CloseIcon className="" />
        </button>
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
            hideArrow={true}
          />
        ))}
        <div className="datepicker">
          <Datepicker
            value={{ startDate, endDate }}
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
