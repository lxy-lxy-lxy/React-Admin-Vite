import { getLoading } from "@utils/utils.ts";
import { useMemo } from "react";

export const useLoading = (loadingKey?: "") => {
  const type = loadingKey ? "comp" : "global";
  const sessionLoading = getLoading(loadingKey, type);

  const loading =
    type === "global" ? Object.keys(sessionLoading).length > 0 : sessionLoading;

  return useMemo(() => loading, [loading]);
};
