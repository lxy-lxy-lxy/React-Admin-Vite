import { useContext } from "react";
import { KeepAliveContext } from "@components/KeepAlive/KeepAliveProvider";

export const useKeepAliveContext = () => {
  return useContext(KeepAliveContext);
};
