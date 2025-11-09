import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

// Image
// Light
import LogoLight from "../../../assets/images/authentication/logo-light.svg";
import GoogleIcon from "../../../assets/images/authentication/google-icon.svg";
// Dark
import LogoDark from "../../../assets/images/authentication/logo-dark.svg";
import { reqtoAddressDetail } from '../../../redux-Toolkit/services/AuthServices';
import { useDispatch, useSelector } from 'react-redux';
import { loaders } from '../../../components/loader/Loader';
import useThemeMode from '../../../hooks/useThemeMode';
// import GoogleIcon from "../../../assets/images/authentication/google-icon.svg";

const initialState = {
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    address_type: "",
}

const AddressDetails = () => {

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

        const res = await dispatch(reqtoAddressDetail(formData));
        console.log("reqtoAddressDetail--> Res", res);

        if (res.payload?.status) {
            navigate("/");
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
                                <h2>Address Details</h2>

                                <p>Enter your delivery and billing address for shipping!</p>
                            </div>

                            <div className="second row">
                                <div className="col-12 mb-3">
                                    <label htmlFor="address_line_1" className='form-label'>Address Line 1 *</label>
                                    <div>
                                        <input
                                            type="text"
                                            name='address_line_1'
                                            placeholder=''
                                            className='form-control'
                                            value={formData?.address_line_1}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="col-12 mb-3">
                                    <label htmlFor="address_line_2" className='form-label'>Address Line 2 *</label>
                                    <div>
                                        <input
                                            type="text"
                                            name='address_line_2'
                                            placeholder=''
                                            className='form-control'
                                            value={formData?.address_line_2}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="col-6 mb-3 pe-3">
                                    <label htmlFor="city" className='form-label'>City *</label>
                                    <div>
                                        <input
                                            type="text"
                                            name='city'
                                            placeholder=''
                                            className='form-control'
                                            value={formData?.city}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="col-6 mb-3 ps-3">
                                    <label htmlFor="state" className='form-label'>State/Province *</label>
                                    <div>
                                        <input
                                            type="text"
                                            name='state'
                                            placeholder=''
                                            className='form-control'
                                            value={formData?.state}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="col-6 mb-3 pe-3">
                                    <label htmlFor="country" className='form-label'>Country *</label>
                                    <div>
                                        <input
                                            type="text"
                                            name='country'
                                            placeholder=''
                                            className='form-control'
                                            value={formData?.country}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="col-6 mb-3 ps-3">
                                    <label htmlFor="postal_code" className='form-label'>Postal Code *</label>
                                    <div>
                                        <input
                                            type="text"
                                            name='postal_code'
                                            placeholder=''
                                            className='form-control'
                                            value={formData?.postal_code}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>


                                <div className="col-12 mb-4">
                                    <label htmlFor="address_type" className='form-label'>Address Type *</label>
                                    <div className='d-flex gap-4'>
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="home"
                                                name="address_type"
                                                className="form-check-input"
                                                value={"Home"}
                                                checked={formData?.address_type === "Home"}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label className="form-check-label" htmlFor="home">
                                                Home
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="work"
                                                name="address_type"
                                                className="form-check-input"
                                                value={"Work"}
                                                checked={formData?.address_type === "Work"}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label className="form-check-label" htmlFor="work">
                                                Work
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="other"
                                                name="address_type"
                                                className="form-check-input"
                                                value={"Other"}
                                                checked={formData?.address_type === "Other"}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label className="form-check-label" htmlFor="other">
                                                Other
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

export default AddressDetails;