import { Col, Drawer, Form, Input, message, Radio, Row, Space } from "antd";
import {
  useImperativeHandle,
  useState,
  forwardRef,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import type { ForwardedRef } from "react";
import Button from "@/components/Button";
import { statusObj } from "@/utils/enum.ts";
import SearchTree from "@/components/SearchTree";
import { RouteContext } from "../../../../main.tsx";

interface InitValues {
  role_id?: number;
  role_name: string;
  status: 0 | 1;
}

let initValues: Role.DataType | undefined = undefined;

const colLayout = {
  sm: 24,
  xs: 24,
  lg: 12,
};

const RoleComp: (
  props: object,
  ref: ForwardedRef<Role.RoleCompRef>,
) => ReactNode = (_, ref) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const {
    routeData: { menus },
  } = useContext(RouteContext)!;

  useEffect(() => {
    return () => {
      initValues = undefined;
    };
  }, []);

  useImperativeHandle(ref, () => {
    return {
      open(params?: Role.DataType) {
        initValues = params;
        setOpen(true);
        if (params) {
          form.setFieldsValue({
            role_id: params.role_id,
            role_name: params.role_name,
            status: params.status,
            remark: params.remark,
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
      title={!initValues?.role_id ? global.t("添加角色") : global.t("编辑角色")}
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
          role_name: "",
          status: 1,
        }}
        onFinish={onFinish}
        form={form}
      >
        <Row gutter={16}>
          <Col {...colLayout}>
            <Form.Item
              name="role_name"
              label={global.t("角色")}
              rules={[{ required: true, message: global.t("请输入角色名称") }]}
            >
              <Input placeholder={global.t("请输入角色名称")} />
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
          <Col span={24}>
            <Form.Item name="remark" label={global.t("备注")}>
              <Input.TextArea
                showCount
                maxLength={200}
                rows={3}
                placeholder={global.t("备注")}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="remark"
              label={global.t("功能权限")}
              className="mb-0"
            >
              <SearchTree
                data={menus}
                fieldNames={{
                  key: "id",
                  title: "label",
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default forwardRef(RoleComp);
