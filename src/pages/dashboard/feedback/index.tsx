import { useDebounceFn, useRequest } from "ahooks";
import { Avatar, notification } from "antd";
import { ExportButton, FilterForm, ITable } from "components/index";
import { useAtom } from "jotai";
import { useEffect } from "react";
import file from "service/file";
import settings from "service/settings";
import { Feedback } from "service/settings/types";
import { exportFromTable } from "utils/export";
import { calculateDeadlineDate } from "utils/index";
import dayjs from "dayjs";

const Feedback = () => {
  const {
    data,
    loading,
    run: fetch,
  } = useRequest(settings.feedbackList, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });
  const [form, setForm] = useAtom({});

  useEffect(() => {
    run({
      start_date: form.full_date
        ? dayjs(form.full_date[0]).add(8, "hour")
        : undefined,
      end_date: form.full_date
        ? dayjs(form.full_date[1]).add(8, "hour")
        : undefined,
      full_date: undefined,
    });
  }, [form]);

  const run = (values?: any) => {
    fetch({
      ...form,
      ...values,
    });
  };

  const debounceSet = useDebounceFn((values) => setForm(values), {
    wait: 500,
  });
  return (
    <div className="space-y-3">
      <FilterForm
        noFilter
        initialValues={{
          ...form,
        }}
        onValuesChange={(curr) => {
          if (curr.full_date) {
            curr.deadline = undefined;
          }
          if (curr.deadline >= 0) {
            curr.full_date = calculateDeadlineDate(curr.deadline)?.map((el) =>
              el.format("YYYY/MM/DD")
            );
          }
          if (curr.search || !curr.search)
            debounceSet.run({ ...form, ...curr });
          else setForm({ ...form, ...curr });
        }}
      />
      <ITable<Feedback>
        hideCreateButton
        toolbarItems={
          <div className="flex items-center gap-2">
            <ExportButton
              onClick={() => {
                exportFromTable(
                  ["feedback"],
                  window.document.getElementById("main-table") as HTMLElement,
                  window
                );
              }}
            />
          </div>
        }
        total={data?.total || 0}
        dataSource={data?.items}
        columns={[
          {
            dataIndex: "customer",
            title: "Хэрэглэгч",
            render: (_, record) => (
              <div className="flex items-center gap-2">
                <Avatar
                  style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                  src={file.fileToUrl(record.user?.profile)}
                >
                  {record.user?.full_name?.[0]}
                </Avatar>
                <div>{record.user?.full_name}</div>
              </div>
            ),
            width: 300,
          },
          {
            dataIndex: "content",
            title: "Тайлбар",
          },
        ]}
        loading={loading}
        refresh={(values) => {
          run({
            ...values,
          });
        }}
      />
    </div>
  );
};

export default Feedback;
