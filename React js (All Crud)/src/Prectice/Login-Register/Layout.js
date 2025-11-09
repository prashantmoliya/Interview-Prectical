import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Css/BoxIcons.css';
import './Css/Core.css';
import './Css/Theme-Default.css';
import './Css/Demo.css';
import './Css/Perfect-Scrollbar.css';
import './Css/Page-Auth.css';
import './Js/Helpers.js';
import './Js/Config.js';
import './Js/Jquery.js';
import './Js/Popper.js';
import './Js/Bootstrap.js';
import './Js/Perfect-Scrollbar.js';
import './Js/Menu.js';
import './Js/Main.js';

const Layout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const logined = JSON.parse(localStorage.getItem('Login-User'));

        if (logined) {
            navigate("/ViewCrud");
        }
    }, []);


    return (
        <div>
            
            <Outlet />

        </div>
    )
}

export default Layout;
