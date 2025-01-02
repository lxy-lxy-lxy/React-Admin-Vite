import axios, { Canceler, InternalAxiosRequestConfig } from "axios"; // axios引用
import { getErrorStr, setLoading } from "@utils/utils";
import { message } from "antd";

const env = import.meta.env;

const service = axios.create({
  // 创建服务
  baseURL: env.VITE_BASE_URL, // 基础路径
  timeout: 20000, // 请求延时
});

// 取消请求操作
const allPendingRequestsRecord: Canceler[] = [];
const pending: {
  [key: string]: Canceler;
} = {};

const removeAllPendingRequestsRecord = () => {
  allPendingRequestsRecord.forEach((func) => {
    // 取消请求（调用函数就是取消该请求）
    func("allCancel");
  });
  // 移除所有记录
  allPendingRequestsRecord.splice(0);
};

// 取消同一个重复的ajax请求
const removePending = (key: string, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key]("cancel");
  }
  delete pending[key];
};

// 取消所有请求的函数
export const getConfirmation = (_: string, callback = () => {}) => {
  removeAllPendingRequestsRecord();
  callback();
};

const getRequest = (
  config: InternalAxiosRequestConfig<unknown>,
  type: "request" | "response",
) => {
  if (config) {
    let reqData = "";
    if (config.method === "get") {
      reqData = `${config.url}${config.method}${JSON.stringify(config.params)}`;
    } else {
      reqData = config.url! + config.method + JSON.stringify(config.data);
    }

    setLoading({
      key: reqData,
      loading: type === "request",
    });
    return reqData;
  }
  return "";
};

service.interceptors.request.use(
  // 请求拦截
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["lang"] = localStorage.getItem("local");

    const reqData = getRequest(config, "request");
    // 如果玩家连续点击某个按钮会发起多个相同的请求，可以在这里进行拦截请求并取消上一个重复的请求
    removePending(reqData, true);
    // 设置请求的 cancelToken（设置后就能中途控制取消了）
    config.cancelToken = new axios.CancelToken((c) => {
      pending[reqData] = c;
      allPendingRequestsRecord.push(c);
    });

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
service.interceptors.response.use(
  // 回复拦截，主要针对部分回掉数据状态码进行处理
  (response) => {
    getRequest(response.config, "response");
    const { data, status } = response;
    if (status === 200) {
      const { code } = data;
      if (code === 200) {
        return data;
      } else {
        message.error({
          content: getErrorStr(code),
          key: code,
        });
        return Promise.reject("error");
      }
    } else {
      message.error({
        content: status,
        key: "Status Error",
      });
      return Promise.reject("error");
    }
  },
  (error) => {
    getRequest(error.config, "response");
    if (!axios.isCancel(error)) {
      try {
        const { data } = error.response;
        message.error({
          content: getErrorStr(data.code),
          key: data.code,
        });
      } catch {
        console.error(error);
        message.error({
          content: global.t("Network Error"),
          key: "Network Error",
        });
      }
      return Promise.reject(error);
    } else {
      return Promise.reject(!axios.isCancel(error));
    }
  },
);

export async function get<T>(url: string, params?: unknown): Promise<T> {
  const response = await service.get<T>(url, { params });
  return response.data;
}

export async function post<T>(url: string, data?: unknown): Promise<T> {
  const response = await service.post<T>(url, data);
  return response.data;
}

export async function put<T>(url: string, data?: unknown): Promise<T> {
  const response = await service.put<T>(url, data);
  return response.data;
}

export async function del<T>(url: string, params?: unknown): Promise<T> {
  const response = await service.delete<T>(url, { params });
  return response.data;
}
