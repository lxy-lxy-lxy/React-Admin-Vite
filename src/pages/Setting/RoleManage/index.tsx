import { FC } from "react";
import ProTable from "@components/ProTable";
import type { TableColumnsType } from "antd";
import { useSetting } from "@stores/setting";

const columns: TableColumnsType<Role.DataType> = [
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
    title: global.t("创建时间"),
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: global.t("更新时间"),
    dataIndex: "updated_at",
    key: "updated_at",
  },
  {
    title: "Action",
    key: "operation",
    render: () => <a>action</a>,
  },
];

const RoleManage: FC = () => {
  const {
    role: { list, total, loading, searchParams },
    getRoleData,
  } = useSetting();

  const getData = (params: object) => {
    getRoleData({
      ...searchParams,
      ...params,
    });
  };

  return (
    <ProTable<Role.DataType>
      getData={getData}
      searchParams={{ ...searchParams }}
      columns={columns}
      dataSource={list}
      loading={loading}
      total={total}
      rowKey="id"
    />
  );
};
export default RoleManage;
