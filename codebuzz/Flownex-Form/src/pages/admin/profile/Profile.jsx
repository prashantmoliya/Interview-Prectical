import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { loaders } from '../../../components/loader/Loader';
import { reqtoAdminCompanyDetail, reqtoAdminCompanyEdit } from '../../../redux-Toolkit/services/admin/AuthServices';

const initialState = {
    name: "",
    companyName: "",
    mobileNumber: "",
    email: "",
    logo: "",
}

const Profile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const adminAuthReducer = useSelector((state) => state.AdminAuth);
    const { profile, loader } = adminAuthReducer;

    const [formData, setFormData] = useState(initialState);
    const [imageShow, setImageShow] = useState(profile?.logo);
    const [phoneError, setPhoneError] = useState("");


    const GetProfileDetail = async () => {
        await dispatch(reqtoAdminCompanyDetail());
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        console.log(files, 'files');

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));

        if (files) {
            setImageShow(URL.createObjectURL(files[0]));
        }   
    }

    const handlePhoneChange = (value, country) => {
        // if (!value) {
        //     setPhoneError("Phone number is required");
        //     setFormData((prev) => ({ ...prev, mobileNumber: "" }));
        //     return;
        // }

        // const parsed = parsePhoneNumberFromString("+" + value);

        // if (parsed && parsed.isValid()) {
        //     // store formatted international number like +1 416-555-1234
        //     const formatted = parsed.formatInternational();

        //     setFormData((prev) => ({
        //         ...prev,
        //         mobileNumber: formatted,
        //     }));

        //     setPhoneError(""); // ✅ clear error
        // } else {
        //     setPhoneError("Invalid phone number");
        //     setFormData((prev) => ({
        //         ...prev,
        //         mobileNumber: "+" + value, // still keep raw with +
        //     }));
        // }


        const dialCode = country?.dialCode || "";
        const fullNumber = "+" + dialCode + (value ? value.replace(dialCode, "") : "");

        if (!value || value === dialCode) {
            setFormData(prev => ({
                ...prev,
                mobileNumber: "+" + dialCode,
            }));
            setPhoneError("");
            return;
        }

        const parsed = parsePhoneNumberFromString(fullNumber);

        if (parsed && parsed.isValid()) {
            const formatted = parsed.formatInternational();
            setFormData(prev => ({
                ...prev,
                mobileNumber: formatted,
            }));
            setPhoneError("");
        } else {
            setFormData(prev => ({
                ...prev,
                mobileNumber: fullNumber,
            }));
            setPhoneError("Invalid phone number");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!formData.mobileNumber) {
            setPhoneError("Phone number is required");
            return;
        }

        const parsed = parsePhoneNumberFromString(formData.mobileNumber);
        if (!parsed || !parsed.isValid()) {
            setPhoneError("Invalid phone number");
            return;
        }

        const { email, ...formDatas } = formData;
        const res = await dispatch(reqtoAdminCompanyEdit(formDatas));

        if (res.payload?.status) {
            GetProfileDetail();
            setPhoneError("");

        }
    }


    useEffect(() => {
        GetProfileDetail();
    }, []);


    useEffect(() => {
        setFormData({
            name: profile?.name,
            companyName: profile?.companyName,
            mobileNumber: profile?.mobileNumber,
            email: profile?.email,
            logo: profile?.logo,
        });

        setImageShow(profile?.logo);
    }, [profile]);

    return (
        <>
            <section className="categorylist-section profile mt-3 mt-lg-3 mt-xl-4">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            {/* <div className="card-header">
                            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                <h3 className="mb-0 mt-2 page-title">
                                    Profile
                                </h3>
                            </div>
                        </div> */}

                            <div className="card-body table-responsive">
                                <div className="edit-user profile-user">
                                    <div className="row">
                                        <div className="d-flex align-items-center justify-content-between gap-3">
                                            <h2 className="mb-0 title">
                                                {/* Profile */}
                                            </h2>
                                        </div>

                                        <form className="row" onSubmit={handleUpdate}>
                                            <div className="col-xl-2">
                                                <div className="col-12 mb-3">
                                                    <label htmlFor="image" className="form-label">
                                                        {/* Logo : */}
                                                    </label>

                                                    {imageShow && (
                                                        <div className="my-2">
                                                            <img
                                                                src={(imageShow) || '/Images/user.jpg'}
                                                                alt="Image"
                                                                loading='lazy'
                                                                className="img-thumbnail img-fluid"
                                                                style={{
                                                                    maxWidth: "90%", maxHeight: "100%", marginBottom: "10px",
                                                                }}
                                                            />
                                                        </div>
                                                    )}

                                                    <input
                                                        type="file"
                                                        name="image"
                                                        id="image profileImageInput"
                                                        className="form-control d-block d-lg-none"
                                                        onChange={handleChange}
                                                        accept='image/*'
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-xl-10">
                                                <div className="row">

                                                    <div className="col-lg-6 col-12 mb-4 mt-1">
                                                        <label htmlFor="name" className="form-label">
                                                            Name :
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            id="name"
                                                            className="form-control"
                                                            autoComplete='off'
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 col-12 mb-4 mt-1">
                                                        <label htmlFor="email" className="form-label">
                                                            Email :
                                                        </label>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            id="email"
                                                            className="form-control"
                                                            autoComplete='off'
                                                            value={formData.email}
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 col-12 mb-4 mt-1">
                                                        <label htmlFor="companyName" className="form-label">
                                                            Company Name :
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="companyName"
                                                            id="companyName"
                                                            className="form-control"
                                                            autoComplete='off'
                                                            value={formData.companyName}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 col-12 mb-4 mt-1">
                                                        <label htmlFor="mobileNumber" className="form-label">
                                                            Phone Number :
                                                        </label>
                                                        {/* <input
                                                            type="text"
                                                            pattern='\d*'
                                                            maxLength={12}
                                                            name="mobileNumber"
                                                            id="mobileNumber"
                                                            className="form-control"
                                                            autoComplete='off'
                                                            value={formData.mobileNumber}
                                                            onChange={handleChange}
                                                            onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                                            required
                                                        /> */}

                                                        <PhoneInput
                                                            country={'ca'}
                                                            // disableCountryGuess={true}
                                                            value={formData.mobileNumber ? formData.mobileNumber.replace(/\D/g, "") : ""}
                                                            onChange={handlePhoneChange}
                                                            placeholder="Enter Your Phone Number"
                                                            id="mobileNumber"
                                                            name="mobileNumber"
                                                            inputClass="form-control"
                                                            specialLabel=""
                                                            enableSearch
                                                            inputProps={{
                                                                required: true,
                                                            }}
                                                            countryCodeEditable={false}
                                                            excludeCountries={['do', 'pr', 'us']}
                                                        />

                                                        {phoneError && <small className="text-danger">{phoneError}</small>}
                                                    </div>
                                                    <div className="col-lg-12 col-12 mb-4 mt-1 d-none d-lg-block">
                                                        <label htmlFor="logo" className="form-label">
                                                            Change Logo :
                                                        </label>
                                                        <input
                                                            type="file"
                                                            name="logo"
                                                            id="logo"
                                                            className="form-control"
                                                            onChange={handleChange}
                                                            accept='image/*'
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-12 mt-4 d-flex justify-content-end gap-4'>
                                                <button
                                                    type="submit"
                                                    className={`submit-btn ${loader ? 'btn-loading' : ''}`}
                                                    disabled={loader}
                                                >
                                                    {loader ? loaders.small : 'Update'}
                                                </button>
                                                <button type="button" className="close-btn me-0" onClick={() => navigate(-1)}>
                                                    Back
                                                </button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        </>
    )
}

export default Profile;