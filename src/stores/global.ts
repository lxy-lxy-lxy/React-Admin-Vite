import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { isMobile } from "@utils/utils";

const initThemeConfig: GlobalStore.ThemeConfig = {
  mode: "light",
  collapsed: false,
  colorPrimary: "#1677ff",
  menuExtend: 0,
  tagStatus: 1,
  tagStyle: "card",
};

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
          (set) => ({
            themeConfig: { ...initThemeConfig },
            deviceInfo: { isPhone: isMobile() },
            userConfig: {},
            setThemeConfig: (params) =>
              set((state) => {
                state.themeConfig = { ...state.themeConfig, ...params };
              }),
            clearThemeConfig: () =>
              set((state) => {
                state.themeConfig = { ...initThemeConfig };
              }),
            setDeviceInfo: (params) =>
              set((state) => {
                state.deviceInfo = {
                  ...state.deviceInfo,
                  ...params,
                };
              }),
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
