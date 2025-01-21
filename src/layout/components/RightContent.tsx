import { FC } from "react";
import { Avatar, Dropdown, Space, Badge, Switch } from "antd";
import {
  BellOutlined,
  MoonOutlined,
  SunOutlined,
  FontSizeOutlined,
} from "@ant-design/icons";
import { getLocale, setLocale } from "@/utils/utils";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "@/stores/index";
import type { MenuProps } from "antd";

import cn from "@/assets/img/flag/cn.svg";
import hk from "@/assets/img/flag/hk.svg";
import en from "@/assets/img/flag/gb.svg";

import styles from "../index.module.scss";

const RightContent: FC = () => {
  const navigate = useNavigate();
  const { themeConfig, deviceInfo, setThemeConfig } = useGlobalStore();

  const handleLangClick: MenuProps["onClick"] = ({ key }) => {
    setLocale(key);
  };

  const handleFontClick: MenuProps["onClick"] = ({ key }) => {
    setThemeConfig({ fontSize: Number(key) });
  };

  const handleUserClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "1":
        navigate("/login", { replace: true });
        break;
      case "2":
        navigate("/account/AccountCenter");
        break;
      default:
        break;
    }
  };

  const items = [
    {
      key: "1",
      label: global.t("退出登录"),
    },
    {
      key: "2",
      label: "个人中心",
    },
  ];

  const langItems = [
    {
      key: "cn",
      label: "简体中文",
      icon: <img alt="cn" src={cn} width={25} />,
    },
    {
      key: "hk",
      label: "繁體中文",
      icon: <img alt="hk" src={hk} width={25} />,
    },
    {
      key: "en",
      label: "English",
      icon: (
        <img
          alt="en"
          src={en}
          width={25}
          height={16}
          style={{ objectFit: "cover" }}
        />
      ),
    },
  ];

  const fontItems = [
    {
      key: 13,
      label: "13px",
    },
    {
      key: 14,
      label: "14px",
    },
    {
      key: 15,
      label: "15px",
    },
    {
      key: 16,
      label: "16px",
    },
  ];

  return (
    <Space
      size={15}
      wrap
      className={styles.rightContent}
      style={{
        display: !themeConfig.collapsed && deviceInfo.isPhone ? "none" : "",
      }}
    >
      <Switch
        defaultChecked={themeConfig.mode === "dark"}
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<SunOutlined />}
        onChange={(checked) => {
          setThemeConfig({ mode: checked ? "dark" : "light" });
        }}
      />
      <span style={{ display: "flex" }}>
        <Badge count={0}>
          <BellOutlined style={{ fontSize: 24 }} />
        </Badge>
      </span>
      {/* <div className={styles.skin}>
                        <Button type="primary" shape="circle" icon={<SkinOutlined/>}/>
                        <Input
                                type="color"
                                className={styles.skin_input}
                                defaultValue={primaryColor}
                                onChange={debounce(changeMainColor, 500)}
                        ></Input>
                </div>*/}
      <Dropdown
        menu={{ items: fontItems, onClick: handleFontClick }}
        placement="bottom"
        arrow
      >
        <div>
          <FontSizeOutlined />
          {fontItems.find((item) => item.key === themeConfig.fontSize)?.label}
        </div>
      </Dropdown>
      <Dropdown
        menu={{ items: langItems, onClick: handleLangClick }}
        placement="bottom"
        arrow
      >
        <div>{langItems.find((item) => item.key === getLocale())?.icon}</div>
      </Dropdown>
      <Dropdown
        menu={{ items, onClick: handleUserClick }}
        placement="bottomRight"
        arrow
      >
        <Avatar
          src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          style={{ cursor: "pointer" }}
        />
      </Dropdown>
    </Space>
  );
};

export default RightContent;
