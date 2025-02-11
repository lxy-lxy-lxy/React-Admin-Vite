import { useEffect } from "react";
import { Card } from "antd";
import styles from "../index.module.scss";

const HotCard = () => {
  useEffect(() => {}, []);

  return (
    <Card title={global.t("热门")} bordered={false} className={styles.hotCard}>
      <div className={styles.card}>
        <div className={styles.wrap}>
          <div className={styles.planet}>
            <div className={styles.ball} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HotCard;
