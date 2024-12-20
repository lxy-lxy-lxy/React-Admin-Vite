import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  devtools,
  persist,
  subscribeWithSelector,
  createJSONStorage,
} from "zustand/middleware";
import { createTableStore } from "@stores/tool/table";
import { createOtherStore } from "@stores/tool/other.ts";

export const useTool = create<
  DevTool.ToolState,
  [
    ["zustand/immer", never],
    ["zustand/devtools", never],
    ["zustand/subscribeWithSelector", never],
    ["zustand/persist", DevTool.ToolState],
  ]
>(
  immer(
    devtools(
      subscribeWithSelector(
        persist(
          (...a) => ({
            ...createTableStore(...a),
            ...createOtherStore(...a),
          }),
          {
            name: "toolStore",
            storage: createJSONStorage(() => sessionStorage),
          },
        ),
      ),
      {
        enabled: true,
        name: "toolStore",
      },
    ),
  ),
);
