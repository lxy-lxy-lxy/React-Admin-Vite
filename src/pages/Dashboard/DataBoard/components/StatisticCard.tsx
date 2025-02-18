import React from "react";
import { Col, Row, Statistic } from "antd";
import { Icon } from "@/utils/menuTool.ts";

const StatisticCard: React.FC = () => (
  <Row gutter={10}>
    <Col flex={1}>
      <Statistic
        title="Active"
        value={11.28}
        precision={2}
        valueStyle={{ color: "#3f8600" }}
        prefix={<Icon type={"ArrowUpOutlined"} />}
        suffix="%"
      />
    </Col>
    <Col flex={1}>
      <Statistic
        title="Idle"
        value={9.3}
        precision={2}
        valueStyle={{ color: "#cf1322" }}
        prefix={<Icon type={"ArrowDownOutlined"} />}
        suffix="%"
      />
    </Col>
    <Col flex={1}>
      <Statistic
        title="Active"
        value={11.28}
        precision={2}
        valueStyle={{ color: "#3f8600" }}
        prefix={<Icon type={"ArrowUpOutlined"} />}
        suffix="%"
      />
    </Col>
    <Col flex={1}>
      <Statistic
        title="Idle"
        value={9.3}
        precision={2}
        valueStyle={{ color: "#cf1322" }}
        prefix={<Icon type={"ArrowDownOutlined"} />}
        suffix="%"
      />
    </Col>
    <Col flex={1}>
      <Statistic
        title="Idle"
        value={9.3}
        precision={2}
        valueStyle={{ color: "#cf1322" }}
        prefix={<Icon type={"ArrowDownOutlined"} />}
        suffix="%"
      />
    </Col>
  </Row>
);

export default StatisticCard;
