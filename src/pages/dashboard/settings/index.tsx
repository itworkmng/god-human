import { FiSettings } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import Update from "./update";
import { useAuthContext } from "context/auth";
import { useState } from "react";
import auth from "service/auth";
import { useRequest } from "ahooks";
import { notification } from "antd";
import { ERROR_MESSAGE, IERROR } from "utils/typdef";

const SettingPage = () => {
  const [{ user }] = useAuthContext();
  const [updateInfo, setUpdateInfo] = useState(false);
  const { runAsync: runPassword } = useRequest(auth.change_password, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Амжилттай солигдлоо",
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
    <>
      <div className="container bg-white p-5 rounded-md flex flex-col gap-4">
        <a className="flex gap-3" onClick={() => runPassword(user?.id || 0)}>
          <RiLockPasswordLine color="#004dd9" size={34} />
          <div className="flex flex-col gap-2">
            <div className="font-semibold">Нууц үг солих</div>
            <div className="text-gray-600">
              Хэрэглэгч системд нэвтрэх нууц үгээ өөрчлөх үйл ажиллагааг энэхүү
              модулийн тусламжтайгаар хэрэгжүүлнэ.
            </div>
          </div>
        </a>
        <a
          className="flex gap-3"
          onClick={() => {
            setUpdateInfo(true);
          }}>
          <FiSettings color="#004dd9" size={34} />
          <div className="flex flex-col gap-2">
            <div className="font-semibold">Хувийн мэдээлэл засварлах</div>
            <div className="text-gray-600">
              Хэрэглэгч хувийн мэдээллээ өөрчлөх (утасны дугаар, хаягийн
              мэдээлэл болон профайл зургаа солих) үйл ажиллагааг энэхүү
              модулийн тусламжтайгаар хэрэгжүүлнэ.
            </div>
          </div>
        </a>
      </div>
      <Update
        open={updateInfo}
        onFinish={() => {
          setUpdateInfo(false);
          location.reload();
        }}
        onRefetch={() => {}}
        onCancel={() => {
          setUpdateInfo(false);
        }}
        detail={user}
      />
    </>
  );
};

export default SettingPage;
