import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';

import { SidebarData } from '../../constants/Data';

import Logo from "../../assets/images/logo.png";
import LogoSmall from "../../assets/images/logo-small1.png";
import { useDispatch, useSelector } from 'react-redux';
import { reqtoAdminCompanyDetail } from '../../redux-Toolkit/services/admin/AuthServices';

export const SuperAdminSidebar = ({ mobileToggle, setMobileToggle, handleLogout }) => {

    const { pathname } = useLocation();
    const [sidebarToggle, setSidebarToggle] = useState(false);

    const handleSidebarDismiss = () => {
        if (window.innerWidth <= 576) {
            setMobileToggle(!mobileToggle);
        }
    };


    return (
        <aside id="sidebar" className={`sidebar break-point-sm has-bg-image ${sidebarToggle ? "collapsed" : ""} ${mobileToggle ? "toggled" : ""}`}>
            <Link id="btn-collapse" className={`sidebar-collapser`} onClick={() => setSidebarToggle(!sidebarToggle)}>
                <i className="ri-arrow-left-s-line" />
            </Link>
            <div className="sidebar-layout">
                <div className="sidebar-header">
                    <Link to="/superadmin/dashboard" className="pro-sidebar-logo admin" onClick={handleSidebarDismiss}>
                        <img src={`${sidebarToggle ? LogoSmall : Logo}`} alt="logo" className={`${sidebarToggle ? "logo-img" : "full-fluid"}`} width={80} />
                    </Link>

                    {/* <span className="menu-title">Medilink</span> */}
                </div>

                <nav className="menu open-current-submenu">
                    <ul>
                        {
                            SidebarData?.superadmin?.map((i, index) => {
                                return (
                                    <li className="menu-item" key={index}>
                                        {
                                            i.onClick === "logout" ? (
                                                <Link
                                                    onClick={i?.onClick === "logout" ? handleLogout : null}
                                                >
                                                    <span className="menu-icon">
                                                        {i.icon}
                                                    </span>
                                                    <span className="menu-title">
                                                        {i.label}
                                                    </span>
                                                </Link>
                                            ) : (
                                                <NavLink
                                                    to={i.route}
                                                    className={`d-flex align-items-center`}
                                                    onClick={handleSidebarDismiss}
                                                >
                                                    <span className="menu-icon">
                                                        {i.icon}
                                                    </span>
                                                    <span className="menu-title">
                                                        {i.label}
                                                    </span>
                                                </NavLink>
                                            )
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </div>
        </aside>
    )
}



export const AdminSidebar = ({ mobileToggle, setMobileToggle, handleLogout }) => {

    const { pathname } = useLocation();
    const dispatch = useDispatch();

    const [sidebarToggle, setSidebarToggle] = useState(false);

    const adminAuthReducer = useSelector((state) => state.AdminAuth);
    const { profile } = adminAuthReducer;

    const handleSidebarDismiss = () => {
        if (window.innerWidth <= 576) {
            setMobileToggle(!mobileToggle);
        }
    };

    const GetProfileDetail = async () => {
        await dispatch(reqtoAdminCompanyDetail());
    }

    useEffect(() => {
        GetProfileDetail();
    }, []);


    return (
        <aside id="sidebar" className={`sidebar break-point-sm has-bg-image admin ${sidebarToggle ? "collapsed" : ""} ${mobileToggle ? "toggled" : ""}`}>
            <Link id="btn-collapse" className={`sidebar-collapser`} onClick={() => setSidebarToggle(!sidebarToggle)}>
                <i className="ri-arrow-left-s-line" />
            </Link>
            <div className="sidebar-layout">
                <div className="sidebar-header">
                    <Link to="/admin/dashboard" className="pro-sidebar-logo flex-column" onClick={handleSidebarDismiss}>
                        <div>
                            <img src={`${sidebarToggle ? profile?.logo : profile?.logo}`} alt="logo" loading='lazy' className={`${sidebarToggle ? "logo-img" : "full-fluid"}`} width={80} />
                        </div>
                        {
                            !sidebarToggle &&
                            <div className={`company_name`}>{profile?.companyName}</div>
                        }
                        {/* <img src={`${sidebarToggle ? LogoSmall : Logo}`} alt="logo" className={`${sidebarToggle ? "logo-img" : "full-fluid"}`} width={80} /> */}
                    </Link>
                </div>

                <nav className="menu open-current-submenu">
                    <ul>
                        {
                            SidebarData?.admin?.map((i, index) => {
                                return (
                                    <li className="menu-item" key={index}>
                                        {
                                            i.onClick === "logout" ? (
                                                <Link
                                                    onClick={i?.onClick === "logout" ? handleLogout : null}
                                                >
                                                    <span className="menu-icon">
                                                        {i.icon}
                                                    </span>
                                                    <span className="menu-title">
                                                        {i.label}
                                                    </span>
                                                </Link>
                                            ) : (
                                                <NavLink
                                                    to={i.route}
                                                    className={`d-flex align-items-center`}
                                                    onClick={handleSidebarDismiss}
                                                >
                                                    <span className="menu-icon">
                                                        {i.icon}
                                                    </span>
                                                    <span className="menu-title">
                                                        {i.label}
                                                    </span>
                                                </NavLink>
                                            )
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </div>
        </aside>
    )
}