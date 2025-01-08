import React, { useState } from "react";
import { Card } from "antd";
import SimpleList from "./components/SimpleList.tsx";
import BasicList from "./components/BasicList.tsx";
import LoadMoreList from "./components/LoadMoreList.tsx";
import VerticalList from "./components/VerticalList.tsx";
import ResponsiveList from "./components/ResponsiveList.tsx";

const tabListNoTitle = [
  {
    key: "simple",
    label: global.t("简单"),
  },
  {
    key: "basic",
    label: global.t("基础"),
  },
  {
    key: "loadMore",
    label: global.t("加载更多"),
  },
  {
    key: "vertical",
    label: global.t("竖排"),
  },
  {
    key: "responsive",
    label: global.t("响应式"),
  },
];

const contentListNoTitle: Record<string, React.ReactNode> = {
  simple: <SimpleList />,
  basic: <BasicList />,
  loadMore: <LoadMoreList />,
  vertical: <VerticalList />,
  responsive: <ResponsiveList />,
};

const ListTool: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>("simple");

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

export default ListTool;
