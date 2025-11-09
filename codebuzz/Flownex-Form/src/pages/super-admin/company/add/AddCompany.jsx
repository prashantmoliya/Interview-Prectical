import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BackIcon from "../../../../assets/images/back.png";
import DefaultLogo from "../../../../assets/images/default-logo.png";

import { loaders } from '../../../../components/loader/Loader';

const initialState = {
    name: "",
    email: "",
    mobile: "",
    image: ""
}

const AddCompany = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        navigate("/superadmin/company");
        // try {
        //     const res = await Axios.post(apiendpoints.createDoctorService, formData, authorizationHeaders());

        //     if (res.data?.status) {
        //         toast.success(res.data?.message);
        //         setFormData(initialState);
        //     }
        //     else {
        //         toast.error(res.data?.message);
        //     }

        // } catch (err) {
        //     if (err.response?.status === 500) {
        //         toast.error(err.response.data.message);
        //     }
        // }
        // finally {
        //     setLoading(false);
        // }
    }

    return (
        <>

            <section className="categorylist-section my-4 my-lg-4 my-xl-5">
                <div className="edit-user">
                    <div className="row">
                        <div className="">
                            <h2 className="mb-0 title d-flex align-items-center">
                                <img
                                    src={BackIcon}
                                    alt="Back"
                                    className="cursor-pointer me-3"
                                    onClick={() => navigate(-1)}
                                />
                                Add Partner
                            </h2>
                        </div>

                        <form className="row g-5 mt-0" onSubmit={handleSubmit}>
                            <div className="col-lg-5">
                                <div className="col-lg-12 col-md-12 col-12 h-100">
                                    {/* <div className="image-container">
                                        <label htmlFor="name" className="form-label">
                                            Name :
                                        </label>
                                        <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            className="form-control d-none"
                                            placeholder="Enter Name"
                                            autoComplete='off'
                                            value={formData.image}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div> */}



                                    <div className="image-container text-center p-4 d-flex align-items-center justify-content-center cursor-pointer h-100">
                                        <label htmlFor="image" className="w-100 h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer">
                                            <div className='image'>
                                                {
                                                    formData.image ? (
                                                        <div className="mb-2 mt-2">
                                                            <img
                                                                src={URL.createObjectURL(formData?.image)}
                                                                alt="Image"
                                                                className="img-thumbnail img-fluid"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <img src={DefaultLogo} alt="Upload Icon" />
                                                            <p className="mb-0 mt-3">Logo upload Here</p>
                                                        </>
                                                    )
                                                }
                                            </div>


                                            <input
                                                type="file"
                                                name="image"
                                                id="image"
                                                className="form-control d-none"
                                                accept="image/*"
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-7">
                                <div className="col-lg-12 col-md-12 col-12 mb-2 mb-lg-4">
                                    <label htmlFor="name" className="form-label">
                                        Name :
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="form-control"
                                        placeholder="Enter Name"
                                        autoComplete='off'
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-lg-12 col-md-12 col-12 mb-2 mb-lg-4">
                                    <label htmlFor="email" className="form-label">
                                        Email :
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        autoComplete='off'
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-lg-12 col-md-12 col-12 mb-2 mb-lg-4">
                                    <label htmlFor="mobile" className="form-label">
                                        Mobile No :
                                    </label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        id="mobile"
                                        className="form-control"
                                        placeholder="Enter Mobile"
                                        autoComplete='off'
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-12">
                                    <button
                                        type="submit"
                                        className={`submit-btn ${loading ? 'btn-loading' : ''}`}
                                        disabled={loading}
                                    >
                                        {loading && loaders.small}
                                        {loading ?
                                            'Submitting...'
                                            :
                                            'Submit'
                                        }
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </section>

        </>
    )
}

export default AddCompany;