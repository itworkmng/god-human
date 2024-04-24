import { ProFormField, ProFormSwitch } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Divider, Form, Tabs } from "antd";
import { SectionContainer, SectionField } from "components/index";
import { IModalForm } from "components/modal";
import { useAuthContext } from "context/auth";
import { FC, useEffect, useState } from "react";
import staff from "service/client";
import { IClient } from "service/client/type";
import { ActionComponentProps } from "types";
import { registrationNumberValidation, tokenDecode } from "utils/index";

const Update: FC<ActionComponentProps<IClient>> = ({
  open,
  onCancel,
  onFinish,
  detail,
}) => {
  const [user] = useAuthContext();
  const [form] = Form.useForm();
  const { runAsync } = useRequest(staff.update, {
    manual: true,
  });

  const [tab, setTab] = useState<"private" | "statement">();
  useEffect(() => {
    detail?.company_name ? setTab("statement") : setTab("private");
  }, [detail]);
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
        onRequest={async (values: IClient) => {
          await runAsync(detail?.id || 0, values);
        }}
        onSuccess={onFinish}>
        {tab == "private" && (
          <>
            <SectionContainer label="Дэлгэрэнгүй *">
              <SectionField
                label="Овог *"
                children={
                  <ProFormField
                    required
                    rules={[
                      {
                        required: true,
                        message: "Овог нэрээ оруулна уу",
                      },
                    ]}
                    placeholder={"Баяраа"}
                    name={"last_name"}
                    initialValue={detail?.last_name}
                  />
                }
              />
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
                    initialValue={detail?.first_name}
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
                    initialValue={detail?.register}
                    name={"register"}
                    placeholder={"AA00000000"}
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
              <Divider />
              <div className="grid grid-cols-2 gap-2">
                <SectionField
                  label="Аймаг/Дүүрэг"
                  children={
                    <ProFormField
                      name={"city"}
                      disabled
                      initialValue={user.user?.city}
                    />
                  }
                />
                <SectionField
                  label="Дэлгэрэнгүй хаяг *"
                  children={
                    <ProFormField
                      initialValue={detail?.province}
                      rules={[
                        {
                          required: true,
                          message: "Хаягаа оруулна уу",
                        },
                      ]}
                      placeholder={"Улаангом, 2-р баг 11-106"}
                      name={"province"}
                    />
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <SectionField
                  label="И-мэйл *"
                  children={
                    <ProFormField
                      required
                      rules={[
                        {
                          required: true,
                          message: "Имэйл хаягаа оруулна уу",
                        },
                      ]}
                      initialValue={detail?.email}
                      placeholder={"info@eblank.mn"}
                      name={"email"}
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
                      placeholder={"12345678"}
                      required
                    />
                  }
                />
                <SectionField
                  label="Цахим хуудас /Заавал биш/"
                  children={
                    <ProFormField
                      placeholder={"www.eblank.mn"}
                      name={"social_address"}
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
                    rules={[
                      {
                        required: true,
                        message: "Албан тушаалаа оруулна уу",
                      },
                    ]}
                    placeholder={"Менежер"}
                    name={"position"}
                  />
                }
              />
              <SectionField
                label="Идэвхтэй эсэх"
                children={
                  <ProFormSwitch
                    initialValue={detail?.is_active}
                    name={"is_active"}
                  />
                }
              />
            </SectionContainer>
          </>
        )}
        {tab == "statement" && (
          <>
            <SectionContainer label="Байгууллагын мэдээлэл *">
              <div className="grid grid-cols-2 gap-2">
                <SectionField
                  label="Регистр *"
                  children={
                    <ProFormField
                      initialValue={detail?.company_register}
                      name={"company_register"}
                      rules={[
                        {
                          required: true,
                          message: "Регистрээ оруулна уу",
                        },
                        {
                          validator: (rule, value, callback) => {
                            const regex = /^[0-9]+$/;
                            if (!regex.test(value)) {
                              callback("Регистрын дугаар оруулна уу");
                            } else {
                              callback();
                            }
                          },
                        },
                      ]}
                      placeholder={"1234567"}
                      required
                    />
                  }
                />
                <SectionField
                  label="Нэр *"
                  children={
                    <ProFormField
                      initialValue={detail?.company_name}
                      disabled
                      placeholder={"АЙТИ-ВОРК ХХК"}
                      name={"company_name"}
                    />
                  }
                />
              </div>
              <SectionField
                label="И-мэйл /Заавал биш/"
                children={
                  <ProFormField
                    initialValue={detail?.company_email}
                    placeholder={"info@eblank.mn"}
                    name={"company_email"}
                  />
                }
              />
              <SectionField
                label="Утасны дугаар /Заавал биш/"
                children={
                  <ProFormField
                    initialValue={detail?.company_phone_number}
                    name={"company_phone_number"}
                    placeholder={"12345678"}
                    required
                  />
                }
              />
              <div className="grid grid-cols-2 gap-2">
                <SectionField
                  label="Аймаг/Дүүрэг"
                  children={
                    <ProFormField
                      name={"city"}
                      disabled
                      initialValue={user.user?.city}
                    />
                  }
                />
                <SectionField
                  label="Дэлгэрэнгүй хаяг *"
                  children={
                    <ProFormField
                      initialValue={detail?.province}
                      rules={[
                        {
                          required: true,
                          message: "Хаягаа оруулна уу",
                        },
                      ]}
                      placeholder={"Улаангом, 2-р баг 11-106"}
                      name={"province"}
                    />
                  }
                />
              </div>
            </SectionContainer>
            <SectionContainer label="Дэлгэрэнгүй *">
              <SectionField
                label="Овог *"
                children={
                  <ProFormField
                    initialValue={detail?.last_name}
                    required
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
                    initialValue={detail?.first_name}
                    required
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
              <div className="grid grid-cols-2 gap-2">
                <SectionField
                  label="И-мэйл *"
                  children={
                    <ProFormField
                      required
                      initialValue={detail?.email}
                      rules={[
                        {
                          required: true,
                          message: "Имэйл хаягаа оруулна уу",
                        },
                      ]}
                      placeholder={"info@eblank.mn"}
                      name={"email"}
                    />
                  }
                />
                <SectionField
                  label="Утасны дугаар *"
                  children={
                    <ProFormField
                      name={"phone_number"}
                      initialValue={detail?.phone_number}
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
                      placeholder={"12345678"}
                      required
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
                    rules={[
                      {
                        required: true,
                        message: "Албан тушаалаа оруулна уу",
                      },
                    ]}
                    placeholder={"Менежер"}
                    name={"position"}
                  />
                }
              />
              <SectionField
                label="Идэвхтэй эсэх"
                children={
                  <ProFormSwitch
                    initialValue={detail?.is_active}
                    name={"is_active"}
                  />
                }
              />
            </SectionContainer>
          </>
        )}
      </IModalForm>
    </>
  );
};

export default Update;
