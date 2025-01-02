import { getLoading } from "@utils/utils.ts";
import { useEffect, useState } from "react";

export const useLoading = (loadingKey?: "") => {
  const type = loadingKey ? "comp" : "global";
  const sessionLoading = getLoading(loadingKey, type);
  const [timer, setTimer] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const curLoading =
    type === "global"
      ? Object.keys(sessionLoading).length > 0
      : !!sessionLoading;

  useEffect(() => {
    if (curLoading) {
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }
      setLoading(curLoading);
    } else {
      const newTimer = setTimeout(() => {
        setLoading(curLoading);
      }, 200);
      setTimer(newTimer);
    }
  }, [curLoading]);

  return loading;
};
