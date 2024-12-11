import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import NoAuthPage from '@components/NoAuthPage';
import {useLoginStore} from '@stores/index';
import PropTypes from 'prop-types'

const AuthRoute = ({children}) => {
        const {userInfo} = useLoginStore();
        const {pathname} = useLocation();
        const isAdmin = true

        const obj= {}

        // 如果token存在 直接正常渲染
        if (!userInfo) {
                return <Navigate to="/login" replace/>
        } else if (isAdmin || obj[pathname]) {
                return <>{children}</>
        }

        return <NoAuthPage/>
}

export default AuthRoute

AuthRoute.propTypes = {
        children: PropTypes.element
}