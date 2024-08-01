export interface IOption {
  key: string | number;
  value: string;
  icon?: string;
}
export interface ICardInfo {
  id: number;
  title: string;
  content: string;
  type: string;
  priority: "low" | "medium" | "high";
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  users?: IUser[];
  author: IAuthor;
  tags?: ITags[];
}
export interface IUser {
  taskId: number;
  userId: number;
  name?: string;
  id: number;
  key: string;
}
export interface IAuthor {
  id: number;
  email: string;
  name: string;
}
export interface ITags {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  value: string;
}
export enum TimeOfDay {
  StartOfDay = "startOfDay",
  EndOfDay = "endOfDay",
}
export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}
