import { FC } from "react";
import type { PropsWithChildren } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  ColorPicker,
  Select,
  Switch,
  message,
  Card,
} from "antd";
import { debounce } from "lodash-es";
import { useGlobalStore } from "@/stores/index";
import type { ColorPickerProps } from "antd";

interface Props {
  label: string;
  name: string;
}

const ToolLayout: FC<Props & PropsWithChildren> = ({
  label,
  name,
  children,
}) => {
  return (
    <Row className="d-flex align-items-center mb-2">
      <Col span={12}>{label}</Col>
      <Col span={12} className="">
        <Form.Item name={name} className="mb-0">
          {children}
        </Form.Item>
      </Col>
    </Row>
  );
};

const ThemeTool = () => {
  const [form] = Form.useForm();
  const { themeConfig, setThemeConfig, clearThemeConfig } = useGlobalStore();

  const changeMainColor: ColorPickerProps["onChange"] = (color) => {
    form.setFieldValue("colorPrimary", color.toHexString());
  };

  const onReset = () => {
    clearThemeConfig();
    setTimeout(() => {
      form.resetFields();
    }, 1);
  };

  const onFinish = debounce(
    (e) => {
      setThemeConfig({
        ...e,
      });
      message.success(global.t("保存成功"));
    },
    500,
    { leading: true },
  );

  return (
    <Card>
      <Form
        form={form}
        initialValues={{
          ...themeConfig,
        }}
        style={{
          maxWidth: "50rem",
          margin: "auto",
        }}
        onFinish={onFinish}
      >
        <ToolLayout name="colorPrimary" label={global.t("配色")}>
          <ColorPicker
            defaultFormat="hex"
            disabledAlpha
            disabledFormat
            onChange={changeMainColor}
          />
        </ToolLayout>
        <ToolLayout name="collapsed" label={global.t("收起菜单")}>
          <Switch />
        </ToolLayout>
        <ToolLayout name="menuExtend" label={global.t("菜单背景跟随配色")}>
          <Switch />
        </ToolLayout>
        <ToolLayout name="tagStatus" label={global.t("标签")}>
          <Switch />
        </ToolLayout>
        <ToolLayout name="tagStyle" label={global.t("标签风格")}>
          <Select>
            <Select.Option value="card">{global.t("卡片")}</Select.Option>
            <Select.Option value="demo">{global.t("矩形")}</Select.Option>
          </Select>
        </ToolLayout>
        <ToolLayout name="routeAn" label={global.t("路由切换动画")}>
          <Switch />
        </ToolLayout>
        <div className="text-left">
          <Button size="large" type="primary" htmlType="submit">
            {global.t("保存")}
          </Button>
          <Button size="large" className="ml-2" onClick={onReset}>
            {global.t("恢复默认")}
          </Button>
        </div>
      </Form>
    </Card>
  );
};
export default ThemeTool;
