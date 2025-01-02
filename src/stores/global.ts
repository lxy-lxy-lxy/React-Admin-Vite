import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { isMobile } from "@utils/utils";
import { get } from "@services/axios.ts";

const initThemeConfig: GlobalStore.ThemeConfig = {
  mode: "light",
  collapsed: false,
  colorPrimary: "#1677ff",
  menuExtend: false,
  tagStatus: false,
  tagStyle: "card",
  routeAn: 1,
};

const routesApi = "/user/routes";

const useGlobalStore = create<
  GlobalStore.GlobalState,
  [
    ["zustand/immer", never],
    ["zustand/devtools", never],
    ["zustand/subscribeWithSelector", never],
    ["zustand/persist", GlobalStore.GlobalState],
  ]
>(
  immer(
    devtools(
      subscribeWithSelector(
        persist(
          (set, getState) => ({
            themeConfig: { ...initThemeConfig },
            setThemeConfig: (params) =>
              set((state) => {
                state.themeConfig = { ...state.themeConfig, ...params };
              }),
            clearThemeConfig: () =>
              set((state) => {
                state.themeConfig = { ...initThemeConfig };
              }),
            deviceInfo: { isPhone: isMobile() },
            setDeviceInfo: (params) =>
              set((state) => {
                state.deviceInfo = {
                  ...state.deviceInfo,
                  ...params,
                };
              }),
            menuInfo: [],
            getMenuInfo: async () => {
              const data = await get<GlobalStore.MenuInfo[]>(routesApi);
              if (
                JSON.stringify(getState().menuInfo) !== JSON.stringify(data)
              ) {
                set((state) => {
                  state.menuInfo = data;
                });
              }
            },
            userConfig: {},
            setUserConfig: (key, value) =>
              set((state) => {
                if (state.userConfig[key]) {
                  Object.keys(value).forEach((item) => {
                    state.userConfig[key][item] = value[item];
                  });
                } else {
                  state.userConfig[key] = value;
                }
              }),
          }),
          {
            name: "globalStore",
          },
        ),
      ),
      {
        enabled: true,
        name: "globalStore",
      },
    ),
  ),
);

export default useGlobalStore;
