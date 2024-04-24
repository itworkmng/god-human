import { useState } from "react";

enum TabType {
  terms = "terms",
  faq = "faq",
  avatars = "avatars",
  contact = "contact",
}

const SettingPage = () => {
  const [tab, setTab] = useState<TabType>(TabType.terms);

  return <div className="space-y-3">{/*  */}</div>;
};

export default SettingPage;
