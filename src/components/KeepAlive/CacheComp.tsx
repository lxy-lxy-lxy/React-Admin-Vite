import {
  FC,
  Fragment,
  PropsWithChildren,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

interface Props {
  active: boolean;
  cache: boolean;
  name: string;
  renderDiv: RefObject<HTMLDivElement>;
}

const CacheComp: FC<Props & PropsWithChildren> = ({
  active,
  children,
  name,
  renderDiv,
}) => {
  const [targetElement] = useState(() => document.createElement("div"));
  const activatedRef = useRef(false);
  activatedRef.current = activatedRef.current || active;
  useEffect(() => {
    if (active) {
      // 挂载路由ReactElement（chidren）节点
      renderDiv.current?.appendChild(targetElement);
    } else {
      try {
        // 卸载路由ReactElement（chidren）节点
        renderDiv.current?.removeChild(targetElement);
      } catch (e) {
        console.log(e, "removeChild error");
      }
    }
  }, [active, renderDiv, targetElement]);
  useEffect(() => {
    // 设置id 用于区分不同的路由ReactElement节点 获取激活状态 这里的id⭐️有大用 后面说
    targetElement.setAttribute("id", name);
  }, [name, targetElement]);
  // 把当前的 chidren ReactElement 挂载到targetElement里面
  return (
    <Fragment>
      {activatedRef.current && createPortal(children, targetElement)}
    </Fragment>
  );
};

export default CacheComp;
