import { StateCreator } from "zustand";

export const createOtherStore: StateCreator<
  DevTool.State,
  [
    ["zustand/immer", never],
    ["zustand/devtools", never],
    ["zustand/subscribeWithSelector", never],
    ["zustand/persist", unknown],
  ],
  [],
  OtherTool.State
> = () => ({
  other: {},
});
