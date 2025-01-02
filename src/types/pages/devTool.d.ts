declare namespace DevTool {
  type State = TableTool.State & OtherTool.State;
}

declare namespace TableTool {
  interface State {
    table: {
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
  interface State {
    other: object;
  }
}
