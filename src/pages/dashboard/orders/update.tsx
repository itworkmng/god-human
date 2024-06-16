import React, { FC, useEffect, useState } from "react";
import { Button } from "antd";
import { IModalForm } from "components/modal";
import { Order } from "service/order/type";
import { ActionComponentProps } from "types";
import UpdatePrice from "./updatePrice";
import UpdatePayment from "./updatePayment";
type TPayment = {
  detail: Order;
  status: boolean;
};
type TPrice = {
  detail: Order;
  status: boolean;
};
const Update: FC<ActionComponentProps<Order>> = ({
  open,
  onCancel,
  detail,
  onFinish,
}) => {
  const [isPayment, setIsPayment] = useState<TPayment | undefined>(undefined);
  const [isPrice, setisPrice] = useState<TPrice | undefined>(undefined);
  const Clear = () => {
    setIsPayment(undefined);
    setisPrice(undefined);
    onCancel();
  };
  const Payment = () => {
    if (detail) {
      setIsPayment({ status: true, detail });
      setisPrice(undefined);
    }
  };
  const Price = () => {
    if (detail) {
      setisPrice({ status: true, detail });
      setIsPayment(undefined);
    }
  };
  return (
    <IModalForm
      title="Үйлдэл"
      closeButton
      noButton
      open={open}
      submitTimeout={2000}
      className="max-w-[480px]"
      modalProps={{
        destroyOnClose: true,
        onCancel: Clear,
      }}>
      <div className="flex flex-col gap-3">
        <Button type="primary" className="bg-primary-800" onClick={Price}>
          Хэвлэлийн үнэ оруулах
        </Button>
        <Button type="primary" className="bg-green-600" onClick={Payment}>
          Төлбөр төлөх
        </Button>

        <UpdatePrice
          onFinish={onFinish}
          detail={isPrice && isPrice.detail}
          open={isPrice ? true : false}
          onCancel={Clear}
        />
        <UpdatePayment
          onFinish={onFinish}
          detail={isPayment && isPayment.detail}
          open={isPayment ? true : false}
          onCancel={Clear}
        />
      </div>
    </IModalForm>
  );
};

export default Update;
