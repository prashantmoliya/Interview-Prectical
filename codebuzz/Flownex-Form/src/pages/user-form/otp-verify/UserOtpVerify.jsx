import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUserCog } from 'react-icons/fa';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

import Logo from "../../../assets/images/logo.png";
import AdminLogo from "../../../assets/images/admin-logo.png";
import LoginLogo from "../../../assets/images/login-logo.png";

import { loaders } from '../../../components/loader/Loader';
import { toast } from 'react-toastify';
import { reqtoAdminOtpVerification, reqtoAdminResendOtp } from '../../../redux-Toolkit/services/admin/AuthServices';
import { useDispatch, useSelector } from 'react-redux';
import { Axios } from '../../../redux-Toolkit/helper/Axios';

const initialOtpState = ["", "", "", "", "", ""];

const UserOtpVerify = () => {

    const { state } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formType = localStorage.getItem("form-type");
    const formUserUniqueId = localStorage.getItem("form-userUniqueId");
    const formFormUniqueId = localStorage.getItem("form-formUniqueId");


    const [loader, setLoader] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
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
            // only accept exactly 6 digits
            setOtp(pasteData.split(""));
            // focus last input
            const lastInput = document.getElementById(`otp-input-5`);
            if (lastInput) lastInput.focus();
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const enteredOtp = otp?.join('');
        if (enteredOtp.length === 6) {

            setLoader(true);

            navigate("/admin/create-password");

            try {
                const payload = {
                    type: formType,
                    userUniqueId: formUserUniqueId,
                    formUniqueId: formFormUniqueId,
                    otp: enteredOtp,
                }
                const res = await Axios.post("/company-api/user/otpVerification", payload, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    }
                });

                if (res?.data?.status) {
                    const formRes = res?.data?.data;

                    toast.success(res.data?.message);
                    setOtp(initialOtpState);
                    localStorage.setItem("user-form-token", formRes?.accessToken)
                    navigate(`/forms/${formRes.category}/${formRes.userUniqueId}/${formRes.formUniqueId}`);
                } else {
                    toast.error(res.data?.message);
                }
            } catch (err) {
                throw err
            }
            finally {
                setLoader(true);

            }
        }
        else {
            setOtpError("Please enter 6 digits");
        }
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };


    const handleResend = async () => {

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

                            <h4 className="mb-2">Form OTP
                                <span>
                                    <FaUserCog style={{ marginLeft: "13px", marginBottom: "2px" }} />
                                </span>
                            </h4>
                            <p className='otp-p'>
                                {/* Check your email inbox! Enter the 6-digit verification code sent to <span>test@gmail.com</span>. */}
                                Check your email inbox! Enter the 6-degit verification code sent to your email
                            </p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                {/* <label htmlFor="otp" className="form-label">Otp:</label> */}

                                <div className='d-flex justify-content-between'>
                                    {otp?.map((digit, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            maxLength="1"
                                            id={`otp-input-${index}`}
                                            name="otp"
                                            className={`form-control otp-input ${digit ? "filled" : ""}`}
                                            value={digit}
                                            onChange={(e) => handleChange(e, index)}
                                            onKeyDown={(e) => handleBackspace(e, index)}
                                            autoFocus={index === 0}
                                            onPaste={(e) => handlePaste(e)}
                                        />
                                    ))}
                                </div>

                                {otpError &&
                                    <div className='mt-2'>
                                        <small className="text-danger">{otpError}</small>
                                    </div>
                                }
                            </div>

                            <div className="mt-4">
                                <button
                                    className={`login-btn ${loader ? 'btn-loading' : ''}`}
                                    disabled={loader}
                                >
                                    {loader && loaders.small}
                                    {loader ? 'Submitting...' : 'Submit Otp'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserOtpVerify;