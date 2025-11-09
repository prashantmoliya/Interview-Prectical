import { BiSolidCategory } from "react-icons/bi";
import { MdAdminPanelSettings, MdOutlineContactMail, MdUnsubscribe } from "react-icons/md";
import { PiListPlusFill } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";

export const sidebarData = [
    {
        label: "Dashboard",
        icon: <RxDashboard />,
        route: "/dashboard",
    },
    {
        label: "Category",
        icon: <BiSolidCategory />,
        route: "/category",
    },
    {
        label: "Job",
        // icon: <MdAdminPanelSettings />,
        icon: <PiListPlusFill />,
        route: "/job",
    },
    {
        label: "Blog",
        icon: <PiListPlusFill />,
        route: "/blog",
    },
    {
        label: "Contact",
        icon: <MdOutlineContactMail />,
        route: "/contact",
    },
    {
        label: "Subscribe",
        icon: <MdUnsubscribe />,
        route: "/subscribe",
    },
    {
        label: "Logout",
        icon: <i className="ri-logout-box-r-line"></i>,
        onClick: "logout",
    },
];



// Sidebar 

{/* <li className="menu-item">
    <NavLink to="/dashboard" className="d-flex align-items-center" onClick={handleSidebarDismiss}>
        <span className="menu-icon">
            <RxDashboard />
        </span>
        <span className="menu-title">
            Dashboard
        </span>
    </NavLink>
</li>
<li className="menu-item">
    <NavLink to="/category" className="d-flex align-items-center" onClick={handleSidebarDismiss}>
        <span className="menu-icon">
            <BiSolidCategory />
        </span>
        <span className="menu-title">
            Category
        </span>
    </NavLink>
</li>
<li className="menu-item">
    <NavLink to="/job" className="d-flex align-items-center" onClick={handleSidebarDismiss}>
        <span className="menu-icon">
            <PiListPlusFill />
        </span>
        <span className="menu-title">
            Job
        </span>
    </NavLink>
</li>
<li className="menu-item">
    <NavLink to="/contact" className="d-flex align-items-center" onClick={handleSidebarDismiss}>
        <span className="menu-icon">
            <MdOutlineContactMail />
        </span>
        <span className="menu-title">
            Contact
        </span>
    </NavLink>
</li>
<li className="menu-item" onClick={()=> handleLogout()}>
    <Link>
        <span className="menu-icon">
            <i className="ri-logout-box-r-line"></i>
        </span>
        <span className="menu-title">
            Logout
        </span>
    </Link>
</li> */}