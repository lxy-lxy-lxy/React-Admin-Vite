import { useEffect, useState, useRef, FC } from "react";
import { Button, Flex, Table, Input } from "antd";
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

import styles from "./index.module.scss";

const { Search } = Input;
const showTotal = (total: number) => `Total ${total} `;

interface Props extends TableProps {
  getData: (params: object) => void;
  searchParams: { [key: string]: unknown };
  total: number;
  scrollX?: number;
  loading: boolean;
  allowSearch?: boolean;
  allowCreate?: boolean;
  allowExport?: boolean;
  allowFullScreen?: boolean;
}

const ProTable: FC<Props> = (props) => {
  const {
    getData,
    searchParams = {},
    total,
    scrollX = 1500,
    loading,
    allowSearch = false,
    allowCreate = true,
    allowExport = false,
    allowFullScreen = true,
    ...rest
  } = props;
  const tableBoxRef = useRef(null);
  const tableToolRef = useRef(null);
  const { pathname } = useLocation();
  const { userConfig, setUserConfig } = useGlobalStore();
  const [fullscreen, setFullscreen] = useState(false);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
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
  }, 50);

  const getHeight = (mode?: boolean) => {
    if (tableBoxRef.current) {
      const content = document.getElementById("contentLayout");
      const footer = document.getElementById("footerLayout");
      const head = (tableBoxRef.current as Document).getElementsByClassName(
        "ant-table-thead",
      )[0];
      const pagination = (
        tableBoxRef.current as Document
      ).getElementsByClassName("ant-pagination")[0] as HTMLDivElement;

      if (content && content.contains(tableBoxRef.current)) {
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
    return undefined;
  };

  return (
    <div
      ref={tableBoxRef}
      className={`${styles.proTable} ${fullscreen ? styles.fullscreen : ""}`}
    >
      <Flex
        ref={tableToolRef}
        justify="flex-end"
        align="center"
        className={`${fullscreen ? styles.fullscreenTool : ""}`}
      >
        {allowSearch && (
          <Search
            loading={loading}
            className="mb-1 mr-1"
            placeholder="input search text"
            onSearch={(e) => {
              getData({
                keyword: e,
              });
            }}
            style={{
              width: 200,
            }}
          />
        )}
        {allowCreate && (
          <Button type="primary" className="mb-1 mr-1">
            <PlusOutlined /> {global.t("添加")}
          </Button>
        )}
        {allowExport && (
          <Button type="primary" className="mb-1 mr-1">
            <ExportOutlined /> {global.t("导出")}
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
            userConfig.pathname.pageSize ||
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
          y: height || getHeight(),
        }}
        {...rest}
      />
    </div>
  );
};
export default ProTable;
