import { FC, useEffect } from "react";

import { message } from "antd";
import { MESSAGE_EVENT_NAME, MESSAGE_TYPES } from "@/utils/message.ts";

const Message: FC = () => {
  const [api, contextHolder] = message.useMessage();

  useEffect(() => {
    const bindEvent = (e: CustomEvent) => {
      const func: MESSAGE_TYPES = e?.detail?.type || "info";
      const { content, duration, onClose } = e.detail?.params || {};
      api[func](content, duration, onClose);
    };

    window.addEventListener(MESSAGE_EVENT_NAME, bindEvent as EventListener);

    return () => {
      window.removeEventListener(
        MESSAGE_EVENT_NAME,
        bindEvent as EventListener,
      );
    };
  }, [api]);

  return <>{contextHolder}</>;
};

export default Message;
