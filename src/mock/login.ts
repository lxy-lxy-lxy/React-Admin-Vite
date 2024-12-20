import { mock } from "mockjs";
import md5 from "md5";

interface UserInfo {
  id: string;
  username: string;
  password: string;
  token: string;
}

const userList: UserInfo[] = mock([
  {
    id: "1",
    username: "admin",
    password: "123456",
    token: "123133123",
  },
  {
    id: "2",
    username: "root",
    password: "root",
    token: "65454634",
  },
]);

export default [
  {
    url: "/user/login",
    type: "post",
    response: ({ body }: { body: LoginInfo.LoginForm }) => {
      const user = userList.find((item) => item.username === body.username);

      if (!user || body.password !== md5(user.password)) {
        return {
          code: -1001,
          message: "帐号或密码错误",
          data: {},
        };
      }

      return {
        code: 200,
        message: "操作成功",
        data: { ...user },
      };
      // 使用return返回前端需要的数据
    },
  },
];
