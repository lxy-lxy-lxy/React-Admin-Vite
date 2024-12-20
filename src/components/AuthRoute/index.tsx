import { FC, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import NoAuthPage from "@components/NoAuthPage";
import { useLoginStore } from "@stores/index";

const AuthRoute: FC<PropsWithChildren> = ({ children }) => {
  const { userInfo } = useLoginStore();
  const { pathname } = useLocation();
  const isAdmin = true;

  const obj: { [key: string]: boolean } = {};

  // 如果token存在 渲染界面
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  } else if (isAdmin || obj[pathname]) {
    return children;
  }

  return <NoAuthPage />;
};

export default AuthRoute;
