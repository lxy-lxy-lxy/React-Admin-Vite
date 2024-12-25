/**
 * Demo用，实际使用建议维护数据字典
 */

interface CodeType {
  [key: string]: string;
}

interface StatusType {
  [key: string]: {
    label: string;
    color: "success" | "processing" | "error" | "default" | "warning";
  };
}

export const errorCode: CodeType = {
  "400": "参数错误",
  "401": "无权限",
  "404": "记录不存在",
  "1000": "拒绝访问",
  "10000": "帐户或密码错误",
};

export const statusObj: StatusType = {
  0: { label: "停用", color: "error" },
  1: { label: "启用", color: "success" },
};
