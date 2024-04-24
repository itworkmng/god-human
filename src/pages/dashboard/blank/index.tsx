import { useDebounceFn, useRequest } from "ahooks";
import { Tag } from "antd";
import { FilterForm } from "components/filter";
import { ITable } from "components/index";
import { BLANK_STATUS } from "config";
import { useEffect, useState } from "react";
import blank from "service/blank";
import Create from "./create";
import Update from "./update";
import dayjs from "dayjs";
import Blank from "service/blank";
import { IBlank } from "service/blank/type";

const BlankPage = () => {
  const [filter, setFilter] = useState<any>({
    page: 0,
    pageSize: 20,
  });

  const { run, data } = useRequest(Blank.user_list, {
    manual: true,
  });

  useEffect(() => {
    run(filter);
  }, [filter]);

  return (
    <div className="space-y-3">
      <FilterForm
        noFilter
        showGroupButton={false}
        initialValues={{
          ...filter,
        }}
        onValuesChange={(curr) => {
          console.log(curr);
          if (curr.full_date) {
            curr.deadline = undefined;
          }

          if (curr.query) {
            setFilter({ ...filter, query: curr.query });
          } else {
            setFilter({
              ...filter,
              start_date:
                curr.full_date && dayjs(curr.full_date[0]).add(8, "hour"),
              end_date:
                curr.full_date && dayjs(curr.full_date[1]).add(8, "hour"),
            });
          }
        }}
        filters={<></>}
      />
      <ITable<IBlank>
        dataSource={data?.items}
        loading={false}
        total={data?.total}
        refresh={(values) =>
          run({
            ...filter,
            ...values,
          })
        }
        UpdateComponent={Update}
        CreateComponent={Create}
        RemoveModelConfig={{
          action: blank.remove,
          config: (record) => {
            return {
              title: "Remove",
              uniqueKey: record?.id,
              display: record?.name,
            };
          },
        }}
        columns={[
          {
            width: 300,
            dataIndex: "name",
            title: "Бланкын төрөл",
          },
          {
            width: 300,
            dataIndex: "title",
            title: "Төлөв",
            render: (_, record) => (
              <Tag
                bordered={false}
                color={
                  record.is_select
                    ? BLANK_STATUS.active.color
                    : BLANK_STATUS.inactive.color
                }
                className="rounded-full border-none"
              >
                •{" "}
                {record.is_select
                  ? BLANK_STATUS.active.label
                  : BLANK_STATUS.inactive.label}
              </Tag>
            ),
          },
        ]}
      />
    </div>
  );
};

export default BlankPage;
