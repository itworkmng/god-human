import { FC } from "react";
import { IModalForm } from "components/modal";
import { Order } from "service/order/type";
import { ActionComponentProps } from "types";
import { ProFormCheckbox, ProFormField } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import order from "service/order";
import { notification } from "antd";
import { E_BLANK } from "utils/typdef";
import { SectionContainer, SectionField } from "components/index";
const GodUpdate: FC<ActionComponentProps<Order>> = ({
  open,
  onCancel,
  detail,
  onRefetch,
}) => {
  const { run: run_update } = useRequest(order.update, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });
  return (
    <IModalForm
      title="Үйлдэл"
      open={open}
      submitTimeout={2000}
      className="max-w-[480px]"
      onRequest={async (value) => {
        await run_update(detail?.id || 0, {
          ...value,
          status: E_BLANK.Received,
        });
        onRefetch;
        onCancel();
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: onCancel,
      }}>
      <div className="flex flex-col gap-3">
        <ProFormCheckbox
          label={"Хянасан"}
          disabled
          initialValue={true}
          name={"status"}
        />

        <>
          <SectionContainer label="Хүлээн авсан *">
            <SectionField
              label="Нэр *"
              children={
                <ProFormField
                  required
                  rules={[
                    {
                      required: true,
                      message: "Нэрээ оруулна уу",
                    },
                  ]}
                  placeholder={"Баяраа"}
                  name={"received_name"}
                />
              }
            />
            <SectionField
              label="Утас *"
              children={
                <ProFormField
                  required
                  rules={[
                    {
                      required: true,
                      message: "Утасаа оруулна уу",
                    },
                  ]}
                  placeholder={"99887766"}
                  name={"received_phone"}
                />
              }
            />
          </SectionContainer>
        </>
      </div>
    </IModalForm>
  );
};

export default GodUpdate;
