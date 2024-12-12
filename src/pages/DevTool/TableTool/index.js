import React from "react";
import { Form, Input } from "antd";
import ProTable from "@components/ProTable";
import ProSearch from "@components/ProSearch";
import { useTool } from "@stores/tool";

console.log(import.meta.env);
const columns = [
  {
    title: global.t("ID"),
    dataIndex: "id",
    key: "matchID",
    fixed: "left",
  },
  {
    title: global.t("名称"),
    dataIndex: "title",
    key: "name",
  },
  {
    title: "Column 1",
    dataIndex: "account",
    key: "1",
  },
  {
    title: "Column 2",
    dataIndex: "created_at",
    key: "2",
  },
  {
    title: "Column 3",
    dataIndex: "updated_at",
    key: "3",
  },
  {
    title: "Column 4",
    dataIndex: "deptName",
    key: "4",
  },
  {
    title: "Column 5",
    dataIndex: "phone",
    key: "5",
  },
  {
    title: "Action",
    key: "operation",
    render: () => <a>action</a>,
  },
];

const TableTool = () => {
  const {
    table: { list, total, loading, searchParams },
    getTableData,
  } = useTool();

  const getData = (params) => {
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
        searchParams={searchParams}
        columns={columns}
        dataSource={list}
        loading={loading}
        total={total}
        rowKey="id"
      />
    </>
  );
};
export default TableTool;
