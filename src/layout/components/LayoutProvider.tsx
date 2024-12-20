import { createContext, useState, FC, useEffect, ReactElement } from "react";
import { routes } from "@services/router.tsx";
import type { PropsWithChildren } from "react";
import type { RouteObject } from "react-router-dom";
import { ErrorBoundary } from "@components/ErrorPage/ErrorBoundary.tsx";

export const LayoutContext = createContext<{
  layoutData: RootLayout.LayoutState;
}>({ layoutData: { menus: [], menusObj: {} } });

const LayoutProvider: FC<PropsWithChildren> = (props) => {
  const [layoutData, setLayoutData] = useState<RootLayout.LayoutState>({
    menus: [],
    menusObj: {},
  });

  const getItems = (
    children: (RouteObject & { title?: string; icon?: ReactElement })[],
  ) => {
    return children.reduce(
      (pre, next) => {
        const key = next.index
          ? "/"
          : next.path?.startsWith("/")
            ? next.path
            : `/${next.path}`;
        pre.menusObj[key] = global.t(next.title);
        const menuItem = {
          key,
          icon: next.icon,
          label: global.t(next.title),
          children: undefined,
        } as RootLayout.SideMenu;

        if (next.children) {
          const { menus, menusObj } = getItems(next.children);
          pre.menusObj = {
            ...pre.menusObj,
            ...menusObj,
          };
          pre.menus.push({
            ...menuItem,
            children: menus,
          });
        } else {
          pre.menus.push(menuItem);
        }
        return pre;
      },
      { menus: [], menusObj: {} } as {
        menus: RootLayout.SideMenu[];
        menusObj: { [key: string]: string };
      },
    );
  };

  useEffect(() => {
    setLayoutData(
      getItems(
        routes[0].children
          ? routes[0].children.filter((item) => item.path !== "*")
          : [],
      ),
    );
  }, []);

  return (
    <ErrorBoundary>
      <LayoutContext.Provider value={{ layoutData }}>
        {props.children}
      </LayoutContext.Provider>
    </ErrorBoundary>
  );
};

export default LayoutProvider;
