export const apiendpoints = {
    // Super-Admin 
    // Auth
    login: "admin-api/auth/logIn",

    // Dashboard
    dashboard: "admin-api/auth/dashboard",

    // User (Not Used below 6)
    getUser: "admin-api/user/getUserList",
    addUser: "admin-api/user/addUser",
    editUser: "admin-api/user/editUser/:id",
    deleteUser: "admin-api/user/userDelete/:id",
    viewUser: "admin-api/user/userDetail/:id",
    statusUser: "admin-api/user/userStatus/:id", //

    // Company
    getCompany: "admin-api/company/getCompanyList",
    statusCompany: "admin-api/company/editStatus/:id",
    addCompany: "admin-api/company/addCompany",
    editCompany: "admin-api/company/editCompany/:id",
    deleteCompany: "admin-api/company/companyDelete/:id",
    viewCompany: "admin-api/company/CompanyDetail/:id",

    // Contact
    getContact: "admin-api/contactUs/list",
    viewContact: "admin-api/contactUs/details/:id",
    replyContact: "admin-api/contactUs/reply/:id",
    deleteContact: "admin-api/contactUs/delete/:id",




    // Sub-Admin
    // Auth
    adminCheckEmail: "company-api/auth/checkEmail",

    adminOtpVerification: "company-api/auth/otpVerification",
    adminResendOtp: "company-api/auth/resendOtp",

    adminCompanyPassword: "company-api/auth/company-password",
    adminComplateProfile: "company-api/auth/complateProfile",

    adminLogin: "company-api/auth/login",

    adminForgetPassword: "company-api/auth/forgetPassword",

    adminLogout: "company-api/auth/logout",

    adminCompanyDetail: "company-api/auth/companyDetail",
    adminCompanyEdit: "company-api/auth/editProfile",


    // Dashboard
    adminDashboard: "company-api/auth/dashboard",

    // User
    adminGetUser: "company-api/user/getUserList",
    adminAddUser: "company-api/user/addUser",
    adminEditUser: "company-api/user/editUser/:id",
    adminDeleteUser: "company-api/user/userDelete/:id",
    adminViewUser: "company-api/user/userDetail/:id",
    adminStatusUser: "company-api/user/userStatus/:id", // (Not Used)

    adminViewUserGetForm: "company-api/user/getForm/:id",

    adminShareForm: "company-api/user/shareForm/:id",
    adminShareDocForm: "company-api/user/shareDocForm/:userId/:userFormId",
    adminViewUserDeleteForm: "company-api/user/formDelete/:userId/:userFormId",

    adminUserFormPdfDocs: "company-api/user/formPdf-docs/:userId/:userFormId",
}


// https://api.flownex.ai/company-api/user/formPdf-docs/32/103
