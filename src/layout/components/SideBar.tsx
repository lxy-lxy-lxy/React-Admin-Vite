import { FC, Fragment, useContext, useEffect, useState } from "react";
import type {
  CSSProperties,
  ReactInstance,
  MouseEvent,
  KeyboardEvent,
} from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useGlobalStore, useLoginStore } from "@stores/index";
import { RouteContext } from "../../main.tsx";

import logo from "@assets/img/logo/logo.svg";
import styles from "../index.module.scss";

const { Sider } = Layout;

interface MenuInfo {
  key: string;
  keyPath: string[];
  item: ReactInstance;
  domEvent: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>;
}

const SideBar: FC = () => {
  const {
    routeData: { menus },
  } = useContext(RouteContext)!;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { themeConfig, deviceInfo } = useGlobalStore();
  const { collapsed } = themeConfig;
  const { userInfo } = useLoginStore();
  const [childMenus, setChildMenus] = useState<RootLayout.SideMenu[] | []>([]);
  const [parentSelectedKey, setParentSelectedKey] = useState<string[]>([]);

  useEffect(() => {
    const currentKey = renderOpenKeys()?.[0];

    setChildMenus(
      menus.find((item) => item.key === currentKey)?.children || [],
    );
    setParentSelectedKey(currentKey ? [currentKey] : []);
  }, [pathname, menus]);

  const onMenuClick: (e: MenuInfo, type?: "child" | "parent") => void = (
    { key },
    type = "child",
  ) => {
    const isChild = type === "child";
    if (isChild) {
      navigate(key);
    }
    if (!isChild) {
      setChildMenus(menus.find((item) => item.key === key)?.children || []);
      setParentSelectedKey([key]);
    }
  };

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  const renderOpenKeys = () => {
    const arr = pathname.split("/").slice(1);
    if (arr.length < 2) {
      return ["/"];
    }
    return arr.map((_, index) => `/${arr.slice(0, index + 1).join("/")}`);
  };

  return (
    <Fragment>
      {(!deviceInfo.isPhone || !collapsed) && (
        <Sider
          theme={!themeConfig.menuExtend ? "dark" : "light"}
          collapsible={false}
          collapsed={false}
          className={styles.firstSider}
        >
          <div className={styles.siderLogo}>
            <img alt="" src={logo} width={45} height={45} />
          </div>
          <Menu
            theme={!themeConfig.menuExtend ? "dark" : "light"}
            selectedKeys={parentSelectedKey}
            items={
              collapsed
                ? menus
                : menus.map((item) => ({ ...item, children: null }))
            }
            onClick={(e) => onMenuClick(e, collapsed ? "child" : "parent")}
          />
        </Sider>
      )}
      <Sider
        className={styles.secondSider}
        theme="light"
        style={
          {
            "--collapsed": collapsed ? "hidden" : "visible",
            "--width": collapsed ? "0" : "20rem",
          } as CSSProperties
        }
        collapsible={false}
        collapsed={false}
      >
        <div className={styles.siderHeader}>
          <span>React Admin Vite</span>
        </div>
        <Menu
          selectedKeys={[pathname]}
          defaultOpenKeys={renderOpenKeys()}
          mode="inline"
          items={childMenus}
          onClick={onMenuClick}
        />
      </Sider>
    </Fragment>
  );
};

export default SideBar;
