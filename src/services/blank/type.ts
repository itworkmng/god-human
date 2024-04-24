import dayjs from "dayjs";
import { Base } from "types";

export interface IBlank {
  id: number;
  name: string;
  is_select?: boolean;
}
export interface IBlankInput {
  id: number;
  name: string;
  is_select?: boolean;
  userId: number;
}

export interface TimeTableFormDb extends Base {
  date: Date;
  hour: number;
  minute: number;
  group_id: string;
}

export interface TimeTable {
  dates: dayjs.Dayjs[] | string[];
  times: string[];
  group_id: string;
}
