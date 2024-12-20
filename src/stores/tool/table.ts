import { get } from "@services/axios";
import { StateCreator } from "zustand";

const tableData = "/tableTool/getTableList";

export const createTableStore: StateCreator<
  DevTool.ToolState,
  [
    ["zustand/immer", never],
    ["zustand/devtools", never],
    ["zustand/subscribeWithSelector", never],
    ["zustand/persist", unknown],
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
  getTableData: async (params: TableTool.Params) => {
    set((state: TableTool.TableState) => {
      state.table.loading = true;
      state.table.searchParams = params;
    });
    try {
      const { total, list } = await get<TableTool.Records>(tableData, params);
      set({
        table: {
          loading: false,
          list,
          total,
          searchParams: params,
        },
      });
    } catch {
      set((state: TableTool.TableState) => {
        state.table.loading = false;
      });
    }
  },
});
