import React, {useEffect, useState, useRef} from 'react'
import {Button, Flex, Table} from 'antd';
import {useLocation} from 'react-router-dom';
import {useGlobalStore} from '@stores/index';
import PropTypes from 'prop-types'
import {PlusOutlined, ExportOutlined, FullscreenOutlined, FullscreenExitOutlined} from '@ant-design/icons';
import {debounce} from 'lodash-es';

import styles from './index.module.scss'

const showTotal = (total) => `Total ${total} `;

const ProTable = (props) => {
        const {
                getData, searchParams = {}, total, scrollX = 1500,
                allowCreate = true, allowExport = false, allowFullScreen = true,
                ...rest
        } = props
        const tableBoxRef = useRef()
        const tableToolRef = useRef()
        const {pathname} = useLocation();
        const {userConfig, setUserConfig} = useGlobalStore()
        const [fullscreen, setFullscreen] = useState(false)
        const [height, setHeight] = useState(null)

        useEffect(() => {
                getData && getData(searchParams.pageSize ?
                        {
                                page: 1
                        } :
                        {
                                page: 1,
                                pageSize: userConfig[pathname]?.pageSize || 30
                        }
                )

                const resizeObserver = new ResizeObserver(() => {
                        onResize()
                });

                /* 假设页面中有某个元素 **/
                const divEl = document.getElementById('contentLayout').querySelector('.ant-card-body');
                /* 监听页面中某个元素 **/
                resizeObserver.observe(divEl);

                return () => {
                        resizeObserver.unobserve(divEl);
                }
        }, [])

        const onShowSizeChange = (current, size) => {
                setUserConfig(pathname, {pageSize: size})
        }

        const onChange = (page, pageSize) => {
                getData && getData({
                        page,
                        pageSize
                })
        }

        const onResize = debounce((mode) => {
                setHeight(getHeight(mode))
        }, 50)

        const getHeight = (mode) => {
                if (tableBoxRef.current) {
                        const content = document.getElementById('contentLayout')
                        const footer = document.getElementById('footerLayout')
                        const head = tableBoxRef.current.getElementsByClassName('ant-table-thead')[0]
                        const pagination = tableBoxRef.current.getElementsByClassName('ant-pagination')[0]

                        if (content.contains(tableBoxRef.current)) {
                                const headRect = head.getBoundingClientRect()
                                return window.innerHeight
                                        - headRect.bottom
                                        - (pagination ? pagination.offsetHeight : 0)
                                        - ((mode !== undefined ? mode : fullscreen) ? 0 : (footer.offsetHeight + 25))
                        }
                }
                return null
        }

        return (
                <div ref={tableBoxRef} className={`${styles.proTable} ${fullscreen ? styles.fullscreen : ''}`}>
                        <Flex ref={tableToolRef} justify="flex-end" align="center" className={`${fullscreen ? styles.fullscreenTool : ''}`}>
                                {
                                        allowCreate &&
                                        <Button
                                                type="primary"
                                                className="mb-1 mr-1"
                                        >
                                                <PlusOutlined/> {global.t('添加')}
                                        </Button>
                                }
                                {
                                        allowExport &&
                                        <Button
                                                type="primary"
                                                className="mb-1 mr-1"
                                        >
                                                <ExportOutlined/> {global.t('导出')}
                                        </Button>
                                }
                                {
                                        allowFullScreen &&
                                        <Button
                                                className="mb-1"
                                                onClick={(e) => {
                                                        e.preventDefault()
                                                        const mode = !fullscreen
                                                        setFullscreen(mode)
                                                        setTimeout(() => {
                                                                onResize(mode)
                                                        }, 1)
                                                }}
                                        >
                                                {
                                                        fullscreen ?
                                                                <><FullscreenExitOutlined/> {global.t('退出全屏')}</> :
                                                                <><FullscreenOutlined/> {global.t('全屏')}</>
                                                }

                                        </Button>
                                }
                        </Flex>
                        <Table
                                size="small"
                                pagination={{
                                        total,
                                        position: ['bottomCenter'],
                                        // defaultCurrent: searchParams.page || 1,
                                        defaultPageSize: searchParams.pageSize || userConfig[pathname]?.pageSize || 30,
                                        pageSizeOptions: [10, 30, 50, 100],
                                        // hideOnSinglePage: true,
                                        showSizeChanger: true,
                                        onShowSizeChange,
                                        onChange,
                                        showTotal
                                }}
                                scroll={{
                                        x: scrollX,
                                        y: height || getHeight()
                                }}
                                {...rest}
                        />
                </div>
        );
};
export default ProTable;

ProTable.propTypes = {
        getData: PropTypes.func,
        searchParams: PropTypes.object,
        total: PropTypes.number,
        scrollX: PropTypes.number,
        allowCreate: PropTypes.bool,
        allowExport: PropTypes.bool,
        allowFullScreen: PropTypes.bool
}
