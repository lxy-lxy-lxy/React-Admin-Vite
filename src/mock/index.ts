import Mock from "mockjs"; // 导入mockjs
import loginApi from "./login";
import tableToolApi from "./tableTool";
import type { MockjsRequestOptions } from "mockjs";

const mocks = [
  {
    intercept: true, // 你可能需要一个开关，来使模拟请求与真实请求并存
    fetchs: loginApi,
  },
  {
    intercept: true,
    fetchs: tableToolApi,
  },
];

// 抄来一个解析地址栏参数解析函数
export function param2Obj(url: string) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, " ") +
      '"}',
  );
}

interface MockOptions {
  method: string;
  body: object;
  query: object;
}

export function mockXHR() {
  function XHR2ExpressReqWrap(res?: (params: MockOptions) => unknown) {
    return function (options: MockjsRequestOptions) {
      let result;
      if (res instanceof Function) {
        const { body, type, url } = options;
        // https://expressjs.com/en/4x/api.html#req
        result = res({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url),
        });
      } else {
        result = res;
      }
      return Mock.mock(result);
    };
  }

  for (const i of mocks) {
    if (i.intercept) {
      for (const fetch of i.fetchs) {
        Mock.mock(
          new RegExp(fetch.url),
          fetch.type || "get",
          XHR2ExpressReqWrap(
            fetch.response as (params: MockOptions) => unknown,
          ),
        );
      }
    }
  }
}
