import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './css/Sidebar.css'
import './css/App.css'

import { AuthLayout, DefaultLayout, SuperAdminLayout, UserFormAuthLayout, UserFormDefaultLayout } from './components/layout/Layout'

import SuperAdminLogin from './pages/super-admin/login/Login'
import SuperAdminDashboard from './pages/super-admin/dashboard/Dashboard'
import SuperAdminUser from './pages/super-admin/user/User'
import SuperAdminForms from './pages/super-admin/forms/Forms'
import SuperAdminSource from './pages/super-admin/source/Source'
import SuperAdminCompany from './pages/super-admin/company/Company'
import SuperAdminContactUs from './pages/super-admin/contact-us/ContactUs'
import SuperAdminAddCompany from './pages/super-admin/company/add/AddCompany'
import SuperAdminEditCompany from './pages/super-admin/company/edit/EditCompany'
import SuperAdminUsers from './pages/super-admin/users/Users'
import SuperAdminViewUsers from './pages/super-admin/users/ViewUsers'
import SuperAdminViewUsersSourceForm from './pages/super-admin/users/SourceForm'

import SuperAdminViewForm from './components/form/ViewForm'
import AdminViewForm from './components/form/ViewForm'
import AdminEditForm from './components/form/EditForm'

import Login from './pages/admin/login/Login'
import OtpVerify from './pages/admin/otp-verify/OtpVerify'
import CreatePassword from './pages/admin/create-password/CreatePassword'
import CreateProfile from './pages/admin/create-profile/CreateProfile'
import ForgotPassword from './pages/admin/forgot-password/ForgotPassword'

import Dashboard from './pages/admin/dashboard/Dashboard'
import Users from './pages/admin/users/Users'
import ViewUsers from './pages/admin/users/ViewUsers'
import ViewUsersSourceForm from './pages/admin/users/SourceForm'
import Forms from './pages/admin/forms/Forms'
import Profile from './pages/admin/profile/Profile'

import UserForm from './components/form/UserForm'

// import { ToastContainer } from 'react-toastify'
// import "react-toastify/dist/ReactToastify.css";
import SuperAdminSourceUser from './pages/super-admin/source/SourceUser'
import SuperAdminSourceForm from './pages/super-admin/source/SourceForm'

import AdminSource from './pages/admin/source/Source'
import AdminSourceUser from './pages/admin/source/SourceUser'
import AdminSourceForm from './pages/admin/source/SourceForm'
import UserOtpVerify from './pages/user-form/otp-verify/UserOtpVerify'



function App() {

    return (
        <>

            <Routes>
                {/* ----- Super-Admin ----- */}
                <Route path='/' element={<SuperAdminLogin />} />

                <Route element={<SuperAdminLayout />}>
                    <Route path='/superadmin/dashboard' element={<SuperAdminDashboard />} />
                    {/* <Route path='/superadmin/user' element={<SuperAdminUser />} /> */}

                    {/* <Route path='/superadmin/users' element={<SuperAdminUsers />} />
                    <Route path='/superadmin/users/:userId' element={<SuperAdminViewUsers />} />
                    <Route path='/superadmin/users/:userId/:category' element={<SuperAdminViewUsersSourceForm />} /> */}

                    <Route path='/superadmin/forms' element={<SuperAdminForms />} />
                    <Route path='/superadmin/forms/view/:category' element={<SuperAdminViewForm />} />

                    {/* <Route path='/superadmin/source' element={<SuperAdminSource />} />
                    <Route path='/superadmin/source/:userId' element={<SuperAdminSourceUser />} />
                    <Route path='/superadmin/source/:userId/:category' element={<SuperAdminSourceForm />} /> */}

                    <Route path='/superadmin/company' element={<SuperAdminCompany />} />

                    <Route path='/superadmin/help-Support' element={<SuperAdminContactUs />} />

                    {/* <Route path='/superadmin/company/add' element={<SuperAdminAddCompany />} />
                    <Route path='/superadmin/company/edit/:id' element={<SuperAdminEditCompany />} /> */}
                </Route>



                {/* ----- Sub-Admin ----- */}

                <Route element={<AuthLayout />}>
                    <Route path='/admin/login' element={<Login />} />
                    <Route path='/admin/otp-verification' element={<OtpVerify />} />
                    <Route path='/admin/create-password' element={<CreatePassword />} />
                    <Route path='/admin/create-profile' element={<CreateProfile />} />
                    <Route path='/admin/forgot-password' element={<ForgotPassword />} />
                </Route>

                <Route element={<DefaultLayout />}>
                    <Route path='/admin/profile' element={<Profile />} />

                    <Route path='/admin/dashboard' element={<Dashboard />} />

                    <Route path='/admin/users' element={<Users />} />
                    <Route path='/admin/users/:userId' element={<ViewUsers />} />
                    <Route path='/admin/users/:userId/:userFormId' element={<ViewUsersSourceForm />} />
                    <Route path='/admin/users/form-edit/:userId/:userFormId' element={<AdminEditForm />} />

                    <Route path='/admin/forms' element={<Forms />} />
                    <Route path='/admin/forms/view/:category' element={<AdminViewForm />} />

                    {/* <Route path='/admin/source' element={<AdminSource />} />
                    <Route path='/admin/source/:userId' element={<AdminSourceUser />} />
                    <Route path='/admin/source/:userId/:category' element={<AdminSourceForm />} /> */   }
                </Route>


                {/* ----- User-Form ----- */}
                <Route path='/forms/:category/:userUniqueId/:formUniqueId' element={<UserForm />} />

                {/* <Route element={<UserFormAuthLayout />}>
                    <Route path='/forms/otp-verification' element={<UserOtpVerify />} />
                </Route>
                <Route element={<UserFormDefaultLayout />}>
                    <Route path='/forms/:category/:userUniqueId/:formUniqueId' element={<UserForm />} />
                </Route> */}

            </Routes>

            {/* <ToastContainer position="top-center" autoClose={3000} /> */}


        </>
    )
}

export default App;
