import { Card, Tag } from "antd";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { formatNumber, moneyFormat } from "utils/index";
export type CardProps = {
  label: string;
  amount?: number;
  percent?: number;
  isMoney?: boolean;
  loading?: boolean;
  customItem?: React.ReactNode;
  href?: string;
};
const DashboardCard = ({
  label,
  amount,
  percent,
  isMoney = false,
  loading = false,
  href,
  customItem,
}: CardProps) => {
  return (
    <a href={href}>
      <Card
        headStyle={{
          display: "none",
        }}
        className="shadow-md"
        loading={loading}>
        <span className="text-gray-600 font-medium">{label} </span>
        <div className="flex items-center justify-between mt-3">
          <div className="text-gray-900 text-2xl font-semibold -tracking-tight">
            {moneyFormat(amount)} {isMoney && "₮"}
          </div>

          {percent ? (
            <Tag
              bordered={false}
              color={percent > 0 ? "#ECFDF3" : "error"}
              className="rounded-full flex items-center text-base h-fit">
              {percent > 0 ? (
                <BsArrowUpShort fontWeight={500} size={15} color="#027a48" />
              ) : (
                <BsArrowDownShort fontWeight={500} size={15} />
              )}
              <span
                className={`font-medium ${
                  percent > 0 ? "text-[#027a48]" : "text-red-500"
                }`}>
                {" "}
                {percent > 0
                  ? formatNumber(percent)
                  : formatNumber(percent * -1)}
                %
              </span>
            </Tag>
          ) : null}

          {customItem}
        </div>
      </Card>
    </a>
  );
};

export default DashboardCard;
