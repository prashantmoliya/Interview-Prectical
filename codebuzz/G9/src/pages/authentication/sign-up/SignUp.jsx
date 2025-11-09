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
// import GoogleIcon from "../../../assets/images/authentication/google-icon.svg";

import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { reqtoSignUp } from '../../../redux-Toolkit/services/AuthServices';
import { loaders } from '../../../components/loader/Loader';
import useThemeMode from '../../../hooks/useThemeMode';


const initialState = {
    name: '',
    email: '',
    Mobile_number: '',
    password: '',
    ConfirmPassword: '',
    registrationType: 'Web'
}

const initialPasswordHideShowState = {
    password: false,
    confirmPassword: false,
}

const SignUp = () => {

    const ThemeMode = useThemeMode();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loader } = useSelector((state) => state.UserAuth);

    const [formdata, setFormData] = useState(initialState);
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

    const validatePassword = (password) => {
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

        if (!regex.test(password)) {
            setErrors((prev) => ({
                ...prev,
                password:
                    "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character."
            }));
            return false;
        } else {
            setErrors((prev) => ({ ...prev, password: "" }));
            return true;
        }
    };

    // confirm password check (only onSubmit)
    const validateConfirmPassword = () => {
        if (formdata.password !== formdata.ConfirmPassword) {
            setErrors((prev) => ({
                ...prev,
                confirm: "Confirm Password does not match Password."
            }));
            return false;
        } else {
            setErrors((prev) => ({ ...prev, confirm: "" }));
            return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        // const isPasswordValid = validatePassword(formdata.password);
        // const isConfirmValid = validateConfirmPassword();

        // if (!isPasswordValid || !isConfirmValid) return;


        if (!passwordRegex.test(formdata.password)) {
            setPasswordError((prev) => ({
                ...prev,
                password:
                    "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.",
            }));
            return;
        }

        if (formdata.password !== formdata.ConfirmPassword) {
            setPasswordError((prev) => ({
                ...prev,
                ConfirmPassword: "Password does not match.",
            }));
            return;
        } else {
            setPasswordError((prev) => ({ ...prev, ConfirmPassword: "" }));
        }

        const res = await dispatch(reqtoSignUp(formdata));
        console.log("reqtoSignUp--> Res", res);

        if (res.payload?.status) {
            navigate("/otp-method");
        }
    }

    return (
        <>

            <div className='authentication sign_up'>
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-10 col-sm-9 col-md-7 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="logo text-center">
                            <img src={ThemeMode ? LogoLight : LogoDark} alt="Logo" className='img-fluid' draggable={false} />
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="top">
                                <h2>Sign Up</h2>

                                <p>Enter your email address/mobile number and basic details for sign-up!</p>
                            </div>

                            <div className="second">
                                <div className="col-12 mb-3">
                                    <label htmlFor="name" className='form-label'>Name *</label>
                                    <div>
                                        <input
                                            type="text"
                                            name='name'
                                            placeholder=''
                                            className='form-control'
                                            value={formdata.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="col-12 mb-3">
                                    <label htmlFor="email" className='form-label'>Email Address *</label>
                                    <div>
                                        <input
                                            type="email"
                                            name='email'
                                            placeholder=''
                                            className='form-control'
                                            value={formdata.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="col-12 mb-3">
                                    <label htmlFor="Mobile_number" className='form-label'>Mobile Number *</label>
                                    <div>
                                        <input
                                            type="text"
                                            pattern='\d*'
                                            maxLength={10}
                                            name='Mobile_number'
                                            placeholder=''
                                            className='form-control'
                                            value={formdata.Mobile_number}
                                            onChange={handleChange}
                                            onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                            required
                                        />

                                    </div>
                                </div>

                                <div className="col-12 mb-3">
                                    <label htmlFor="password" className='form-label'>Password *</label>
                                    <div className='input-group'>
                                        <input
                                            type={passwordHideShow.password ? "text" : "password"}
                                            name='password'
                                            placeholder=''
                                            className='form-control'
                                            value={formdata.password}
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
                                            value={formdata.ConfirmPassword}
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
                                            loader ? loaders.btn : 'SIGN UP'
                                        }
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div className="account_or text-center">
                            Already have an account? <Link to="/">Sign in</Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SignUp;