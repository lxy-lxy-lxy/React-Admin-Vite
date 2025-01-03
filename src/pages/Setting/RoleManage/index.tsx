import { FC, useLayoutEffect, useRef } from "react";
import ProTable from "@components/ProTable";
import { message, Space, Tag, Typography } from "antd";
import type { TableColumnsType } from "antd";
import { useSetting } from "@stores/setting";
import Button from "@components/Button";
import RoleComp from "./components/RoleComp.tsx";
import { statusObj } from "@utils/enum.ts";
import Page from "@layout/components/Page.tsx";

const { Text } = Typography;

const RoleManage: FC = () => {
  const {
    role: { list, total, loading, searchParams },
    getRoleData,
    resetRoleData,
  } = useSetting();
  const compRef = useRef<Role.RoleCompRef>(null);

  useLayoutEffect(() => {
    return () => {
      resetRoleData();
    };
  }, []);

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
    <Page>
      <ProTable<Role.DataType>
        getData={getData}
        searchParams={{ ...searchParams }}
        columns={columns}
        dataSource={list}
        loading={loading}
        total={total}
        rowKey="role_id"
        scrollX={900}
        onSearch={(e) => {
          getData({
            keyword: e,
            page: 1,
          });
        }}
        onCreate={() => onOpen()}
      />
      <RoleComp ref={compRef} />
    </Page>
  );
};
export default RoleManage;
