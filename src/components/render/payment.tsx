import { BANK_ARRAY } from "config";
import React, { FC } from "react";
import { PaymentChannel as PC } from "service/order/type";

interface Props {
  channel: PC;
  hideLabel?: boolean;
}
export const RenderPaymentChannel: FC<Props> = ({
  channel,
  hideLabel = false,
}: Props) => {
  let logoSrc = "";
  let label = "";
  switch (channel) {
    case PC.qpay:
      logoSrc = "/images/qpay.png";
      label = "QPay";
      break;
    case PC.socialPay:
      logoSrc = "/images/socialpay.png";
      label = "SocialPay";
      break;
    case PC.bankTransfer:
      logoSrc = "/images/bank.png";
      label = "Bank Transfer";
      break;
  }
  return (
    <div className="flex items-center gap-2">
      <img src={logoSrc} alt={label} className="w-8 h-8 rounded-full" />
      <span hidden={hideLabel}>{label}</span>
    </div>
  );
};

type BankProps = {
  bank?: string;
};
export const RenderBank = ({ bank }: BankProps) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={bank ? `/images/${bank}.png` : "/images/bank.png"}
        height={20}
      />
      <div>{BANK_ARRAY.find((e) => e.value === bank)?.label}</div>
    </div>
  );
};
