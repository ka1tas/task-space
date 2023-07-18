import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';



const AuthenticatedRoute = ({ children }) => {
    let user = useSelector(state => state.user);
    let auth = user.authStatus;

    if (!auth) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default AuthenticatedRoute;