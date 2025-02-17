import React from "react";
import { Card, Form, Input } from "antd";
import { Line } from "@ant-design/plots";
import ProSearch from "@/components/ProSearch";

const DataBoard: React.FC = () => {
  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];

  const config = {
    data,
    xField: "year",
    yField: "value",
  };

  return (
    <>
      <Card className="mb-2" bodyStyle={{ paddingBottom: 0 }}>
        <ProSearch
          formName="toolSearch"
          childNode={[
            {
              element: (
                <Form.Item label={global.t("搜索1")} name="search1">
                  <Input />
                </Form.Item>
              ),
            },
            {
              element: (
                <Form.Item label={global.t("名称1")} name="name1">
                  <Input />
                </Form.Item>
              ),
            },
            {
              element: (
                <Form.Item label={global.t("搜索2")} name="search2">
                  <Input />
                </Form.Item>
              ),
            },
          ]}
        />
      </Card>
      <Card>
        <Line {...config} />
      </Card>
    </>
  );
};
export default DataBoard;
