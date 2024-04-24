import { Avatar, Popover } from "antd";
import { useAuthContext } from "context/auth";
import { Action } from "context/type";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import auth from "service/auth";
import { Logout01 } from "untitledui-js-base";

const Header: FC = () => {
  const [user, setAuth] = useAuthContext();
  const navigate = useNavigate();
  const { email } = user.user || {};
  const avatar = email?.substring(0, 2) || "AA";
  const color = "#146135";
  return (
    <>
      <div className=" p-4 justify-between items-start w-full text-black lg:text-white lg:flex hidden">
        <div className="">
          <Avatar shape="circle" style={{ backgroundColor: color }} size={40}>
            {avatar.toUpperCase()}
          </Avatar>
          <div>
            <p>{user.user?.email}</p>
          </div>
        </div>
        <div
          className="p-2 rounded-md text-black md:text-white  hover:bg-gray-600 cursor-pointer"
          onClick={() => {
            auth.removeToken();
            setAuth([Action.SIGN_OUT]);
            navigate("/auth/login");
          }}
        >
          <Logout01 size={"20"} stroke="#98A2B3" />
        </div>
      </div>
      <Popover
        className="lg:hidden block"
        trigger={["click"]}
        content={
          <button
            className="p-2 rounded-md text-black  cursor-pointer "
            onClick={() => {
              auth.removeToken();
              setAuth([Action.SIGN_OUT]);
              navigate("/auth/login");
            }}
          >
            <Logout01 size={"20"} stroke="#98A2B3" />
          </button>
        }
      >
        <Avatar shape="circle" style={{ backgroundColor: color }} size={40}>
          {avatar.toUpperCase()}
        </Avatar>
      </Popover>
    </>
  );
};

export default Header;
