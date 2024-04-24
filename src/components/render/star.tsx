import { StarFilled } from "@ant-design/icons";
import React from "react";

type Props = {
  value?: number;
};
export const Star = ({ value }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <StarFilled className="text-yellow-500" size={20} />
      <div className="text-gray-600">{value ? value.toFixed(1) : 0}</div>
    </div>
  );
};
