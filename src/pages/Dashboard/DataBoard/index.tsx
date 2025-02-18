import React from "react";
import { Card, Row, Col, Tooltip } from "antd";
import Search from "@/pages/Dashboard/DataBoard/components/Search.tsx";
import StatisticCard from "@/pages/Dashboard/DataBoard/components/StatisticCard.tsx";
import Indicators from "@/pages/Dashboard/DataBoard/components/Indicators.tsx";
import Ranking from "@/pages/Dashboard/DataBoard/components/Ranking.tsx";

const DataBoard: React.FC = () => {
  return (
    <>
      <Card className="mb-2" bodyStyle={{ paddingBottom: 0 }}>
        <Search />
      </Card>
      <Card title={global.t("核心指标")} className="mb-2">
        <StatisticCard />
      </Card>
      <Row gutter={10}>
        <Col lg={24} xl={16}>
          <Card
            title={
              <Tooltip title="prompt text">
                <span>{global.t("大盘指标")}</span>
              </Tooltip>
            }
          >
            <Indicators />
          </Card>
        </Col>
        <Col lg={24} xl={8}>
          <Card title={global.t("产品好评度排行")}>
            <Ranking />
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default DataBoard;
