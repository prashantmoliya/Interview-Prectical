import { Outlet, useNavigate } from "react-router-dom"
import Header from "../Header/Header"
import { useEffect } from "react";

const DefaultLayout = () => {

    const navigate= useNavigate();

    const logintoken = JSON.parse(localStorage.getItem("firebase-token"));

    useEffect(() => {
        if (!logintoken) {
            navigate("/login");
        }
    }, [logintoken]);

    return (
        <>

            <Header />
                <Outlet />

        </>
    )
}

export default DefaultLayout
