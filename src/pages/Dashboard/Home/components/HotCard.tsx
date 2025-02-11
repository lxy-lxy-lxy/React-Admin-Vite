import { CSSProperties, useEffect } from "react";
import { Card } from "antd";
import styles from "../index.module.scss";

const dataSource = Array(100)
  .fill(1)
  .map((item, index) => ({
    name: index % 2 === 0 ? `山河${item + index}` : `湖海${item + index}`,
  }));

const HotCard = () => {
  useEffect(() => {}, []);

  return (
    <Card title={global.t("热门")} bordered={false} className={styles.hotCard}>
      <div className={styles["tagcloud-wrapper"]}>
        <div
          className={styles["tagcloud-controls"]}
          style={
            {
              "--num-elements": 20,
            } as CSSProperties
          }
        >
          {Array(20)
            .fill(1)
            .map((item, index) => (
              <div
                className={styles["tagcloud-control-button"]}
                style={
                  {
                    "--index": item + index,
                  } as CSSProperties
                }
              >
                <input type="radio" name="tagcloud-control-input" />
              </div>
            ))}

          <div className={styles["tagcloud-rotation"]}>
            <ul
              className={styles["tagcloud-tags"]}
              style={
                {
                  "--num-elements": dataSource.length,
                } as CSSProperties
              }
            >
              {dataSource.map((item, index) => (
                <li
                  className={styles["tagcloud-tag"]}
                  style={
                    {
                      "--index": index,
                    } as CSSProperties
                  }
                >
                  <div>
                    <a target="_blank">{item.name}</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HotCard;
