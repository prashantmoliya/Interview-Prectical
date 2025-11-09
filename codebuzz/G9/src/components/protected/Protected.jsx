import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const Protected = (props) => {
    const { Component } = props;

    const navigate = useNavigate();

    const { userToken } = useSelector((state) => state.UserAuth);

    useEffect(() => {
        if (!userToken) {
            navigate("/");
        }
    }, [userToken]);

    return (
        <>
            <Outlet />
        </>
    )
}

export default Protected;
