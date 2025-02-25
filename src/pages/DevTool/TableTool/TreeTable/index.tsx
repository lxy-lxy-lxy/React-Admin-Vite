import { Col, Row, Card } from "antd";
import ProTable from "@/components/ProTable";
import type { TableColumnsType } from "antd";
import { useTool } from "@/stores/tool";
import SearchTree from "@/components/SearchTree";
import { useContext } from "react";
import { RouteContext } from "@/main.tsx";

const columns: TableColumnsType = [
  {
    title: global.t("ID"),
    dataIndex: "id",
    key: "id",
    fixed: "left",
  },
  {
    title: global.t("名称"),
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Column 1",
    dataIndex: "account",
    key: "account",
  },
  {
    title: "Column 2",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "Column 3",
    dataIndex: "updated_at",
    key: "updated_at",
  },
  {
    title: "Column 4",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Action",
    key: "operation",
    render: () => <a>action</a>,
  },
];

const TreeTable = () => {
  const {
    table: { list, total, searchParams },
    getTableData,
  } = useTool();
  const {
    routeData: { menus },
  } = useContext(RouteContext)!;

  const getData = (params: object) => {
    getTableData({
      ...searchParams,
      ...params,
    });
  };

  return (
    <>
      <Row gutter={16}>
        <Col xs={24} md={12} lg={8} xl={6}>
          <Card>
            <SearchTree
              data={menus}
              fieldNames={{
                key: "id",
                title: "label",
              }}
            />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={16} xl={18}>
          <Card>
            <ProTable
              getData={getData}
              searchParams={{ ...searchParams }}
              columns={columns}
              dataSource={list}
              total={total}
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default TreeTable;
