import { CSSProperties, StrictMode, useEffect, FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Layout, theme } from "antd";
import HeaderComp from "./components/Header";
import { useLoginStore } from "@stores/index";
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
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken();

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
              ? "1.4rem"
              : "1rem",
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
          <Header
            style={{
              padding: "0 1rem",
              height: "4.8rem",
              borderTop: `0.1rem solid ${colorBorderSecondary}`,
              background: colorBgContainer,
            }}
          >
            <TabHistory />
          </Header>
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
