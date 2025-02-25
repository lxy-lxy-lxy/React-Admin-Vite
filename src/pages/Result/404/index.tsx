import React from "react";
import { Card, Result } from "antd";
import Button from "@/components/Button";

const App: React.FC = () => (
  <Card>
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary">Back Home</Button>}
    />
  </Card>
);

export default App;
