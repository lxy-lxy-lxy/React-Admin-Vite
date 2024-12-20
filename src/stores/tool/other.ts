import { StateCreator } from "zustand";

export const createOtherStore: StateCreator<
  DevTool.ToolState,
  [
    ["zustand/immer", never],
    ["zustand/devtools", never],
    ["zustand/subscribeWithSelector", never],
    ["zustand/persist", unknown],
  ],
  [],
  OtherTool.OtherState
> = () => ({
  other: {},
});
