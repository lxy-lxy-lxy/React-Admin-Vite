import { get } from "@services/axios";
import { StateCreator } from "zustand";

const userData = "/setting/userList";

const initParams = {
  list: [],
  total: 0,
  searchParams: {},
};

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
> = (set) => ({
  user: initParams,
  getUserData: async (params: User.Params) => {
    set((state: User.State) => {
      state.user.searchParams = params;
    });
    try {
      const { total, list } = await get<User.Records>(userData, params);
      set((state: User.State) => {
        state.user.list = list;
        state.user.total = total;
      });
    } catch (e) {
      if (e) {
        set((state: User.State) => {
          state.user.list = [];
          state.user.total = 0;
        });
      }
    }
  },
  resetUserData: () => {
    set({
      user: initParams,
    });
  },
});
