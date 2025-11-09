import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthLayout = () => {

    const { userToken } = useSelector((state) => state.UserAuth);

    const navigate = useNavigate();

    useEffect(() => {
        if (userToken) {
            navigate("/home");
        }
    }, [userToken]);

    return (
        <>

            <Outlet />

        </>
    )
}

export default AuthLayout;