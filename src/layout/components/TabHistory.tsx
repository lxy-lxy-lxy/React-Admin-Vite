import { useEffect, useState, FC, MouseEvent } from "react";
import { Flex, Tag } from "antd";
import { routes } from "@services/router";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "../index.module.scss";

const TabHistory: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [tagHistory, handleHistory] = useState(["/"]);

  const setTagHistory = (key: string, opType = 1) => {
    let arr = [...tagHistory];
    const idx = tagHistory.findIndex((item) => item === pathname);
    if (opType === 1 && !tagHistory.find((item) => item === key)) {
      arr = tagHistory.concat([key]);
    } else if (opType === 0) {
      arr = tagHistory.filter((item) => item !== key);
    }
    if (arr.length <= 1 || opType === 0) {
      navigate(arr[idx - 1]);
    }
    handleHistory(arr);
  };

  const getItems = (children) => {
    return children.reduce((pre, next) => {
      const key = next.index
        ? "/"
        : next.path?.startsWith("/")
          ? next.path
          : `/${next.path}`;
      pre[key] = global.t(next.title);

      if (next.children) {
        pre = {
          ...pre,
          ...getItems(next.children),
        };
      }
      return pre;
    }, {});
  };

  const menuItems = getItems(
    routes[0].children
      ? routes[0].children[0].children.filter((item) => item.path !== "*")
      : [],
  );

  useEffect(() => {
    if (menuItems[pathname]) setTagHistory(pathname);
  }, [pathname]);

  const onClose = (e: MouseEvent<HTMLElement, MouseEvent>, key: string) => {
    e.preventDefault();
    setTagHistory(key, 0);
  };

  return (
    <Flex align="center" className={styles.tabHistory}>
      {tagHistory.map((tag) => {
        const isSelect = pathname === tag;
        return (
          <Tag
            key={tag}
            className={`disSelect ${isSelect ? styles.selectedTag : styles.unselectedtag}`}
            closeIcon={tag !== "/"}
            onClose={(e) => onClose(e, tag)}
            onClick={() => navigate(tag)}
          >
            {menuItems[tag]}
          </Tag>
        );
      })}
    </Flex>
  );
};
export default TabHistory;
