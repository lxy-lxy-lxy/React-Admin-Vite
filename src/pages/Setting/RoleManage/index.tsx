import { FC, useRef } from "react";
import ProTable from "@/components/ProTable";
import { message, Space, Tag, Typography, Card } from "antd";
import type { TableColumnsType } from "antd";
import { useSetting } from "@/stores/setting";
import Button from "@/components/Button";
import RoleComp from "./components/RoleComp.tsx";
import { statusObj } from "@/utils/enum.ts";

const { Text } = Typography;

const RoleManage: FC = () => {
  const {
    role: { list, total, searchParams },
    getRoleData,
  } = useSetting();
  const compRef = useRef<Role.RoleCompRef>(null);

  const columns: TableColumnsType<Role.DataType> = [
    {
      title: global.t("角色"),
      dataIndex: "role_name",
    },
    {
      title: global.t("状态"),
      dataIndex: "status",
      render: (_, { status }) => {
        const { color, label } = statusObj[status] || {};
        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: global.t("创建时间"),
      dataIndex: "created_at",
    },
    {
      title: global.t("更新时间"),
      dataIndex: "updated_at",
    },
    {
      title: global.t("备注"),
      dataIndex: "remark",
      render: (_, { remark }) => (
        <Text ellipsis={{ tooltip: remark }}>{remark}</Text>
      ),
    },
    {
      title: "操作",
      key: "operation",
      align: "center",
      render: (_, record) => {
        const { status } = record;
        const { color, label } = statusObj[status === 0 ? 1 : 0] || {};
        return (
          <Space>
            <Button type="primary" onClick={() => onOpen(record)}>
              {global.t("编辑")}
            </Button>
            <Button
              type="primary"
              onClick={() => {
                message.success(global.t("模拟成功"));
                getData();
              }}
              {...(color === "success" ? { success: true } : { danger: true })}
            >
              {label}
            </Button>
          </Space>
        );
      },
    },
  ];

  const getData = (params?: Role.Params) => {
    getRoleData({
      ...searchParams,
      ...params,
    });
  };

  const onOpen = (e?: Role.DataType) => {
    compRef.current?.open(e);
  };

  return (
    <Card>
      <ProTable<Role.DataType>
        getData={getData}
        searchParams={{ ...searchParams }}
        columns={columns}
        dataSource={list}
        total={total}
        rowKey="role_id"
        scrollX={900}
        onSearch={(e) => {
          getData({
            name: e,
            page: 1,
          });
        }}
        onCreate={() => onOpen()}
      />
      <RoleComp ref={compRef} />
    </Card>
  );
};
export default RoleManage;
