import { get } from "@/services/axios";
import { StateCreator } from "zustand";

const roleData = "/setting/roleList";

const initParams = {
  list: [],
  total: 0,
  searchParams: {},
};

export const createRoleStore: StateCreator<
  Setting.State,
  [
    ["zustand/immer", never],
    ["zustand/devtools", never],
    ["zustand/subscribeWithSelector", never],
    ["zustand/persist", unknown],
  ],
  [],
  Role.State
> = (set) => ({
  role: initParams,
  getRoleData: async (params: Role.Params) => {
    set((state: Role.State) => {
      state.role.searchParams = params;
    });
    try {
      const { total, list } = await get<Role.Records>(roleData, params);
      set((state: Role.State) => {
        state.role.list = list;
        state.role.total = total;
      });
    } catch (e) {
      if (e) {
        set((state: Role.State) => {
          state.role.list = [];
          state.role.total = 0;
        });
      }
    }
  },
  resetRoleData: () => {
    set({
      role: initParams,
    });
  },
});
