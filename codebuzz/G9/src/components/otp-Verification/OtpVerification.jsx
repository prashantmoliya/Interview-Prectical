import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Image
// Light
import LogoLight from "../../assets/images/authentication/logo-light.svg";
import GoogleIcon from "../../assets/images/authentication/google-icon.svg";
// Dark
import LogoDark from "../../assets/images/authentication/logo-dark.svg";
// import GoogleIcon from "../../assets/images/authentication/google-icon.svg";

import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loaders } from '../loader/Loader';
import { reqtoOtpVerification } from '../../redux-Toolkit/services/AuthServices';
import { signUpResendOtp } from '../../redux-Toolkit/slices/AuthSlice';
import useThemeMode from '../../hooks/useThemeMode';

const initialOtpState = ["", "", "", "", "", ""];

const initialResendState = {
    timeLeft: 120,
    disabled: true
};

const OtpVerification = () => {

    const ThemeMode = useThemeMode();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loader, email, phone, type, pageType } = useSelector((state) => state.UserAuth);

    const [otp, setOtp] = useState(initialOtpState);
    const [resend, setResend] = useState(initialResendState);
    const [otpError, setOtpError] = useState("");


    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/g, ''); // Only digits
        if (value.length === 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Focus next input
            const nextInput = document.getElementById(`otp-input-${index + 1}`);
            if (nextInput) nextInput.focus();
        } else {
            // Clear the current box if not a valid single digit
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);
        }

        setOtpError("");
    }

    const handleBackspace = (e, index) => {
        // if (e.key === "Backspace" && otp[index] === "" && index > 0) {
        //     document.getElementById(`otp-input-${index - 1}`).focus();
        // }

        if (e.key === "Backspace") {
            const newOtp = [...otp];

            if (otp[index] === "") {
                // Go to previous input
                if (index > 0) {
                    const prevInput = document.getElementById(`otp-input-${index - 1}`);
                    if (prevInput) prevInput.focus();
                }
            } else {
                // Clear current input
                newOtp[index] = "";
                setOtp(newOtp);
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").trim();

        if (/^\d{6}$/.test(pasteData)) {
            setOtp(pasteData?.split(""));
            const lastInput = document.getElementById(`otp-input-5`);
            if (lastInput) lastInput.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const enteredOtp = otp?.join('');
        if (enteredOtp.length === 6) {

            let payload = { otp: enteredOtp };

            if (type === "email") {
                payload = { ...payload, email: email };
            }
            else if (type === "sms" || type === "whatsapp") {
                payload = { ...payload, Mobile_number: phone };
            }

            const res = await dispatch(reqtoOtpVerification(payload));
            console.log("reqtoOtpVerification--> Res", res);

            if (res.payload?.status) {
                // navigate(pageType === "forgot-password" ? "/create-password" : "/address-details");
                navigate(pageType === "forgot-password" ? "/create-password" : "/home");
            }
        }
        else {
            setOtpError("Please enter all 6 digits");
        }
    }


    const handleResend = async () => {
        // setOtp(initialOtpState);

        // setResend(initialResendState);

        if (pageType === "sign-up") {
            dispatch(signUpResendOtp());
        }

        navigate("/otp-method");
    }


    useEffect(() => {
        let timer;

        if (resend.disabled && resend.timeLeft > 0) {
            timer = setInterval(() => {
                setResend(prev => ({
                    ...prev,
                    timeLeft: prev.timeLeft - 1
                }));
            }, 1000);
        }

        if (resend.timeLeft === 0 && resend.disabled) {
            setResend(prev => ({
                ...prev,
                disabled: false
            }));
        }

        return () => clearInterval(timer);
    }, [resend.disabled, resend.timeLeft]);

    return (
        <>
            <div id="otp-timer"></div>

            <div className='authentication otp'>
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-10 col-sm-9 col-md-7 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="logo text-center">
                            <img src={ThemeMode ? LogoLight : LogoDark} alt="Logo" className='img-fluid' draggable={false} />
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="top">
                                <h2>OTP Verification</h2>

                                <p>Enter OTP that we have send on <span>{email || phone}</span></p>
                            </div>

                            <div className="second">
                                <div className="col-12 mb-4">
                                    {/* <label htmlFor="type" className='form-label'>Address Type *</label> */}
                                    <div className='d-flex gap-4'>
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="email"
                                                name="type"
                                                className="form-check-input"
                                                value={"email"}
                                                checked={type === "email"}
                                                readOnly
                                                disabled
                                            />
                                            <label className="form-check-label" htmlFor="email">
                                                Email
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="sms"
                                                name="type"
                                                className="form-check-input"
                                                value={"sms"}
                                                checked={type === "sms"}
                                                readOnly
                                                disabled
                                            />
                                            <label className="form-check-label" htmlFor="sms">
                                                SMS
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="whatsapp"
                                                name="type"
                                                className="form-check-input"
                                                value={"whatsapp"}
                                                checked={type === "whatsapp"}
                                                readOnly
                                                disabled
                                            />
                                            <label className="form-check-label" htmlFor="whatsapp">
                                                WhatsApp
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 mb-2">
                                    <div className='otp-container'>

                                        {otp?.map((digit, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                // pattern='\d*'
                                                maxLength="1"
                                                // id={`otp-${index}`}
                                                id={`otp-input-${index}`}
                                                name="otp"
                                                // className="form-control"
                                                className={`form-control ${digit ? "filled" : ""}`}
                                                value={digit}
                                                onChange={(e) => handleChange(e, index)}
                                                onKeyDown={(e) => handleBackspace(e, index)}
                                                // onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                                autoFocus={index === 0}
                                                onPaste={(e) => handlePaste(e)}
                                            />
                                        ))}

                                    </div>

                                    {otpError && <div className='mt-2 error_message'>{otpError}</div>}
                                </div>

                                <div className='mb-4 resend text-end'>
                                    <button
                                        type='button'
                                        className='resend_btn me-1'
                                        onClick={handleResend}
                                        disabled={resend.disabled}
                                    >
                                        Resend
                                    </button>
                                    {resend.disabled ?
                                        <span> in {resend.timeLeft} sec</span>
                                        :
                                        <span> in {resend.timeLeft} sec</span>
                                    }
                                </div>

                                <div className='text-center'>
                                    <button
                                        type='submit'
                                        className='main_btn auth_btn'
                                        disabled={loader}
                                    >
                                        {
                                            loader ? loaders.btn : 'VERIFY'
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

export default OtpVerification;