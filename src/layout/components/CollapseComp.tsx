import { FC } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useGlobalStore } from "@/stores/index";
import Button from "@/components/Button";
import styles from "../index.module.scss";

const CollapseComp: FC = (props) => {
  const { themeConfig, setThemeConfig } = useGlobalStore();
  const { collapsed } = themeConfig;

  const onCollapse = () => {
    setThemeConfig({
      collapsed: !collapsed,
    });
  };

  return (
    <Button
      size="large"
      type="text"
      icon={
        collapsed ? (
          <MenuUnfoldOutlined className={styles.collapseBtn} />
        ) : (
          <MenuFoldOutlined className={styles.collapseBtn} />
        )
      }
      onClick={onCollapse}
      {...props}
    />
  );
};

export default CollapseComp;
