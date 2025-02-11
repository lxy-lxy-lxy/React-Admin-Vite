import { Fragment } from "react";
import { Row, Col, Card, Flex, Typography, Avatar, Statistic } from "antd";
import HotCard from "@/pages/Dashboard/Home/components/HotCard.tsx";
import { Icon } from "@/utils/menuTool.ts";
import StatusCard from "@/pages/Dashboard/Home/components/StatusCard.tsx";

const Dashboard = () => {
  return (
    <Fragment>
      <Row wrap style={{ marginTop: 20 }} gutter={[16, 16]}>
        <Col xs={24} md={24}>
          <Card>
            <Flex justify="space-between" align="center" wrap>
              <Flex align="center" wrap>
                <Avatar
                  shape="circle"
                  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 80 }}
                  src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                />
                <div className="ml-2">
                  <Typography.Title level={5}>
                    {global.t("早安，吴彦祖，祝你开心每一天！")}
                  </Typography.Title>
                  <Typography.Text>
                    {global.t(
                      "交互专家 |蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED",
                    )}
                  </Typography.Text>
                </div>
              </Flex>
              <Flex align="center" wrap>
                <Statistic
                  title="Feedback"
                  value={1128}
                  className="mr-2"
                  prefix={<Icon type={"LikeOutlined"} />}
                />
                <Statistic
                  title="Unmerged"
                  value={93}
                  suffix="/ 100"
                  className="ml-2"
                />
              </Flex>
            </Flex>
          </Card>
        </Col>
        <Col xs={24} md={24} lg={14} xl={16} xxl={18}>
          <StatusCard />
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
