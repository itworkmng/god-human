import { atom } from "jotai";
import { FilterDeadline } from "types";
import { calculateDeadlineDate, calculatePreviousDeadline } from "utils/index";

export interface DashboardFilterType {
  deadline: FilterDeadline;
  start_date?: Date;
  end_date?: Date;
  full_date?: any[];
  pre_full_date?: any[];
  type: string;
  limit: number;
}

export const atomFormDashboard = atom<DashboardFilterType>({
  deadline: FilterDeadline.Month,
  full_date: calculateDeadlineDate(FilterDeadline.Month),
  pre_full_date: calculatePreviousDeadline(
    FilterDeadline.Month,
    calculateDeadlineDate(FilterDeadline.Month)
  ),
  type: "day",
  limit: 10,
});

export const atomSelectedProduct = atom<{
  id?: number;
}>({});
