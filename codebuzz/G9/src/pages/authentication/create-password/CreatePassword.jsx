import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

// Image
// Light
import LogoLight from "../../../assets/images/authentication/logo-light.svg";
import PasswordShowLight from "../../../assets/images/authentication/password-show-light.svg";
import PasswordHideLight from "../../../assets/images/authentication/password-hide-light.svg";
import GoogleIcon from "../../../assets/images/authentication/google-icon.svg";
// Dark
import LogoDark from "../../../assets/images/authentication/logo-dark.svg";
import PasswordShowDark from "../../../assets/images/authentication/password-show-dark.svg";
import PasswordHideDark from "../../../assets/images/authentication/password-hide-dark.svg";

import { useDispatch, useSelector } from 'react-redux';
import { reqtoChangePassword } from '../../../redux-Toolkit/services/AuthServices';
import { loaders } from '../../../components/loader/Loader';
import useThemeMode from '../../../hooks/useThemeMode';
// import GoogleIcon from "../../../assets/images/authentication/google-icon.svg";


const initialState = {
    password: "",
    ConfirmPassword: "",
}

const initialPasswordHideShowState = {
    password: false,
    confirmPassword: false,
}

const CreatePassword = () => {

    const ThemeMode = useThemeMode();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loader } = useSelector((state) => state.UserAuth);

    const [formData, setFormData] = useState(initialState);
    const [passwordError, setPasswordError] = useState({
        password: '',
        ConfirmPassword: '',
    });

    const [passwordHideShow, setPasswordHideShow] = useState(initialPasswordHideShowState);

    const PasswordHideShow = (type) => {
        setPasswordHideShow((prev) => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        if (name === "password") {
            if (!passwordRegex.test(value)) {
                setPasswordError((prev) => ({
                    ...prev,
                    password:
                        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.",
                }));
            } else {
                setPasswordError((prev) => ({ ...prev, password: "" }));
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!passwordRegex.test(formData.password)) {
            setPasswordError((prev) => ({
                ...prev,
                password:
                    "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.",
            }));
            return;
        }

        if (formData.password !== formData.ConfirmPassword) {
            setPasswordError((prev) => ({
                ...prev,
                ConfirmPassword: "Password does not match.",
            }));
            return;
        } else {
            setPasswordError((prev) => ({ ...prev, ConfirmPassword: "" }));
        }

        const res = await dispatch(reqtoChangePassword(formData));
        console.log("reqtoChangePassword--> Res", res);

        if (res.payload?.status) {
            navigate("/");
        }
    }

    return (
        <>

            <div className='authentication'>
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-10 col-sm-9 col-md-7 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="logo text-center">
                            <img src={ThemeMode ? LogoLight : LogoDark} alt="Logo" className='img-fluid' draggable={false} />
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="top">
                                <h2>Create Password</h2>

                                <p>Enter your password for set new password!</p>
                            </div>

                            <div className="second">
                                <div className="col-12 mb-3">
                                    <label htmlFor="password" className='form-label'>Password *</label>
                                    <div className='input-group'>
                                        <input
                                            type={passwordHideShow.password ? "text" : "password"}
                                            name='password'
                                            placeholder=''
                                            className='form-control'
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />

                                        <span
                                            onClick={() => PasswordHideShow('password')}
                                            className='password_hide_show'
                                        >
                                            <img src={passwordHideShow.password ? ThemeMode ? PasswordHideLight : PasswordHideDark : ThemeMode ? PasswordShowLight : PasswordShowDark} alt="Logo" className='img-fluid' draggable={false} />
                                        </span>
                                    </div>
                                    {passwordError.password && <div className='mt-2 error_message'>{passwordError.password}</div>}
                                </div>

                                <div className="col-12 mb-4">
                                    <label htmlFor="ConfirmPassword" className='form-label'>Confirm Password *</label>
                                    <div className='input-group'>
                                        <input
                                            type={passwordHideShow.confirmPassword ? "text" : "password"}
                                            name='ConfirmPassword'
                                            placeholder=''
                                            className='form-control'
                                            value={formData.ConfirmPassword}
                                            onChange={handleChange}
                                            required
                                        />

                                        <span
                                            onClick={() => PasswordHideShow('confirmPassword')}
                                            className='password_hide_show'
                                        >
                                            <img src={passwordHideShow.confirmPassword ? ThemeMode ? PasswordHideLight : PasswordHideDark : ThemeMode ? PasswordShowLight : PasswordShowDark} alt="Logo" className='img-fluid' draggable={false} />
                                        </span>
                                    </div>
                                    {passwordError.ConfirmPassword && <div className='mt-2 error_message'>{passwordError.ConfirmPassword}</div>}
                                </div>

                                <div className='text-center'>
                                    <button
                                        type='submit'
                                        className='main_btn auth_btn'
                                        disabled={loader}
                                    >
                                        {
                                            loader ? loaders.btn : 'SUBMIT'
                                        }
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CreatePassword;