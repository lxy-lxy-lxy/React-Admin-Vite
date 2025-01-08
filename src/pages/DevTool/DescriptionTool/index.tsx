import React, { useState } from "react";
import { Card } from "antd";
import BasicDescription from "./components/BasicDescription.tsx";
import BorderDescription from "./components/BorderDescription.tsx";
import VerticalDescription from "./components/VerticalDescription.tsx";
import SizeDescription from "./components/SizeDescription.tsx";
import ResponsiveDescription from "./components/ResponsiveDescription.tsx";
import FillDescription from "./components/FillDescription.tsx";

const tabListNoTitle = [
  {
    key: "basic",
    label: global.t("水平"),
  },
  {
    key: "border",
    label: global.t("带边框"),
  },
  {
    key: "vertical",
    label: global.t("垂直"),
  },
  {
    key: "size",
    label: global.t("自定义尺寸"),
  },
  {
    key: "responsive",
    label: global.t("响应式"),
  },
  {
    key: "fill",
    label: global.t("整行"),
  },
];

const contentListNoTitle: Record<string, React.ReactNode> = {
  basic: <BasicDescription />,
  border: <BorderDescription />,
  vertical: <VerticalDescription />,
  size: <SizeDescription />,
  responsive: <ResponsiveDescription />,
  fill: <FillDescription />,
};

const DescriptionTool: React.FC = () => {
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

export default DescriptionTool;
