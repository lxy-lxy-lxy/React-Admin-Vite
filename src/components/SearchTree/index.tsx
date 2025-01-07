import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input, Tree } from "antd";
import type { TreeDataNode } from "antd";

import "./index.css";
import { checkEleInLayout } from "@utils/utils.ts";

const { Search } = Input;

const x = 5;
const y = 4;
const z = 3;
const defaultData: TreeDataNode[] = [];

const generateData = (
  _level: number,
  _preKey?: React.Key,
  _tns?: TreeDataNode[],
) => {
  const preKey = _preKey || "0";
  const tns = _tns || defaultData;

  const children: React.Key[] = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

const dataList: { key: React.Key; title: string }[] = [];
const generateList = (data: TreeDataNode[]) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key } = node;
    dataList.push({ key, title: key as string });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(defaultData);

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

const SearchTree: React.FC = () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [height, setHeight] = useState(650);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const treeRef = useRef(null);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newExpandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, defaultData);
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
    dataList.splice(0);
    const loop = (data: TreeDataNode[]): TreeDataNode[] =>
      data.map((item) => {
        const strTitle = item.title as string;
        dataList.push({ key: item.key, title: strTitle });
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

        return {
          title,
          key: item.key,
        };
      });

    return loop(defaultData);
  }, [defaultData, searchValue]);

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
