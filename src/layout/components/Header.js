import React from 'react';
import {Row, Col, Button} from 'antd';
import RightContent from './RightContent';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {useGlobalStore} from '@stores/index';

import styles from '../index.module.scss'

const HeaderComp = () => {
        const {themeConfig, setThemeConfig} = useGlobalStore();
        const {collapsed} = themeConfig

        const onCollapse = () => {
                setThemeConfig({
                        collapsed: !collapsed
                })
        }

        return (
                <Row justify="space-between">
                        <Col className="d-flex align-items-center">
                                <Button
                                        size="large"
                                        type="text"
                                        icon={collapsed ? <MenuUnfoldOutlined className={styles.collapseBtn}/> : <MenuFoldOutlined className={styles.collapseBtn}/>}
                                        onClick={onCollapse}
                                />
                        </Col>
                        <Col style={{display: 'flex'}}>
                                <RightContent/>
                        </Col>
                </Row>
        );
};

export default HeaderComp;