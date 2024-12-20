declare namespace GlobalStore {
  interface GlobalState {
    themeConfig: ThemeConfig;
    deviceInfo: DeviceInfo;
    userConfig: { [key: string]: Global.AnyObject };
    setThemeConfig: (params: ThemeConfig) => void;
    clearThemeConfig: () => void;
    setDeviceInfo: (params: DeviceInfo) => void;
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
    menuExtend?: 0 | 1;
    tagStatus?: 0 | 1;
    tagStyle?: "card" | "demo";
  }

  interface DeviceInfo {
    isPhone: boolean;
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
  interface LayoutState {
    menus: SideMenu[];
    menusObj: Global.AnyObject;
  }

  interface SideMenu {
    key: string;
    icon: JSX.Element;
    label: string;
    children?: SideMenu[];
  }
}
