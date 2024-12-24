declare namespace Setting {
  type State = Role.State & User.State;
}

declare namespace Role {
  interface State {
    role: {
      loading: boolean;
      list: DataType[];
      total: number;
      searchParams: Params;
    };
    getRoleData: (params: Params) => void;
  }

  interface DataType {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
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

declare namespace User {
  interface State {
    other: object;
  }
}
