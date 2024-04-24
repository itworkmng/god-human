export interface Dashboard {
  clients: number;
  order: number;
  total_price: number;
}
export interface UserDashboard {
  clients: number;
  order: number;
  total_price: number;
}

export interface Stats {
  current: StatData[];
  previous: StatData[];
}

export interface StatData {
  xdata: string;
  ydata: number;
}

export interface StatInput {
  end_date: Date;
  pre_end_date: Date;
  pre_start_date: Date;
  start_date: Date;
  type: string;
}
