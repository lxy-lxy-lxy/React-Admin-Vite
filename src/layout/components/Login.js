import React, {useEffect} from 'react';
import {
        LockOutlined,
        QrcodeOutlined,
        UserOutlined
} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import {Form, message, Input, Button, Row} from 'antd';
import {useLoginStore} from '@stores/index';
import logo from '@assets/img/logo/logo.svg'
import md5 from 'md5';
import {useTranslation} from 'react-i18next';
import {logoutClearStorage} from '@utils/utils';

import styles from '../index.module.scss'
const {Item} = Form

const Login = () => {
        const {getUserInfo} = useLoginStore();
        const navigate = useNavigate();
        const {t} = useTranslation()

        useEffect(() => {
                logoutClearStorage()
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
        }, [])

        const onFinish = (e) => {
                return getUserInfo({
                        ...e,
                        password: md5(e.password, 'admin')
                }).then(() => {
                        message.success('登录成功🎉🎉🎉');
                        navigate('/', {replace: true});
                });
        };
        return <Row justify="center" align="middle" className={styles.fullHeight}>
                <Form
                        name="login"
                        initialValues={{
                                remember: true
                        }}
                        style={{
                                maxWidth: 460
                        }}
                        onFinish={onFinish}
                        className={styles.loginForm}
                >
                        <Row className={styles.loginTitle} align="middle">
                                <img alt="" src={logo} width={55} height={55}/>
                                <span>React Admin Vite</span>
                        </Row>
                        <Item
                                name="username"
                                rules={[
                                        {
                                                required: true,
                                                message: `${t('请输入用户名')}: admin`
                                        }
                                ]}
                        >
                                <Input prefix={<UserOutlined/>} placeholder={`${t('用户名')}: admin`}/>
                        </Item>
                        <Item
                                name="password"
                                rules={[
                                        {
                                                required: true,
                                                message: `${t('请输入密码')}: 123456`
                                        }
                                ]}
                        >
                                <Input.Password prefix={<LockOutlined/>} type="password" placeholder={`${t('密码')}: 123456`}/>
                        </Item>

                        <Item name="authCode">
                                <Input prefix={<QrcodeOutlined/>} placeholder={t('验证码')}/>
                        </Item>

                        <Item>
                                <Button block type="primary" htmlType="submit">
                                        {t('登录')}
                                </Button>
                        </Item>
                </Form>
        </Row>
};

export default Login;
