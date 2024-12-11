import React, {useEffect, useState, useMemo} from 'react';
import {Button, Col, Form, Row} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {cloneDeep} from 'lodash-es';
import PropTypes from 'prop-types';

import styles from './index.module.scss'
import {useGlobalStore} from '@stores/index';

const defaultSpan = {
        xxl: 6,
        xl: 8,
        md: 12,
        sm: 12,
        xs: 24,
}

const collapsedSpan = {
        // 为实现五等分，xxl-5覆写为20%，xxl-10-15-20-25同理
        xxl: 5,
        xl: 6,
        md: 8,
        sm: 24,
        xs: 24
}

const ProSearch = ({formName, childNode}) => {
        const [form] = Form.useForm();
        const [expand, setExpand] = useState(false);
        const [size, setSize] = useState([]);
        const {themeConfig: {collapsed}} = useGlobalStore();
        const curSpan = collapsed ? collapsedSpan : defaultSpan

        useEffect(() => {
                // 初始化宽度
                getSize()
                return () => {
                }
        }, [])

        const getSize = () => {
                const ele = document.getElementById(formName)
                let arr = [0, 576]
                if (ele) {
                        const width = ele.clientWidth
                        if (width >= 1600) {
                                arr = [1600, 9999]
                        } else if (width >= 1200 && width < 1600) {
                                arr = [1200, 1600]
                        } else if (width >= 768 && width < 1200) {
                                arr = [768, 1200]
                        } else if (width >= 576 && width < 768) {
                                arr = [576, 768]
                        }
                }
                setSize(arr)
        }

        const {fields, countObj, spanObj} = useMemo(() => {
                const len = childNode.length
                let arr = []
                let spanObj = {}
                let countObj = {}

                const getNum = (key) => {
                        let sumSpan = 48
                        if (key === 'xxl' && collapsed) {
                                sumSpan = 50
                        }
                        return sumSpan - curSpan[key]
                }

                if (len > 0) {
                        childNode.forEach((item, i) => {
                                let tempObj = cloneDeep(spanObj)
                                let obj = Object.keys(curSpan).reduce((pre, next) => {
                                        const count = item.countSpan !== undefined ?
                                                typeof item.countSpan === 'number' ? item.countSpan :
                                                        item.countSpan[next] === undefined ? 1 : item.countSpan[next]
                                                : 1
                                        countObj[next] = (countObj[next] || 0) + count
                                        const val = curSpan[next] * count
                                        tempObj[next] = (spanObj[next] || 0) + val
                                        pre[next] = val
                                        return pre
                                }, {})

                                if (!expand) {
                                        Object.keys(tempObj).forEach(item => {
                                                if (tempObj[item] > getNum(item)) {
                                                        obj[item] = 0
                                                        tempObj[item] = spanObj[item] || 0
                                                }
                                        })
                                }
                                spanObj = cloneDeep(tempObj)

                                arr.push(
                                        <Col {...obj} key={i}>
                                                {item.element}
                                        </Col>
                                )
                        })

                        return {
                                fields: arr,
                                countObj,
                                spanObj
                        }
                }

                return {
                        fields: [],
                        countObj: {},
                        spanObj: {}
                }
        }, [expand, size.join(','), collapsed])

        const {offset, showExpand, alignRight} = useMemo(() => {
                const innerWidth = window.innerWidth
                let val_a = 0
                let val_b = false
                let val_c = true

                const getData = (key) => {
                        let sumSpan = 24
                        if (key === 'xxl' && collapsed) {
                                sumSpan = 25
                        }
                        return {
                                a: sumSpan - curSpan[key] - spanObj[key] % sumSpan,
                                b: countObj[key] > (sumSpan * 2 / curSpan[key] - 1),
                                c: countObj[key] > (sumSpan / curSpan[key] - 1)
                        }
                }

                let curKey = ''
                if (innerWidth >= 1600) {
                        curKey = 'xxl'
                } else if (innerWidth >= 1200) {
                        curKey = 'xl'
                } else if (innerWidth >= 768) {
                        curKey = 'md'
                } else if (innerWidth >= 576) {
                        curKey = 'sm'
                } else {
                        curKey = 'xs'
                }

                const {a, b, c} = getData(curKey)
                val_a = a
                val_b = b
                val_c = c

                return {
                        offset: val_a,
                        showExpand: val_b,
                        alignRight: val_c
                }
        }, [fields, window.innerWidth])

        const onFinish = (values) => {
                console.log('Received values of form: ', values);
        };

        return (
                <Form form={form} name={formName} onFinish={onFinish} className={styles.proSearch}>
                        <Row gutter={{sm: 8, md: 16, xxl: 32}} justify="center">
                                {fields}
                                <Col style={{textAlign: alignRight ? 'right' : 'left'}} {...alignRight ? curSpan : {}} offset={offset}>
                                        <Button type="primary" htmlType="submit">
                                                {global.t('查询')}
                                        </Button>
                                        <Button
                                                className="ml-2"
                                                onClick={() => {
                                                        form.resetFields();
                                                }}
                                        >
                                                {global.t('重置')}
                                        </Button>
                                        {showExpand && <a
                                                className="ml-2"
                                                style={{
                                                        fontSize: 12
                                                }}
                                                onClick={() => {
                                                        setExpand(!expand);
                                                }}
                                        >
                                                <DownOutlined rotate={expand ? 180 : 0}/> {expand ? global.t('收起') : global.t('展开')}
                                        </a>}
                                </Col>
                        </Row>
                </Form>
        );
}

export default ProSearch;

ProSearch.propTypes = {
        formName: PropTypes.string.isRequired,
        childNode: PropTypes.arrayOf(
                PropTypes.shape({
                        // 占位倍数配置，为数字时表示每项默认为n倍预设宽度(默认1)
                        countSpan: PropTypes.oneOf([PropTypes.shape({
                                xxl: PropTypes.number,
                                xl: PropTypes.number,
                                md: PropTypes.number,
                                sm: PropTypes.number
                        }), PropTypes.number]),
                        element: PropTypes.element
                })
        )
}