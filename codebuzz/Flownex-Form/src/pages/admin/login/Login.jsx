import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUserCog } from 'react-icons/fa';
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

import AdminLogo from "../../../assets/images/admin-logo.png";
import { loaders } from '../../../components/loader/Loader';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { reqtoAdminCheckEmail, reqtoAdminLogin } from '../../../redux-Toolkit/services/admin/AuthServices';
import { passwordHide } from '../../../redux-Toolkit/slices/admin/AuthSlice';

const initialState = {
    email: "",
    password: "",
}

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const adminAuthReducer = useSelector((state) => state.AdminAuth);
    const { loader, exist, password, step } = adminAuthReducer;

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({ password: "" });


    const [showpassword, setshowpassword] = useState(false);

    const PasswordShowHide = () => {
        setshowpassword((prevShowPassword) => !prevShowPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // if (name === "password") {
        //     // const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;
        //     const strongPasswordRegex = /^[A-Z](?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/;

        //     // if (!value || value.length < 7) {
        //     //     setErrors((prev) => ({ ...prev, password: "Password must be at least 8 characters" }));
        //     // } else
        //     if (!strongPasswordRegex.test(value)) {
        //         setErrors((prev) => ({
        //             ...prev,
        //             // password: "Password must include uppercase, lowercase, number & special character"
        //             password: "Password must be at least 8 characters, start with a capital letter, and contain at least one alphabet, one number, and one special character "
        //         }));
        //     } else {
        //         setErrors((prev) => ({ ...prev, password: "" }));
        //     }
        // }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // let newErrors = { password: "" };
        // let valid = true;
        // // const strongPasswordRegex = /^[A-Z](?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
        // const strongPasswordRegex = /^[A-Z](?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/;


        if (exist && password) {
            // if (formData.password.length < 7) {
            //     newErrors.password = "Password must be at least 8 characters";
            //     valid = false;
            // }
            // else if (!strongPasswordRegex.test(formData.password)) {
            //     newErrors.password = "Password must include uppercase, lowercase, number & special character";
            //     valid = false;
            // }

            // if (!strongPasswordRegex.test(formData.password)) {
            //     newErrors.password = "Password must be at least 8 characters, start with a capital letter, and contain at least one alphabet, one number, and one special character ";
            //     valid = false;
            // }
            // else {
            //     newErrors.password = "";
            // }

            // setErrors(newErrors);
            // if (!valid) return;

            const res = await dispatch(reqtoAdminLogin(formData));
            if (res.payload?.status) {
                if (res?.payload?.data?.step === '2') {
                    navigate('/admin/create-profile')
                    localStorage.setItem("admin-token", res?.payload?.data?.authentication?.accessToken);
                } else {
                    navigate("/admin/dashboard");
                }
            }
        }
        else {
            const res = await dispatch(reqtoAdminCheckEmail(formData));

            if (res.payload?.status) {
                if (res?.payload?.step === '1' && password) {
                    navigate('/admin/create-password', { state: "password" })
                    localStorage.setItem('token', res?.payload?.authentication?.accessToken)
                } else {
                    if (res.payload?.exist && !res.payload?.password) {
                        navigate("/admin/otp-verification", { state: { email: formData?.email, type: "password" } });
                    }
                }
            }
        }
    }

    useEffect(() => {
        if (location.state?.resetLogin) {
            dispatch(passwordHide());
            setFormData(prev => ({ ...prev, password: "" }));
            // remove the state to avoid stale behavior on refresh
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, navigate, dispatch, location.pathname]);

    // Push dummy state when password step appears
    useEffect(() => {
        if (exist && password) {
            window.history.pushState({ step: "password" }, "");
        }
    }, [exist, password]);

    // Handle browser back for the inline password step
    useEffect(() => {
        const handlePopState = () => {
            if (exist && password) {
                dispatch(passwordHide());
                setFormData(initialState);
            } else {
                navigate(-1);
            }
        };

        window.addEventListener("popstate", handlePopState);
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [exist, password, dispatch, navigate]);

    useEffect(() => {
        window.history.pushState(null, "", window.location.href);
        const blockNavigation = () => {
            window.history.pushState(null, "", window.location.href);
        };
        window.addEventListener("popstate", blockNavigation);
        return () => {
            window.removeEventListener("popstate", blockNavigation);
        };
    }, []);

    return (
        <section className="login-section admin">
            <div className="row align-items-center justify-content-center min-vh-100">
                <div className='col-xxl-4 col-xl-5 col-lg-6 col-md-7 col-sm-8 px-0 bg-white shadow login-box admin-login'>
                    <div className="left-box">
                        <div className="header-text my-4">
                            <div className="mb-5">
                                <img src={AdminLogo} className="img-fluid login-logo" draggable="false" />
                            </div>

                            <h4 className="mb-2">Sign In !
                                <span>
                                    <FaUserCog style={{ marginLeft: "13px", marginBottom: "2px" }} size={'24px'} />
                                </span>
                            </h4>
                            <p>Hello there, sign in to continue!</p>
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

                            {exist && password &&
                                (
                                    <>
                                        <div className="mb-1">
                                            <label htmlFor="password" className="form-label">Password:</label>
                                            <div className="input-group">
                                                <input
                                                    style={{ borderRadius: "10px" }}
                                                    type={showpassword ? "text" : "password"}
                                                    name="password"
                                                    id="password"
                                                    className="form-control"
                                                    placeholder="Enter Your Password"
                                                    autoComplete='off'
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <span
                                                    onClick={PasswordShowHide}
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
                                                    {showpassword ? <IoEyeSharp size={24} /> : <FaEyeSlash size={24} />}
                                                </span>
                                            </div>
                                            {
                                                errors.password &&
                                                <div className='mt-1'>
                                                    <small className="text-danger">{errors.password}</small>
                                                </div>
                                            }
                                        </div>

                                        <div className='mt-2 text-end forget-paasword'>
                                            <p><span onClick={() => navigate('/admin/forgot-password')}>Forgot Password?</span></p>
                                        </div>
                                    </>
                                )}

                            <div className="mt-4">
                                <button
                                    className={`login-btn ${loader ? 'btn-loading' : ''}`}
                                    disabled={loader}
                                >
                                    {loader && loader.small}
                                    {loader ? 'Signing In...' : 'Sign In'}
                                </button>
                            </div>
                        </form >
                    </div >
                </div >
            </div >
        </section >
    )
}

export default Login;