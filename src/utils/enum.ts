interface codeType {
  [key: string]: string;
}

export const errorCode: codeType = {
  "400": "参数错误",
  "401": "无权限",
  "404": "记录不存在",
  "1000": "拒绝访问",
  "10000": "帐户或密码错误",
};
