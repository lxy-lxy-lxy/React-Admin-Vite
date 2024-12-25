import { get } from "@services/axios";
import { StateCreator } from "zustand";

const tableData = "/tableTool/getTableList";

export const createTableStore: StateCreator<
  DevTool.State,
  [
    ["zustand/immer", never],
    ["zustand/devtools", never],
    ["zustand/subscribeWithSelector", never],
    ["zustand/persist", unknown],
  ],
  [],
  TableTool.State
> = (set) => ({
  table: {
    loading: false,
    list: [],
    total: 0,
    searchParams: {},
  },
  getTableData: async (params: TableTool.Params) => {
    set((state: TableTool.State) => {
      state.table.loading = true;
      state.table.searchParams = params;
    });
    try {
      const { total, list } = await get<TableTool.Records>(tableData, params);
      set((state: TableTool.State) => {
        state.table.loading = false;
        state.table.list = list;
        state.table.total = total;
      });
    } catch (e) {
      if (e) {
        set((state: TableTool.State) => {
          state.table.loading = false;
          state.table.list = [];
          state.table.total = 0;
        });
      }
    }
  },
});
