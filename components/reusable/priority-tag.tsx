import FireIcon from "@/assets/icons/icon-fire.svg";
import FireHighIcon from "@/assets/icons/icon-fire-high.svg";

interface IPriority {
  priority: "low" | "medium" | "highest";
}

const PRIORITY_CLASSES = {
  low: "bg-pale-purple px-[10px] py-[2px] rounded-2xl w-max",
  medium: "bg-pale-purple px-[10px] py-[2px] rounded-2xl flex w-max",
  highest: "bg-[#feefef] px-[10px] py-[2px] rounded-2xl flex w-max",
};

const ICONS = {
  low: FireIcon,
  medium: FireIcon,
  highest: FireHighIcon,
};

const PriorityTag: React.FC<IPriority> = ({ priority }) => {
  const IconComponent = ICONS[priority];
  const boxClass = PRIORITY_CLASSES[priority];

  const iconCount = priority === "low" ? 1 : priority === "medium" ? 2 : 3;

  const renderIcons = () =>
    Array.from({ length: iconCount }).map((_, index) => (
      <IconComponent key={index} className="size-3" />
    ));

  return <div className={boxClass}>{renderIcons()}</div>;
};

export default PriorityTag;
