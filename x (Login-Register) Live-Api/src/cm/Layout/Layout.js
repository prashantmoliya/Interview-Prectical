import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Layout = () => {

    const navigate = useNavigate();

    const {login} = useSelector((state)=> ({
        login : state.redux.login,
    }));
    console.log(login ? "User-Logined" : "User-Logouted");

    useEffect(() => {
        if(login){
            navigate("/DashBoard");

            // toast.success("you have Already Logined");
        }
    }, [login]);


    return (
        <div>

            <Outlet />

        </div>
    )
}

export default Layout
