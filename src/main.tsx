import { ConfigProvider, notification } from "antd";
import enUSIntl from "antd/lib/locale/en_US";
import { AuthProvider } from "context/auth";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routes from "routes";
import "./styles/global.less";
import "./styles/tailwind.css";

const domNode = document.getElementById("root") as any;
const root = createRoot(domNode);

notification.config({
  placement: "topRight",
  className: " custom-ant-notification-message p-4",
});
root.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#288ffc",
        fontFamily: "Inter",
        colorBorder: "#D0D5DD",
      },
    }}
    locale={enUSIntl}
  >
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  </ConfigProvider>
);
