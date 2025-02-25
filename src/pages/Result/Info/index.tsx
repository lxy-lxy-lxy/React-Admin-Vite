import React from "react";
import { Card, Result } from "antd";
import Button from "@/components/Button";

const App: React.FC = () => (
  <Card>
    <Result
      title="Your operation has been executed"
      extra={
        <Button type="primary" key="console">
          Go Console
        </Button>
      }
    />
  </Card>
);

export default App;
