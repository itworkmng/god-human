import { FC } from "react";
import { useRequest } from "ahooks";
import { Divider, Form, Tag, notification } from "antd";
import { IModalForm } from "components/modal";
import { Order, Payment } from "service/order/type";
import { ActionComponentProps } from "types";
import payment from "service/payment";
import { SectionContainer } from "components/index";
import { moneyFormat, payStatusCheck, payTotal } from "utils/index";
import { ProFormDigit } from "@ant-design/pro-form";
import { useAuthContext } from "context/auth";

const UpdatePayment: FC<ActionComponentProps<Order>> = ({
  open,
  onCancel,
  detail,
  onFinish,
}) => {
  const { run, loading } = useRequest(payment.create, {
    manual: true,
    onSuccess: () => {
      onCancel();
    },
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const [form] = Form.useForm<Payment>();
  const [{ user }] = useAuthContext();
  return (
    <IModalForm
      form={form}
      loading={loading}
      open={open}
      title="Өөрчлөх"
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: onCancel,
      }}
      submitTimeout={2000}
      onRequest={async (data) => {
        if (data.price) {
          form.resetFields();
          await run({
            ...data,
            clientId: detail?.clientId,
            orderId: detail?.id,
            userId: user?.id,
          });
        }
      }}
      onSuccess={onFinish}>
      <>
        <div className="font-bold text-sm">Төлбөрийн мэдээлэл</div>
        <SectionContainer
          label="Нийт нэхэмжлэлийн дүн"
          children={moneyFormat(detail?.total_price, "mnt") || "-"}
        />
        <SectionContainer
          label="Төлсөн дүн"
          children={
            <Tag color="green">
              {moneyFormat(payTotal(detail?.payments || []), "mnt") || "-"}
            </Tag>
          }
        />
        <SectionContainer
          label="Үлдэгдэл төлбөр"
          children={
            moneyFormat(
              payStatusCheck(detail?.payments || [], detail?.total_price || 0),
              "mnt"
            ) || "-"
          }
        />
        <Divider />
        <div className="font-bold text-sm">Төлбөр илгээх</div>
        <SectionContainer
          label="Захиалгын дугаар"
          children={detail?.order_number || "-"}
        />
        <SectionContainer label="Дансны дугаар" children={user?.acc_number} />
        <SectionContainer label="Банкны нэр" children={user?.acc_name} />
        <SectionContainer
          label="Хүлээн авагчийн нэр"
          children={user?.acc_user}
        />
        <Divider />
        {(detail?.total_price || 0) - payTotal(detail?.payments || []) > 0 && (
          <>
            <div className="font-bold text-sm">Төлөх дүн</div>
            <SectionContainer
              label="Дүн"
              children={
                <ProFormDigit
                  rules={[
                    {
                      required: true,
                      message: "Төлбөрийн мэдээллээ оруулна уу",
                    },
                  ]}
                  name="price"
                  placeholder="0"
                />
              }
            />
          </>
        )}
      </>
    </IModalForm>
  );
};

export default UpdatePayment;
