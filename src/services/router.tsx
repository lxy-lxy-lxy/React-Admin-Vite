import { lazy } from "react";
import ErrorPage from "@components/ErrorPage";
import LoginPage from "../layout/components/Login";
import App from "../App";
import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  ToolOutlined,
} from "@ant-design/icons";

// 工作台
const Dashboard = lazy(() => import("@pages/Dashboard"));

// 配置中心
const AccountCenter = lazy(() => import("@pages/Setting/AccountCenter"));
const UserManage = lazy(() => import("@pages/Setting/UserManage"));
const RoleManage = lazy(() => import("@pages/Setting/RoleManage"));

// DEV工具
const TableTool = lazy(() => import("@pages/DevTool/TableTool"));
const EditorTool = lazy(() => import("@pages/DevTool/EditorTool"));
const ThemeTool = lazy(() => import("@pages/DevTool/ThemeTool"));
const ButtonTool = lazy(() => import("@pages/DevTool/ButtonTool"));
const FormTool = lazy(() => import("@pages/DevTool/DataTool/FormTool"));
const DateTool = lazy(() => import("@pages/DevTool/DataTool/DateTool"));
const RadioTool = lazy(() => import("@pages/DevTool/DataTool/RadioTool"));
const CheckTool = lazy(() => import("@pages/DevTool/DataTool/CheckTool"));
const InputTool = lazy(() => import("@pages/DevTool/DataTool/InputTool"));

const routes = [
  {
    errorElement: <ErrorPage />,
    children: [
      {
        title: "工作台",
        icon: <DashboardOutlined />,
        path: "",
        children: [{ index: true, title: "首页", element: <Dashboard /> }],
      },
      {
        path: "setting",
        title: "配置",
        icon: <UserOutlined />,
        children: [
          {
            path: "/setting/AccountCenter",
            title: "个人中心",
            element: <AccountCenter />,
          },
          {
            path: "/setting/UserManage",
            title: "用户管理",
            element: <UserManage />,
          },
          {
            path: "/setting/RoleManage",
            title: "角色管理",
            element: <RoleManage />,
          },
        ],
      },
      {
        path: "devTool",
        title: "组件",
        icon: <ToolOutlined />,
        children: [
          {
            path: "/devTool/TableTool",
            title: "表格",
            element: <TableTool />,
          },
          {
            path: "/devTool/EditorTool",
            title: "富文本",
            element: <EditorTool />,
          },
          {
            path: "/devTool/ThemeTool",
            title: "主题",
            element: <ThemeTool />,
          },
          {
            path: "/devTool/ButtonTool",
            title: "按钮",
            element: <ButtonTool />,
          },
          {
            path: "/devTool/DataTool",
            title: "数据录入",
            children: [
              {
                path: "/devTool/DataTool/FormTool",
                title: "表单",
                element: <FormTool />,
              },
              {
                path: "/devTool/DataTool/DateTool",
                title: "日期选择器",
                element: <DateTool />,
              },
              {
                path: "/devTool/DataTool/RadioTool",
                title: "单选框",
                element: <RadioTool />,
              },
              {
                path: "/devTool/DataTool/CheckTool",
                title: "多选框",
                element: <CheckTool />,
              },
              {
                path: "/devTool/DataTool/InputTool",
                title: "输入框",
                element: <InputTool />,
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/" replace={true} />,
      },
    ],
  },
];

const browserRoutes = [
  {
    path: "/",
    element: <App />,
    // loader
    children: routes,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];

export { routes };

export default createBrowserRouter(browserRoutes, {
  basename: import.meta.env.VITE_BASE_NAME,
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});
