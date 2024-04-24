import { Tag, notification } from "antd";
import { ExportButton } from "components/index";
import { ITable } from "components/table";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { FC, useEffect } from "react";
import { Order } from "service/order/type";
import { exportFromTable } from "utils/export";
import {
  firstLastNames,
  moneyFormat,
  payStatusCheck,
  statusCheck,
} from "utils/index";
import { atomOrderForm } from "../store";
import OrderDetail from "../detail";
import { useInterval, useRequest } from "ahooks";
import order from "service/order";
import Update from "../update";
import { useAuthContext } from "context/auth";
import GodUpdate from "../godUpdate";

const AllTab: FC = () => {
  const [form, setForm] = useAtom(atomOrderForm);

  const [{ user }] = useAuthContext();
  const { data, loading, run, refresh } = useRequest(order.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });
  useInterval(() => {
    refresh();
  }, 10000);

  useEffect(() => {
    run({
      ...form,
      created_at: form.full_date,
    });
  }, [form]);
  return (
    <>
      <ITable<Order>
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
        loading={loading}
        hideCreateButton
        showDetailButton
        UpdateComponent={user?.checker_id ? GodUpdate : Update}
        DetailComponent={OrderDetail}
        refresh={() => {
          refresh();
        }}
        toolbarItems={
          <>
            <ExportButton
              onClick={() => {
                exportFromTable(
                  ["All Orders"],
                  window.document.getElementById("main-table") as HTMLElement,
                  window
                );
              }}
            />
          </>
        }
        total={data?.total || 0}
        dataSource={data?.items || []}
        columns={[
          {
            width: 300,
            dataIndex: "order_number",
            title: "Захиалгын дугаар",
            render: (_, record) => (
              <Tag color="blue" bordered={false}>
                {record.order_number}
              </Tag>
            ),
          },
          {
            width: 300,
            dataIndex: "client_name",
            title: "Захиалагчийн нэр",
            render: (_, record) =>
              firstLastNames(record.client.last_name, record.client.first_name),
          },
          {
            dataIndex: "status",
            title: "Төлөв",
            render: (_, record) => (
              <Tag color={statusCheck(record.status).color}>
                {statusCheck(record.status).status}
              </Tag>
            ),
          },
          {
            width: 300,
            dataIndex: "client_phone",
            title: "Утасны дугаар",
            render: (_, record) => record.client.phone_number,
          },
          {
            dataIndex: "is_fast",
            title: "Яаралтай эсэх",
            render: (_, record) => (
              <Tag bordered={false} color={record.is_fast ? "red" : "gold"}>
                {record.is_fast ? "Яаралтай" : "Энгийн"}
              </Tag>
            ),
          },
          {
            width: 300,
            dataIndex: "client_email",
            title: "И-мэйл",
            render: (_, record) => record.client.email,
          },
          !user?.checker_id
            ? {
                dataIndex: "pay_status",
                valueType: "number",
                title: "Үлдэгдэл",
                render: (_, record) => (
                  <div className="flex justify-between items-center">
                    <Tag
                      className="w-full text-center"
                      color={
                        payStatusCheck(record.payments, record.total_price) > 0
                          ? "red"
                          : "green"
                      }>
                      {moneyFormat(
                        payStatusCheck(record.payments, record.total_price),
                        "mnt"
                      )}
                    </Tag>
                  </div>
                ),
              }
            : {},
          !user?.checker_id
            ? {
                width: 300,
                dataIndex: "total_price",
                title: "Нийт дүн",
                render: (_, record) => moneyFormat(record.total_price, "mnt"),
              }
            : {},
          {
            width: 300,
            dataIndex: "createdAt",
            title: "Бүртгэсэн Огноо",
            render: (_, record) =>
              dayjs(record.createdAt).format("YYYY/MM/DD hh:mm"),
          },
        ]}
        details={data?.items || []}
      />
    </>
  );
};

export default AllTab;
