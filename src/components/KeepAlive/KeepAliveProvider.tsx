import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useLayoutEffect,
  useState,
} from "react";

export const KeepAliveContext = createContext<{
  activeKey?: string;
  setActiveKey?: Dispatch<SetStateAction<string | undefined>>;
}>({
  activeKey: undefined,
  setActiveKey: () => {},
});

const KeepAliveProvider = (props: {
  children?: ReactNode;
  initialActiveKey?: string;
}) => {
  const { initialActiveKey, children } = props;

  const [activeKey, setActiveKey] = useState<string | undefined>(
    initialActiveKey,
  );

  useLayoutEffect(() => {
    setActiveKey(initialActiveKey);
  }, [initialActiveKey]);

  return (
    <KeepAliveContext.Provider value={{ activeKey, setActiveKey }}>
      {children}
    </KeepAliveContext.Provider>
  );
};

export default KeepAliveProvider;
