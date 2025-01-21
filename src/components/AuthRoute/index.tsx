import { FC, PropsWithChildren, Suspense, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import NoAuthPage from "@/components/NoAuthPage";
import { useLoginStore } from "@/stores/index";
// import { CSSTransition, SwitchTransition } from "react-transition-group";
import NProgress from "nprogress";
import { Card, Spin } from "antd";

import "nprogress/nprogress.css";
import "./index.css";
import KeepAlive from "@/components/KeepAlive/KeepAlive.tsx";

const Loading = () => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return <Spin size="large" className="content_spin" />;
};

const AuthRoute: FC<PropsWithChildren> = ({ children }) => {
  const { userInfo } = useLoginStore();
  const { pathname } = useLocation();
  // const {
  //   themeConfig: { routeAn },
  // } = useGlobalStore();
  const isAdmin = true;

  const obj: { [key: string]: boolean } = {};

  // 如果token存在 渲染界面
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  } else if (isAdmin || obj[pathname]) {
    return (
      <KeepAlive activeKey={pathname}>
        <Card id="contentLayout" style={{ minHeight: "100%" }}>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </Card>
      </KeepAlive>
    );
  }

  return <NoAuthPage />;
};

export default AuthRoute;
