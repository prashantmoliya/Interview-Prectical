import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';

const Layout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const logouted = JSON.parse(localStorage.getItem('Login-User'));
        
        if(!logouted){
            navigate("/");
        }
    }, [])


    return (
        <div>

            <Header />
                <Outlet />

        </div>
    );
}

export default Layout;
