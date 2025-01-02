declare namespace GlobalStore {
  interface GlobalState {
    themeConfig: ThemeConfig;
    setThemeConfig: (params: ThemeConfig) => void;
    clearThemeConfig: () => void;
    deviceInfo: DeviceInfo;
    setDeviceInfo: (params: DeviceInfo) => void;
    menuInfo: MenuInfo[] | [];
    getMenuInfo: () => void;
    userConfig: { [key: string]: Global.AnyObject };
    setUserConfig: (
      key: string,
      value: {
        [key: string]: unknown;
      },
    ) => void;
  }

  interface ThemeConfig {
    mode?: "light" | "dark";
    collapsed?: boolean;
    colorPrimary?: `#${string}`;
    menuExtend?: boolean;
    tagStatus?: boolean;
    tagStyle?: "card" | "demo";
    routeAn?: 0 | 1;
  }

  interface DeviceInfo {
    isPhone: boolean;
  }

  interface MenuInfo {
    id: number;
    pId: number;
    path: string;
    route: string;
    icon: string;
    title: string;
    children?: MenuInfo[] | [];
  }
}

declare namespace SessionStore {
  interface SessionState {
    tagHistory: string[];
    setTagHistory: (params: string, opType: 0 | 1) => void;
    clearTagHistory: () => void;
  }
}

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

declare namespace RootLayout {
  interface RouteState {
    menus: SideMenu[];
    menusObj: Global.AnyObject;
  }

  interface SideMenu {
    id: number;
    key: string;
    icon?: JSX.Element;
    label: string;
    children?: SideMenu[];
  }
}
