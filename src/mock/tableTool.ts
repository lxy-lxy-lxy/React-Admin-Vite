import { mock } from "mockjs";

export default [
  {
    url: "/tableTool/getTableList",
    type: "get",
    response: ({ query }: { query: TableTool.Params }) => {
      return {
        code: 200,
        message: "操作成功",
        data: {
          ...mock({
            [`list|${query.pageSize}`]: [
              {
                title: "@cname", // 中文名
                account: `@word`, // 英文单词
                phone: /1[3-9][0-9]{9}/, // 正则模式
                deptName: mock("@cword(2,4)"), // 随机2-4字中文单词
                created_at: mock("@date"), // 随机2-4字中文单词
                updated_at: mock("@date"), // 随机2-4字中文单词
                id: "@guid", // guid
              },
            ],
            total: 555,
          }),
        },
      };
      // 使用return返回前端需要的数据
    },
  },
];
