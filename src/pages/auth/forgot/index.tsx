import ProForm, { ProFormInstance, ProFormText } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, notification } from "antd";
import { FC, useRef } from "react";
import { BiSync } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import auth from "service/auth";
import { LoginData } from "service/auth/type";
import { ERROR_MESSAGE, IERROR } from "utils/typdef";

const Login: FC = () => {
  const formRef = useRef<ProFormInstance<LoginData>>();
  const userData = auth.getRememberUser();
  const navigate = useNavigate();
  const login = useRequest(auth.forgot, {
    manual: true,
    onSuccess: () => {
      navigate("/auth/login");
      notification.success({
        message: "Таны имейл хаягруу нууц үг илгээлээ",
      });
    },
    onError: (err: any | IERROR) => {
      notification.error({
        message:
          ERROR_MESSAGE.find((v) => v.value === err.error.name)?.label ||
          err.error.message,
      });
    },
  });
  return (
    <div
      style={{ maxWidth: 300 }}
      className="bg-white/30 backdrop-blur-lg rounded-xl p-10">
      <div className="text-center">
        <img
          src="/images/logo-icon.png"
          alt="logo"
          style={{ height: 75, borderRadius: 1000 }}
        />
        <div className="font-bold uppercase font-inter">
          Хэвлэгч <BiSync /> Хянагч
        </div>
      </div>
      <ProForm<LoginData>
        lang="mn_MN"
        formRef={formRef}
        className="mt-5"
        initialValues={userData}
        labelCol={{
          className: "font-medium",
        }}
        onFinish={async (data: LoginData) => {
          const sendJSON = { ...data };

          await login.runAsync(sendJSON);
        }}
        submitter={{
          render: () => (
            <Button
              block
              type="primary"
              loading={login.loading}
              htmlType="submit"
              size="large"
              className="mt-7 ">
              Сэргээх
            </Button>
          ),
        }}>
        <div className="space-y-5">
          <ProFormText
            width="md"
            label={<span className="font-normal">имейл хаяг</span>}
            name="email"
            placeholder="Enter your email"
            fieldProps={{ size: "large" }}
            rules={[
              {
                message: "Email is required!",
              },
            ]}
          />
        </div>
      </ProForm>
    </div>
  );
};

export default Login;
