import React from 'react';
import {Space, Dropdown} from 'antd';
import Button from '@components/Button';

const items = [
        {
                key: '1',
                label: '1st item',
        },
        {
                key: '2',
                label: '2nd item',
        },
        {
                key: '3',
                label: '3rd item',
        },
];

const onMenuClick = (e) => {
        console.log('click', e);
};

const ButtonTool = () => {
        return <Space wrap>
                <Button type="primary">Primary</Button>
                <Button color="success" type="primary">Success</Button>
                <Button color="warning" type="primary">Warning</Button>
                <Button danger type="primary">Danger</Button>
                <Button>Default Button</Button>
                <Button type="dashed">Dashed Button</Button>
                <Button type="text">Text Button</Button>
                <Button type="link">Link Button</Button>
                <div style={{background: "grey", padding: "1rem"}}>
                        <Button color="warning" type="primary" ghost>Ghost</Button>
                </div>
                <Button type="primary" loading>Loading</Button>
                <Button type="primary" disabled>Disabled</Button>
                <Dropdown.Button
                        menu={{
                                items,
                                onClick: onMenuClick,
                        }}
                >
                        Actions
                </Dropdown.Button>
        </Space>
}

export default ButtonTool