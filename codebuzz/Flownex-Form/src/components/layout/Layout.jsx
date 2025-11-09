import React, { use, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { AdminSidebar, SuperAdminSidebar } from '../sidebar/Sidebar';
import { AdminHeader, SuperAdminHeader } from '../header/Header';
import Logout from '../modal/logout/Logout';

import { logout } from '../../redux-Toolkit/slices/superadmin/AuthSlice';
import { reqtoAdminLogout } from '../../redux-Toolkit/services/admin/AuthServices';
// import { adminLogout } from '../../redux-Toolkit/slices/admin/AuthSlice';



{/* ----- Super-Admin ----- */ }
export const SuperAdminLayout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = localStorage.getItem("superAdmin-token");

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token]);


    const [mobileToggle, setMobileToggle] = useState(false);

    // Logout-Modal
    const [logoutModalShow, setLogoutModalShow] = useState(false);
    const [isLogoutLoading, setIsLogoutLoading] = useState(false);

    const handleLogout = () => {
        setLogoutModalShow(true);
    }

    const handleClose = () => {
        setLogoutModalShow(false);
    }

    const confirmLogout = async () => {
        setIsLogoutLoading(true);

        // try {
        //     const res = await Axios.get(apiendpoints.logout, authorizationHeaders());

        //     if (res.data?.status) {
        //         toast.success(res.data?.message);

        //         localStorage.removeItem("admin-fatevision-token");
        //         localStorage.removeItem("spell-astrologer-name");
        //         localStorage.removeItem("service-astrologer-name");
        //         localStorage.removeItem("notification-details");

        //         navigate("/");
        //     }
        //     else {
        //         toast.error(res.data.message);

        //         localStorage.removeItem("admin-fatevision-token");
        //         navigate("/");
        //     }
        // } catch (err) {
        //     throw error

        //     // if (err?.response?.data?.status === false) {
        //     //     toast.error(err?.response?.data?.message);

        //     //     localStorage.removeItem("admin-Token-HtmlConvert");
        //     //     navigate("/");
        //     // }

        // } finally {
        //     setIsLogoutLoading(false);
        // }

        setTimeout(() => {
            dispatch(logout());

            navigate("/");

            setIsLogoutLoading(false);
        }, 500);
    }


    return (
        <>
            <div className="layout">
                <div className="main-section">
                    <div className="layout has-sidebar fixed-sidebar fixed-header">
                        <SuperAdminSidebar mobileToggle={mobileToggle} setMobileToggle={setMobileToggle} handleLogout={handleLogout} />

                        <div className="layout">
                            <main className="content">
                                <div>
                                    <SuperAdminHeader mobileToggle={mobileToggle} setMobileToggle={setMobileToggle} handleLogout={handleLogout} />

                                    <Outlet />
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>


            {/* Logout Modal */}
            <Logout show={logoutModalShow} handleClose={handleClose} isLogoutLoading={isLogoutLoading} handleLogout={confirmLogout} />
        </>
    )
}



{/* ----- Sub-Admin ----- */ }
export const AuthLayout = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem("admin-token");

    useEffect(() => {
        if (token) {
            // navigate("/admin/dashboard");
            // navigate(-1);  

        }
    }, [token]);

    return (
        <>
            <Outlet />
        </>
    )
}

export const    DefaultLayout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loader } = useSelector((state) => state.AdminAuth);

    const token = localStorage.getItem("admin-token");

    useEffect(() => {
        if (!token) {
            navigate("/admin/login");
        }
    }, [token]);

    const [mobileToggle, setMobileToggle] = useState(false);

    // Logout-Modal
    const [logoutModalShow, setLogoutModalShow] = useState(false);
    const [isLogoutLoading, setIsLogoutLoading] = useState(false);

    const handleLogout = () => {
        setLogoutModalShow(true);
    }

    const handleClose = () => {
        setLogoutModalShow(false);
    }

    const confirmLogout = async () => {
        const res = await dispatch(reqtoAdminLogout());

        if (res.payload?.status) {
            navigate("/admin/login");
        }
    }


    return (
        <>
            <div className="layout">
                <div className="main-section">
                    <div className="layout has-sidebar fixed-sidebar fixed-header">
                        <AdminSidebar mobileToggle={mobileToggle} setMobileToggle={setMobileToggle} handleLogout={handleLogout} />

                        <div className="layout">
                            <main className="content">
                                <div>
                                    <AdminHeader mobileToggle={mobileToggle} setMobileToggle={setMobileToggle} handleLogout={handleLogout} />

                                    <Outlet />
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>


            {/* Logout Modal */}
            <Logout show={logoutModalShow} handleClose={handleClose} isLogoutLoading={loader} handleLogout={confirmLogout} />
        </>
    )
}



{/* ----- User-Form ----- */ }
export const UserFormAuthLayout = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem("user-form-token");

    useEffect(() => {
        if (token) {
            navigate(-1);
            // navigate("/forms/:category/:userUniqueId/:formUniqueId");
        }
    }, [token]);

    return (
        <>
            <Outlet />
        </>
    )
}

export const UserFormDefaultLayout = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem("user-form-token");

    useEffect(() => {
        if (!token) {
            navigate("/forms/otp-verification");
            // navigate(-1);  
        }
    }, [token]);

    return (
        <>
            <Outlet />
        </>
    )
}