import { ComponentType, lazy, useEffect, useState } from "react";
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import { useGlobalStore } from "@stores/index.ts";
import App from "../../App.tsx";
import ErrorPage from "@components/ErrorPage";
import LoginPage from "@layout/components/Login.tsx";
import { Icon } from "@utils/menuTool.ts";

const modules = import.meta.glob("@pages/**/index.tsx");

const showDemo = ["local", "development"].includes(
  import.meta.env.VITE_NODE_ENV,
);

const defaultChild = showDemo
  ? [
      {
        path: "",
        route: "devTool",
        title: "组件",
        icon: "ToolOutlined",
        children: [
          {
            route: "TableTool",
            title: "表格",
            children: [
              {
                path: "DevTool/TableTool/Table",
                route: "Table",
                title: "基础表格",
              },
              {
                path: "DevTool/TableTool/TreeTable",
                route: "TreeTable",
                title: "左树右表",
              },
            ],
          },
          {
            path: "DevTool/EditorTool",
            route: "EditorTool",
            title: "富文本",
          },
          {
            path: "DevTool/ThemeTool",
            route: "ThemeTool",
            title: "主题",
          },
          {
            path: "DevTool/ButtonTool",
            route: "ButtonTool",
            title: "按钮",
          },
          {
            route: "DataTool",
            title: "数据录入",
            children: [
              {
                path: "DevTool/DataTool/FormTool",
                route: "FormTool",
                title: "表单",
              },
              {
                path: "DevTool/DataTool/DateTool",
                route: "DateTool",
                title: "日期选择器",
              },
              {
                path: "DevTool/DataTool/RadioTool",
                route: "RadioTool",
                title: "单选框",
              },
              {
                path: "DevTool/DataTool/CheckTool",
                route: "CheckTool",
                title: "多选框",
              },
              {
                path: "DevTool/DataTool/InputTool",
                route: "InputTool",
                title: "输入框",
              },
              {
                path: "DevTool/DataTool/SelectTool",
                route: "SelectTool",
                title: "选择器",
              },
            ],
          },
          {
            path: "DevTool/DescriptionTool",
            route: "DescriptionTool",
            title: "描述列表",
          },
          {
            path: "DevTool/DividerTool",
            route: "DividerTool",
            title: "分割线",
          },
        ],
      },
    ]
  : [];

interface RouteState extends RootLayout.RouteState {
  routes: RouteObject[];
}

const getRoutes: (
  pRoute: string,
  children: GlobalStore.MenuInfo[],
) => RouteState = (pRoute, children) => {
  return children.reduce(
    (pre, next) => {
      const { icon, route, title, id } = next;
      const path = `${pRoute ? `${pRoute}/` : ""}${route}`;
      const index = path === "" && !next.children;

      const item: RootLayout.SideMenu = {
        id,
        key: `/${path}`,
        icon: <Icon type={icon} />,
        label: title,
      };

      const routeItem: RouteObject = {
        ...(index
          ? {
              index: path === "" && !next.children,
            }
          : { path: `/${path}` }),
        ...(next.path
          ? {
              Component: lazy(
                modules[`/src/pages/${next.path}/index.tsx`] as () => Promise<{
                  default: ComponentType<unknown>;
                }>,
              ),
            }
          : {}),
      };

      if (next.children && next.children.length > 0) {
        const data = getRoutes(path, next.children);
        item.children = data.menus;
        routeItem.children = data.routes;
        pre.menusObj = {
          ...pre.menusObj,
          ...data.menusObj,
        };
      }

      pre.routes.push(routeItem);
      pre.menus.push(item);
      if (routeItem.Component) {
        pre.menusObj = {
          ...pre.menusObj,
          [item.key]: item.label,
        };
      }

      return pre;
    },
    {
      menus: [],
      routes: [],
      menusObj: {},
    } as RouteState,
  );
};

const useLoadRoutes = () => {
  const menuInfo = useGlobalStore((state) => state.menuInfo);
  const [data, setData] = useState<RouteState>({
    routes: [],
    menus: [],
    menusObj: {},
  });
  const { routes, menus, menusObj } = data;

  useEffect(() => {
    setData(
      getRoutes("", [...menuInfo, ...defaultChild] as GlobalStore.MenuInfo[]),
    );
  }, [menuInfo]);

  return {
    routes: createBrowserRouter(
      [
        {
          path: "/",
          element: <App />,
          children: [
            {
              errorElement: <ErrorPage />,
              children: [
                ...routes,
                {
                  path: "*",
                  element: <Navigate to="/" replace={true} />,
                },
              ],
            },
          ],
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
      ] as RouteObject[],
      {
        basename: import.meta.env.VITE_BASE_NAME,
        future: {
          v7_relativeSplatPath: true,
          v7_fetcherPersist: true,
          v7_normalizeFormMethod: true,
          v7_partialHydration: true,
          v7_skipActionErrorRevalidation: true,
        },
      },
    ),
    routeData: { menus, menusObj },
  };
};

export default useLoadRoutes;
