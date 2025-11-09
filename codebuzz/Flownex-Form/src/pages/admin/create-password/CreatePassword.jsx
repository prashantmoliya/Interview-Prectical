










import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUserCog } from 'react-icons/fa';
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

import AdminLogo from "../../../assets/images/admin-logo.png";
import { loaders } from '../../../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { reqtoAdminCompanyPassword } from '../../../redux-Toolkit/services/admin/AuthServices';

const initialState = {
    password: "",
    confirmPassword: ""
};

const initialPassState = {
    password: false,
    confirmPassword: false
};

const passwordRules = [
    { regex: /.{8,}/, message: "At least 8 characters" },
    { regex: /[A-Z]/, message: "At least one uppercase letter" },
    { regex: /[a-z]/, message: "At least one lowercase letter" },
    { regex: /\d/, message: "At least one number" },
    { regex: /[@$!%*#?&]/, message: "At least one special character " },
];

const CreatePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();

    const adminAuthReducer = useSelector((state) => state.AdminAuth);
    const { loader } = adminAuthReducer;

    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(initialPassState);
    const [errors, setErrors] = useState({ password: "", confirmPassword: "" });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const otpVerified = localStorage.getItem("isOtpVerified") === "true";
        if (!otpVerified) {
            navigate("/admin/otp-verification", { replace: true });
        }
    }, [navigate]);
    const PasswordShowHide = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));


        // 🔥 live confirm password validation
        // if (name === "confirmPassword") {
        //     setErrors((prev) => ({
        //         ...prev,
        //         confirmPassword:
        //             value && value !== formData.password ? "Passwords do not match" : "",
        //     }));
        // }

        // if (name === "password") {
        //     // also re-check confirm password if user edits password
        //     setErrors((prev) => ({
        //         ...prev,
        //         confirmPassword:
        //             formData.confirmPassword && formData.confirmPassword !== value
        //                 ? "Passwords do not match"
        //                 : "",
        //     }));
        // }
    };

    const validateForm = () => {
        let newErrors = { password: "", confirmPassword: "" };
        let isValid = true;

        // check if all rules pass
        const failedRules = passwordRules.filter(
            (rule) => !rule.regex.test(formData.password)
        );

        if (formData.confirmPassword && formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true); // 🔥 trigger showing rules/errors

        if (!validateForm()) return;

        const res = await dispatch(reqtoAdminCompanyPassword(formData));
        if (res.payload?.status) {
            navigate(state === "password" ? "/admin/create-profile" : "/admin/login");
        }
    };

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
                                Create a Password
                                <span>
                                    <FaUserCog style={{ marginLeft: "13px", marginBottom: "2px" }} />
                                </span>
                            </h4>
                            <p>Please enter your details</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Password Field */}
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">New Password:</label>
                                <div className="input-group">
                                    <input
                                        style={{ borderRadius: "10px" }}
                                        type={showPassword.password ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="Enter Your New Password"
                                        autoComplete='off'
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span
                                        onClick={() => PasswordShowHide("password")}
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            border: "0",
                                            color: '#000',
                                            backgroundColor: "transparent",
                                            cursor: 'pointer',
                                            zIndex: "999"
                                        }}
                                    >
                                        {showPassword.password ? <IoEyeSharp size={24} /> : <FaEyeSlash size={24} />}
                                    </span>
                                </div>

                                {/* ✅ Show rules only after typing OR after submit */}
                                {(submitted || formData.password) && (
                                    <ul className="mt-2 list-unstyled">
                                        {passwordRules.map((rule, index) => {
                                            const isValid = rule.regex.test(formData.password);
                                            return (
                                                <li
                                                    key={index}
                                                    style={{
                                                        color: isValid ? "green" : "red",
                                                        fontSize: "14px"

                                                    }}
                                                    className='pass'
                                                >
                                                    {isValid ? "✔" : "✘"} {rule.message}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}

                                {errors.password && (
                                    <div className='mt-1'>
                                        <small className="text-error">{errors.password}</small>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                                <div className="input-group">
                                    <input
                                        style={{ borderRadius: "10px" }}
                                        type={showPassword.confirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        className="form-control"
                                        placeholder="Enter Your Confirm Password"
                                        autoComplete='off'
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span
                                        onClick={() => PasswordShowHide("confirmPassword")}
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            border: "0",
                                            color: '#000',
                                            backgroundColor: "transparent",
                                            cursor: 'pointer',
                                            zIndex: "999"
                                        }}
                                    >
                                        {showPassword.confirmPassword ? <IoEyeSharp size={24} /> : <FaEyeSlash size={24} />}
                                    </span>
                                </div>

                                {errors.confirmPassword && (
                                    <div className='mt-1'>
                                        <small className="text-error">{errors.confirmPassword}</small>
                                    </div>
                                )}
                            </div>

                            <div>
                                <button
                                    className={`login-btn ${loader ? 'btn-loading' : ''}`}
                                    disabled={loader}
                                >
                                    {loader && loaders.small}
                                    {loader ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreatePassword;

