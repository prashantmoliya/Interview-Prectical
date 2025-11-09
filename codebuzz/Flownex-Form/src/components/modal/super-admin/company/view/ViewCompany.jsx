import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { reqtoSuperAdminViewCompany } from '../../../../../redux-Toolkit/services/superadmin/SuperAdminServices';
import { getNameInitials } from '../../../../../utils';

const initialState = {
    name: "",
    email: "",
    mobile: "",
    image: ""
}

const ViewCompany = ({ show, handleClose, companyId }) => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState(initialState);

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { companyDetail } = superAdminReducer;

    const handleViewCompany = async (id) => {
        await dispatch(reqtoSuperAdminViewCompany(id));
    }

    useEffect(() => {
        if (show && companyId) {
            handleViewCompany(companyId);
        }
    }, [show, companyId]);

    return (
        <Modal className='form view' show={show} backdrop="static" centered >
            <div className="modal-header align-items-start">
                <h5 className="modal-title mb-5" id="deleteModalLabel">
                    {/* View Client */}
                    View Partner
                </h5>

                <button type="button" className="btn-close" onClick={handleClose} >
                    {/* <img src={CloseModal} alt="" /> */}
                </button>

            </div>
            <div className="modal-body">
                <form className='row gx-5 flex-row gap-0'>
                    <div className="col-12 mb-4">
                        {/* <label htmlFor="name" className="form-label">Name :</label> */}
                        {/* <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter Your Name"
                                    autoComplete='off'
                                    readOnly
                                /> */}

                        <div className="d-flex align-items-center justify-content-between">
                            <div className="me-3 ">
                                <img
                                    src={companyDetail?.logo}
                                    alt="Image"
                                    // className={`${row.image === null && 'rounded-circle'}`}
                                    style={{
                                        maxWidth: "80px",
                                        maxHeight: "80px",
                                    }}
                                />
                                {/* <span>{companyDetail?.name ? getNameInitials(companyDetail?.name) : ""}</span> */}
                            </div>

                            <div className={`status ${companyDetail?.status === "Active" ? "completed s" : "rejected"}`}>
                                {companyDetail?.status === "Active" ? "Active" : "Inactive"}
                            </div>
                            {/* <div className='username'>
                                {companyDetail?.name}
                            </div> */}
                        </div>
                    </div>

                    <div className="col-12 mb-4">
                        <label htmlFor="createddate" className="form-label">Company Name :</label>

                        <input
                            type="text"
                            id="createddate"
                            name="createddate"
                            className="form-control"
                            autoComplete='off'
                            value={companyDetail?.companyName}
                            readOnly
                        />
                    </div>

                    <div className="col-6 mb-4">
                        <label htmlFor="category" className="form-label">Name :</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            className="form-control"
                            autoComplete='off'
                            value={companyDetail?.name}
                            readOnly
                        />
                    </div>

                    <div className="col-6 mb-4">
                        <label htmlFor="phone" className="form-label">Mobile Number :</label>

                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            className="form-control"
                            autoComplete='off'
                            value={companyDetail?.mobileNumber}
                            readOnly
                        />
                    </div>

                    <div className="col-12 mb-4">
                        <label htmlFor="email" className="form-label">Email Adress :</label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            autoComplete='off'
                            value={companyDetail?.email}
                            readOnly
                        />
                    </div>

                    <div className="col-12 mb-4">
                        <label htmlFor="phone" className="form-label">Type :</label>

                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            className="form-control"
                            autoComplete='off'
                            value={companyDetail?.premium}
                            readOnly
                        />
                    </div>

                    <div className="col-12 d-none">
                        <label htmlFor="email" className="form-label">Email Adress :</label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            autoComplete='off'
                            readOnly
                        />
                    </div>
                </form>
            </div >
        </Modal >
    )
}

export default ViewCompany;


