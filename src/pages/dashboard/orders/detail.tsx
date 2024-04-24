import { useRequest } from "ahooks";
import { Divider, Table, Tag, notification } from "antd";
import { SectionContainer } from "components/index";
import { IModalForm } from "components/modal";
import { useAuthContext } from "context/auth";
import dayjs from "dayjs";
import { useEffect } from "react";
import order from "service/order";
import { Order, OrderItems } from "service/order/type";
import { ActionComponentProps } from "types";
import {
  firstLastNames,
  moneyFormat,
  payStatusCheck,
  statusCheck,
} from "utils/index";
import { E_BLANK } from "utils/typdef";

const OrderDetail = ({
  onCancel,
  detail,
  open,
}: ActionComponentProps<Order>) => {
  const [{ user }] = useAuthContext();
  const {
    data,
    loading,
    run: order_run,
  } = useRequest(order.detail, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    open && order_run(detail?.id + "");
  }, [open]);
  return (
    <IModalForm
      title={`Захиалга (${detail?.id})`}
      noButton
      closeButton
      open={open}
      modalProps={{ onCancel }}
      loading={loading}>
      <div className="space-y-5">
        {detail?.client.company_name && (
          <>
            <div className="font-bold text-sm">Байгууллагын мэдээлэл</div>

            <SectionContainer
              label="Нэр"
              children={detail?.client.company_name || "-"}
            />
            <SectionContainer
              label="Регистр"
              children={detail?.client.company_register || "-"}
            />
            <SectionContainer
              label="Дугаар"
              children={detail?.client.company_phone_number || "-"}
            />
            <SectionContainer
              label="Имэйл"
              children={detail?.client.email || "-"}
            />
            <SectionContainer
              label="Цахим хуудас"
              children={
                detail?.client.social_address ? (
                  <a target="_blank" href={detail?.client.social_address}>
                    {detail?.client.social_address}
                  </a>
                ) : (
                  "-"
                )
              }
            />
            <SectionContainer
              label="Хаяг"
              children={
                (detail?.client.city || "-") +
                `${detail?.client.city ? ", " : ""}` +
                (detail?.client.province || "")
              }
            />
            <Divider />
          </>
        )}
        <div className="font-bold text-sm">Захиалгчын мэдээлэл</div>
        <SectionContainer
          label="Нэр"
          children={
            firstLastNames(
              detail?.client.last_name,
              detail?.client.first_name
            ) || "-"
          }
        />
        {!detail?.client.company_name && (
          <SectionContainer
            label="Имэйл"
            children={detail?.client.email || "-"}
          />
        )}
        <SectionContainer
          label="Утасны дугаар"
          children={detail?.client.phone_number || "-"}
        />
        <SectionContainer
          label="Албан тушаал"
          children={detail?.client.position || "-"}
        />
        <Divider />
        <div className="font-bold text-sm">Захиалгын мэдээлэл</div>
        <SectionContainer
          label="Төлөв"
          children={
            <Tag
              bordered={false}
              className="border-none rounded-full"
              color={statusCheck(detail?.status || E_BLANK.Request).color}>
              • {statusCheck(detail?.status || E_BLANK.Request).status}
            </Tag>
          }
        />
        <SectionContainer label="Төрөл" children={<div>Хэвлэмэл Хуудас</div>} />
        {!user?.checker_id && (
          <SectionContainer
            label="Нийт үнэ"
            children={moneyFormat(detail?.total_price, "mnt")}
          />
        )}
        {!user?.checker_id && (
          <>
            <SectionContainer label="Төлбөрийн суваг" children={<>Бэлэн</>} />
            <SectionContainer
              label="Үлдэгдэл"
              children={
                <Tag
                  className="border-none rounded-full"
                  color={
                    detail &&
                    payStatusCheck(detail.payments, detail.total_price) > 0
                      ? "red"
                      : "green"
                  }>
                  {detail &&
                    moneyFormat(
                      payStatusCheck(detail.payments, detail.total_price),
                      "mnt"
                    )}
                </Tag>
              }
            />
          </>
        )}
        <SectionContainer
          label="Захиалсан огноо"
          children={
            detail?.createdAt
              ? dayjs(detail?.createdAt).format("YYYY-MM-DD hh:mm:ss")
              : "-"
          }
        />
        <Divider />

        {detail?.received_name && (
          <>
            <div className="font-bold text-sm">Хүлээн авсан хүний мэдээлэл</div>
            <SectionContainer
              label="Хүлээн авсан"
              children={detail?.received_name}
            />
            <SectionContainer
              label="Холбоо барих"
              children={detail?.received_phone}
            />
          </>
        )}
        <Divider />

        <div className="font-bold text-sm">Захиалгын жагсаалт</div>
        <Table<OrderItems>
          bordered
          pagination={false}
          columns={[
            {
              title: "№",
              dataIndex: "",
              render: (_, __, index) => (
                <div style={{ textAlign: "center" }}>{index + 1}</div>
              ),
            },
            {
              title: "Төрөл",
              dataIndex: "blank",
              render: (_, record) => record.blank.name,
            },
            {
              title: "Ширхэг",
              dataIndex: "quantity",
            },
            !user?.checker_id
              ? {
                  title: "Нэгж үнэ",
                  dataIndex: "price",
                  render: (_, record) =>
                    record.price <= 0 ? "Хоосон" : record.price,
                }
              : {},
            !user?.checker_id
              ? {
                  title: "Нийт үнэ",
                  dataIndex: "price",
                  render: (_, record) =>
                    record.price <= 0
                      ? "Хоосон"
                      : record.price * record.quantity,
                }
              : {},
          ]}
          dataSource={data?.order_items}
        />
      </div>
    </IModalForm>
  );
};

export default OrderDetail;
