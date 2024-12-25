import styles from "../index.module.scss";
import { PropsWithChildren, FC } from "react";

interface Props {
  className?: string;
}

const Page: FC<Props & PropsWithChildren> = ({ className, children }) => {
  return <div className={`${styles.innerPage} ${className}`}>{children}</div>;
};

export default Page;
