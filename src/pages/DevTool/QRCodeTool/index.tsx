import React, { useState } from "react";
import { Card } from "antd";
import BasicQRCode from "./components/BasicQRCode.tsx";
import IconQRCode from "./components/IconQRCode.tsx";
import StatusQRCode from "./components/StatusQRCode.tsx";
import TypeQRCode from "./components/TypeQRCode.tsx";
import SizeQRCode from "./components/SizeQRCode.tsx";
import ColorQRCode from "./components/ColorQRCode.tsx";
import ErrorLvQRCode from "./components/ErrorLvQRCode.tsx";

const tabListNoTitle = [
  {
    key: "basic",
    label: global.t("基础"),
  },
  {
    key: "icon",
    label: global.t("带Icon"),
  },
  {
    key: "status",
    label: global.t("自定义状态"),
  },
  {
    key: "type",
    label: global.t("自定义类型"),
  },
  {
    key: "size",
    label: global.t("自定义尺寸"),
  },
  {
    key: "color",
    label: global.t("自定义颜色"),
  },
  {
    key: "errorLv",
    label: global.t("纠错比例"),
  },
];

const contentListNoTitle: Record<string, React.ReactNode> = {
  basic: <BasicQRCode />,
  icon: <IconQRCode />,
  status: <StatusQRCode />,
  type: <TypeQRCode />,
  size: <SizeQRCode />,
  color: <ColorQRCode />,
  errorLv: <ErrorLvQRCode />,
};

const QRCodeTool: React.FC = () => {
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

export default QRCodeTool;
