import { FC } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: FC = () => {
  return (
    <div
      className="w-full h-screen flex justify-center items-center"
      style={{
        backgroundImage: "url('/background/login.png')",
        backgroundSize: "cover",
      }}>
      <Outlet />

      <div
        style={{
          position: "fixed",
          bottom: 40,
          left: "50%",
          transform: "translate(-50%, 0)",
        }}>
        <p className="text-center bg-gray-600 py-1 px-4 rounded-xl shadow-xl">
          <span
            style={{
              fontSize: "1rem",
              color: "white",
              fontFamily: "Inter",
            }}>
            ©{new Date().getFullYear()} Powered by{" "}
            <a
              style={{ cursor: "pointer", color: "white", fontWeight: 600 }}
              href="https://itwork.mn"
              target="_blank"
              rel="noreferrer">
              “Айти Ворк” LLC
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
