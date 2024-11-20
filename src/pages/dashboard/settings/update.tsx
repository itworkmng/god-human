import {
  ProFormField,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Divider, Form } from "antd";
import { RenderBank, SectionContainer, SectionField } from "components/index";
import { IModalForm } from "components/modal";
import { BANK_ARRAY } from "config";
import { FC } from "react";
import auth from "service/auth";
import { Admin } from "service/auth/type";
import { ActionComponentProps } from "types";
import { registrationNumberValidation, tokenDecode } from "utils/index";

const Update: FC<ActionComponentProps<Admin>> = ({
  open,
  onCancel,
  onFinish,
  detail,
}) => {
  const [form] = Form.useForm();
  const { runAsync } = useRequest(auth.update, {
    manual: true,
  });

  return (
    <>
      <IModalForm
        open={open}
        title="Мэдээллийн шинэчлэх"
        form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: onCancel,
        }}
        submitTimeout={2000}
        onRequest={async (values) => {
          console.log(values);
          await runAsync(detail?.id || 0, {
            ...values,
            acc_name: values.acc_name,
          });
        }}
        onSuccess={onFinish}>
        <>
          <SectionContainer label="Хувийн мэдээлэл *">
            <SectionField
              label="Овог *"
              children={
                <ProFormField
                  required
                  initialValue={detail?.last_name}
                  rules={[
                    {
                      required: true,
                      message: "Овог нэрээ оруулна уу",
                    },
                  ]}
                  placeholder={"Баяраа"}
                  name={"last_name"}
                />
              }
            />
            <SectionField
              label="Нэр *"
              children={
                <ProFormField
                  required
                  initialValue={detail?.first_name}
                  rules={[
                    {
                      required: true,
                      message: "Нэрээ оруулна уу",
                    },
                  ]}
                  placeholder={"Баяраа"}
                  name={"first_name"}
                />
              }
            />
            <SectionField
              label="Регистрийн дугаар *"
              children={
                <ProFormField
                  required
                  name={"register"}
                  placeholder={"AA00000000"}
                  initialValue={detail?.register}
                  rules={[
                    {
                      required: true,
                      message: "Регистрийн дугаараа оруулна уу",
                    },
                    {
                      validator: (_, value) => {
                        let message = registrationNumberValidation(value);
                        if (message) {
                          return Promise.reject(new Error(message));
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                />
              }
            />
            <div className="grid grid-cols-2 gap-2">
              <SectionField
                label="Аймаг/Дүүрэг *"
                children={
                  <ProFormField
                    name={"city"}
                    initialValue={detail?.city}
                    required
                    placeholder={"Увс"}
                  />
                }
              />
              <SectionField
                label="Сум/Хороо *"
                children={
                  <ProFormField
                    initialValue={detail?.province}
                    name={"province"}
                    rules={[
                      {
                        required: true,
                        message: "Хаягаа оруулна уу",
                      },
                    ]}
                    placeholder={"Улаангом, 2-р баг 11-106"}
                  />
                }
              />
            </div>
            <SectionField
              label="Албан тушаал *"
              children={
                <ProFormField
                  initialValue={detail?.position}
                  required
                  name={"position"}
                  rules={[
                    {
                      required: true,
                      message: "Албан тушаалаа оруулна уу",
                    },
                  ]}
                  placeholder={"Менежер"}
                />
              }
            />
            <SectionField
              label="Идэвхтэй эсэх"
              children={
                <ProFormSwitch
                  name={"is_active"}
                  initialValue={detail?.is_active}
                />
              }
            />
          </SectionContainer>
          <Divider />
          <SectionContainer label="Холбоо барих *">
            <div className="grid grid-cols-2 gap-2">
              <SectionField
                label="И-мэйл *"
                children={
                  <ProFormField
                    initialValue={detail?.email}
                    name={"email"}
                    required
                    rules={[
                      {
                        required: true,
                        message: "Имэйл хаягаа оруулна уу",
                      },
                    ]}
                    placeholder={"info@eblank.mn"}
                  />
                }
              />
              <SectionField
                label="Утасны дугаар *"
                children={
                  <ProFormField
                    initialValue={detail?.phone_number}
                    name={"phone_number"}
                    rules={[
                      {
                        required: true,
                        message: "Дугаараа хаягаа оруулна уу",
                      },
                      {
                        validator: (rule, value, callback) => {
                          const regex = /^[0-9]+$/;
                          if (!regex.test(value)) {
                            callback("Дугаар оруулна уу");
                          } else {
                            callback();
                          }
                        },
                      },
                    ]}
                    placeholder={"85458545"}
                    required
                  />
                }
              />
            </div>
          </SectionContainer>

          <Divider />
          <SectionContainer label="Дансны Мэдээлэл *">
            <div className="grid grid-cols-2 gap-2">
              <SectionField
                label="Дансны төрөл *"
                children={
                  <ProFormSelect
                    initialValue={{
                      label: detail && <RenderBank bank={detail.acc_name} />,
                      value: detail?.acc_name,
                    }}
                    name={"acc_name"}
                    options={BANK_ARRAY.map((el) => ({
                      ...el,
                      label: <RenderBank bank={el.value} />,
                    }))}
                  />
                }
              />

              <SectionField
                label="Дансны дугаар *"
                children={
                  <ProFormText
                    initialValue={detail?.acc_number}
                    required
                    rules={[
                      {
                        required: true,
                        message: "Дансны дугаараа оруулна уу",
                      },
                      {
                        min: 10,
                        message: "Дансны дугаараа зөв оруулна уу",
                      },
                    ]}
                    placeholder={"1234****"}
                    name={"acc_number"}
                  />
                }
              />
            </div>
          </SectionContainer>
        </>
      </IModalForm>
    </>
  );
};

export default Update;
