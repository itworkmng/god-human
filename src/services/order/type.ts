import { IBlank } from "service/blank/type";
import { IClient } from "service/client/type";
import { Base } from "types";
import { E_BLANK, E_PAY_STATUS } from "utils/typdef";
export enum PaymentChannel {
  qpay = "qpay",
  socialPay = "socialpay",
  bankTransfer = "banktransfer",
}
export enum OrderType {
  default = "default",
  innovation = "innovation",
  barter = "barter",
}
export enum StatusType {
  done = "done",
  inprogress = "inprogress",
  closed = "closed",
}
export interface Order extends Base {
  id: number;
  status: E_BLANK;
  total_price: number;
  userId: number;
  order_number: string;
  clientId: number;
  createdAt: string;
  updatedAt: string;
  order_items: OrderItems[];
  client: IClient;
  payments: Payment[];
  received_name?: string;
  received_phone?: string;
  is_fast?: boolean;
}
export interface Payment {
  id: number;
  price: number;
  clientId: number;
  orderId: string;
  createdAt: string;
  updateAt: string;
}
export interface CreateOrder extends Base {
  order_item: CreateOrderItems[];
}
export interface CreateOrderItems extends Base {
  quantity: number;
  price: number;
  blankId: number;
}

export interface OrderItems {
  id: number;
  quantity: number;
  price: number;
  blankId: number;
  orderId: number;
  createdAt: string;
  updatedAt: string;
  blank: IBlank;
}

export interface OrderCheck {
  is_paid: boolean;
}
