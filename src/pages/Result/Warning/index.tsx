import React from "react";
import { Card, Result } from "antd";
import Button from "@/components/Button";
const App: React.FC = () => (
  <Card>
    <Result
      status="warning"
      title="There are some problems with your operation."
      extra={
        <Button type="primary" key="console">
          Go Console
        </Button>
      }
    />
  </Card>
);

export default App;
