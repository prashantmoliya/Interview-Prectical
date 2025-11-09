import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const DefaultLayout = () => {

    const navigate = useNavigate();

    const { login } = useSelector((state) => ({
        login: state.redux.login,
    }));
    console.log("DefaultLayout Login-User++", login);
    
    useEffect(() => {
        if (!login){
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

export default DefaultLayout
