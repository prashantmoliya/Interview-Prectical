import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Image
// Light
import LogoLight from "../../assets/images/authentication/logo-light.svg";
// Dark
import LogoDark from "../../assets/images/authentication/logo-dark.svg";
import { useDispatch, useSelector } from 'react-redux';
import { loaders } from '../loader/Loader';
import { reqtoOtpMethod } from '../../redux-Toolkit/services/AuthServices';
import useThemeMode from '../../hooks/useThemeMode';

const initialState = {
    Mobile_number: '',
}

const MobileOtpMethod = () => {

    const ThemeMode = useThemeMode();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loader, email, phone, type } = useSelector((state) => state.UserAuth);

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

        let payload = { type: "sms", Mobile_number: formData.Mobile_number };
        console.log(payload);

        const res = await dispatch(reqtoOtpMethod(payload));
        console.log("reqtoOtpMethod--> Res", res);

        if (res.payload?.status) {
            navigate("/mobile-otp-verify");
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
                                <h2>Mobile OTP</h2>

                                <p>Enter your mobile number for get OTP!</p>
                            </div>

                            <div className="second">
                                <div className="col-12 mb-4">
                                    <label htmlFor="Mobile_number" className='form-label'>Mobile Number</label>
                                    <div>
                                        <input
                                            type="text"
                                            pattern='\d*'
                                            maxLength={10}
                                            name='Mobile_number'
                                            placeholder=''
                                            className='form-control'
                                            value={formData.Mobile_number}
                                            onChange={handleChange}
                                            onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
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

export default MobileOtpMethod;