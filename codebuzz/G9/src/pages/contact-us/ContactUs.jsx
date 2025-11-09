import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Css
import "./ContactUs.scss"
import { reqtoAddContact } from '../../redux-Toolkit/services/ContactServices';
import { loaders } from '../../components/loader/Loader';
import { toast } from 'react-toastify';

const initialState = {
    name: "",
    email_mobileNo: "",
    message: "",
}

const ContactUs = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userToken } = useSelector((state) => state.UserAuth);
    const { loader } = useSelector((state) => state.Contact);

    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "email_mobileNo") {
            // If it's all digits, limit to 10
            if (/^\d*$/.test(value)) {
                if (value.length > 10) return; // Block extra digits
            }
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "email_mobileNo") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const mobileRegex = /^[0-9]{10}$/;

            if (!emailRegex.test(value) || !mobileRegex.test(value)) {
                setError((prev) => ({ ...prev, email_mobileNo: null }));
            }
        } else if (value?.trim()) {
            setError((prev) => ({ ...prev, [name]: null }));
        }
    }

    // const validateEmailOrMobile = (identifier) => {
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     const mobileRegex = /^[0-9]{10}$/;

    //     if (identifier.includes("@")) {
    //         return { type: "email", valid: emailRegex.test(identifier) };
    //     }
    //     else if (mobileRegex.test(identifier)) {
    //         return { type: "mobile", valid: true };
    //     }
    //     return { type: null, valid: false };
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (FormValidation()) {
            if (!userToken) {
                toast.warn("Please login before submitting Contact.");
                navigate("/");
                return;
            }

            const res = await dispatch(reqtoAddContact(formData));

            if (res.payload?.status) {
                setFormData(initialState);
                setError("");
            }
        }
    }

    const FormValidation = () => {
        const errors = {};

        if (!formData.name) {
            errors.name = 'Name is required';
        }
        if (!formData.email_mobileNo) {
            errors.email_mobileNo = 'Email or Mobile Number is required';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const mobileRegex = /^[0-9]{10}$/;

            if (!emailRegex.test(formData.email_mobileNo) && !mobileRegex.test(formData.email_mobileNo)) {
                errors.email_mobileNo = 'Please enter a valid Email or 10 digit Mobile Number';
            }
        }
        if (!formData.message) {
            errors.message = 'Message is required';
        }

        setError(errors);
        return Object.keys(errors).length == 0;
    }

    return (
        <>

            {/* ------ Contact-Us Start ------ */}
            <div className="contact_us pd-x">
                <div className="row align-items-center justify-content-lg-between">
                    <div className="col-lg-6 col-xl-5">
                        <div className="contact_content">
                            <h6 className='mb-0'>Contact Us</h6>

                            <h4>Get In Touch With Us</h4>

                            <p className='my-0'>
                                Call, Email or complete the form for connect with our friendly team and also you can place the customize order.
                            </p>

                            <div className="lines mx-0"></div>

                            <h6 className='mb-0'>Customer Delight</h6>

                            <p className='mb-0'>
                                Call us at <Link to="tel:+917285858542">+91 7285 858 542</Link> (9 AM-10 PM, 7 Days a Week)
                            </p>
                            <p>or</p>
                            <p>Write to us at <Link to="mailto:g9jewellerys@gmail.com">g9jewellerys@gmail.com</Link></p>


                            <h6 className='mb-0'>Corporate Sales</h6>

                            <p>For all corporate sales related queries please write to us at <Link to="mailto:corporate.sales@g9jewellery">corporate.sales@g9jewellery</Link></p>
                            <p className='mb-0'>For bulk enquiries or sales associations please contact <Link to="mailto:sales@g9jewellery.com">sales@g9jewellery.com</Link></p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className='contact_form'>
                            <form className='row m-0' onSubmit={handleSubmit}>
                                <div className="col-lg-12 mb-4 px-0">
                                    <label htmlFor="name" className='form-label'>Name *</label>
                                    <div>
                                        <input
                                            type="text"
                                            name='name'
                                            placeholder=''
                                            className='form-control'
                                            value={formData?.name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {error.name && <div className='mt-2 error_message'>{error.name}</div>}
                                </div>
                                <div className="col-lg-12 mb-4 px-0">
                                    <label htmlFor="email_mobileNo" className='form-label'>Email Address / Mobile Number *</label>
                                    <div>
                                        <input
                                            type="text"
                                            name='email_mobileNo'
                                            placeholder=''
                                            className='form-control'
                                            value={formData?.email_mobileNo}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {error.email_mobileNo && <div className='mt-2 error_message'>{error.email_mobileNo}</div>}
                                </div>
                                <div className="col-lg-12 px-0">
                                    <label htmlFor="message" className='form-label'>Message *</label>
                                    <div>
                                        <textarea
                                            name='message'
                                            placeholder=''
                                            className='form-control'
                                            rows={5}
                                            value={formData?.message}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {error.message && <div className='mt-2 error_message'>{error.message}</div>}
                                </div>

                                <button
                                    type='submit'
                                    className='main_btn contact_btn'
                                    disabled={loader}
                                >
                                    {
                                        loader ? loaders.btn : "SUBMIT"
                                    }
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* ------ Contact-Us End ------ */}

        </>
    )
}

export default ContactUs;