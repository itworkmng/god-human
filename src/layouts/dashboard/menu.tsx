import { MenuDataItem } from "@ant-design/pro-layout";
import { BsCash } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import {
  Bell01,
  List,
  MessageTextCircle02,
  Settings01,
  Users01,
} from "untitledui-js-base";
const globalStyle = "ml-1 lg:ml-0 ";

const iconConfig = {
  size: "24",
  className: globalStyle,
  stroke: "white",
};

export const menuDataRender: MenuDataItem[] = [
  {
    icon: <MdDashboard {...iconConfig} />,
    name: "Самбар",
    path: "/dashboard/home",
  },
  {
    icon: <List {...iconConfig} />,
    name: "Захиалга",
    path: "/dashboard/orders",
  },
  {
    icon: <Users01 {...iconConfig} />,
    name: "Захиалагч",
    path: "/dashboard/client",
  },
  {
    icon: <Bell01 {...iconConfig} />,
    name: "Мэдэгдэл",
    path: "/dashboard/notifications",
    disabled: true,
  },
  // {
  //   icon: <CreditCardDown {...iconConfig} />,
  //   name: "Дансны хуулга",
  //   path: "/dashboard/account",
  //   disabled: true,
  // },
  {
    icon: <MessageTextCircle02 {...iconConfig} />,
    name: "Санал хүсэлт",
    path: "/dashboard/feedback",
    disabled: true,
  },
  {
    icon: <Settings01 {...iconConfig} />,
    name: "Тохиргоо",
    path: "/dashboard/settings",
  },
];
