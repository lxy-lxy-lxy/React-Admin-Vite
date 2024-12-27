import { useEffect, useRef } from "react";
import { useKeepAliveContext } from "@utils/hooks/useKeepAliveContext.ts";

export const useOnActive = (cb: () => unknown, skipMount = true) => {
  const domRef = useRef<HTMLDivElement>(null);
  const { activeKey } = useKeepAliveContext();
  const isMount = useRef(false);

  useEffect(() => {
    let destroyCb: unknown;
    const parent = domRef.current?.parentElement;
    const name = parent?.id;
    if (parent && name) {
      if (activeKey === name) {
        if (skipMount) {
          if (isMount.current) destroyCb = cb();
        } else {
          destroyCb = cb();
        }
        isMount.current = true;
        return () => {
          if (destroyCb && typeof destroyCb === "function") {
            destroyCb();
          }
        };
      }
    }
  }, [activeKey]);

  return domRef;
};
