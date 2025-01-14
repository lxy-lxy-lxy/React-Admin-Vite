import React, { useState } from "react";
import { Card } from "antd";
import Basic from "./components/Basic.tsx";
import OneWay from "./components/OneWay.tsx";
import Search from "./components/Search.tsx";
import Pro from "./components/Pro.tsx";
import Custom from "./components/Custom.tsx";
import Pagination from "./components/Pagination.tsx";
import Table from "./components/Table.tsx";
import Tree from "./components/Tree.tsx";
import Status from "./components/Status.tsx";

const tabListNoTitle = [
  {
    key: "basic",
    label: global.t("基础"),
  },
  {
    key: "oneWay",
    label: global.t("单向样式"),
  },
  {
    key: "search",
    label: global.t("带搜索框"),
  },
  {
    key: "pro",
    label: global.t("高级用法"),
  },
  {
    key: "custom",
    label: global.t("自定义渲染"),
  },
  {
    key: "pagination",
    label: global.t("分页"),
  },
  {
    key: "table",
    label: global.t("表格"),
  },
  {
    key: "tree",
    label: global.t("树"),
  },
  {
    key: "status",
    label: global.t("状态"),
  },
];

const contentListNoTitle: Record<string, React.ReactNode> = {
  basic: <Basic />,
  oneWay: <OneWay />,
  search: <Search />,
  pro: <Pro />,
  custom: <Custom />,
  pagination: <Pagination />,
  table: <Table />,
  tree: <Tree />,
  status: <Status />,
};

const TransferTool: React.FC = () => {
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

export default TransferTool;
