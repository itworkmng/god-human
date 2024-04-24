import React, { FC } from "react";
import { GENDERS_CONFIG } from "utils/constants";
import Badge from ".";

interface Props {
  gender?: string;
}

const GenderBadge: FC<Props> = ({ gender }) => {
  if (!gender) return <span>-</span>;
  return (
    <Badge
      title={GENDERS_CONFIG.find((e) => e.key === gender)?.label || gender}
    />
  );
};

export default GenderBadge;
