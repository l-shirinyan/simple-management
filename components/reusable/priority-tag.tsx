import FireIcon from "@/assets/icons/icon-fire.svg";
import FireHighIcon from "@/assets/icons/icon-fire-high.svg";
import { PRIORITY_CLASSES } from "@/utils/constant";

interface IPriority {
  priority: "low" | "medium" | "high";
}

const ICONS = {
  low: FireIcon,
  medium: FireIcon,
  high: FireHighIcon,
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
