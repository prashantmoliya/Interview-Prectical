import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCog } from 'react-icons/fa';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

import Logo from "../../../assets/images/logo.png";
import AdminLogo from "../../../assets/images/admin-logo.png";
import CloseImg from "../../../assets/images/close_img.png";
import LoginLogo from "../../../assets/images/login-logo.png";

import { loaders } from '../../../components/loader/Loader';
import { toast } from 'react-toastify';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { reqtoAdminComplateProfile } from '../../../redux-Toolkit/services/admin/AuthServices';
import { passwordHide } from '../../../redux-Toolkit/slices/admin/AuthSlice';

const initialState = {
    logo: "",
    // name: "",
    // phone: "",
}

const CreateProfile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const adminAuthReducer = useSelector((state) => state.AdminAuth);
    const { loader } = adminAuthReducer;
    // const token = localStorage.getItem('token')

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        const passwordCreated = localStorage.getItem("isPasswordCreated") === "true";
        if (!passwordCreated) {
            navigate("/admin/create-password", { replace: true });
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await dispatch(reqtoAdminComplateProfile(formData));
        // localStorage.setItem('admin-token', token)
        if (res.payload?.status) {
            // localStorage.removeItem('token')
            navigate("/admin/dashboard");
        }
    }

    useEffect(() => {
        window.history.pushState({ step: "create-profile" }, "");

        const handlePopState = () => {
            dispatch(passwordHide());
            navigate("/admin/login", { replace: true });
        };

        window.addEventListener("popstate", handlePopState);
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [navigate, dispatch]);

    return (
        <section className="login-section admin">
            <div className="row align-items-center justify-content-center min-vh-100">
                <div className='col-xxl-4 col-xl-5 col-lg-6 col-md-7 col-sm-8 px-0 bg-white shadow login-box admin-login'>
                    <div className="left-box">
                        <div className="header-text my-4">
                            <div className="mb-5">
                                <img src={AdminLogo} className="img-fluid login-logo" draggable="false" />
                            </div>

                            <h4 className="mb-2 mt-3">Complete Your Profile
                                <span>
                                    <FaUserCog style={{ marginLeft: "13px", marginBottom: "2px" }} />
                                </span>
                            </h4>
                            <p>Please enter your details</p>
                        </div>
                        <form onSubmit={handleSubmit}>

                            <div className="mb-4">
                                <label htmlFor="logo" className="form-label mb-0 w-100">Logo upload:

                                    <div className="input-group profile mt-2">
                                        {
                                            formData.logo ? (
                                                <div className="logo position-relative">
                                                    <img
                                                        src={URL?.createObjectURL(formData?.logo)}
                                                        alt="Image"
                                                        className="img-fluid logo-img"
                                                    />

                                                    <button
                                                        type='button'
                                                        className='close_btn bg-transparent border-0 position-absolute' style={{ top: "8px", right: "8px" }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();

                                                            setFormData((prev) => ({ ...prev, logo: "" }))
                                                        }
                                                        }
                                                    >
                                                        <img src={CloseImg} alt="Close" className='img-fluid' />
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <input
                                                        type="file"
                                                        id="logo"
                                                        name="logo"
                                                        className="form-control"
                                                        placeholder="Upload Logo Here"
                                                        autoComplete='off'
                                                        accept="image/*"
                                                        onChange={handleChange}
                                                        required
                                                    />

                                                    <span
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
                                                        <AiOutlineCloudUpload size={24} color='#040273' />
                                                    </span>
                                                </>
                                            )
                                        }


                                    </div>
                                </label>
                            </div>

                            {/* <div className="mb-4">
                                <label htmlFor="name" className="form-label">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter Your Name"
                                    autoComplete='off'
                                    value={formData?.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="phone" className="form-label">Phone Number:</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    className="form-control"
                                    placeholder="Enter Your Phone Number"
                                    autoComplete='off'
                                    value={formData?.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div> */}

                            <div className="mt-4">
                                <button
                                    className={`login-btn ${loader ? 'btn-loading' : ''}`}
                                    disabled={loader}
                                >
                                    {loader && loaders.small}
                                    {loader ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </section >
    )
}

export default CreateProfile;