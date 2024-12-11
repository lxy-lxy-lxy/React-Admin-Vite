import {Avatar, Row, Col, Typography} from 'antd';
import React from 'react';

const url =
        'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';

const AccountCenter = () => {
        return (<Row
                        style={{flexDirection: 'column', alignItems: 'center'}}
                        gutter={[0, 20]}
                >
                        <Col>
                                <Avatar
                                        size={{xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100}}
                                        src={<img src={url} alt="avatar"/>}
                                />
                        </Col>
                        <Col>
                                <Typography.Title level={3}>React Admin Vite</Typography.Title>
                        </Col>
                        <Col>海纳百川，有容乃大</Col>
                </Row>
        );
};

export default AccountCenter;
