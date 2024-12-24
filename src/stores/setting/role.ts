import { get } from "@services/axios";
import { StateCreator } from "zustand";

const roleData = "/setting/roleList";

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
  role: {
    loading: false,
    list: [],
    total: 0,
    searchParams: {},
  },
  getRoleData: async (params: Role.Params) => {
    set((state: Role.State) => {
      state.role.loading = true;
      state.role.searchParams = params;
    });
    try {
      const { total, list } = await get<Role.Records>(roleData, params);
      set({
        role: {
          loading: false,
          list,
          total,
          searchParams: params,
        },
      });
    } catch (e) {
      if (e) {
        set((state: Role.State) => {
          state.role.loading = false;
        });
      }
    }
  },
});
