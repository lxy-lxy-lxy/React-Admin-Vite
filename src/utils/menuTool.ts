import { createElement } from "react";
import * as Icons from "@ant-design/icons";
import type { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";

interface IconProps extends AntdIconProps {
  type: string;
}

export function Icon({ type, ...rest }: IconProps) {
  if (!type) return null;
  return createElement(Icons[type as never], rest);
}
