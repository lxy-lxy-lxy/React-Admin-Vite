import React, { useState } from "react";
import { Card } from "antd";
import BasicDivider from "./components/BasicDivider.tsx";
import TextDivider from "./components/TextDivider.tsx";
import PlainDivider from "./components/PlainDivider.tsx";
import VerticalDivider from "./components/VerticalDivider.tsx";
import VariantDivider from "./components/VariantDivider.tsx";

const tabListNoTitle = [
  {
    key: "basic",
    label: global.t("水平"),
  },
  {
    key: "text",
    label: global.t("带文字"),
  },
  {
    key: "plain",
    label: global.t("正文样式"),
  },
  {
    key: "vertical",
    label: global.t("垂直"),
  },
  {
    key: "variant",
    label: global.t("变体"),
  },
];

const contentListNoTitle: Record<string, React.ReactNode> = {
  basic: <BasicDivider />,
  text: <TextDivider />,
  plain: <PlainDivider />,
  vertical: <VerticalDivider />,
  variant: <VariantDivider />,
};

const DividerTool: React.FC = () => {
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

export default DividerTool;
