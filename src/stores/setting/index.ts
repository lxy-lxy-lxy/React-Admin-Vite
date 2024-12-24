import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  devtools,
  persist,
  subscribeWithSelector,
  createJSONStorage,
} from "zustand/middleware";
import { createRoleStore } from "@stores/setting/role";
import { createUserStore } from "@stores/setting/user";

export const useSetting = create<
  Setting.State,
  [
    ["zustand/immer", never],
    ["zustand/devtools", never],
    ["zustand/subscribeWithSelector", never],
    ["zustand/persist", Setting.State],
  ]
>(
  immer(
    devtools(
      subscribeWithSelector(
        persist(
          (...a) => ({
            ...createRoleStore(...a),
            ...createUserStore(...a),
          }),
          {
            name: "settingStore",
            storage: createJSONStorage(() => sessionStorage),
          },
        ),
      ),
      {
        enabled: true,
        name: "settingStore",
      },
    ),
  ),
);
