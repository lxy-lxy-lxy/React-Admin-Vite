import { useEffect } from "react";
import { LockOutlined, QrcodeOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Form, message, Input, Button, Row } from "antd";
import { useLoginStore } from "@stores/index";
import logo from "@assets/img/logo/logo.svg";
import md5 from "md5";
import { logoutClearStorage } from "@utils/utils";

import styles from "../index.module.scss";

const { Item } = Form;

interface UserInfo {
  username: string;
  password: string;
  authCode: string;
}

const Login = () => {
  const { getUserInfo } = useLoginStore();
  const navigate = useNavigate();

  useEffect(() => {
    logoutClearStorage();
  }, []);

  const onFinish = (e: UserInfo) => {
    return getUserInfo({
      ...e,
      password: md5(e.password),
    }).then(() => {
      message.success("登录成功🎉🎉🎉");
      navigate("/", { replace: true });
    });
  };

  return (
    <Row justify="center" align="middle" className={styles.fullHeight}>
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 460,
        }}
        onFinish={onFinish}
        className={styles.loginForm}
      >
        <Row className={styles.loginTitle} align="middle">
          <img alt="" src={logo} width={55} height={55} />
          <span>React Admin Vite</span>
        </Row>
        <Item
          name="username"
          rules={[
            {
              required: true,
              message: `${global.t("请输入用户名")}: admin`,
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder={`${global.t("用户名")}: admin`}
          />
        </Item>
        <Item
          name="password"
          rules={[
            {
              required: true,
              message: `${global.t("请输入密码")}: 123456`,
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder={`${global.t("密码")}: 123456`}
          />
        </Item>

        <Item name="authCode">
          <Input prefix={<QrcodeOutlined />} placeholder={global.t("验证码")} />
        </Item>

        <Item>
          <Button block type="primary" htmlType="submit">
            {global.t("登录")}
          </Button>
        </Item>
      </Form>
    </Row>
  );
};

export default Login;
