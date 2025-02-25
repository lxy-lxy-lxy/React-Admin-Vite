import React from "react";
import { Card, Result } from "antd";
import Button from "@/components/Button";

const App: React.FC = () => (
  <Card>
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={<Button type="primary">Back Home</Button>}
    />
  </Card>
);

export default App;
