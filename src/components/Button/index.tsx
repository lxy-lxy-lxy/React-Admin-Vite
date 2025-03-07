import { FC } from "react";
import { Button as AntdButton, theme, ConfigProvider } from "antd";
import type { ButtonProps } from "antd";

interface Props extends ButtonProps {
  success?: boolean;
  warning?: boolean;
}

const Button: FC<Props> = ({ success = false, warning = false, ...rest }) => {
  const { token } = theme.useToken();
  const { type, danger, variant } = rest;

  let btn = (
    <AntdButton
      {...(success || warning || danger || type === "primary"
        ? variant
          ? {
              color: danger ? "danger" : "primary",
            }
          : {
              type: "primary",
            }
        : {})}
      {...rest}
    />
  );

  let colorPrimary = null;

  if (success) {
    colorPrimary = token.colorSuccess;
  } else if (warning) {
    colorPrimary = token.colorWarning;
  }

  if (colorPrimary) {
    btn = (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary,
          },
        }}
      >
        {btn}
      </ConfigProvider>
    );
  }

  return btn;
};

export default Button;
