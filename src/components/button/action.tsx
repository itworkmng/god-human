import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, ButtonProps, Tooltip } from "antd";
import { AiOutlineEye } from "react-icons/ai";
import { BiCheckCircle } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineCheckCircleOutline, MdOutlineClose } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";

type PropsCreate = ButtonProps;
export const CreateButton = ({ ...rest }: PropsCreate) => {
  return (
    <Button
      {...rest}
      className={`flex items-center   font-medium gap-1 ${rest.className}`}
      icon={<IoAddCircleOutline size={20} />}
      type="primary">
      Үүсгэх
    </Button>
  );
};

export const ApproveButton = ({ ...rest }: ButtonProps) => {
  return (
    <Button
      {...rest}
      className="flex items-center  font-medium gap-1"
      icon={<BiCheckCircle size={20} />}
      type="primary">
      Approve
    </Button>
  );
};
export const DeleteButton = ({ ...rest }: ButtonProps) => {
  return (
    <Tooltip title="Delete">
      <Button
        {...rest}
        color="red"
        className="text-red-500 flex gap-1 items-center font-medium px-1"
        type="text">
        <FiTrash2 size={20} />
      </Button>
    </Tooltip>
  );
};

export const DetailButton = ({
  color,
  ...rest
}: ButtonProps & { color?: string }) => {
  return (
    <Tooltip title="Detail">
      <Button
        {...rest}
        className="flex gap-1 items-center font-medium px-1"
        type="text">
        <AiOutlineEye size={20} className={color ? color : " text-gray-700"} />
      </Button>
    </Tooltip>
  );
};

export const EditButton = ({ ...rest }: ButtonProps) => {
  return (
    <Tooltip title="Edit">
      <Button
        {...rest}
        type="text"
        className=" flex gap-1 items-center font-medium px-1">
        <TbEdit size={20} className="text-gray-700" />
      </Button>
    </Tooltip>
  );
};

export const InActiveButton = ({
  tooltipTitle,
  ...rest
}: ButtonProps & {
  tooltipTitle?: string;
}) => {
  return (
    <Tooltip title={tooltipTitle ? tooltipTitle : "Cancel"}>
      <Button
        {...rest}
        color="red"
        className="text-red-500 flex items-center gap-1 font-medium px-1"
        type="text">
        <MdOutlineClose size={20} />
      </Button>
    </Tooltip>
  );
};

export const CheckButton = ({
  tooltipTitle,
  ...rest
}: ButtonProps & {
  tooltipTitle?: string;
}) => {
  return (
    <Tooltip title={tooltipTitle ? tooltipTitle : "Approve"}>
      <Button
        {...rest}
        color="red"
        className=" flex items-center gap-1 font-medium px-1"
        type="text">
        <MdOutlineCheckCircleOutline className="text-success-600" size={20} />
      </Button>
    </Tooltip>
  );
};

export const ConfirmButton = ({ ...rest }: ButtonProps) => {
  return (
    <Button
      {...rest}
      icon={<CheckCircleOutlined className="text-white " size={20} />}
      color="green"
      type="default"
      style={{
        backgroundColor: "#039855",
        borderColor: "#039855",
        color: "#fff",
      }}>
      Confirm
    </Button>
  );
};

export const PermissionButton = ({ ...rest }) => {
  return (
    <Tooltip title="Permission">
      <Button
        {...rest}
        className="text-gray-700 flex items-center gap-1 font-medium px-1"
        type="text">
        <RiUserSettingsLine size={20} />
      </Button>
    </Tooltip>
  );
};
