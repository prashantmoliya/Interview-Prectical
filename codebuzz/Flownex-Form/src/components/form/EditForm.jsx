import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import SourceBack from '../../assets/images/source-back.png';
import FormBack from '../../assets/images/form-back.png';

const EditForm = () => {

    const { userId, userFormId, category } = useParams();
    const { state = {} } = useLocation();
    console.log(state);
    
    const navigate = useNavigate();

    return (
        <>

            <section className="categorylist-section profile mt-3 mt-lg-3 mt-xl-4">
                <div className="row">
                    {/* <div className="col-lg-12"> */}
                    <div className="card pt-2 ps-0">
                        <div className="card-header pt-0 ps-2">
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                <h3 className="mb-0 page-title">
                                    <button type='button' className='bg-transparent border-0 me-4' onClick={() => navigate(-1)}>
                                        <img src={FormBack} alt="" />
                                    </button>

                                    {/* Work Visa Application */}
                                    {state?.category || ""}
                                </h3>
                            </div>
                        </div>

                        <div className="card-body table-responsive px-3">
                            <div className='form-menu mt-2 mb-5 group_btn d-flex align-items-center flex-wrap gap-4'>
                                <button
                                    type='button'
                                    // className={`country_btn ${activeCountry === 'north-america' ? 'active' : ''}`}
                                    className={`form_btn active`} 
                                >
                                    Personal Information
                                </button>
                                <button
                                    type='button'
                                    className={`form_btn`}
                                >
                                    Identity Documents
                                </button>
                                <button
                                    type='button'
                                    className={`form_btn`}
                                >
                                    Contact Information
                                </button>
                                <button
                                    type='button'
                                    className={`form_btn`}
                                >
                                    Study Details
                                </button>
                                <button
                                    type='button'
                                    className={`form_btn`}
                                >
                                    Financial Information
                                </button>
                                <button
                                    type='button'
                                    className={`form_btn`}
                                >
                                    Educational Background
                                </button>
                                <button
                                    type='button'
                                    className={`form_btn`}
                                >
                                    Employment History
                                </button>
                                <button
                                    type='button'
                                    className={`form_btn`}
                                >
                                    Family Information (IMM 5707)
                                </button>
                                <button
                                    type='button'
                                    className={`form_btn`}
                                >
                                    Background Questions
                                </button>
                                <button
                                    type='button'
                                    className={`form_btn`}
                                >
                                    Document Uploads (IMM 5483 Checklist)
                                </button>
                            </div>

                            <div className="edit-user profile-user forms">
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h2 className="title">
                                            Personal Information
                                        </h2>
                                    </div>

                                    <form className="row"
                                    // onSubmit={handleUpdate}
                                    >

                                        <div className="col-lg-6 col-12 mb-4 mt-1">
                                            <label htmlFor="name" className="form-label">
                                                UCI Number (optional)
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="form-control"
                                                autoComplete='off'
                                                placeholder='Enter UCI number if available'
                                                required
                                            />
                                        </div>
                                        <div className="col-lg-6 col-12 mb-4 mt-1">
                                            <label htmlFor="name" className="form-label">
                                                Service Language *
                                            </label>
                                            <select
                                                className={`form-control`}
                                                name="service_language"
                                                required
                                            >
                                                <option value="">Select language</option>
                                                <option value="english">English</option>
                                                <option value="french">French</option>
                                            </select>
                                        </div>
                                        <div className="col-lg-6 col-12 mb-4 mt-1">
                                            <label htmlFor="name" className="form-label">
                                                Family Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="form-control"
                                                autoComplete='off'
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-lg-6 col-12 mb-4 mt-1">
                                            <label htmlFor="name" className="form-label">
                                                Given Names *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="form-control"
                                                autoComplete='off'
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-lg-6 col-12 mb-4 mt-1">
                                            <label htmlFor="name" className="form-label">
                                                Nicknames/Aliases
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="form-control"
                                                autoComplete='off'
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-lg-6 col-12 mb-4 mt-1">
                                            <label htmlFor="name" className="form-label">
                                                Date of Birth *
                                            </label>
                                            <input
                                                type="date"
                                                name="name"
                                                id="name"
                                                className="form-control"
                                                autoComplete='off'
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-lg-6 col-12 mb-4 mt-1">
                                            <label htmlFor="name" className="form-label">
                                                Place of Birth *
                                            </label>
                                            <input
                                                type="date"
                                                name="name"
                                                id="name"
                                                className="form-control"
                                                autoComplete='off'
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-lg-6 col-12 mb-4 mt-1">
                                            <label htmlFor="name" className="form-label">
                                                Country of Birth *
                                            </label>
                                            <input
                                                type="date"
                                                name="name"
                                                id="name"
                                                className="form-control"
                                                autoComplete='off'
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-lg-6 col-12 mb-4 mt-1">
                                            <label htmlFor="name" className="form-label">
                                                Citizenship/Nationality *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="form-control"
                                                autoComplete='off'
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-lg-6 col-12 mb-4 mt-1">
                                            <label htmlFor="name" className="form-label">
                                                Current Country of Residence *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="form-control"
                                                autoComplete='off'
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-lg-6 col-12 mb-4 mt-1">
                                            <label htmlFor="name" className="form-label">
                                                Marital Status *
                                            </label>
                                            <select
                                                className={`form-control`}
                                                name="service_language"
                                                required
                                            >
                                                <option value="">Select language</option>
                                                <option value="english">English</option>
                                                <option value="french">French</option>
                                            </select>
                                        </div>
                                        {/* <div className="col-lg-6 col-12 mb-4 mt-1">
                                            <label htmlFor="mobileNumber" className="form-label">
                                                Phone Number :
                                            </label>
                                            <input
                                                type="text"
                                                pattern='\d*'
                                                maxLength={12}
                                                name="mobileNumber"
                                                id="mobileNumber"
                                                className="form-control"
                                                autoComplete='off'
                                                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                                required
                                            />
                                        </div> */}

                                        <div className='col-12 mt-4 d-flex justify-content-end gap-4'>
                                            <button
                                                type="submit"
                                                // className={`submit-btn ${loader ? 'btn-loading' : ''}`}
                                                className={`submit-btn w-100`}
                                            // disabled={loader}
                                            >
                                                {/* {loader ? loaders.small : 'Update'} */}
                                                Submit
                                            </button>
                                            {/* <button type="button" className="close-btn me-0" onClick={() => navigate(-1)}>
                                                Back
                                            </button> */}
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div >
            </section >

        </>
    )
}

export default EditForm
