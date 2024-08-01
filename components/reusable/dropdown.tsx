import { FC, SVGProps, useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { cn } from "@/utils/helpers";
import CheckIcon from "@/assets/icons/icon-check.svg";
import { IOption } from "@/types";

interface IDropDown {
  options: { key: string | number; value: string; icon?: string }[];
  label?: string;
  multi?: boolean;
  selectText?: string;
  Icon?: FC<SVGProps<SVGElement>>;
  name: string;
  onChange?: ({
    name,
    value,
  }: {
    name: string;
    value: IOption | IOption[] | number | string;
  }) => void;
}

const isArray = (value: IOption[] | IOption): value is IOption[] =>
  Array.isArray(value);

const DropDown: React.FC<IDropDown> = ({
  options,
  label,
  multi = false,
  selectText = "Select options",
  Icon,
  name,
  onChange,
}) => {
  const [selected, setSelected] = useState<IOption[] | IOption>(
    multi ? [] : options[0]
  );

  const handleSelection = (option: IOption) => {
    if (multi) {
      const getValue = () => {
        const prevArray = isArray(selected) ? selected : [];
        const isSelected = prevArray.some(
          (selected) => selected.key === option.key
        );
        if (isSelected) {
          return prevArray.filter((item) => item.key !== option.key);
        } else {
          return [...prevArray, option];
        }
      };
      setSelected((prev) => {
        const prevArray = isArray(prev) ? prev : [];
        const isSelected = prevArray.some((item) => item.key === option.key);
        if (isSelected) {
          return prevArray.filter((item) => item.key !== option.key);
        } else {
          return [...prevArray, option];
        }
      });
      onChange && onChange({ name, value: getValue() });
    } else {
      setSelected(option);
      onChange && onChange({ name, value: option.key });
    }
  };
  return (
    <Listbox as="div" className="dropdown">
      <div>
        {label && (
          <Label className="block text-sm font-medium text-slate-gray font-inter">
            {label}
          </Label>
        )}
        <div className="relative">
          <ListboxButton className="flex items-center gap-2 relative border cursor-default rborder w-full border-gainsboro bg-ghost-white rounded-lg px-3 py-[11px] font-normal text-base placeholder:text-slate-gray text-slate-gray focus-visible:outline-light-silver6">
            <span className="flex items-center">
              {isArray(selected) && selected.length > 0 ? (
                <span className="flex flex-wrap gap-1">
                  {selected.map(({ icon, value }, idx) => (
                    <span key={value} className="flex items-center">
                      {icon && (
                        <span
                          className={cn("block size-3 rounded-full", icon)}
                        ></span>
                      )}
                      <span
                        className="block truncate font-medium font-inter text-sm"
                        id={"dropdown_" + name}
                      >
                        {value}
                        {selected.length - 1 !== idx && ","}
                      </span>
                    </span>
                  ))}
                </span>
              ) : (
                <>
                  {(selected as IOption).icon && (
                    <span
                      className={cn(
                        "block size-3 rounded-full mr-2",
                        (selected as IOption).icon
                      )}
                    ></span>
                  )}
                  <span
                    className="text-slate-gray font-medium text-sm font-inter"
                    id={"dropdown_" + name}
                  >
                    {multi ? selectText : (selected as IOption).value}
                  </span>
                </>
              )}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"></span>
            {Icon && (
              <div className="mr-[6px]">
                <Icon />
              </div>
            )}
          </ListboxButton>
          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
          >
            {options.map(({ key, value, icon }) => (
              <ListboxOption
                key={key}
                value={{ key, value, icon }}
                as="div"
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                onClick={() => handleSelection({ key, value, icon })}
              >
                <div className="flex items-center">
                  {icon && (
                    <span
                      className={cn("block size-3 rounded-full mr-2", icon)}
                    ></span>
                  )}
                  <span className="block truncate font-normal group-data-[selected]:font-semibold">
                    {value}
                  </span>
                </div>
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white">
                  {isArray(selected) &&
                    selected.some((item) => item.key === key) && (
                      <CheckIcon className="h-5 w-5 text-indigo-600 [&_path]:stroke-2 group-hover:text-white" />
                    )}
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </div>
    </Listbox>
  );
};

export default DropDown;
