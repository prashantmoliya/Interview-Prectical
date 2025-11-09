import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loaders } from '../../components/loader/Loader';

// Css
import "./ComplaintQuery.scss"

// Image
// Light
import DocumentCloseLight from "../../assets/images/complaint-query/document-close-light.svg";
// Dark
import DocumentCloseDark from "../../assets/images/complaint-query/document-close-dark.svg";

import useThemeMode from '../../hooks/useThemeMode';
import { reqtoAddComplaint } from '../../redux-Toolkit/services/ComplaintServices';
import { toast } from 'react-toastify';
import Select from "react-select";
import { SelectDropdownIndicator } from '../../components/react-select/ReactSelect';

const initialState = {
    name: "",
    email_mobileNo: "",
    service: "",
    serviceType: "",
    complaintImage: [],
    complaintVideo: [],
    message: "",
}

const ComplaintQuery = () => {

    const ThemeMode = useThemeMode();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userToken } = useSelector((state) => state.UserAuth);
    const { loader } = useSelector((state) => state.Complaint);

    const [formData, setFormData] = useState(initialState);
    console.log(formData, formData?.complaintImage?.length);
    const [error, setError] = useState({});

    // Select-Data
    const typeOptions = [
        { label: "Complaint", value: "Complaint" },
        { label: "Query", value: "Query" }
    ];

    const subTypeOptions = [
        { label: "Pricing", value: "Pricing" },
        { label: "Service", value: "Service" },
        { label: "Query", value: "Query" }
    ];

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "email_mobileNo") {
            // If it's all digits, limit to 10
            if (/^\d*$/.test(value)) {
                if (value.length > 10) return; // Block extra digits
            }
        }
        if (name === "complaintImage") {
            const selectedFiles = Array.from(files);
            console.log(selectedFiles);

            const validFiles = [];

            for (let file of selectedFiles) {
                if (file.size <= 5 * 1024 * 1024) { // 5MB
                    validFiles.push(file);
                } else {
                    toast.error(`File size exceeds 5MB limit`);
                }
            }

            setFormData((prev) => ({
                ...prev,
                complaintImage: [...prev.complaintImage, ...validFiles].slice(0, 5),
            }));

            if ([...formData.complaintImage, ...validFiles]?.length > 0) {
                setError((prev) => ({ ...prev, complaintImage: null }));
            }
        } else if (name === "complaintVideo") {
            const selectedFiles = Array.from(files);
            console.log(selectedFiles);

            const validFiles = [];

            for (let file of selectedFiles) {
                console.log(file);

                if (file.size <= 10 * 1024 * 1024) { // 10MB
                    validFiles.push(file);
                } else {
                    toast.error(`File size exceeds 10MB limit`);
                }
            }

            setFormData((prev) => ({
                ...prev,
                complaintVideo: [...prev.complaintVideo, ...validFiles].slice(0, 2),
            }));

            if ([...formData.complaintVideo, ...validFiles]?.length > 0) {
                setError((prev) => ({ ...prev, complaintVideo: null }));
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: files ? files[0] : value,
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
    }

    const handleRemoveImage = (index) => {
        setFormData((prev) => ({
            ...prev,
            complaintImage: prev.complaintImage.filter((_, i) => i !== index)
        }));
    }

    const handleRemoveVideo = (index) => {
        setFormData((prev) => ({
            ...prev,
            complaintVideo: prev.complaintVideo.filter((_, i) => i !== index)
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (FormValidation()) {
            if (!userToken) {
                toast.warn("Please login before submitting Complaint & Query.");
                navigate("/");
                return;
            }

            const formDatas = new FormData();
            formDatas.append("name", formData.name);
            formDatas.append("email_mobileNo", formData.email_mobileNo);
            formDatas.append("service", formData.service);
            formDatas.append("serviceType", formData.serviceType);
            formData?.complaintImage?.forEach((img) => {
                formDatas.append("complaintImage", img);
            });
            formData?.complaintVideo?.forEach((vid) => {
                formDatas.append("complaintVideo", vid);
            })
            formDatas.append("message", formData.message);

            const res = await dispatch(reqtoAddComplaint(formDatas));

            if (res.payload?.status) {
                setFormData(initialState);
                setError({});
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
        if (!formData.service) {
            errors.service = 'Type is required';
        }
        if (!formData.serviceType) {
            errors.serviceType = 'Sub Type is required';
        }
        if (!formData.complaintImage || formData.complaintImage.length === 0) {
            errors.complaintImage = 'Please select at least one Image';
        }
        if (!formData.complaintVideo || formData.complaintVideo.length === 0) {
            errors.complaintVideo = 'Please select at least one Video';
        }

        setError(errors);
        return Object.keys(errors).length == 0;
    }

    return (
        <>

            {/* ------ Complaint & Query Start ------ */}
            <div className="complaint_query pd-x">
                <div className="top">
                    <h4>Complaint & Query</h4>

                    <p>We’re here to resolve your complaints and answer all your queries, anytime.</p>
                </div>

                <div className='complaint_query_form'>
                    <form className='row m-0' onSubmit={handleSubmit}>
                        <div className="col-lg-6 mb-4">
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
                        <div className="col-lg-6 mb-4">
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
                        <div className="col-lg-6 mb-4">
                            <label htmlFor="service" className='form-label'>Type *</label>
                            <div>
                                <Select
                                    name="service"
                                    options={typeOptions}
                                    value={formData.service ? typeOptions.find((i) => i.value === formData.service) : null}
                                    onChange={(e) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            service: e ? e.value : '',
                                        }))

                                        if (e?.value) setError((prev) => ({ ...prev, service: null }));
                                    }}
                                    placeholder="Select Type"
                                    classNamePrefix="form-select"
                                    isSearchable={false}
                                    components={{ DropdownIndicator: SelectDropdownIndicator }}
                                />
                            </div>

                            {error.service && <div className='mt-2 error_message'>{error.service}</div>}
                        </div>
                        <div className="col-lg-6 mb-4">
                            <label htmlFor="serviceType" className='form-label'>Sub Type *</label>
                            <div>
                                <Select
                                    name="serviceType"
                                    options={subTypeOptions}
                                    value={formData.serviceType ? subTypeOptions.find((i) => i.value === formData.serviceType) : null}
                                    onChange={(e) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            serviceType: e ? e.value : '',
                                        }))

                                        if (e?.value) setError((prev) => ({ ...prev, serviceType: null }));
                                    }}
                                    placeholder="Select Sub Type"
                                    classNamePrefix="form-select"
                                    isSearchable={false}
                                    components={{ DropdownIndicator: SelectDropdownIndicator }}
                                />
                            </div>

                            {error.serviceType && <div className='mt-2 error_message'>{error.serviceType}</div>}
                        </div>
                        <div className="col-lg-6 mb-4">
                            <label htmlFor="complaintImage" className='form-label'>Images *</label>
                            <div>
                                <input
                                    type="file"
                                    id="complaintImage"
                                    name="complaintImage"
                                    accept="image/*"
                                    multiple
                                    className="d-none"
                                    onChange={handleChange}
                                />

                                <button
                                    type='button'
                                    className='main_btn media_btn'
                                    onClick={() => document.getElementById("complaintImage").click()}
                                    disabled={formData?.complaintImage?.length === 5}
                                >
                                    SELECT IMAGE
                                </button>

                                {
                                    formData?.complaintImage?.length > 0 && (

                                        <div className="document_view mt-4">

                                            {formData?.complaintImage?.map((img, index) => (
                                                <div className="document" key={index}>
                                                    <div className="image">
                                                        <img src={URL.createObjectURL(img)} alt="Image" className='img-fluid' draggable={false} />
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="close_btn"
                                                        onClick={() => handleRemoveImage(index)}
                                                    >
                                                        <img src={ThemeMode ? DocumentCloseLight : DocumentCloseDark} alt="Close" className='img-fluid' draggable={false} />
                                                    </button>
                                                </div>
                                            ))}

                                        </div>
                                    )
                                }

                            </div>

                            {error.complaintImage && <div className='mt-2 error_message'>{error.complaintImage}</div>}
                        </div>
                        <div className="col-lg-6 mb-4">
                            <label htmlFor="complaintVideo" className='form-label'>Videos *</label>
                            <div>
                                <input
                                    type="file"
                                    id="complaintVideo"
                                    name="complaintVideo"
                                    accept="video/*"
                                    multiple
                                    className="d-none"
                                    onChange={handleChange}
                                />

                                <button
                                    type='button'
                                    className='main_btn media_btn'
                                    onClick={() => document.getElementById("complaintVideo").click()}
                                    disabled={formData?.complaintVideo?.length === 2}
                                >
                                    SELECT VIDEO
                                </button>

                                {
                                    formData?.complaintVideo?.length > 0 && (

                                        <div className="document_view mt-4">

                                            {formData?.complaintVideo?.map((vid, index) => (
                                                <div className="document" key={index}>
                                                    <div className="video">
                                                        <video src={URL.createObjectURL(vid)} className='img-fluid' controls controlsList="nodownload" disablePictureInPicture />
                                                        {/* controlsList--> "noremoteplayback nofullscreen" */}
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="close_btn"
                                                        onClick={() => handleRemoveVideo(index)}
                                                    >
                                                        <img src={ThemeMode ? DocumentCloseLight : DocumentCloseDark} alt="Close" className='img-fluid' draggable={false} />
                                                    </button>
                                                </div>
                                            ))}

                                        </div>
                                    )
                                }
                            </div>

                            {error.complaintVideo && <div className='mt-2 error_message'>{error.complaintVideo}</div>}

                        </div>
                        <div className="col-lg-12 mb-4">
                            <label htmlFor="message" className='form-label'>Message</label>
                            <div>
                                <textarea
                                    type="text"
                                    name='message'
                                    placeholder=''
                                    className='form-control'
                                    rows={5}
                                    value={formData?.message}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button type='submit' className='main_btn complaint_btn' disabled={loader}>
                            {
                                loader ? loaders.btn : 'SUBMIT'
                            }
                        </button>
                    </form>
                </div>
            </div>
            {/* ------ Complaint & Query End ------ */}

        </>
    )
}

export default ComplaintQuery;
