import { StrictMode, Suspense, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Card, Layout, Spin, theme } from "antd";
import HeaderComp from "./components/Header";
import { useLoginStore } from "@stores/index";
import AuthRoute from "@components/AuthRoute";
import SideBar from "./components/SideBar";

import "antd/dist/reset.css";
import styles from "./index.module.scss";
import { getLocale } from "@utils/utils";
import TabHistory from "./components/TabHistory";

const { Header, Content, Footer } = Layout;

const BasicLayout = () => {
  const { userInfo } = useLoginStore();
  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken();

  useEffect(() => {
    // 无感延迟放初次进入页面的闪烁
    setTimeout(() => {
      const layout = document.getElementById("rootLayout");
      layout.style.display = "";
    }, 188);
  }, []);

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  return (
    <StrictMode>
      <Layout
        id="rootLayout"
        style={{
          minHeight: "100vh",
          display: "none",
          "--localeFont": ["cn", "hk"].includes(getLocale())
            ? "1.4rem"
            : "1rem",
        }}
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
              <Suspense
                fallback={<Spin size="large" className="content_spin" />}
              >
                <Card
                  id="contentLayout"
                  wrap
                  gutter={[0, 50]}
                  layout="center"
                  style={{ minHeight: "100%" }}
                >
                  <Outlet />
                </Card>
              </Suspense>
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
