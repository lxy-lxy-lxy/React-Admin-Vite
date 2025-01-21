import { createRoot } from "react-dom/client";
import "@/i18n/i18n.ts";
import useLoadRoutes from "@/utils/hooks/useLoadRoutes.tsx";
import { RouterProvider } from "react-router-dom";
import { createContext } from "react";
import Message from "@/components/Message";

import "./index.css";

export const RouteContext = createContext<{
  routeData: RootLayout.RouteState;
}>({
  routeData: { menus: [], menusObj: {} },
});

const MainRouter = () => {
  const { routeData, routes } = useLoadRoutes();

  return (
    <RouteContext.Provider value={{ routeData }}>
      <RouterProvider router={routes} />
      <Message />
    </RouteContext.Provider>
  );
};

createRoot(document.getElementById("root")!).render(<MainRouter />);
