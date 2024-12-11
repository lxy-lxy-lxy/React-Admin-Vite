import React, {lazy} from 'react';
import ErrorPage from '@components/ErrorPage';
import LoginPage from '../layout/components/Login';
import App from '../App';
import {createBrowserRouter, Navigate} from 'react-router-dom';
import {
        DashboardOutlined,
        UserOutlined,
        ToolOutlined
} from '@ant-design/icons';
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

const ng = (func) => () => {
        NProgress.start()
        return func().then((e) => {
                NProgress.done()
                return e
        })
}

const Dashboard = lazy(ng(() => import('@pages/Dashboard')));
const AccountCenter = lazy(ng(() => import('@pages/AccountPage/AccountCenter')));
const AccountSettings = lazy(ng(() => import('@pages/AccountPage/AccountSettings')));
const TableTool = lazy(ng(() => import('@pages/DevTool/TableTool')));
const EditorTool = lazy(ng(() => import('@pages/DevTool/EditorTool')));
const ThemeTool = lazy(ng(() => import('@pages/DevTool/ThemeTool')));
const ButtonTool = lazy(ng(() => import('@pages/DevTool/ButtonTool')));
const FormTool = lazy(ng(() => import('@pages/DevTool/DataTool/FormTool')));

const routes = [
        {
                path: '/',
                element: <App/>,
                // loader: authLoader,
                children: [
                        {
                                errorElement: <ErrorPage/>,
                                children: [
                                        {
                                                title: '工作台',
                                                icon: <DashboardOutlined/>,
                                                path: '',
                                                children: [
                                                        {index: true, title: '首页', element: <Dashboard/>}
                                                ]
                                        },
                                        {
                                                path: 'account',
                                                title: '个人页',
                                                icon: <UserOutlined/>,
                                                children: [
                                                        {path: '/account/AccountCenter', title: '个人中心', element: <AccountCenter/>},
                                                        {path: '/account/AccountSettings', title: '个人设置', element: <AccountSettings/>}
                                                ]
                                        },
                                        {
                                                path: 'devTool',
                                                title: '组件',
                                                icon: <ToolOutlined/>,
                                                children: [
                                                        {path: '/devTool/TableTool', title: '表格', element: <TableTool/>},
                                                        {path: '/devTool/EditorTool', title: '富文本', element: <EditorTool/>},
                                                        {path: '/devTool/ThemeTool', title: '主题', element: <ThemeTool/>},
                                                        {path: '/devTool/ButtonTool', title: '按钮', element: <ButtonTool/>},
                                                        {
                                                                path: '/devTool/DataTool',
                                                                title: '数据录入',
                                                                children: [
                                                                        {path: '/devTool/DataTool/FormTool', title: '表单', element: <FormTool/>},
                                                                ]
                                                        }
                                                ]
                                        },
                                        {
                                                path: '*',
                                                element: <Navigate to="/" replace={true}/>
                                        }
                                ]
                        }
                ]
        },
        {
                path: '/login',
                element: <LoginPage/>
        }
];

export {routes};

export default createBrowserRouter(routes);
