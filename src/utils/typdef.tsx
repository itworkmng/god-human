export enum ROLE {
  human = "human",
  god = "god",
  superman = "superman",
}
export interface ITOKEN {
  id: number;
  email: string;
  role: ROLE.god | ROLE.human | ROLE.superman;
}
export interface IERROR {
  success: boolean;
  error: {
    name: string;
    errors: object[];
    message?: string;
  };
}

export enum E_BLANK {
  Request = "request",
  Received = "received",
  Printed = "printed",
}
export enum E_PAY_STATUS {
  NoPaid = "nopaid",
  Underpaid = "underpaid",
  Paid = "paid",
}
export const ERROR_MESSAGE = [
  {
    value: "SequelizeUniqueConstraintError",
    label: "Мэдээлэл давхцаж байна !!!",
  },
  {
    value: "SequelizeValidationError",
    label: "Шаардлагатай талбараа бөглөнө үү",
  },
  {
    value: "SequelizeForeignKeyConstraintError",
    label: "Өгөгдөлтэй холбоос үүссэн байна",
  },
];
