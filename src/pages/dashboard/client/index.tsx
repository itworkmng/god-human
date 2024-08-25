import { useRequest } from "ahooks";
import { Button, Image, Tag, notification } from "antd";
import { ITable } from "components/table";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import client from "service/client";
import { IClient } from "service/client/type";
import Create from "./create";
import Update from "./update";
import { UnlockOutlined } from "@ant-design/icons";
import { imageUrl, tokenDecode } from "utils/index";
import { ERROR_MESSAGE, IERROR } from "utils/typdef";
import { useAuthContext } from "context/auth";

const ClientPage = () => {
  const [{ user }] = useAuthContext();
  const [filter, setFilter] = useState({
    current: 0,
    pageSize: 20,
  });
  const { data, run } = useRequest(client.list, {
    manual: true,
  });

  const { runAsync } = useRequest(client.client_change_password, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Амжилттай",
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

  useEffect(() => {
    run(user?.checker_id ? user.checker_id : tokenDecode()?.id || 0, {
      ...(filter as any),
    });
  }, [filter]);

  return (
    <>
      <ITable<IClient>
        headerTitle={
          !user?.is_active && (
            <div className="mx-2">
              <Tag color="red" bordered={false}>
                {" "}
                Таны эрх хаагдсан байна
              </Tag>
            </div>
          )
        }
        dataSource={data?.items}
        loading={false}
        total={data?.total || 0}
        CreateComponent={Create}
        refresh={(values) => {
          run(
            user?.checker_id ? user.checker_id : tokenDecode()?.id || 0,
            values
          );
        }}
        customActions={(record) => {
          return (
            <Button
              type="text"
              icon={<UnlockOutlined />}
              onClick={async () => {
                await runAsync(record.id);
              }}
            />
          );
        }}
        onPaginationChange={(current, pageSize) => {
          setFilter({
            ...filter,
            current: current - 1,
            pageSize,
          });
        }}
        UpdateComponent={Update}
        RemoveModelConfig={{
          action: client.remove,
          config: (record) => {
            return {
              title: "Remove",
              uniqueKey: record?.id ?? 0,
              display: record?.last_name + " " + record?.first_name,
            };
          },
        }}
        columns={[
          {
            width: 300,
            dataIndex: "last_name",
            title: "Овог",
          },
          {
            dataIndex: "photo",
            title: "Зураг",
            render: (_, record) => <Image src={imageUrl(record.photo)} />,
          },
          {
            width: 300,
            dataIndex: "first_name",
            title: "Нэр",
          },
          {
            width: 300,
            dataIndex: "email",
            title: "И-мэйл",
          },
          {
            width: 300,
            dataIndex: "phone_number",
            title: "Утасны дугаар",
          },
          {
            width: 300,
            dataIndex: "position",
            title: "Албан тушаал",
          },
          {
            width: 300,
            dataIndex: "is_active",
            title: "Идэвхтэй эсэх",
            render: (_, record) => (
              <Tag
                bordered={false}
                color={record.is_active ? "success" : "error"}
                className="rounded-full border-none"
              >
                {record.is_active ? "Тийм" : "Үгүй"}
              </Tag>
            ),
          },
          {
            width: 300,
            dataIndex: "expire_date",
            title: "Дуусах огноо",
            valueType: "date",
            render: (_, record) => (
              <span>
                {dayjs(record.expire_date).format("YYYY-MM-DD HH:MM")}
              </span>
            ),
          },
          {
            width: 300,
            dataIndex: "createdAt",
            title: "Бүртгүүлсэн огноо",
            valueType: "date",
            render: (_, record) => (
              <span>{dayjs(record.createdAt).format("YYYY-MM-DD HH:MM")}</span>
            ),
          },
        ]}
      />
    </>
  );
};

export default ClientPage;
