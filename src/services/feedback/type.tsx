import { Customer } from "service/client/types";
import { PaginationResponse } from "types";

export interface IFeedback {
  customer: Customer;
  feedback: string;
}
export interface IFeedbackList {
  list: PaginationResponse<IFeedback>;
}
