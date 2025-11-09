import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Logout from '../Model/Logout/Logout';

const DefaultLayout = () => {

    const navigate = useNavigate();
    const adminToken = localStorage.getItem("admin-Token");

    useEffect(() => {
        if (!adminToken) {
            // navigate("/");
        }
    }, [adminToken]);


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

        setTimeout(() => {
            localStorage.removeItem("admin-Token");
            navigate("/");

            setIsLogoutLoading(false);
        }, 700);
    }

    return (
        <div className="layout">
            <section className="main-section">
                <div className="layout has-sidebar fixed-sidebar fixed-header">
                    <Sidebar mobileToggle={mobileToggle} setMobileToggle={setMobileToggle} handleLogout={handleLogout} />

                    <div className="layout">
                        <main className="content">
                            <div>
                                <Header mobileToggle={mobileToggle} setMobileToggle={setMobileToggle} />

                                <Outlet />
                            </div>
                        </main>
                    </div>
                </div>
            </section>

            {/* Logout Modal */}
            <Logout show={logoutModalShow} handleClose={handleClose} isLogoutLoading={isLogoutLoading} handleLogout={confirmLogout} />

        </div>
    )
}

export default DefaultLayout;