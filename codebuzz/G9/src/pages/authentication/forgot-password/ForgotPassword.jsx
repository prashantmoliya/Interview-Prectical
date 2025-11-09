import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

// Image
// Light
import LogoLight from "../../../assets/images/authentication/logo-light.svg";
import GoogleIcon from "../../../assets/images/authentication/google-icon.svg";
// Dark
import LogoDark from "../../../assets/images/authentication/logo-dark.svg";
import { useDispatch, useSelector } from 'react-redux';
import { reqtoForgetPassword, reqtoOtpMethod } from '../../../redux-Toolkit/services/AuthServices';
import { toast } from 'react-toastify';
import { loaders } from '../../../components/loader/Loader';
import useThemeMode from '../../../hooks/useThemeMode';
// import GoogleIcon from "../../../assets/images/authentication/google-icon.svg";

const initialState = {
    identifier: "",
    // email
    // Mobile_number
}

const ForgotPassword = () => {

    const ThemeMode = useThemeMode();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loader } = useSelector((state) => state.UserAuth);

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { identifier } = formData;

        let payload = {
            email: "",
            Mobile_number: "",
        };

        if (identifier.includes("@")) {
            payload.email = identifier;
        }
        else if (/^\d+$/.test(identifier)) {
            payload.Mobile_number = identifier;
        }
        else {
            return toast.error("Please enter a valid email or mobile number");
        }

        const res = await dispatch(reqtoForgetPassword(payload));
        console.log("reqtoForgetPassword--> Res", res);

        if (res.payload?.status) {

            let otpPayload = { type: identifier.includes("@") ? "email" : "sms" };
            console.log(otpPayload);

            if (identifier.includes("@")) {
                otpPayload.email = identifier;
            }
            else if (/^\d+$/.test(identifier)) {
                otpPayload.Mobile_number = identifier;
            }

            const otpMethodRes = await dispatch(reqtoOtpMethod(otpPayload));
            console.log("reqtoOtpMethod--> Res", res);

            if (otpMethodRes.payload?.status) {
                navigate(identifier.includes("@") ? "/email-otp-verify" : "/mobile-otp-verify");
            }

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
                                <h2>Forgot Password</h2>

                                <p>Enter your email address/mobile number for forgot password!</p>
                            </div>

                            <div className="second">
                                <div className="col-12 mb-4">
                                    <label htmlFor="identifier" className='form-label'>Email Address / Mobile Number *</label>
                                    <div>
                                        <input
                                            type="text"
                                            name='identifier'
                                            placeholder=''
                                            className='form-control'
                                            value={formData.identifier}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className='text-center'>
                                    <button
                                        type='submit'
                                        className='main_btn auth_btn'
                                        disabled={loader}
                                    >
                                        {
                                            loader ? loaders.btn : 'CONTINUE'
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

export default ForgotPassword;