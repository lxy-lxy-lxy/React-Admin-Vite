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
    name?: string;
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
    user: {
      list: DataType[];
      total: number;
      searchParams: Params;
    };
    getUserData: (params: Params) => void;
    resetUserData: () => void;
  }

  interface DataType {
    user_id: number;
    user_name: string;
    status: 0 | 1;
    created_at: string;
    updated_at: string;
    email: string;
  }

  interface Params {
    name?: string;
    page?: number;
    pageSize?: number;
  }

  interface Records {
    total: number;
    list: [];
  }

  interface UserCompRef {
    open: (e?: DataType) => void;
  }
}
