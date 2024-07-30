import React from "react";
import { COLUMNS } from "@/utils/constant";
import { cn } from "@/utils/helpers";
import WorkingBoard from "../project/working-board";

const MainBoard = () => {
  return (
    <>
      <div className="grid grid-cols-4 gap-[30px] min-w-[1200px] w-full">
        {COLUMNS.map(({ pointColor, title }, idx) => {
          return (
            <div
              key={idx}
              className="flex items-center gap-[10px] sticky top-0 bg-light-silver pb-5"
            >
              <div className={cn(pointColor, "size-4 rounded-full")}></div>
              <h5 className="text-sm font-black text-dark-blue">{title}</h5>
            </div>
          );
        })}
      </div>
      <WorkingBoard />
    </>
  );
};

export default MainBoard;
