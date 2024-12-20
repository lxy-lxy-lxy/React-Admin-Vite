declare namespace DevTool {
  type ToolState = TableTool.TableState & OtherTool.OtherState;
}

declare namespace TableTool {
  interface TableState {
    table: {
      loading: boolean;
      list: [];
      total: number;
      searchParams: Params;
    };
    getTableData: (params: Params) => void;
  }

  interface Params {
    page?: number;
    pageSize?: number;
  }

  interface Records {
    total: number;
    list: [];
  }
}

declare namespace OtherTool {
  interface OtherState {
    other: object;
  }
}
