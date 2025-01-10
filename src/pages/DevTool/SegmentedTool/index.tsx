import React, { useState } from "react";
import { Card } from "antd";
import Basic from "./components/Basic.tsx";
import Vertical from "./components/Vertical.tsx";
import Block from "./components/Block.tsx";
import Disabled from "./components/Disabled.tsx";
import Control from "./components/Control.tsx";
import Custom from "./components/Custom.tsx";
import Load from "./components/Load.tsx";
import Size from "./components/Size.tsx";
import Group from "./components/Group.tsx";
import Icon from "./components/Icon.tsx";

const tabListNoTitle = [
  {
    key: "basic",
    label: global.t("基础"),
  },
  {
    key: "vertical",
    label: global.t("垂直"),
  },
  {
    key: "block",
    label: global.t("宽度适应"),
  },
  {
    key: "disabled",
    label: global.t("禁用"),
  },
  {
    key: "control",
    label: global.t("受控"),
  },
  {
    key: "render",
    label: global.t("自定义"),
  },
  {
    key: "load",
    label: global.t("动态数据"),
  },
  {
    key: "load",
    label: global.t("动态数据"),
  },
  {
    key: "size",
    label: global.t("三种大小"),
  },
  {
    key: "group",
    label: global.t("分组"),
  },
  {
    key: "icon",
    label: global.t("仅Icon"),
  },
];

const contentListNoTitle: Record<string, React.ReactNode> = {
  basic: <Basic />,
  vertical: <Vertical />,
  block: <Block />,
  disabled: <Disabled />,
  control: <Control />,
  render: <Custom />,
  load: <Load />,
  size: <Size />,
  group: <Group />,
  icon: <Icon />,
};

const SegmentedTool: React.FC = () => {
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

export default SegmentedTool;
