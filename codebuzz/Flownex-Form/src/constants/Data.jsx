import { FaRegUser } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { GrDocumentText } from "react-icons/gr";
import { BiSupport } from "react-icons/bi";

import Source from '../assets/images/source.png'
import Partner from '../assets/images/partner.png'
import Logout from '../assets/images/logout.png'
import DashUser from '../assets/images/dash-user.png'
import DashShareForm from '../assets/images/dash-share-form.png'
import DashSubmitForm from '../assets/images/dash-submit-form.png'
import SourceFolder from '../assets/images/source-folder.png';
import DefaultPdf from '../assets/images/default-pdf.png';
import DummyPassport from '../assets/images/dummy-passport.png';
import Canada from '../assets/images/canada.png';

import User1 from '../assets/images/user1.png'
import User2 from '../assets/images/user2.png'
import User3 from '../assets/images/user3.png'
import User4 from '../assets/images/user4.png'
import User5 from '../assets/images/user5.png'
import User6 from '../assets/images/user6.png'
import User7 from '../assets/images/user7.png'

import CompanyLogo from '../assets/images/company-logo.png'
import { LuUserRoundPlus } from "react-icons/lu";

// Sidebar
export const SidebarData = {
    superadmin: [
        {
            label: "Dashboard",
            icon: <RxDashboard />,
            img: false,
            route: "/superadmin/dashboard"
        },
        // {
        //     label: "Client",
        //     icon: <FaRegUser />,
        //     img: false,
        //     route: "/superadmin/users"
        // },
        // {
        //     label: "Add User",
        //     icon: <LuUserRoundPlus />,
        //     img: false,
        //     route: "/superadmin/users"
        // },
        {
            label: "Forms",
            icon: <GrDocumentText />,
            img: false,
            route: "/superadmin/forms"
        },
        // {
        //     label: "Source",
        //     icon: <img src={Source} alt="Partner" className="img-fluid" />,
        //     route: "/superadmin/source"
        // },
        {
            label: "Add Partner",
            icon: <img src={Partner} alt="Partner" className="img-fluid" />,
            route: "/superadmin/company"
        },
        {
            label: "Help & Support",
            icon: <BiSupport />,
            route: "/superadmin/help-Support"
        },
        {
            label: "Logout",
            icon: <img src={Logout} alt="Logout" className="img-fluid" />,
            onClick: "logout"
        }
    ],
    admin: [
        {
            label: "Dashboard",
            icon: <RxDashboard />,
            img: false,
            route: "/admin/dashboard"
        },
        {
            label: "Client",
            icon: <FaRegUser />,
            img: false,
            route: "/admin/users"
        },
        // {
        //     label: "Add User",
        //     icon: <LuUserRoundPlus />,
        //     img: false,
        //     route: "/admin/users"
        // },
        {
            label: "Forms",
            icon: <GrDocumentText />,
            img: false,
            route: "/admin/forms"
        },
        // {
        //     label: "Source",
        //     icon: <img src={Source} alt="Partner" className="img-fluid" />,
        //     route: "/admin/source"
        // },
        {
            label: "Logout",
            icon: <img src={Logout} alt="Logout" className="img-fluid" />,
            onClick: "logout"
        }
    ]
};

// Dashboard
export const DashboardContent = {
    superadmin: [
        {
            title: 'Total Partner',
            icon: <img src={DashUser} alt="DashUser" className="img-fluid" />,
            apiCount: "totalCompany",
            route: "/superadmin/company"
        },
        // {
        //     title: 'Total Client',
        //     icon: <img src={DashUser} alt="DashUser" className="img-fluid" />,
        //     apiCount: "totalUser",
        //     route: "/superadmin/users"
        // },
        {
            title: 'Total Help & Support',
            icon: <BiSupport />,
            apiCount: "totalContactSupport",
            route: "/superadmin/help-Support"
        },
        // {
        //     title: 'Total Share Form',
        //     icon: <img src={DashShareForm} alt="DashShareForm" className="img-fluid" />,
        //     apiCount: "totalShareForm"
        // },
        // {
        //     title: 'Total Forms Submit',
        //     icon: <img src={DashSubmitForm} alt="DashSubmitForm" className="img-fluid" />,
        //     apiCount: "totalFormsSubmit"
        // }
    ],
    admin: [
        {
            title: 'Total Client',
            icon: <img src={DashUser} alt="DashUser" className="img-fluid" />,
            apiCount: "totalUser",
            route: "/admin/users"
        },
        {
            title: 'Total Share Form',
            icon: <img src={DashShareForm} alt="DashShareForm" className="img-fluid" />,
            apiCount: "totalShareForm"
        },
        {
            title: 'Total Forms Submit',
            icon: <img src={DashSubmitForm} alt="DashSubmitForm" className="img-fluid" />,
            apiCount: "totalFormsSubmit"
        }
    ]
}

// Catagory's
export const visaCatagory = [
    {
        value: "study visa",
        category: "Study Visa",
        route: "study-visa",
    },
    {
        value: "work visa",
        category: "Work Visa",
        route: "work-visa",
    },
    {
        value: "tourist visa",
        category: "Tourist Visa",
        route: "tourist-visa",
    },
    {
        value: "pr visa",
        category: "PR Visa (Permanent Residency)",
        route: "pr-visa",
    },
]

export const visaForm = [
    {
        value: "study intake",
        category: "Study Intake",
        route: "study-intake",
        key: "study_intake"
    },
    {
        value: "post graduation work permit",
        category: "Post-Graduation Work Permit",
        route: "post-graduation-work-permit",
        key: "postgraduation_work_permi"
    },
    {
        value: "wp lmia based intake",
        category: "WP LMIA-Based – Intake",
        route: "wp-lmia-based–intake",
        key: "wp_lmia_based_intake"
    },
    {
        value: "wp lmia exempt intake",
        category: "WP LMIA-Exempt – Intake",
        route: "wp-lmia-exempt–intake",
        key: "wp_lmia_exempt_intake"
    },
    {
        value: "trv outside intake",
        category: "TRV (Outside) – Intake",
        route: "trv-outside–intake",
        key: "trv_outside_intake"
    },
    {
        value: "trv inside extension intake",
        category: "TRV (Inside Extension) – Intake",
        route: "trv-inside-extension–intake",
        key: "trv_inside_extension_intake"
    },
    {
        value: "sowp intake",
        category: "SOWP – Intake",
        route: "sowp–intake",
        key: "sowp_intake"
    },
    {
        value: "pr economic intake",
        category: "PR Economic – Intake",
        route: "pr-economic–intake",
        key: "pr_economic_intake"
    },
    {
        value: "pr family spon intake",
        category: "PR Family Sponsorship – Intake",
        route: "pr-family-sponsorship–intake",
        key: "pr_family_spon_intake"
    },
    {
        value: "citizenship intake",
        category: "Citizenship – Intake",
        route: "citizenship–intake",
        key: "citizenship_intake"
    },
    {
        value: "client evaluation intake",
        category: "Client Evaluation – Intake",
        route: "client-evaluation–intake",
        key: "client_evaluation_intake"
    },
]



// Source    
export const SourceContent = {
    superadmin: [
        {
            id: 1,
            name: 'Abu Jalal Gaza',
            count: 3,
            icon: <img src={SourceFolder} alt="DashUser" className="img-fluid" />,
            route: "/superadmin/source"
        },
        {
            id: 2,
            name: 'Abdul Rahim',
            count: 3,
            icon: <img src={SourceFolder} alt="DashUser" className="img-fluid" />,
            route: "/superadmin/source"
        },
        {
            id: 3,
            name: 'Suleman Ali',
            count: 3,
            icon: <img src={SourceFolder} alt="DashUser" className="img-fluid" />,
            route: "/superadmin/source"
        },
        {
            id: 4,
            name: 'Mohamad Hafiz',
            count: 3,
            icon: <img src={SourceFolder} alt="DashUser" className="img-fluid" />,
            route: "/superadmin/source"
        },
    ],
    admin: [
        {
            id: 1,
            name: 'Abu Jalal Gaza',
            count: 3,
            icon: <img src={SourceFolder} alt="DashUser" className="img-fluid" />,
            route: "/admin/source"
        },
        {
            id: 2,
            name: 'Abdul Rahim',
            count: 3,
            icon: <img src={SourceFolder} alt="DashUser" className="img-fluid" />,
            route: "/admin/source"
        },
        {
            id: 3,
            name: 'Suleman Ali',
            count: 3,
            icon: <img src={SourceFolder} alt="DashUser" className="img-fluid" />,
            route: "/admin/source"
        },
        {
            id: 4,
            name: 'Mohamad Hafiz',
            count: 3,
            icon: <img src={SourceFolder} alt="DashUser" className="img-fluid" />,
            route: "/admin/source"
        },
    ]
}


export const SourceFormContent = {
    superadmin: [
        {
            id: 1,
            fileName: 'Canadian Study Form.pdf',
            img: DefaultPdf,
        },
        {
            id: 2,
            fileName: 'Dummy Passport.Jpg',
            img: DummyPassport,
        },
        {
            id: 3,
            fileName: 'Dummy Passport.Jpg',
            img: DummyPassport,
        },
        {
            id: 4,
            fileName: 'Dummy Passport.Jpg',
            img: DummyPassport,
        },
        {
            id: 5,
            fileName: 'Dummy Passport.Jpg',
            img: DummyPassport,
        },
    ],
    admin: [
        {
            id: 1,
            fileName: 'Canadian Study Form.pdf',
            img: DefaultPdf,
        },
        {
            id: 2,
            fileName: 'Dummy Passport.Jpg',
            img: DummyPassport,
        },
        {
            id: 3,
            fileName: 'Dummy Passport.Jpg',
            img: DummyPassport,
        },
        {
            id: 4,
            fileName: 'Dummy Passport.Jpg',
            img: DummyPassport,
        },
        {
            id: 5,
            fileName: 'Dummy Passport.Jpg',
            img: DummyPassport,
        },

    ]
}





// Static Data into Table Displayed
// User
export const UserData = [
    {
        image: User1,
        name: 'Darrell Steward',
        fromTitle: 'Canadian Study Permit Application',
        email: 'nevaeh.simmons@example.com',
        phone: '+91 9256235625',
        createdData: '13-06-2025, 11:42 AM'
    },
    {
        image: User2,
        name: 'Jacob Jones',
        fromTitle: 'Canadian Study Permit Application',
        email: 'dolores.chambers@example.com',
        phone: '+91 9256235625',
        createdData: '13-06-2025, 11:42 AM'
    },
    {
        image: User3,
        name: 'Kristin Watson',
        fromTitle: 'Canadian Study Permit Application',
        email: 'michael.mitc@example.com',
        phone: '+91 9256235625',
        createdData: '16-06-2025, 04:02 PM'
    },
    {
        image: User4,
        name: 'Arlene McCoy',
        fromTitle: 'Canadian Study Permit Application',
        email: 'deanna.curtis@example.com',
        phone: '+91 9256235625',
        createdData: '13-06-2025, 11:42 AM'
    },
    {
        image: User5,
        name: 'Dianne Russell',
        fromTitle: 'Canadian Study Permit Application',
        email: 'tanya.hill@example.com',
        phone: '+91 9256235625',
        createdData: '13-06-2025, 11:42 AM'
    },
    {
        image: User6,
        name: 'Cameron Williamson',
        fromTitle: 'Canadian Study Permit Application',
        email: 'felicia.reid@example.com',
        phone: '+91 9256235625',
        createdData: '18-06-2025, 09:31 AM'
    },
    {
        image: User7,
        name: 'Guy Hawkins',
        fromTitle: 'Canadian Study Permit Application',
        email: 'jessica.hanson@example.com',
        phone: '+91 9256235625',
        createdData: '13-06-2025, 11:42 AM'
    }
]

// Users
export const UsersData = [
    {
        image: User1,
        name: 'Darrell Steward',
        category: 'Canadian Study',
        email: 'nevaeh.simmons@example.com',
        phone: '+91 9256235625',
        status: "Pending",
        createdData: '13-06-2025, 11:42 AM'
    },
    {
        image: User2,
        name: 'Jacob Jones',
        category: 'Canadian Study',
        email: 'dolores.chambers@example.com',
        phone: '+91 9256235625',
        status: "Pending",
        createdData: '13-06-2025, 11:42 AM'
    },
    {
        image: User3,
        name: 'Kristin Watson',
        category: 'Canadian Study',
        email: 'michael.mitc@example.com',
        phone: '+91 9256235625',
        status: "Pending",
        createdData: '16-06-2025, 04:02 PM'
    },
    {
        image: User4,
        name: 'Arlene McCoy',
        category: 'Canadian Study',
        email: 'deanna.curtis@example.com',
        phone: '+91 9256235625',
        status: "Completed",
        createdData: '13-06-2025, 11:42 AM'
    },
    {
        image: User5,
        name: 'Dianne Russell',
        category: 'Canadian Study',
        email: 'tanya.hill@example.com',
        phone: '+91 9256235625',
        status: "Completed",
        createdData: '13-06-2025, 11:42 AM'
    },
    {
        image: User6,
        name: 'Cameron Williamson',
        category: 'Canadian Study',
        email: 'felicia.reid@example.com',
        phone: '+91 9256235625',
        status: "Completed",
        createdData: '18-06-2025, 09:31 AM'
    },
    {
        image: User7,
        name: 'Guy Hawkins',
        category: 'Canadian Study',
        email: 'jessica.hanson@example.com',
        phone: '+91 9256235625',
        status: "Rejected",
        createdData: '13-06-2025, 11:42 AM'
    }
]

export const ViewUserFormData = [
    {
        countryImg: Canada,
        country: 'Canada',
        title: 'Study',
        route: "study-visa",
        createdData: '13-06-2025, 11:42 AM',
        status: "Pending",
    },
    {
        countryImg: Canada,
        country: 'Canada',
        title: 'Permanent Residency',
        route: "pr-visa",
        createdData: '13-06-2025, 11:42 AM',
        status: "Pending",
    },
    {
        countryImg: Canada,
        country: 'Canada',
        title: 'Work',
        route: "work-visa",
        createdData: '13-06-2025, 11:42 AM',
        status: "Pending",
    },
    {
        countryImg: Canada,
        country: 'Canada',
        title: 'Tourism',
        route: "tourist-visa",
        createdData: '13-06-2025, 11:42 AM',
        status: "Completed",
    },
    {
        countryImg: Canada,
        country: 'Canada',
        title: 'Tourist',
        route: "tourist-visa",
        createdData: '13-06-2025, 11:42 AM',
        status: "Completed",
    },
    {
        countryImg: Canada,
        country: 'Canada',
        title: 'Study',
        route: "study-visa",
        createdData: '13-06-2025, 11:42 AM',
        status: "Pending",
    },
    {
        countryImg: Canada,
        country: 'Canada',
        title: 'Study',
        route: "study-visa",
        createdData: '13-06-2025, 11:42 AM',
        status: "Completed",
    },
]

// Company
export const CompanyData = [
    {
        logo: CompanyLogo,
        name: 'Darrell Steward',
        email: 'nevaeh.simmons@example.com',
        phone: '+91 9256235625',
        Date: '13-06-2025, 11:42 AM'
    },
    {
        logo: CompanyLogo,
        name: 'Jacob Jones',
        email: 'dolores.chambers@example.com',
        phone: '+91 9256235625',
        Date: '13-06-2025, 11:42 AM'
    },
    {
        logo: CompanyLogo,
        name: 'Kristin Watson',
        email: 'michael.mitc@example.com',
        phone: '+91 9256235625',
        Date: '13-06-2025, 11:42 AM'
    },
    {
        logo: CompanyLogo,
        name: 'Arlene McCoy',
        email: 'deanna.curtis@example.com',
        phone: '+91 9256235625',
        Date: '13-06-2025, 11:42 AM'
    },
    {
        logo: CompanyLogo,
        name: 'Dianne Russell',
        email: 'tanya.hill@example.com',
        phone: '+91 9256235625',
        Date: '13-06-2025, 11:42 AM'
    },
    {
        logo: CompanyLogo,
        name: 'Cameron Williamson',
        email: 'felicia.reid@example.com',
        phone: '+91 9256235625',
        Date: '13-06-2025, 11:42 AM'
    },
]



// Forms-
export const CountryChoiceData = [
    {
        key: "personal-information",
        title: "Personal Information",
        countries: [
            { field: 'UCI Number (optional)', },
            { image: 'Service Language *', },
            { image: 'Family Name *', },
            { image: 'Given Names *', },
            { image: 'Nicknames/Aliases', },
            { image: 'Date of Birth *', },
            { image: 'Place of Birth *', },
            { image: 'Country of Birth *', },
            { image: 'Citizenship/Nationality *', },
            { image: 'Current Country of Residence *', },
            { image: 'Marital Status *', },
        ]
    },
    {
        key: "north-america",
        title: "North America",
        countries: [
            { image: Canada, name: "Canada" },
        ]
    },
    {
        key: "asea",
        title: "Asea",
        countries: [
            { image: Canada, name: "Canada" },
        ]
    },
    {
        key: "latin-america",
        title: "Latin America",
        countries: [
            { image: Canada, name: "Canada" },
        ]
    },
    {
        key: "oceania",
        title: "Oceania",
        countries: [
            { image: Canada, name: "Canada" },
        ]
    },
    {
        key: "africa",
        title: "Africa",
        countries: [
            { image: Canada, name: "Canada" },
        ]
    },
    {
        key: "antarctica",
        title: "Antarctica",
        countries: [
            { image: Canada, name: "Canada" },
        ]
    }
]