export type GoalType = "checkboxes" | "yesno";

export interface Goal {
  id: string;
  type: GoalType;
  title: string;
  description: string;
  completed?: boolean;
  value?: number; // 0-5 for checkboxes
}

export const DAYS = [
  { day: "18", dow: "Tu" },
  { day: "19", dow: "Wed" },
  { day: "20", dow: "Thur" },
  { day: "21", dow: "Fri", active: true },
  { day: "22", dow: "Sat" },
  { day: "23", dow: "Sun" },
  { day: "24", dow: "Mon" },
];
