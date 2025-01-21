import { getLoading } from "@/utils/utils.ts";
import { useEffect, useState } from "react";

export const useLoading = (loadingKey?: "") => {
  const type = loadingKey ? "comp" : "global";
  const [timer, setTimer] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const getCurLoading = () => {
    const sessionLoading = getLoading(loadingKey, type);
    const curLoading =
      type === "global"
        ? Object.keys(sessionLoading).length > 0
        : !!sessionLoading;
    if (curLoading) {
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }
      setLoading(curLoading);
    } else {
      const newTimer = setTimeout(() => {
        setLoading(curLoading);
      }, 150);
      setTimer(newTimer);
    }
  };

  useEffect(() => {
    window.addEventListener("storageChange", getCurLoading, false);

    return () => {
      window.removeEventListener("storageChange", getCurLoading, false);
    };
  }, []);

  return loading;
};
