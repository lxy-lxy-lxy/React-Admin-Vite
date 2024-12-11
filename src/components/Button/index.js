import React from "react";
import {Button as AntdButton, theme, ConfigProvider} from 'antd';
import PropTypes from 'prop-types'

const Button = ({ color, ...rest }) => {
        const { token } = theme.useToken();

        let btn = <AntdButton {...rest} />;

        let colorPrimary = null;

        if (color === "success") {
                colorPrimary = token.colorSuccess;
        } else if (color === "warning") {
                colorPrimary = token.colorWarning;
        }

        if (colorPrimary) {
                btn = (
                        <ConfigProvider
                                theme={{
                                        token: {
                                                colorPrimary
                                        }
                                }}
                        >
                                {btn}
                        </ConfigProvider>
                );
        }

        return btn;
};

export default Button

Button.propTypes = {
        color: PropTypes.oneOf(["success", "warning"])
}