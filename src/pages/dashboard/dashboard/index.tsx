import { useAtom } from "jotai";
import { FC } from "react";
import DashboardSection from "./dashboard";
import { atomFormDashboard } from "./store";

const DashboardPage: FC = () => {
  const [form, setForm] = useAtom(atomFormDashboard);
  return (
    <div className="flex flex-col flex-wrap gap-5">
      <DashboardSection />
      <div className="col-span-10 xl:col-span-6">{/*  */}</div>
    </div>
  );
};

export default DashboardPage;
