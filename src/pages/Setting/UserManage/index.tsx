import { FC, useRef } from "react";
import ProTable from "@/components/ProTable";
import { message, Space, Tag, Card } from "antd";
import type { TableColumnsType } from "antd";
import { useSetting } from "@/stores/setting";
import Button from "@/components/Button";
import UserComp from "./components/UserComp.tsx";
import { statusObj } from "@/utils/enum.ts";

const UserManage: FC = () => {
  const {
    user: { list, total, searchParams },
    getUserData,
  } = useSetting();
  const compRef = useRef<User.UserCompRef>(null);

  const columns: TableColumnsType<User.DataType> = [
    {
      title: global.t("用户"),
      dataIndex: "user_name",
    },
    {
      title: global.t("角色"),
      dataIndex: "role_id",
    },
    {
      title: global.t("邮箱"),
      dataIndex: "email",
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

  const getData = (params?: User.Params) => {
    getUserData({
      ...searchParams,
      ...params,
    });
  };

  const onOpen = (e?: User.DataType) => {
    compRef.current?.open(e);
  };

  return (
    <Card>
      <ProTable<User.DataType>
        getData={getData}
        searchParams={{ ...searchParams }}
        columns={columns}
        dataSource={list}
        total={total}
        rowKey="user_id"
        scrollX={900}
        onSearch={(e) => {
          getData({
            name: e,
            page: 1,
          });
        }}
        onCreate={() => onOpen()}
      />
      <UserComp ref={compRef} />
    </Card>
  );
};
export default UserManage;
