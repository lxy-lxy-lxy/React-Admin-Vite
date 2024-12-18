declare namespace LoginInfo {
  interface LoginForm {
    username: string;
    password: string;
    authCode?: string;
  }

  interface User {
    username: string;
    phone: string;
  }

  interface LoginState {
    userInfo?: User;
    getUserInfo: (params: LoginForm) => userInfo;
    setUserInfo?: (userInfo) => void;
  }
}
