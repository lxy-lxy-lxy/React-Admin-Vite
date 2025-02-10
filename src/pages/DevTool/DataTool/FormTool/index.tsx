import { useState } from "react";
import { Checkbox, Form, Input, Select, Steps, Radio, Card } from "antd";
import type { FormProps } from "antd";
import Button from "@/components/Button";

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
    lg: {
      span: 5,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 18,
    },
    lg: {
      span: 19,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 18,
      offset: 6,
    },
    lg: {
      span: 19,
      offset: 5,
    },
  },
};

const description = "This is a description.";

interface FieldType {
  layout: FormProps["layout"];
  email: string;
  password: string;
  residence: string[];
  prefix: number;
}

const FormTool = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [formLayout, setFormLayout] =
    useState<FormProps["layout"]>("horizontal");

  const onFormLayoutChange: FormProps<FieldType>["onValuesChange"] = ({
    layout,
  }) => {
    if (layout) setFormLayout(layout);
  };

  const onChange = (value: number) => {
    console.log("onChange:", current);
    setCurrent(value);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Received values of form: ", values);
    onChange(1);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const isHorizontal = formLayout === "horizontal";

  return (
    <Card>
      <div style={{ maxWidth: "80rem", margin: "auto" }}>
        <Steps
          className="mb-2"
          current={current}
          items={[
            {
              title: "Step 1",
              description,
            },
            {
              title: "Step 2",
              description,
            },
            {
              title: "Step 3",
              description,
            },
          ]}
        />
        <Form
          layout={formLayout}
          className="mt-2"
          colon={false}
          {...(isHorizontal ? formItemLayout : {})}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            layout: formLayout,
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86",
          }}
          onValuesChange={onFormLayoutChange}
          scrollToFirstError
        >
          <Form.Item label="Form Layout" name="layout">
            <Radio.Group value={formLayout}>
              <Radio.Button value="horizontal">Horizontal</Radio.Button>
              <Radio.Button value="vertical">Vertical</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!",
                    ),
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="nickname"
            label="Nickname"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            name="intro"
            label="Intro"
            rules={[
              {
                required: true,
                message: "Please input Intro",
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...(isHorizontal ? tailFormItemLayout : {})}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...(isHorizontal ? tailFormItemLayout : {})}>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};
export default FormTool;
