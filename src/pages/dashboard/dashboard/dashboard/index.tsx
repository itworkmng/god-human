import { useRequest } from "ahooks";
import { notification } from "antd";
import DashboardCard from "components/dashboard_card";
import { useAtom } from "jotai";
import { FC, useEffect } from "react";
import dashboard from "service/dashboard";
import { atomFormDashboard } from "../store";
import { useAuthContext } from "context/auth";
import { ROLE } from "utils/typdef";

const DashboardSection: FC = () => {
  const { data, run, loading } = useRequest(dashboard.dashboardStats, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });
  const [{ user }] = useAuthContext();
  const [form] = useAtom(atomFormDashboard);

  const fetch = () => {
    run((user?.role == "god" ? user?.checker_id : user?.id) || 0);
  };

  useEffect(() => {
    fetch();
  }, [form]);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          label="Нийт Захиалагч"
          amount={data?.clients}
          percent={0}
          loading={loading}
          href="/dashboard/client"
        />
        <DashboardCard
          label="Нийт захиалга"
          amount={data?.order}
          percent={0}
          loading={loading}
          href="/dashboard/orders"
        />
        {user?.role == ROLE.human && (
          <DashboardCard
            label="Нийт дүн"
            amount={data?.total_price}
            percent={0}
            loading={loading}
            isMoney
          />
        )}
      </div>
    </div>
  );
};

export default DashboardSection;
