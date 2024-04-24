import dayjs from "dayjs";
import React from "react";
import { MerchantServiceSchedule } from "service/merchantService/type";
import { capitalizate } from "utils/index";

type Props = {
  hours?: MerchantServiceSchedule[];
};
export const RenderServiceSchedule = ({ hours }: Props) => {
  return (
    <div>
      {hours?.map((el, index) => (
        <div
          className="flex items-center gap-1 text-gray-600"
          key={"time-table-" + index}
        >
          <div>{el?.week_days?.map((el) => capitalizate(el))?.join("-")}</div>
          <div>
            {dayjs(el?.opening).format("HH:mm")}-
            {dayjs(el?.closing).format("HH:mm")}
          </div>
        </div>
      ))}
    </div>
  );
};
