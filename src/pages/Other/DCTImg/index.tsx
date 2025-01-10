import React, { useState } from "react";
import { Card } from "antd";
import BasicDCT from "./components/BasicDCT.tsx";

const tabListNoTitle = [
  {
    key: "basic",
    label: global.t("基础"),
  },
];

const contentListNoTitle: Record<string, React.ReactNode> = {
  basic: <BasicDCT />,
};

const DCTImg: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>("basic");

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  return (
    <Card
      style={{ width: "100%" }}
      tabList={tabListNoTitle}
      activeTabKey={activeTabKey}
      onTabChange={onTabChange}
      tabProps={{
        size: "middle",
      }}
    >
      {contentListNoTitle[activeTabKey]}
    </Card>
  );
};

export default DCTImg;
