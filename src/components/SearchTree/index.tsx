import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input, Tree } from "antd";
import type { TreeDataNode, TreeProps } from "antd";
import { checkEleInLayout } from "@/utils/utils.ts";

import "./index.css";

const { Search } = Input;

const dataList: { key: React.Key; title: string }[] = [];

const getParentKey = (key: React.Key, tree: TreeDataNode[]): React.Key => {
  let parentKey: React.Key;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey!;
};

interface SearchTreeProps extends TreeProps {
  data: object[];
}

const SearchTree: React.FC<SearchTreeProps> = ({ data, fieldNames }) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [height, setHeight] = useState(650);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const treeRef = useRef(null);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const memoData = useMemo(() => {
    const {
      key = "key",
      title = "title",
      children = "children",
    } = fieldNames || {};

    const generateList = (data: Global.AnyObject[]): TreeDataNode[] =>
      data.flatMap((item) => {
        const keyVal = item[key] as string;
        if (keyVal) {
          const titleVal = item[title] as string;
          const childVal = item[children] as [];
          dataList.push({ key: keyVal, title: titleVal });
          if (childVal) {
            return {
              title: titleVal,
              key: keyVal,
              children: generateList(childVal),
            };
          }

          return [
            {
              title: titleVal,
              key: keyVal,
            },
          ];
        } else {
          return [];
        }
      });

    return generateList(data as Global.AnyObject[]);
  }, [data]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newExpandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, memoData);
        }
        return null;
      })
      .filter(
        (item, i, self): item is React.Key =>
          !!(item && self.indexOf(item) === i),
      );
    setExpandedKeys(newExpandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const treeData = useMemo(() => {
    const loop = (data: TreeDataNode[]): TreeDataNode[] =>
      data.flatMap((item) => {
        const strTitle = item.title as string;
        if (item.key) {
          const index = strTitle.indexOf(searchValue);
          const beforeStr = strTitle.substring(0, index);
          const afterStr = strTitle.slice(index + searchValue.length);
          const title =
            index > -1 ? (
              <span key={item.key}>
                {beforeStr}
                <span className="site-tree-search-value">{searchValue}</span>
                {afterStr}
              </span>
            ) : (
              <span key={item.key}>{strTitle}</span>
            );
          if (item.children) {
            return { title, key: item.key, children: loop(item.children) };
          }

          return [
            {
              title,
              key: item.key,
            },
          ];
        } else {
          return [];
        }
      });

    return loop(memoData);
  }, [memoData, searchValue]);

  useEffect(() => {
    if (treeRef.current) {
      const treeRect = (treeRef.current as Element).getBoundingClientRect();
      const inLayout = checkEleInLayout(treeRef.current);
      const footer = document.getElementById("footerLayout");
      if (treeRect)
        setHeight(
          window.innerHeight -
            treeRect.top -
            (inLayout ? footer!.offsetHeight + 25 : 24),
          // 边距24
        );
    }
  }, []);

  return (
    <>
      <Search
        id="searchTree"
        style={{ marginBottom: 8 }}
        placeholder="Search"
        onChange={onChange}
      />
      <div ref={treeRef}>
        <Tree
          height={height}
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          treeData={treeData}
        />
      </div>
    </>
  );
};

export default SearchTree;
