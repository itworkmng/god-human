import { ActionType, EditableProTable } from "@ant-design/pro-table";
import { Divider, FormInstance, Select } from "antd";
import { EditButton } from "components/index";
import React, { FC, useEffect, useRef, useState } from "react";
import { Order, OrderItems } from "service/order/type";
import { moneyFormat } from "utils/index";
import { E_BLANK } from "utils/typdef";

const Theme: FC<{ data: Order; form: FormInstance<Order> }> = ({
  data,
  form,
}) => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly OrderItems[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data });
    }
  }, [data]);
  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      dataSource.forEach((item) => {
        total += item.quantity * item.price;
      });
      return total;
    };
    setTotalPrice(calculateTotalPrice());
    if (dataSource.length > 0) {
      form.setFieldValue(
        "order_items",
        dataSource.map((el) => ({ ...el, price: parseInt(el.price + "") }))
      );
    }
  }, [dataSource, data]);
  const statusOption = [{ value: E_BLANK.Printed, label: "Хэвлэгдсэн" }];
  return (
    <>
      <EditableProTable<OrderItems>
        rowKey="id"
        scroll={{
          x: 960,
        }}
        actionRef={actionRef}
        maxLength={5}
        recordCreatorProps={false}
        columns={[
          {
            width: 120,
            title: "Төрөл",
            editable: false,
            dataIndex: "blank.id",
            render: (_, record) => <div>{record.blank.name}</div>,
          },
          {
            width: 120,

            editable: false,
            title: "Хэмжээ",
            dataIndex: "quantity",
          },
          {
            width: 120,
            title: "Үнэ",
            dataIndex: "price",
            render: (_, record) => (
              <div>{moneyFormat(record.price, "mnt")}</div>
            ),
          },
          {
            width: 120,
            editable: false,
            title: "Нийт үнэ",
            render: (_, record) => (
              <div>{moneyFormat(record.quantity * record.price, "mnt")}</div>
            ),
          },
          {
            title: "Үйлдэл",
            valueType: "option",
            render: (_, record, __, action) => (
              <EditButton
                key={"editable"}
                onClick={() => {
                  action?.startEditable?.(record.id);
                }}
              />
            ),
          },
        ]}
        request={async () => ({
          data: form.getFieldValue("order_items"),
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          form,
          editableKeys,
          onSave: async () => {},
          onChange: setEditableRowKeys,
          actionRender: (row, config, dom) => [dom.save, dom.cancel],
        }}
      />{" "}
      <div>Нийт Үнэ: {moneyFormat(totalPrice, "mnt")}</div>
      <Divider />
      <Select defaultValue={"printed"} options={statusOption} />
    </>
  );
};

export default Theme;
