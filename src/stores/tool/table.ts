import { get } from "@services/axios";
import { StateCreator } from "zustand";

const tableData = "/tableTool/getTableList";

export const createTableStore: StateCreator<
  DevTool.ToolState,
  [
    ["zustand/immer", never],
    ["zustand/devtools", never],
    ["zustand/subscribeWithSelector", never],
    ["zustand/persist", DevTool.ToolState],
  ],
  [],
  TableTool.TableState
> = (set) => ({
  table: {
    loading: false,
    list: [],
    total: 0,
    searchParams: {},
  },
  getTableData: async (params) => {
    set((state) => {
      state.table.loading = true;
      state.table.searchParams = params;
    });
    const { total, list } = await get(tableData, params).catch(() => {
      set((state) => {
        state.table.loading = false;
      });
    });
    set({
      table: {
        loading: false,
        list,
        total,
        searchParams: params,
      },
    });
  },
});
