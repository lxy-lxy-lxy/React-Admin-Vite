import { Suspense, lazy, useEffect } from "react";
import { ConfigProvider, Spin, theme } from "antd";
import { useGlobalStore } from "@/stores/index.ts";
import zh_HK from "antd/locale/zh_HK";
import zhCN from "antd/locale/zh_CN";
import enUS from "antd/locale/en_US";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "antd/dist/reset.css";
import { getLocale, isMobile } from "@/utils/utils.ts";
import { useTranslation } from "react-i18next";

dayjs.locale("zh-cn");

const BasicLayout = lazy(() => import("./layout"));

const App = () => {
  const { themeConfig, getMenuInfo, setDeviceInfo, setThemeConfig } =
    useGlobalStore();
  const { t } = useTranslation();

  const handleResize = () => {
    const isPhone = isMobile();
    setThemeConfig({
      collapsed: isPhone,
    });
    setDeviceInfo({
      isPhone,
    });
  };

  useEffect(() => {
    global.t = t;
    getMenuInfo();

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ConfigProvider
      locale={
        {
          hk: zh_HK,
          en: enUS,
          cn: zhCN,
        }[getLocale()]
      }
      theme={{
        cssVar: true,
        algorithm: [
          themeConfig.mode === "dark"
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
        ],
        components: {
          Layout: {
            headerHeight: "5.5rem",
            footerPadding: "0.5rem",
          },
        },
        token: {
          fontSize: themeConfig.fontSize || 15,
          colorPrimary: themeConfig.colorPrimary,
        },
      }}
    >
      <Suspense fallback={<Spin size="large" className="global_spin" />}>
        <BasicLayout />
      </Suspense>
    </ConfigProvider>
  );
};
export default App;
