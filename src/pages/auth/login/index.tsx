import ProForm, {
  ProFormCheckbox,
  ProFormInstance,
  ProFormText,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, notification } from "antd";
import { useAuthContext } from "context/auth";
import { Action } from "context/type";
import { FC, useRef } from "react";
import { BiSync } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import auth from "service/auth";
import { LoginData } from "service/auth/type";

const Login: FC = () => {
  const formRef = useRef<ProFormInstance<LoginData>>();
  const [{ user }, setAuth] = useAuthContext();
  const userData = auth.getRememberUser();
  const navigate = useNavigate();
  const login = useRequest(auth.login, {
    manual: true,
    onSuccess: (data: any) => {
      auth.saveToken(data.token);
      setAuth([Action.SIGN_IN, data.user]);
      navigate("/dashboard/home");
      notification.success({
        message: "Амжилттай",
      });
    },
    onError: () => {
      notification.error({
        message: "Таны мэдээлэл буруу байна.",
      });
    },
  });
  return (
    <div
      style={{ maxWidth: 300 }}
      className="bg-white/30 backdrop-blur-lg rounded-xl p-10">
      <div className="text-center">
        <img
          src="/images/logo.jpg"
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
          auth.rememberUser(data);

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
              Нэвтрэх
            </Button>
          ),
        }}>
        <div className="space-y-5">
          <ProFormText
            width="md"
            name="phone"
            placeholder="Enter your phone"
            label={<span className="font-normal">Нэвтрэх нэр</span>}
            fieldProps={{
              size: "large",
              classNames: {},
            }}
          />
          <ProFormText.Password
            width="md"
            label={<span className="font-normal">Нууц үг</span>}
            name="password"
            placeholder="Enter your password"
            fieldProps={{ size: "large" }}
            rules={[
              {
                message: "Password is required!",
              },
            ]}
          />
          <a
            className="flex justify-end my-0 py-0"
            href="/auth/forgot-password">
            Нууц үгээ мартсан
          </a>
          <div className="flex items-center space-x-3 custom-ant-item-margin-remove  ">
            <ProFormCheckbox
              id="remember"
              name="remember"
              className="mb-0 pb-0"
              style={{
                marginBottom: 0,
              }}
              fieldProps={{
                className: "mb-0 pb-0",
              }}
            />
            <label htmlFor="remember">Сануулах</label>
          </div>
        </div>
      </ProForm>
    </div>
  );
};

export default Login;
