import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCog } from 'react-icons/fa';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

import Logo from "../../../assets/images/logo.png";
import AdminLogo from "../../../assets/images/admin-logo.png";
import LoginLogo from "../../../assets/images/login-logo.png";

import { loaders } from '../../../components/loader/Loader';
import { toast } from 'react-toastify';
// import { forgetpassword } from '../../services/adminServices';

import { useDispatch, useSelector } from 'react-redux';
import { reqtoAdminForgetPassword } from '../../../redux-Toolkit/services/admin/AuthServices';

const initialState = {
    email: "",
}

const ForgotPassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loader } = useSelector((state) => state.AdminAuth);
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await dispatch(reqtoAdminForgetPassword(formData));

        if (res.payload?.status) {
            navigate("/admin/otp-verification", { state: { email: formData?.email, type: "forgot-password" } });
        }
    }

    return (
        <section className="login-section admin">
            <div className="row align-items-center justify-content-center min-vh-100">
                <div className='col-xxl-4 col-xl-5 col-lg-6 col-md-7 col-sm-8 px-0 bg-white shadow login-box admin-login'>
                    <div className="left-box">
                        <div className="header-text my-4">
                            <div className="mb-5">
                                <img src={AdminLogo} className="img-fluid login-logo" draggable="false" />
                            </div>

                            <h4 className="mb-2">
                                Forgot password
                                <span>
                                    <FaUserCog style={{ marginLeft: "13px", marginBottom: "2px" }} />
                                </span>
                            </h4>
                            <p>No worries, we’ll send your reset instruction</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter Your Email Address"
                                    autoComplete='off'
                                    value={formData?.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <button
                                    className={`login-btn ${loader ? 'btn-loading' : ''}`}
                                    disabled={loader}
                                >
                                    {loader && loader.small}
                                    {loader ? 'Resetting...' : 'Reset password'}
                                </button>
                            </div>

                            <div className='text-end back-login'>
                                <p>Back to? <span onClick={() => navigate('/admin/login')}>Log in</span></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ForgotPassword;   