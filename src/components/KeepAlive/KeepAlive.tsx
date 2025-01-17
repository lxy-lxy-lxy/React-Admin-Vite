import type { ReactNode, RefObject } from "react";
import { memo, useImperativeHandle, useLayoutEffect, useState } from "react";
import CacheComp from "@components/KeepAlive/CacheComp";
import KeepAliveProvider from "@components/KeepAlive/KeepAliveProvider";

function isNil(value: unknown) {
  return value === null || value === undefined;
}

export interface ComponentReactElement {
  children?: ReactNode | ReactNode[];
}

export type KeepAliveRef = {
  getCaches: () => Array<{ name: string; ele?: ReactNode }>;
  /**
   * 清除指定缓存
   * @param name
   */
  removeCache: (name: string) => void;
  /**
   * 清除所有缓存
   */
  cleanAllCache: () => void;
  /**
   * 清除其他缓存 除了当前的
   */
  cleanOtherCache: () => void;
};

interface Props extends ComponentReactElement {
  activeKey: string;
  include?: Array<string>;
  exclude?: Array<string>;
  max?: number;
  cache?: boolean;
  aliveRef?: RefObject<KeepAliveRef>;
}

const KeepAlive = memo(function KeepAlive(props: Props) {
  const { activeKey, cache, children, exclude, include, max, aliveRef } = props;
  const [cacheReactNodes, setCacheReactNodes] = useState<
    Array<{
      name: string;
      cache: boolean;
      ele: ReactNode;
    }>
  >([]);

  useImperativeHandle(
    aliveRef,
    () => ({
      getCaches: () => cacheReactNodes,

      removeCache: (name: string) => {
        setTimeout(() => {
          setCacheReactNodes((cacheReactNodes) => {
            return cacheReactNodes.filter((res) => res.name !== name);
          });
        }, 0);
      },
      cleanAllCache: () => {
        setCacheReactNodes([]);
      },
      cleanOtherCache: () => {
        setCacheReactNodes((cacheReactNodes) => {
          return cacheReactNodes.filter(({ name }) => name === activeKey);
        });
      },
    }),
    [cacheReactNodes, setCacheReactNodes, activeKey],
  );

  useLayoutEffect(() => {
    if (isNil(activeKey)) {
      return;
    }
    setCacheReactNodes((cacheReactNodes) => {
      if (cacheReactNodes.length >= (max || 20)) {
        cacheReactNodes = cacheReactNodes.slice(1, cacheReactNodes.length);
      }
      // remove exclude
      if (exclude && exclude.length > 0) {
        cacheReactNodes = cacheReactNodes.filter(
          ({ name }) => !exclude?.includes(name),
        );
      }
      // only keep include
      if (include && include.length > 0) {
        cacheReactNodes = cacheReactNodes.filter(({ name }) =>
          include?.includes(name),
        );
      }
      // remove cache false
      cacheReactNodes = cacheReactNodes.filter(({ cache }) => cache);
      const cacheReactNode = cacheReactNodes.find(
        (res) => res.name === activeKey,
      );
      if (isNil(cacheReactNode)) {
        cacheReactNodes.push({
          cache: cache ?? true,
          name: activeKey,
          ele: children,
        });
      } else {
        // important update children when activeKey is same
        // this can trigger children onActive
        cacheReactNodes = cacheReactNodes.map((res) => {
          return res.name === activeKey ? { ...res, ele: children } : res;
        });
      }
      return cacheReactNodes;
    });
  }, [children, cache, activeKey, exclude, max, include]);

  return (
    <KeepAliveProvider>
      {cacheReactNodes?.map(({ name, cache, ele }) => (
        <CacheComp active={name === activeKey} cache={cache} key={name}>
          {ele}
        </CacheComp>
      ))}
    </KeepAliveProvider>
  );
});

export default KeepAlive;
