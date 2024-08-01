import { cn } from "@/utils/helpers";
import { ChangeEvent } from "react";

interface IInputField {
  label?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
}

const InputField: React.FC<IInputField> = ({
  name,
  label,
  className,
  defaultValue,
  ...props
}) => {
  return (
    <div className="form-group">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-bold text-slate-gray font-inter mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        className={cn(
          "border w-full border-gainsboro bg-ghost-white rounded-lg px-4 py-[9px] font-normal text-base placeholder:text-slate-gray text-dark-blue focus-visible:outline-light-silver",
          className
        )}
        defaultValue={defaultValue}
        {...props}
      />
    </div>
  );
};

export default InputField;
