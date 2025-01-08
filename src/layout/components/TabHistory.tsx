import { useEffect, useState, FC, MouseEvent, useContext } from "react";
import { Flex, Layout, Tag, theme } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { RouteContext } from "../../main.tsx";

import styles from "../index.module.scss";

const { Header } = Layout;

const TabHistory: FC = () => {
  const {
    routeData: { menusObj },
  } = useContext(RouteContext)!;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [tagHistory, handleHistory] = useState(["/"]);
  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken();

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
    <Header
      style={{
        padding: "0 1rem",
        height: "4.8rem",
        borderTop: `0.1rem solid ${colorBorderSecondary}`,
        background: colorBgContainer,
      }}
    >
      <Flex align="center" className={styles.tabHistory}>
        {tagHistory.map((tag) => {
          const isSelect = pathname === tag;
          const text = menusObj[tag] as string;
          return (
            <Tag
              key={tag}
              className={`disSelect ${isSelect ? styles.selectedTag : styles.unselectedtag}`}
              closeIcon={tag !== "/"}
              onClose={(e) => onClose(e, tag)}
              onClick={() => navigate(tag)}
            >
              {text}
            </Tag>
          );
        })}
      </Flex>
    </Header>
  );
};
export default TabHistory;
