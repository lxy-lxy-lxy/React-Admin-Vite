import React, {Fragment, useEffect, useState} from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {useGlobalStore, useLoginStore} from '@stores/index';
import {routes} from '@services/router';
import logo from '@assets/img/logo/logo.svg';

import styles from '../index.module.scss'

const {Sider} = Layout;

const SideBar = () => {
        const navigate = useNavigate();
        const {pathname} = useLocation();
        const {themeConfig, deviceInfo} = useGlobalStore();
        const {collapsed} = themeConfig
        const {userInfo} = useLoginStore();
        const [childMenus, setChildMenus] = useState([])
        const [parentSelectedKey, setParentSelectedKey] = useState([])

        const getItems = (children) => {
                return children.map((item) => {
                        return {
                                key: item.index
                                        ? '/'
                                        : item.path?.startsWith('/')
                                                ? item.path
                                                : `/${item.path}`,
                                icon: item.icon,
                                label: global.t(item.title),
                                children: item.children ? getItems(item.children) : null
                        };
                });
        };

        const menuItems = getItems(routes[0].children ?
                routes[0].children[0].children.filter((item) => item.path !== '*') : []);

        useEffect(() => {
                const currentKey = renderOpenKeys()?.[0]
                setChildMenus(currentKey ? menuItems.find(item => item.key === currentKey)?.children : [])
                setParentSelectedKey(currentKey ? [currentKey] : [])
        }, [pathname])

        const onMenuClick = ({key}, type = 'child') => {
                const isChild = type === 'child'
                if (isChild) navigate(key);
                if (!isChild) {
                        setChildMenus(menuItems.find(item => item.key === key)?.children)
                        setParentSelectedKey([key])
                }
        };

        if (!userInfo) {
                return <Navigate to="/login" replace/>;
        }

        const renderOpenKeys = () => {
                const arr = pathname.split('/').slice(1);
                return arr.map((item, index) => `/${arr.slice(0, index + 1).join('/')}`);
        };

        return <Fragment>
                {(!deviceInfo.isPhone || !collapsed) &&
                        <Sider
                                theme={!themeConfig.menuExtend ? 'dark' : 'light'}
                                collapsible={false}
                                collapsed={false}
                                className={styles.firstSider}
                        >
                                <div className={styles.siderLogo}>
                                        <img alt="" src={logo} width={45} height={45}/>
                                </div>
                                <Menu
                                        theme={!themeConfig.menuExtend ? 'dark' : 'light'}
                                        selectedKeys={parentSelectedKey}
                                        items={collapsed ? menuItems : menuItems.map(item => ({...item, children: null}))}
                                        onClick={e => onMenuClick(e, collapsed ? 'child' : 'parent')}
                                />
                        </Sider>}
                <Sider
                        className={styles.secondSider}
                        theme="light"
                        style={{
                                '--collapsed': collapsed ? 'hidden' : 'visible',
                                '--width': collapsed ? '0' : '20rem'
                        }}
                        collapsible={false}
                        collapsed={false}
                >
                        <div className={styles.siderHeader}>
                                <span>React Admin Vite</span>
                        </div>
                        <Menu
                                selectedKeys={[pathname]}
                                defaultOpenKeys={renderOpenKeys()}
                                mode="inline"
                                items={childMenus}
                                onClick={onMenuClick}
                        />
                </Sider>
        </Fragment>
};

export default SideBar;
