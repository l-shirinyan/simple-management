import PriorityTag from "./priority-tag";
import TimeIcon from "@/assets/icons/icon-time.svg";
import CommentIcon from "@/assets/icons/icon-comment.svg";
import Image from "next/image";
import { ICardInfo } from "@/types";

const BoardCard: React.FC<{ ticket: ICardInfo }> = ({ ticket }) => {
  const { priority, tag, title, assignee, date, comments } = ticket;
  return (
    <div className="pb-5">
      <div className="bg-white rounded-lg p-5">
        <div className="flex items-center gap-[10px]">
          <PriorityTag priority={priority} />
          <div className="rounded-2xl border-[0.5px] border-silver font-inter font-normal text-[10px]/[16px] text-slate-gray w-max px-[10px]">
            {tag}
          </div>
        </div>
        <h5 className="text-base/6 font-black text-slate-gray tracking-[-0.2px] py-[10px]">
          {title}
        </h5>
        <div className="mb-[10px] flex gap-2 flex-wrap pb-[10px]">
          {assignee.map(({ image, name }, idx) => {
            return (
              <div key={idx} className="flex gap-[5px] items-center">
                <Image
                  src={image}
                  alt="avatar"
                  width={24}
                  height={24}
                  className="size-6 rounded-full object-cover"
                />
                <span className="text-xs font-medium font-inter text-dark-blue">
                  {name}
                </span>
              </div>
            );
          })}
        </div>
        <div className="pt-[10px] border-t border-t-silver font-inter flex items-center justify-between">
          <div className="flex items-center gap-[6px] bg-[#f2f2f5] px-2 py-[2.6px] rounded-xl w-max">
            <TimeIcon />
            <div className="font-semibold text-[8px]/[10px] text-dark-blue">
              Due date: {date}
            </div>
          </div>
          <button className="flex gap-[5.3px] items-center text-sm text-slate-gray">
            <CommentIcon />
            <span>{comments}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
