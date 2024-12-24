import { StateCreator } from "zustand";

export const createUserStore: StateCreator<
  Setting.State,
  [
    ["zustand/immer", never],
    ["zustand/devtools", never],
    ["zustand/subscribeWithSelector", never],
    ["zustand/persist", unknown],
  ],
  [],
  User.State
> = () => ({
  other: {},
});
