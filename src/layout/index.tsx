import { CSSProperties, StrictMode, useEffect, FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Layout, theme } from "antd";
import HeaderComp from "./components/Header";
import { useGlobalStore, useLoginStore } from "@stores/index";
import AuthRoute from "@components/AuthRoute";
import SideBar from "./components/SideBar";
import { getLocale } from "@utils/utils";
import TabHistory from "./components/TabHistory";

import "antd/dist/reset.css";
import styles from "./index.module.scss";

const { Header, Content, Footer } = Layout;

const BasicLayout: FC = () => {
  const { userInfo } = useLoginStore();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const tagStatus = useGlobalStore((state) => state.themeConfig.tagStatus);
  const fontSize = useGlobalStore((state) => state.themeConfig.fontSize);

  useEffect(() => {
    // 无感延迟避免初次进入页面的闪烁
    setTimeout(() => {
      const layout = document.getElementById("rootLayout");
      if (layout) layout.style.display = "";
    }, 188);
  }, []);

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  return (
    <StrictMode>
      <Layout
        id="rootLayout"
        style={
          {
            "--localeFont": ["cn", "hk"].includes(getLocale())
              ? `${(fontSize || 15) / 10}rem`
              : `${((fontSize || 15) - 4) / 10}rem`,
            "--extraHeight": tagStatus ? "4.8rem" : "",
            display: "none",
            minHeight: "100vh",
          } as CSSProperties
        }
      >
        <SideBar />
        <Layout>
          <Header style={{ padding: "0 1rem", background: colorBgContainer }}>
            <HeaderComp />
          </Header>
          {tagStatus && <TabHistory />}
          <Content className={styles.layout}>
            <AuthRoute>
              <Outlet />
            </AuthRoute>
          </Content>
          <Footer id="footerLayout" style={{ textAlign: "center" }}>
            Copyright © 2024 React Admin Vite
          </Footer>
        </Layout>
      </Layout>
    </StrictMode>
  );
};

export default BasicLayout;
