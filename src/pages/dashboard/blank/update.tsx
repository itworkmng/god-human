import { ProFormRadio, ProFormText } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Divider, Form } from "antd";
import { SectionContainer, SectionField } from "components/index";
import { IModalForm } from "components/modal";
import { BLANK_STATUS } from "config";
import { FC, useEffect } from "react";
import blank from "service/blank";
import { IBlank } from "service/blank/type";
import { ActionComponentProps } from "types";
import { tokenDecode } from "utils/index";

const Update: FC<ActionComponentProps<IBlank>> = ({
  open,
  onCancel,
  detail,
  onFinish,
}) => {
  const [form] = Form.useForm();
  const { runAsync, loading } = useRequest(blank.update, {
    manual: true,
  });

  useEffect(() => {
    if (detail) {
      form.setFieldsValue({
        ...detail,
      });
    }
  }, [detail]);

  return (
    <>
      <IModalForm
        open={open}
        title="Өөрчлөх"
        form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: onCancel,
        }}
        submitTimeout={2000}
        onRequest={async (values) => {
          await runAsync(detail?.id || 0, values);
        }}
        onSuccess={onFinish}
      >
        <SectionContainer label="Дэлгэрэнгүй*">
          <SectionField
            label="Нэр"
            children={<ProFormText name={"name"} placeholder={"Нэр"} />}
          />
        </SectionContainer>
        <Divider />

        <SectionContainer label="Төлөв*">
          <ProFormRadio.Group
            name="is_select"
            options={[
              {
                label: BLANK_STATUS.active.label,
                value: BLANK_STATUS.active.value,
              },
              {
                label: BLANK_STATUS.inactive.label,
                value: BLANK_STATUS.inactive.value,
              },
            ]}
          />
        </SectionContainer>
        <Divider />
      </IModalForm>
    </>
  );
};

export default Update;
