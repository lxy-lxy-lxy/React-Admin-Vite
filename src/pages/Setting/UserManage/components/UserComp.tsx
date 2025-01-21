import { Col, Drawer, Form, Input, message, Radio, Row, Space } from "antd";
import {
  useImperativeHandle,
  useState,
  forwardRef,
  ReactNode,
  useEffect,
} from "react";
import type { ForwardedRef } from "react";
import Button from "@/components/Button";
import { statusObj } from "@/utils/enum.ts";

interface InitValues {
  user_id?: number;
  user_name: string;
  status: 0 | 1;
}

let initValues: User.DataType | undefined = undefined;

const colLayout = {
  sm: 24,
  xs: 24,
  lg: 12,
};

const UserComp: (
  props: object,
  ref: ForwardedRef<User.UserCompRef>,
) => ReactNode = (_, ref) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    return () => {
      initValues = undefined;
    };
  }, []);

  useImperativeHandle(ref, () => {
    return {
      open(params?: User.DataType) {
        initValues = params;
        setOpen(true);
        if (params) {
          form.setFieldsValue({
            user_id: params.user_id,
            user_name: params.user_name,
            status: params.status,
            email: params.email,
          });
        }
      },
    };
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = (e: InitValues) => {
    console.log({
      ...initValues,
      ...e,
    });
    message.success(global.t("模拟成功"));
    onClose();
  };

  const onSubmit = () => {
    form.submit();
  };

  return (
    <Drawer
      title={!initValues?.user_id ? global.t("添加用户") : global.t("编辑用户")}
      width={720}
      onClose={onClose}
      open={open}
      destroyOnClose
      extra={
        <Space>
          <Button onClick={onClose}>{global.t("返回")}</Button>
          <Button onClick={onSubmit} type="primary">
            {global.t("提交")}
          </Button>
        </Space>
      }
    >
      <Form
        layout="vertical"
        initialValues={{
          user_name: "",
          status: 1,
        }}
        onFinish={onFinish}
        form={form}
      >
        <Row gutter={16}>
          <Col {...colLayout}>
            <Form.Item
              name="user_name"
              label={global.t("用户")}
              rules={[{ required: true, message: global.t("请输入用户名称") }]}
            >
              <Input placeholder={global.t("请输入用户名称")} />
            </Form.Item>
          </Col>
          <Col {...colLayout}>
            <Form.Item name="status" label={global.t("状态")}>
              <Radio.Group>
                {Object.keys(statusObj)
                  .reverse()
                  .map((item) => (
                    <Radio value={parseInt(item)} key={item}>
                      {statusObj[item].label}
                    </Radio>
                  ))}
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default forwardRef(UserComp);
