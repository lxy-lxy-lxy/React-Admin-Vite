import React from 'react';
import {Flex} from 'antd';
import LeftContent from './LeftContent';
import RightContent from './RightContent';

const HeaderComp = () => {
        return (
                <Flex justify="space-between" align="center" style={{height: "100%"}}>
                        <LeftContent/>
                        <RightContent/>
                </Flex>
        );
};

export default HeaderComp;