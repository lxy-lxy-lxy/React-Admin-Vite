import { useEffect, useState, FC, MouseEvent, useContext } from "react";
import { Flex, Tag } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutContext } from "./LayoutProvider.tsx";

import styles from "../index.module.scss";

const TabHistory: FC = () => {
  const {
    layoutData: { menusObj },
  } = useContext(LayoutContext)!;
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

  useEffect(() => {
    if (menusObj[pathname]) setTagHistory(pathname);
  }, [pathname, menusObj]);

  const onClose = (e: MouseEvent<HTMLElement>, key: string) => {
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
            <>{menusObj[tag]}</>
          </Tag>
        );
      })}
    </Flex>
  );
};
export default TabHistory;
