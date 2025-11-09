import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { sidebarData } from '../../constants/Data'

const Sidebar = ({ mobileToggle, setMobileToggle, handleLogout }) => {

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
                    <Link to="/dashboard" className="pro-sidebar-logo" onClick={handleSidebarDismiss}>
                        <img
                            // src="/Images/newlogo.png"
                            src={`${sidebarToggle ? "/Images/haflogo.png" : "/Images/newlogo.png"}`}
                            alt="logo"
                            className={`${sidebarToggle ? "logo-img" : "img-fluid"}`}
                        />
                    </Link>

                    {/* <span className="menu-title">GetJob4u</span> */}
                </div>

                <nav className="menu open-current-submenu">
                    <ul>
                        {
                            sidebarData?.map((i, index) => {
                                return (
                                    <li className="menu-item" key={index} onClick={i?.onClick === "logout" ? handleLogout : null}>
                                        {
                                            i.onClick === "logout" ? (
                                                <Link>
                                                    <span className="menu-icon">
                                                        {i.icon}
                                                    </span>
                                                    <span className="menu-title">
                                                        {i.label}
                                                    </span>
                                                </Link>
                                            ) : (
                                                <NavLink to={i.route} className="d-flex align-items-center" onClick={handleSidebarDismiss}>
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

export default Sidebar;




