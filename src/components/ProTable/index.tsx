import { useLayoutEffect, useState, useRef, ReactNode } from "react";
import type { ChangeEvent, MouseEvent, KeyboardEvent } from "react";
import { Flex, Table, Input } from "antd";
import type { TableProps } from "antd";
import { useLocation } from "react-router-dom";
import { useGlobalStore } from "@stores/index";
import {
  PlusOutlined,
  ExportOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons";
import { debounce } from "lodash-es";
import Button from "@components/Button";

import styles from "./index.module.scss";

const { Search } = Input;
const showTotal = (total: number) => `Total ${total} `;

interface Props<T> extends TableProps<T> {
  getData?: (params: object) => void;
  dataSource: T[];
  searchParams?: { [key: string]: unknown };
  total?: number;
  scrollX?: number;
  loading?: boolean;
  // 简单的关键词搜索，扩展搜索请使用 customTool 或 ProSearch（见DevTool/TableTool），复杂搜索不建议使用
  onSearch?: (
    value: string,
    event?:
      | ChangeEvent<HTMLInputElement>
      | MouseEvent<HTMLElement>
      | KeyboardEvent<HTMLInputElement>,
    info?: { source?: "clear" | "input" },
  ) => void;
  onCreate?: (e: MouseEvent<HTMLElement>) => void;
  onExport?: (e: MouseEvent<HTMLElement>) => void;
  allowFullScreen?: boolean;
  // 自定义工具栏，可扩展搜索，复杂搜索不建议使用（见DevTool/TableTool）
  customTool?: ReactNode;
}

const ProTable: <T>(props: Props<T>) => ReactNode = (props) => {
  const {
    getData,
    dataSource,
    searchParams = {},
    total,
    scrollX = 1500,
    loading,
    onSearch = undefined,
    onCreate = undefined,
    onExport = undefined,
    allowFullScreen = true,
    customTool = undefined,
    ...rest
  } = props;
  const tableBoxRef = useRef(null);
  const { pathname } = useLocation();
  const { userConfig, setUserConfig } = useGlobalStore();
  const [fullscreen, setFullscreen] = useState(false);
  const [height, setHeight] = useState<number | "max-content">("max-content");

  useLayoutEffect(() => {
    if (getData) {
      getData(
        searchParams.pageSize
          ? {
              page: 1,
            }
          : {
              page: 1,
              pageSize: userConfig[pathname]?.pageSize || 30,
            },
      );
    }
    const resizeObserver = new ResizeObserver(() => {
      onResize();
    });

    /* 假设页面中有某个元素 **/
    const divEl = document
      .getElementById("contentLayout")!
      .querySelector(".ant-card-body");
    /* 监听页面中某个元素 **/
    if (divEl) resizeObserver.observe(divEl);

    return () => {
      if (divEl) resizeObserver.unobserve(divEl);
    };
  }, []);

  const onShowSizeChange = (_: number, size: number) => {
    setUserConfig(pathname, { pageSize: size });
  };

  const onChange = (page: number, pageSize: number) => {
    if (getData) {
      getData({
        page,
        pageSize,
      });
    }
  };

  const onResize = debounce((mode?: boolean) => {
    setHeight(getHeight(mode));
  }, 188);

  const getHeight = (mode?: boolean) => {
    if (tableBoxRef.current) {
      const content = document.getElementById("contentLayout");
      if (content && content.contains(tableBoxRef.current)) {
        const footer = document.getElementById("footerLayout");
        const head = (tableBoxRef.current as Document).getElementsByClassName(
          "ant-table-thead",
        )[0];
        const pagination = (
          tableBoxRef.current as Document
        ).getElementsByClassName("ant-pagination")[0] as HTMLDivElement;

        const headRect = head.getBoundingClientRect();
        return (
          window.innerHeight -
          headRect.bottom -
          (pagination ? pagination.offsetHeight : 0) -
          ((mode !== undefined ? mode : fullscreen)
            ? 0
            : footer!.offsetHeight + 25)
        );
      }
    }
    return "max-content";
  };

  return (
    <div
      ref={tableBoxRef}
      className={`${styles.proTable} ${fullscreen ? styles.fullscreen : ""}`}
    >
      <Flex
        justify="flex-end"
        align="center"
        className={`${fullscreen ? styles.fullscreenTool : ""}`}
      >
        {customTool}
        {onSearch && (
          <Search
            loading={loading}
            className="mb-1 mr-1"
            placeholder={global.t("请输入关键词")}
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
        )}
        {onCreate && (
          <Button
            type="primary"
            className="mb-1 mr-1"
            onClick={(e) => onCreate(e)}
          >
            <>
              <PlusOutlined /> {global.t("添加")}
            </>
          </Button>
        )}
        {onExport && (
          <Button type="primary" className="mb-1 mr-1" onClick={onExport}>
            <>
              <ExportOutlined /> {global.t("导出")}
            </>
          </Button>
        )}
        {allowFullScreen && (
          <Button
            className="mb-1"
            onClick={(e) => {
              e.preventDefault();
              const mode = !fullscreen;
              setFullscreen(mode);
              setTimeout(() => {
                onResize(mode);
              }, 1);
            }}
          >
            {fullscreen ? (
              <>
                <FullscreenExitOutlined /> {global.t("退出全屏")}
              </>
            ) : (
              <>
                <FullscreenOutlined /> {global.t("全屏")}
              </>
            )}
          </Button>
        )}
      </Flex>
      <Table
        size="small"
        loading={loading}
        pagination={{
          total,
          position: ["bottomCenter"],
          // defaultCurrent: searchParams.page || 1,
          defaultPageSize: (searchParams.pageSize ||
            userConfig.pathname?.pageSize ||
            30) as number,
          pageSizeOptions: [10, 30, 50, 100],
          // hideOnSinglePage: true,
          showSizeChanger: true,
          onShowSizeChange,
          onChange,
          showTotal,
        }}
        scroll={{
          x: scrollX,
          y: height,
        }}
        dataSource={dataSource}
        {...rest}
      />
    </div>
  );
};

export default ProTable;
