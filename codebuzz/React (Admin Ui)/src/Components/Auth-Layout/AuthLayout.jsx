import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const AuthLayout = () => {

    const navigate = useNavigate();
    const adminToken = localStorage.getItem("admin-Token");

    useEffect(() => {
        if (adminToken) {
            // navigate("/");
            navigate(-1);
        }
    }, [adminToken]);

    return (
        <>
            <Outlet />
        </>
    )
}

export default AuthLayout;