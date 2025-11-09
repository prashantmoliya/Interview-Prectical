import { Outlet, useNavigate } from "react-router-dom"
// import '../Css/Boxicons.css';
import '../Css/Core.css';
import '../Css/Demo.css';
import '../Css/Page-Auth.css';
import '../Css/Perfect-Scrollbar.css';
import '../Css/Theme-Default.css';
import '../Js/Bootstrap'
import '../Js/Config'
import '../Js/Helpers'
import '../Js/Jquery'
import '../Js/Main'
import '../Js/Menu'
import '../Js/Perfect-Scrollbar'
import '../Js/Popper'
import { useEffect } from "react";

const AuthLayout = () => {

    const navigate= useNavigate();
    
    const logintoken = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        if (logintoken) {
            navigate("/");
        }
    }, [logintoken]);

    return (
        <>

            <Outlet />

        </>
    )
}

export default AuthLayout
