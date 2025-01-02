declare namespace Setting {
  type State = Role.State & User.State;
}

declare namespace Role {
  interface State {
    role: {
      list: DataType[];
      total: number;
      searchParams: Params;
    };
    getRoleData: (params: Params) => void;
    resetRoleData: () => void;
  }

  interface DataType {
    role_id: number;
    role_name: string;
    status: 0 | 1;
    created_at: string;
    updated_at: string;
    remark: string;
  }

  interface Params {
    keyword?: string;
    page?: number;
    pageSize?: number;
  }

  interface Records {
    total: number;
    list: [];
  }

  interface RoleCompRef {
    open: (e?: DataType) => void;
  }
}

declare namespace User {
  interface State {
    other: object;
  }
}
