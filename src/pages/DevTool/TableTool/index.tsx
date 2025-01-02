import { Form, Input } from "antd";
import ProTable from "@components/ProTable";
import ProSearch from "@components/ProSearch";
import type { TableColumnsType } from "antd";
import { useTool } from "@stores/tool";

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

const TableTool = () => {
  const {
    table: { list, total, searchParams },
    getTableData,
  } = useTool();

  const getData = (params: object) => {
    getTableData({
      ...searchParams,
      ...params,
    });
  };

  return (
    <>
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
            countSpan: { xl: 2 },
          },
          {
            element: (
              <Form.Item label={global.t("搜索2")} name="search2">
                <Input />
              </Form.Item>
            ),
          },
          {
            element: (
              <Form.Item label={global.t("名称2")} name="name2">
                <Input />
              </Form.Item>
            ),
          },
          {
            element: (
              <Form.Item label={global.t("搜索3")} name="search3">
                <Input />
              </Form.Item>
            ),
            countSpan: { md: 2 },
          },
          {
            element: (
              <Form.Item label={global.t("名称3")} name="name3">
                <Input />
              </Form.Item>
            ),
          },
          {
            element: (
              <Form.Item label={global.t("搜索3")} name="search3">
                <Input />
              </Form.Item>
            ),
          },
          {
            element: (
              <Form.Item label={global.t("名称4")} name="name4">
                <Input />
              </Form.Item>
            ),
          },
          {
            element: (
              <Form.Item label={global.t("名称4")} name="name4">
                <Input />
              </Form.Item>
            ),
            countSpan: { xxl: 2 },
          },
        ]}
      />
      <ProTable
        getData={getData}
        searchParams={{ ...searchParams }}
        columns={columns}
        dataSource={list}
        total={total}
        rowKey="id"
      />
    </>
  );
};
export default TableTool;
