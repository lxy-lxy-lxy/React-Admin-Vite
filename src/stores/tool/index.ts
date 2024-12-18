import { createSelectors } from "@stores/createSelector";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  devtools,
  persist,
  subscribeWithSelector,
  createJSONStorage,
} from "zustand/middleware";
import { createTableStore } from "@stores/tool/table";

export const useTool = createSelectors(
  create<
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
  ),
);
