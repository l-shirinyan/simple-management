export interface ICardInfo {
  priority: "low" | "medium" | "highest";
  tag: string;
  title: string;
  assignee: { name: string; image: string }[];
  date: string;
  comments: number;
  type: "todo" | "doing" | "done" | "waiting";
  id: string;
}

export interface IOption {
  key: string | number;
  value: string;
  icon?: string;
}
