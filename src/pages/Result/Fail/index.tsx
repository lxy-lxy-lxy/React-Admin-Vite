import React from "react";
import { Card, Result, Typography } from "antd";
import { Icon } from "@/utils/menuTool.ts";
import Button from "@/components/Button";

const { Paragraph, Text } = Typography;

const App: React.FC = () => (
  <Card>
    <Result
      status="error"
      title="Submission Failed"
      subTitle="Please check and modify the following information before resubmitting."
      extra={[
        <Button type="primary" key="console">
          Go Console
        </Button>,
        <Button key="buy">Buy Again</Button>,
      ]}
    >
      <div className="desc">
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            The content you submitted has the following error:
          </Text>
        </Paragraph>
        <Paragraph>
          <Icon type="CloseCircleOutlined"></Icon> Your account has been frozen.{" "}
          <a>Thaw immediately &gt;</a>
        </Paragraph>
        <Paragraph>
          <Icon type="CloseCircleOutlined"></Icon> Your account is not yet
          eligible to apply. <a>Apply Unlock &gt;</a>
        </Paragraph>
      </div>
    </Result>
  </Card>
);

export default App;
