import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

import User from "../../assets/images/User.png";
import Dashboard from './../../pages/super-admin/dashboard/Dashboard';

import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { useSelector } from 'react-redux';
import { getNameInitials } from '../../utils';


export const SuperAdminHeader = ({ mobileToggle, setMobileToggle, handleLogout }) => {

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");

    useEffect(() => {
        if (pathname.startsWith("/superadmin/")) {
            const path = pathname.replace("/superadmin", "");

            if (path === "/dashboard") {
                setTitle("Dashboard")
            }
            if (path.startsWith("/users")) {
                setTitle("Client")
            }
            if (path.match(/^\/users\/\d+\/.+$/)) {
                setTitle("Source");
            }
            if (path === "/user") {
                setTitle("Client")
            }
            if (path.startsWith("/forms")) {
                setTitle("Forms");
            }
            if (path.startsWith("/source")) {
                setTitle("Source")
            }
            if (path === "/company") {
                setTitle("Add partner")
            }
            if (path === "/help-Support") {
                setTitle("Help & Support")
            }
        }
    }, [pathname]);


    return (
        <div className="nav navbar navbar-expand-xl navbar-light iq-navbar">
            <div className="container-fluid navbar-inner">
                <h5 className="site-menu-title mb-0 gap-4 d-flex align-items-center">
                    {/* {title === 'Forms' && pathname.startsWith('/superadmin/forms/view') && (
                        <HiOutlineArrowLongLeft className='' style={{ cursor: 'pointer' }} onClick={() => navigate('/superadmin/forms')} />
                    )} */}
                    {title || ""}
                    {/* Dashboard */}
                </h5>

                <ul className="navbar-nav navbar-list ms-auto">
                    <li className="nav-item dropdown">
                        <Link
                            className="nav-link d-flex align-items-center position-relative ps-3 p-0"
                            href="#"
                            id="profile-dropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <img
                                src={User}
                                // src="https://demo.dashboardpack.com/user-management-html/img/client_img.png"
                                alt="User-Profile"
                                style={{
                                    width: "43px",
                                    height: "43px",
                                    // background: "#800CAF" 
                                }}
                                className="theme-color-default-img img-fluid avatar avatar-40 avatar-rounded"
                                loading="lazy"
                            />
                        </Link>

                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profile-dropdown">
                            <li onClick={() => handleLogout()}>
                                <Link className="dropdown-item" style={{ fontWeight: "600" }}>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
                <button id="btn-toggle" className="border-0 sidebar-toggler break-point-sm btn-line" onClick={() => setMobileToggle(!mobileToggle)}>
                    <i className="ri-menu-line ri-xl" />
                </button>
            </div>
        </div>
    )
}


export const AdminHeader = ({ mobileToggle, setMobileToggle, handleLogout }) => {

    const { pathname } = useLocation();
    const navigate = useNavigate();


    const adminAuthReducer = useSelector((state) => state.AdminAuth);
    const { profile } = adminAuthReducer;

    const [title, setTitle] = useState("");

    useEffect(() => {
        if (pathname.startsWith("/admin/")) {
            const path = pathname.replace("/admin", "");

            if (path.startsWith("/profile")) {
                setTitle("Profile");
            }
            if (path === "/dashboard") {
                setTitle("Dashboard")
            }
            if (path.startsWith("/users")) {
                setTitle("Client")
            }
            // if (path.match(/^\/users\/\d+\/.+$/)) {
            //     setTitle("Source");
            // }
            if (path.startsWith("/users/form-edit")) {
                // setTitle("Client Forms");
                setTitle("Client");
            }
            if (path.startsWith("/forms")) {
                setTitle("Forms");
            }
            if (path.startsWith("/source")) {
                setTitle("Source")
            }
        }
    }, [pathname]);

    return (
        <div className="nav navbar navbar-expand-xl navbar-light iq-navbar">
            <div className="container-fluid navbar-inner">
                <h5 className="site-menu-title mb-0 gap-4 d-flex align-items-center">
                    {/* {
                        (title === 'Forms' && pathname.startsWith('/admin/forms/view')) && (
                            <HiOutlineArrowLongLeft className='' style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/forms')} />
                        )
                    }

                    {
                        ((title === 'Client Forms' && pathname.startsWith('/admin/users/form-edit'))) && (
                            <HiOutlineArrowLongLeft className='' style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
                        )
                    } */}
                    {title || ""}
                    {/* Dashboard */}
                </h5>

                <ul className="navbar-nav navbar-list ms-auto">
                    <li className="nav-item dropdown">
                        {/* <Link
                            className="nav-link d-flex align-items-center position-relative ps-3 p-0"
                            href="#"
                            id="profile-dropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                src={User}
                                // src="https://demo.dashboardpack.com/user-management-html/img/client_img.png"
                                alt="User-Profile"
                                style={{
                                    width: "43px",
                                    height: "43px",
                                    // background: "#800CAF" 
                                }}
                                className="theme-color-default-img img-fluid avatar avatar-40 avatar-rounded"
                                loading="lazy"
                            />
                        </Link> */}
                        <div
                            className="name-initials form text-center"
                            id="profile-dropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{
                                width: '43px',
                                height: '43px',
                                border: '.2px solid #11000033',
                            }}
                        >
                            <span className="text-center">{profile?.name ? getNameInitials(profile?.name) : ""}</span>
                        </div>

                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profile-dropdown">
                            <li>
                                <Link to="/admin/profile" className="dropdown-item" style={{ fontWeight: "600" }}>
                                    Profile
                                </Link>
                            </li>
                            <li onClick={() => handleLogout()}>
                                <Link className="dropdown-item" style={{ fontWeight: "600" }}>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
                <button id="btn-toggle" className="border-0 sidebar-toggler break-point-sm btn-line" onClick={() => setMobileToggle(!mobileToggle)}>
                    <i className="ri-menu-line ri-xl" />
                </button>
            </div>
        </div >
    )
}
