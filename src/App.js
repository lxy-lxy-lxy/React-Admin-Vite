import React, {Suspense, lazy, useEffect} from 'react';
import {ConfigProvider, Spin, theme} from 'antd';
import {useGlobalStore} from '@stores/index';
import zh_HK from 'antd/locale/zh_HK';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'antd/dist/reset.css';
import {useTranslation} from 'react-i18next';
import {getLocale, isMobile} from '@utils/utils';

dayjs.locale('zh-cn');

const BasicLayout = lazy(() => import('./layout'));

const App = () => {
        const {themeConfig, setDeviceInfo, setThemeConfig} = useGlobalStore();
        const {t} = useTranslation()

        const handleResize = () => {
                const isPhone = isMobile()
                setThemeConfig({
                        collapsed: isPhone
                })
                setDeviceInfo({
                        isPhone
                })
        }

        useEffect(() => {
                global.t = (str, msg) => {
                        let data
                        const obj = {str, msg}
                        if (obj.msg) {
                                data = t(obj.str, obj.msg)
                        } else {
                                data = t(str)
                        }
                        return data
                }
                handleResize()
                window.addEventListener('resize', handleResize);

                return () => {
                        window.removeEventListener('resize', handleResize)
                }
        }, [])

        return (
                <ConfigProvider
                        locale={{
                                hk: zh_HK,
                                en: enUS,
                                cn: zhCN
                        }[getLocale()]}
                        theme={{
                                cssVar: true,
                                algorithm: [themeConfig.mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm],
                                components: {
                                        Layout: {
                                                headerHeight: '5.5rem',
                                                footerPadding: '0.5rem'
                                        }
                                },
                                token: {
                                        colorPrimary: themeConfig.colorPrimary
                                }
                        }}
                >
                        <Suspense fallback={<Spin size="large" className="global_spin"/>}>
                                <BasicLayout/>
                        </Suspense>
                </ConfigProvider>
        );
};
export default App;
