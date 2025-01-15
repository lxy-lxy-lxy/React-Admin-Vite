import { Card, Button, Input, Tabs } from "antd";
import { useMemo, useState, useRef } from "react";
import KeepAlive from "@components/KeepAlive/KeepAlive.tsx";
import { useOnActive } from "@utils/hooks/useOnActive.ts";

function TabA() {
  const [name, setName] = useState<string>();
  const [count, setCount] = useState(0);
  const domRef = useOnActive(() => {
    console.log("TabA onActive"); // this will be trigger when tabA is active
    return () => {
      console.log("TabA inActive");
    };
  }, false);
  return (
    <div ref={domRef}>
      <h1 className={"py-[15px] font-bold"}>TabA cached</h1>
      <h2>{name}</h2>
      <Input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="输入一个值 然后切换tab组件不会被销毁"
      ></Input>
      <div
        style={{
          marginTop: 20,
          display: "flex",
        }}
      >
        <Button onClick={() => setCount((c) => c - 1)}>minus -</Button>
        <Input value={count} />
        <Button onClick={() => setCount((c) => c + 1)}>plus +</Button>
      </div>
    </div>
  );
}

function TabB() {
  const [name, setName] = useState<string>();
  const [count, setCount] = useState(0);
  const domRef = useOnActive(() => {
    console.log("TabB onActive"); // no cache won't trigger onActive
    return () => {
      console.log("TabB inActive");
    };
  });
  return (
    <div ref={domRef}>
      <h1 className={"py-[15px] font-bold"}>TabB no cache</h1>
      <h2>{name}</h2>
      <Input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="输入一个值 然后切换tab组件不会被销毁"
      ></Input>
      <div
        style={{
          marginTop: 20,
          display: "flex",
        }}
      >
        <Button onClick={() => setCount((c) => c - 1)}>minus -</Button>
        <Input value={count} />
        <Button onClick={() => setCount((c) => c + 1)}>plus +</Button>
      </div>
    </div>
  );
}

function KeepAliveDemo() {
  const keepAliveRef = useRef(null);
  const [activeName, setActiveName] = useState("TabA");
  const showTabs = [
    {
      name: "TabA",
      component: TabA,
      cache: true,
    },
    {
      name: "TabB",
      component: TabB,
      cache: false,
    },
  ];

  const currentTab = useMemo(() => {
    return showTabs.find((item) => item.name === activeName);
  }, [activeName]);

  return (
    <Card title={"KeepAliveDemo (无Router示例)"}>
      <Tabs
        activeKey={activeName}
        onChange={(activeKey) => {
          setActiveName(activeKey);
        }}
        items={showTabs.map((item) => {
          return {
            label: item.name,
            key: item.name,
          };
        })}
      ></Tabs>
      <div>
        <Button>Clean Other Tab Cache</Button>
      </div>
      <KeepAlive
        aliveRef={keepAliveRef}
        activeKey={activeName}
        cache={currentTab?.cache}
      >
        {currentTab && <currentTab.component />}
      </KeepAlive>
    </Card>
  );
}

export default KeepAliveDemo;
