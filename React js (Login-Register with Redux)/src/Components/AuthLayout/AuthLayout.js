import React, { useEffect } from 'react'
import './Css/BoxIcons.css'
import './Css/Core.css'
import './Css/Demo.css'
import './Css/Page-Auth.css'
import './Css/Perfect-Scrollbar.css'
import './Css/Theme-Default.css'
import './Js/Bootstrap'
import './Js/Config'
import './Js/Helpers'
import './Js/Jquery'
import './Js/Main'
import './Js/Menu'
import './Js/Perfect-Scrollbar'
import './Js/Popper'
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

const AuthLayout = () => {

    const navigate = useNavigate();

    const { login } = useSelector((state) => ({
        login: state.redux.login,
    }));
    console.log("AuthLayout Login-User++", login ? login : 'No User');

    useEffect(() => {
        if (login) {
            navigate("/Home");
        }
    }, [login]);    


    return (
        <div>

            <Outlet />

        </div>
    )
}

export default AuthLayout
