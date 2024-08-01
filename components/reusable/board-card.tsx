import PriorityTag from "./priority-tag";
import TimeIcon from "@/assets/icons/icon-time.svg";
import CommentIcon from "@/assets/icons/icon-comment.svg";
import { ICardInfo, IUser } from "@/types";
import moment from "moment";
import UserIcon from "@/assets/icons/icon-user-profile.svg";
import { cn, getRandomColor } from "@/utils/helpers";
import { COLOR_PALETTE } from "@/utils/constant";
const BoardCard: React.FC<{ ticket: ICardInfo; userData?: IUser[] }> = ({
  ticket,
  userData,
}) => {
  const { priority, tags, title, users, createdAt } = ticket;
  const priorityTag = priority;
  const userIds = users && users.map((user) => user.userId);
  const filteredUserData =
    userData && userData.filter((user) => userIds?.includes(user.id));
  return (
    <div className="pb-5">
      <div className="bg-white rounded-lg p-5">
        <div className="flex items-center gap-[10px]">
          <PriorityTag priority={priorityTag} />
          <div className="flex gap-2 flex-wrap">
            {tags?.map(({ name, id }) => {
              return (
                <div
                  key={id}
                  className="rounded-2xl border-[0.5px] border-silver font-inter font-normal text-[10px]/[16px] text-slate-gray w-max px-[10px]"
                >
                  {name}
                </div>
              );
            })}
          </div>
        </div>
        <h5
          className="text-base/6 font-black text-slate-gray tracking-[-0.2px] py-[10px]"
          id="ticket-item"
        >
          {title}
        </h5>
        <div className="mb-[10px] flex gap-2 flex-wrap pb-[10px]">
          {filteredUserData?.map(({ name, id }, idx) => {
            const index = idx % 2;
            return (
              <div key={id} className="flex gap-[5px] items-center">
                <UserIcon className={cn("size-6", COLOR_PALETTE[index])} />
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
              Due date: {moment(createdAt).format("DD/MM/YY")}
            </div>
          </div>
          <button className="flex gap-[5.3px] items-center text-sm text-slate-gray">
            <CommentIcon />
            <span>1</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
