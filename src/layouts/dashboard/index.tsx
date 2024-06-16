import ProLayout from "@ant-design/pro-layout";
import { Image } from "antd";
import { PageHeader } from "components/page_header";
import { useAuthContext } from "context/auth";
import { FC } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "./header";
import { menuDataRender } from "./menu";
import Footer from "./footer";

type Props = {
  children?: any;
  props?: any;
};
const DashboardLayout: FC<Props> = ({}) => {
  const [{ authorized, user }] = useAuthContext();
  const navigate = useNavigate();

  if (!authorized) return <Navigate to={"/auth/login"} />;

  return (
    <div id="pro-layout">
      <ProLayout
        collapsedButtonRender={false}
        menuDataRender={() => menuDataRender}
        menuItemRender={(item: any) => {
          return (
            <>
              {item.disabled ? (
                <div
                  className={`text-gray-400 flex font-semibold items-center gap-4 rounded-lg px-1`}
                  style={{ pointerEvents: "none" }}>
                  <div className="flex items-center">{item.icon}</div>
                  <div>{item.name}</div>
                </div>
              ) : (
                <Link to={item.path || "/dashboard/home"}>
                  <div
                    className={`text-white flex font-semibold items-center gap-4 rounded-lg px-1`}>
                    <div className="flex items-center">{item.icon}</div>
                    <div>{item.name}</div>
                  </div>
                </Link>
              )}
            </>
          );
        }}
        disableMobile={false}
        onMenuHeaderClick={() => navigate("/dashboard/home")}
        subMenuItemRender={(item) => {
          return (
            <div className="text-white flex font-semibold  items-center gap-4  rounded-lg px-1 text-base">
              <div>{item.icon}</div>
              <div>{item.name}</div>
            </div>
          );
        }}
        menuHeaderRender={() => {
          return (
            <div className="w-full flex items-center gap-4 h-0 md:h-8 text-white font-semibold text-lg mt-0 md:mt-4 ">
              <Image
                src="/images/logo-icon.png"
                alt="logo"
                className="w-8 h-8 rounded-md"
                onClick={() => navigate("/dashboard/home")}
              />
              <p>
                {user?.role == "human" && "Хэвлэгч"}
                {user?.role == "god" && "Хянагч"}
              </p>
            </div>
          );
        }}
        rightContentRender={() => <Header />}
        footerRender={() => <Footer />}
        contentStyle={{
          margin: 0,
          overflowY: "auto",
          height: "calc(100vh - 60px)",
          fontFamily: "'Inter', sans-serif",
          backgroundColor: "#F3F4F6",
        }}
        layout="side"
        // logo={false}
        colorWeak={false}
        logoStyle={{
          display: "flex",
          justifyContent: "center",
        }}
        title={false}
        fixedHeader={true}
        fixSiderbar={true}
        contentWidth={"Fluid"}>
        <PageHeader />
        <Outlet />
      </ProLayout>
    </div>
  );
};

export default DashboardLayout;
