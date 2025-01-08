import React, { useState } from "react";
import { Card } from "antd";
import BasicSelect from "./components/BasicSelect.tsx";
import RemoteSelect from "./components/RemoteSelect.tsx";
import MultipleSelect from "./components/MultipleSelect.tsx";
import OptionRenderSelect from "./components/OptionRenderSelect.tsx";
import VirtualSelect from "./components/VirtualSelect.tsx";
import CountSelet from "./components/CountSelet.tsx";

const tabListNoTitle = [
  {
    key: "basic",
    label: global.t("基础"),
  },
  {
    key: "remote",
    label: global.t("搜索"),
  },
  {
    key: "multiple",
    label: global.t("多选"),
  },
  {
    key: "optionRender",
    label: global.t("自定义下拉"),
  },
  {
    key: "virtual",
    label: global.t("大数据"),
  },
  {
    key: "count",
    label: global.t("最大选中数量"),
  },
];

const contentListNoTitle: Record<string, React.ReactNode> = {
  basic: <BasicSelect />,
  remote: <RemoteSelect />,
  multiple: <MultipleSelect />,
  optionRender: <OptionRenderSelect />,
  virtual: <VirtualSelect />,
  count: <CountSelet />,
};

const SelectTool: React.FC = () => {
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

export default SelectTool;
