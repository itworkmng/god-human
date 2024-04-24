import React, { FC, useEffect } from "react";
import { useRequest } from "ahooks";
import { Form, notification } from "antd";
import { IModalForm } from "components/modal";
import order from "service/order";
import { Order, OrderItems } from "service/order/type";
import { ActionComponentProps } from "types";
import Theme from "./theme";
import { ERROR_MESSAGE, E_BLANK, IERROR } from "utils/typdef";

const UpdatePrice: FC<ActionComponentProps<Order>> = ({
  open,
  onCancel,
  detail,
  onFinish,
}) => {
  const {
    data,
    loading,
    run: order_run,
  } = useRequest(order.detail, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const { run: run_update } = useRequest(order.update, {
    manual: true,
    onError: (err: any | IERROR) => {
      notification.error({
        message:
          ERROR_MESSAGE.find((v) => v.value === err.error.name)?.label ||
          err.error.message,
      });
    },
  });

  useEffect(() => {
    if (open) {
      order_run(detail?.id + "");
    }
  }, [open]);

  const [form] = Form.useForm<Order>();

  return (
    <IModalForm
      loading={loading}
      open={open}
      title="Өөрчлөх"
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: onCancel,
      }}
      submitTimeout={2000}
      onRequest={async () => {
        if (data) {
          let total_price = 0;
          const order_items = form.getFieldValue("order_items") as OrderItems[];
          order_items.map((item) => {
            total_price += item.price * item.quantity;
          });

          const body: Order = {
            ...data,
            status: E_BLANK.Printed,
            order_items,
            total_price,
          };
          await run_update(body.id, body);
        }
      }}
      onSuccess={onFinish}>
      {data && <Theme data={data} form={form} />}
    </IModalForm>
  );
};

export default UpdatePrice;
