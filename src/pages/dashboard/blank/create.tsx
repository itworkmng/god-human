import { ProFormRadio, ProFormText } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Form } from "antd";
import { SectionContainer, SectionField } from "components/index";
import { IModalForm } from "components/modal";
import { BLANK_STATUS } from "config";
import { FC } from "react";
import blank from "service/blank";
import { IBlank, IBlankInput } from "service/blank/type";
import { ActionComponentProps } from "types";
import { tokenDecode } from "utils/index";

const Create: FC<ActionComponentProps<IBlank>> = ({
  open,
  onCancel,
  onFinish,
}) => {
  const [form] = Form.useForm<IBlankInput>();
  const { runAsync } = useRequest(blank.create, {
    manual: true,
  });

  return (
    <>
      <IModalForm
        open={open}
        title="Үүсгэх"
        form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: onCancel,
        }}
        submitTimeout={2000}
        onRequest={async (values: IBlankInput) => {
          await runAsync({ ...values, userId: tokenDecode()?.id || 0 });
        }}
        onSuccess={onFinish}
      >
        <SectionContainer label="Дэлгэрэнгүй*">
          <SectionField
            label="Нэр"
            children={<ProFormText name={"name"} placeholder={"Нэр"} />}
          />
        </SectionContainer>

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
      </IModalForm>
    </>
  );
};

export default Create;
