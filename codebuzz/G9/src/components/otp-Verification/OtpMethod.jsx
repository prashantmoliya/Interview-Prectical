import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Image
// Light
import LogoLight from "../../assets/images/authentication/logo-light.svg";
// Dark
import LogoDark from "../../assets/images/authentication/logo-dark.svg";
import { useDispatch, useSelector } from 'react-redux';
import { loaders } from '../loader/Loader';
import { reqtoOtpMethod, reqtoSignUpOtpMethod } from '../../redux-Toolkit/services/AuthServices';
import useThemeMode from '../../hooks/useThemeMode';

const initialState = {
    type: '',
}

const OtpMethod = () => {

    const ThemeMode = useThemeMode();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loader, email, phone, type } = useSelector((state) => state.UserAuth);
    console.log(email, phone);

    const [formData, setFormData] = useState(initialState);
    console.log(formData);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // let payload = { type: type === "email" && "email" || formData.type };
        let payload = { type: formData.type, email: email, Mobile_number: phone };
        console.log(payload);

        // if (payload.type === "email") {
        //     payload = { ...payload, email: email };
        // }
        // else if (payload.type === "sms" || payload.type === "whatsapp") {
        //     payload = { ...payload, Mobile_number: phone };
        // }

        // const res = await dispatch(reqtoOtpMethod(payload));
        const res = await dispatch(reqtoSignUpOtpMethod(payload));
        console.log("reqtoOtpMethod--> Res", res);

        if (res.payload?.status) {
            navigate("/otp-verify");
        }
    }

    return (
        <>
            <div className='authentication otp'>
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-10 col-sm-9 col-md-7 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="logo text-center">
                            <img src={ThemeMode ? LogoLight : LogoDark} alt="Logo" className='img-fluid' draggable={false} />
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="top">
                                <h2>OTP Verification</h2>

                                <p>Please select preferred type for OTP receiving!</p>
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
                                                onChange={handleChange}
                                                // checked={type === "email" || formData.type === "email"}
                                                checked={formData.type === "email"}
                                                required
                                            // disabled={
                                            //     type ?
                                            //         // type === "sms" || type === "whatsapp" ? 
                                            //         // false : 
                                            //         type !== "email" ?
                                            //             true :
                                            //             type === "select" ?
                                            //                 true : false
                                            //         : false
                                            // }
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
                                                onChange={handleChange}
                                                checked={formData.type === "sms"}
                                                required
                                            // disabled={type === "email"}
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
                                                onChange={handleChange}
                                                checked={formData.type === "whatsapp"}
                                                required
                                            // disabled={type === "email"}
                                            />
                                            <label className="form-check-label" htmlFor="whatsapp">
                                                WhatsApp
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className='text-center'>
                                    <button
                                        type='submit'
                                        className='main_btn auth_btn'
                                        disabled={loader}
                                    >
                                        {
                                            loader ? loaders.btn : 'SEND OTP'
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

export default OtpMethod;