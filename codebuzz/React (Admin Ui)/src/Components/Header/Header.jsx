import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = ({ mobileToggle, setMobileToggle }) => {

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [headerTitle, setHeaderTitle] = useState("");

    useEffect(() => {
        let name = "";

        if (pathname === "/dashboard") {
            name = "Dashboard"
        }
        else if (pathname === "/category") {
            name = "Category"
        }
        else if (pathname === "/job") {
            name = "Job"
        }
        else if (pathname.startsWith("/job-seeker")) {
            name = "Job Seeker"
        }
        else if (pathname === "/blog") {
            name = "Blog"
        }
        else if (pathname === "/contact") {
            name = "Contact"
        }
        else if (pathname === "/subscribe") {
            name = "Subscribe"
        }

        setHeaderTitle(name);
    }, [pathname]);

    return (
        <div className="nav navbar navbar-expand-xl navbar-light iq-navbar">
            <div className="container-fluid navbar-inner">
                <h5 className="site-menu-title">
                    {headerTitle || "GetJob4u Admin"}
                </h5>

                <button id="btn-toggle" className="border-0 sidebar-toggler break-point-sm btn-line" onClick={() => setMobileToggle(!mobileToggle)}>
                    <i className="ri-menu-line ri-xl" />
                </button>
            </div>
        </div>
    )
}

export default Header