import { Fragment } from "react";
import { Row, Col, Card } from "antd";
import HotCard from "@/pages/Dashboard/Home/components/HotCard.tsx";

const Dashboard = () => {
  return (
    <Fragment>
      <Row wrap style={{ marginTop: 20 }} gutter={[16, 16]}>
        <Col xs={24} md={24} lg={14} xl={16} xxl={18}>
          <Card>WelCome</Card>
        </Col>
        <Col xs={0} md={0} lg={10} xl={8} xxl={6}>
          <Row gutter={[16, 16]}>
            <Col lg={24}>
              <HotCard />
            </Col>
            <Col lg={24}>
              <Card title="Card title" bordered={false}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Dashboard;
