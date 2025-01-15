import React, { useState } from "react";
import { Card } from "antd";
import Basic from "./components/Basic.tsx";

const tabListNoTitle = [
  {
    key: "basic",
    label: global.t("基础"),
  },
];

const contentListNoTitle: Record<string, React.ReactNode> = {
  basic: <Basic />,
};

const ButtonTool: React.FC = () => {
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

export default ButtonTool;
