import React from "react";
import { Card, Result } from "antd";
import Button from "@/components/Button";

const App: React.FC = () => (
  <Card>
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button type="primary">Back Home</Button>}
    />
  </Card>
);

export default App;
