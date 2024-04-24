export interface IClient {
  id: number;
  first_name: string;
  last_name: string;
  photo: string;
  city: string;
  province: string;
  company_register?: number;
  company_name?: string;
  register: string;
  company_phone_number?: string;
  company_email?: string;
  phone_number: number;
  email: string;
  social_address?: string;
  position: string;
  is_active: boolean;
  expire_date: string;
  password: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IClientFilterInput {
  current: number;
  pageSize: number;
  sorter?: any;
}

export interface IClientInput {
  id: number;
  first_name: string;
  last_name: string;
  photo: string;
  city: string;
  province: string;
  company_register?: number;
  company_name?: string;
  company_phone_number?: string;
  company_email?: string;
  register: string;
  phone_number: number;
  email: string;
  position: string;
  is_active: boolean;
  expire_date: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}
export interface IClientPasswordInput {
  password: string;
}
