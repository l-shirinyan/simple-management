import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { COLOR_PALETTE } from "./constant";
import moment from "moment";
import { ICardInfo, TimeOfDay } from "@/types";
import { useSearchParams } from "next/navigation";

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));
export const transformCreateTicketData = (values: ICardInfo) => {
  return {
    ...values,
    tags: values.tags?.map((tag) => ({
      name: tag.value,
    })),
    users: values.users?.map((user) => ({
      userId: user.key,
    })),
  };
};
export function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * COLOR_PALETTE.length);
  return COLOR_PALETTE[randomIndex];
}

export const convertToISODateUTC = (
  dateString: Date | null | string,
  timeOfDay: TimeOfDay = TimeOfDay.StartOfDay
): string => {
  let date = moment.utc(dateString, moment.ISO_8601);

  if (timeOfDay === TimeOfDay.EndOfDay) {
    date = date.endOf("day");
  } else {
    date = date.startOf("day");
  }

  return date.toISOString();
};
export const debounceFunc = <T extends any[]>(
  func: (...args: T) => void,
  timeout = 300
) => {
  let timer: NodeJS.Timeout | null;
  return (...args: T) => {
    clearTimeout(timer!);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};
