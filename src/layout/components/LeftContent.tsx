import { FC } from "react";
import CollapseComp from "./CollapseComp";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/img/logo/logo.svg";
import styles from "../index.module.scss";

const LeftContent: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center">
      <div className={styles.contentLogo} onClick={() => navigate("")}>
        <img alt="" src={logo} width={35} height={35} />
      </div>
      <CollapseComp />
    </div>
  );
};

export default LeftContent;
