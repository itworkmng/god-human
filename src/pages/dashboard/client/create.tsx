import { UploadOutlined } from "@ant-design/icons";
import { ProFormField, ProFormSwitch } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import {
  Button,
  Divider,
  Form,
  Tabs,
  Upload,
  UploadFile,
  UploadProps,
  notification,
} from "antd";
import {
  SectionContainer,
  SectionField,
  UploadDraggerButton,
} from "components/index";
import { IModalForm } from "components/modal";
import { useAuthContext } from "context/auth";
import { FC, useEffect, useState } from "react";
import staff from "service/client";
import { IClient } from "service/client/type";
import company from "service/company";
import { ActionComponentProps } from "types";
import { registrationNumberValidation, tokenDecode } from "utils/index";
import ImgCrop from "antd-img-crop";
import { GetProp } from "antd/lib";
import file from "service/file";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const Create: FC<ActionComponentProps<IClient>> = ({
  open,
  onCancel,
  onFinish,
}) => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [user] = useAuthContext();
  const [form] = Form.useForm();
  const { runAsync } = useRequest(staff.create, {
    manual: true,
  });
  const { data: uploadFile, run: runUpload } = useRequest(file.upload, {
    manual: true,
  });
  const onChangeLogo: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    runUpload({ file: newFileList[0] });
    setFileList(newFileList);
  };
  const removePhoto = () => {
    form.setFieldValue("photo", "empty.png");
    setFileList([]);
  };
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const [currentRegister, setCurrentRegister] = useState("");
  const { runAsync: runCompany } = useRequest(company.info, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Company find Амжилттай",
      });
    },
  });

  const handleCompanyCheck = () => {
    const newRegister = form.getFieldValue("company_register").toString();
    if (
      (currentRegister.length != 7 && newRegister.length == 7) ||
      (currentRegister != newRegister && newRegister.length == 7)
    ) {
      setCurrentRegister(newRegister);
      runCompany(newRegister);
    }
  };
  const [tab, setTab] = useState<"private" | "statement">("statement");
  return (
    <>
      <IModalForm
        open={open}
        title="Үүсгэх"
        form={form}
        autoFocusFirstInput
        onChange={(e) => {
          handleCompanyCheck();
        }}
        modalProps={{
          destroyOnClose: true,
          onCancel: onCancel,
        }}
        submitTimeout={2000}
        onRequest={async (values: IClient) => {
          await runAsync({
            ...values,
            photo: uploadFile?.photo || "empty.png",
            userId: user.user?.checker_id
              ? user.user?.checker_id
              : tokenDecode()?.id || 0,
          });
        }}
        onSuccess={onFinish}>
        <Tabs
          onChange={(key) => {
            setTab(key as "statement" | "private");
          }}
          defaultActiveKey={tab}
          items={[
            { label: "Хуулийн этгээд", key: "statement" },
            { label: "Хувь хүн", key: "private", disabled: true },
          ]}
        />
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
                      rules={[
                        {
                          required: true,
                          message: "Дугаараа хаягаа оруулна уу",
                        },
                        {
                          required: true,
                          len: 8,
                          message: "Дугаарын урт 8 байх ёстой",
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
                children={<ProFormSwitch name={"is_active"} />}
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
                      name={"company_register"}
                      rules={[
                        {
                          required: true,
                          message: "Регистрээ оруулна уу",
                        },
                        {
                          required: true,
                          len: 7,
                          message: "Регистрыг урт 7 байх ёстой",
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
                      disabled
                      placeholder={"АЙТИ-ВОРК ХХК"}
                      name={"company_name"}
                      initialValue={"АЙТИ ВОРК"}
                    />
                  }
                />
              </div>
              <SectionField
                label="Байгууллагын лого /Заавал биш/"
                children={
                  <ImgCrop rotationSlider>
                    <Upload
                      listType="picture-card"
                      fileList={fileList}
                      onChange={(e) => onChangeLogo(e)}
                      maxCount={1}
                      onRemove={() => {
                        removePhoto();
                      }}
                      onPreview={onPreview}>
                      {fileList.length < 1 && "+ Лого"}
                    </Upload>
                  </ImgCrop>
                }
              />
              <SectionField
                label="И-мэйл /Заавал биш/"
                children={
                  <ProFormField
                    placeholder={"info@eblank.mn"}
                    name={"company_email"}
                  />
                }
              />
              <SectionField
                label="Утасны дугаар /Заавал биш/"
                children={
                  <ProFormField
                    name={"company_phone_number"}
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
              <div className=" text-xs text-gray-500 mb-2">
                <b className="text-red-500 font-bold">Анхаар</b>: Байгууллагын
                дараах талбарт оруулсан мэдээлэл нь хэвлэмэл хуудас дээр
                бичигдэх тул сайтар шалгаж оруулна уу
              </div>
            </SectionContainer>
            <Divider />
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
                      rules={[
                        {
                          required: true,
                          message: "Дугаараа хаягаа оруулна уу",
                        },
                        {
                          required: true,
                          len: 8,
                          message: "Дугаарын урт 8 байх ёстой",
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
                children={<ProFormSwitch name={"is_active"} />}
              />
            </SectionContainer>
          </>
        )}
      </IModalForm>
    </>
  );
};

export default Create;
