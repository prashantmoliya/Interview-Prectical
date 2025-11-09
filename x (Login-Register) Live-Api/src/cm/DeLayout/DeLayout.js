import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './Header'
import { useSelector } from 'react-redux';

const DeLayout = () => {

    const navigate = useNavigate();

    const { login } = useSelector((state) => ({
        login: state.redux.login,
    }));
    console.log(!login ? "User-Logouted" : "User-Logined");

    useEffect(() => {
        if (!login) {
            navigate("/");
        }
    }, [login]);


    return (
        <div>

            <Header />
                <Outlet />

        </div>
    )
}

export default DeLayout
