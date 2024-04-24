import { Tabs, Tooltip } from "antd";
import { IfCondition } from "components/index";
import { FC, useState } from "react";
import AllTab from "./all";
import UnpaidTab from "./unpaid";
import { useAuthContext } from "context/auth";

enum TabType {
  all = "all",
  unpaid = "unpaid",
}

const OrderPage: FC = () => {
  const [tab, setTab] = useState<TabType>(TabType.all);
  const [{ user }] = useAuthContext();
  return (
    <>
      {/* <OrderForm /> */}

      {user?.checker_id ? (
        <AllTab />
      ) : (
        <>
          <Tabs
            onChange={(key) => {
              setTab(key as TabType);
            }}
            defaultActiveKey={tab}
            items={[
              {
                key: TabType.all,
                label: <Tooltip title="Нийт захиалга">Нийт захиалга</Tooltip>,
              },
              {
                key: TabType.unpaid,
                label: (
                  <Tooltip title="Төлбөр төлөгдөөгүй">
                    Төлбөр төлөгдөөгүй
                  </Tooltip>
                ),
              },
            ]}
          />
          {/* Tab */}
          <div className="space-y-3 mt-4">
            <IfCondition
              condition={tab === TabType.all}
              whenTrue={<AllTab />}
            />
            <IfCondition
              condition={tab === TabType.unpaid}
              whenTrue={<UnpaidTab />}
            />
          </div>
        </>
      )}
    </>
  );
};

export default OrderPage;
