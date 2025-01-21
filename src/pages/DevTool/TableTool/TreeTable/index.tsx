import { Col, Row } from "antd";
import ProTable from "@/components/ProTable";
import type { TableColumnsType } from "antd";
import { useTool } from "@/stores/tool";
import SearchTree from "@/components/SearchTree";
import { useContext } from "react";
import { RouteContext } from "../../../../main.tsx";

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
    <Row gutter={16}>
      <Col xs={24} md={8} lg={6} xl={4}>
        <SearchTree
          data={menus}
          fieldNames={{
            key: "id",
            title: "label",
          }}
        />
      </Col>
      <Col xs={24} md={16} lg={18} xl={20}>
        <ProTable
          getData={getData}
          searchParams={{ ...searchParams }}
          columns={columns}
          dataSource={list}
          total={total}
          rowKey="id"
        />
      </Col>
    </Row>
  );
};
export default TreeTable;
