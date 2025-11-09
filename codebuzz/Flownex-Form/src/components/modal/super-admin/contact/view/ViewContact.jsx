import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { reqtoSuperAdminViewCompany, reqtoSuperAdminViewContact } from '../../../../../redux-Toolkit/services/superadmin/SuperAdminServices';
import { getNameInitials } from '../../../../../utils';

const ViewContact = ({ show, handleClose, contactId }) => {

    const dispatch = useDispatch();

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { contactDetail } = superAdminReducer;

    const handleViewContact = async (id) => {
        await dispatch(reqtoSuperAdminViewContact(id));
    }

    useEffect(() => {
        if (show && contactId) {
            handleViewContact(contactId);
        }
    }, [show, contactId]);

    return (
        <Modal className='form view' show={show} backdrop="static" centered >
            <div className="modal-header align-items-start">
                <h5 className="modal-title mb-5" id="deleteModalLabel">
                    View Help & Support
                </h5>

                <button type="button" className="btn-close" onClick={handleClose} >
                    {/* <img src={CloseModal} alt="" /> */}
                </button>

            </div>
            <div className="modal-body">
                <form className='row gx-5 flex-row gap-0'>
                    {/* <div className="col-12 mb-4">
                        <div className="d-flex align-items-center">
                            <div className="me-3 name-initials">
                                <img
                                    src={contactDetail?.logo}
                                    alt="Image"
                                    style={{
                                        maxWidth: "80px",
                                        maxHeight: "80px",
                                    }}
                                />
                            </div>
                        </div>
                    </div> */}

                    <div className="col-12 mb-4">
                        <label htmlFor="createddate" className="form-label">Status :</label>

                          <div className={`status ${contactDetail?.status === "Completed" ? "completed" : "pending"}`}>
                                {contactDetail?.status}
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
                            value={contactDetail?.companyName}
                            readOnly
                        />
                    </div>

                    <div className="col-6 mb-4">
                        <label htmlFor="name" className="form-label">Name :</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            autoComplete='off'
                            value={contactDetail?.name}
                            readOnly
                        />
                    </div>

                    <div className="col-6 mb-4">
                        <label htmlFor="mobileNo" className="form-label">Mobile Number :</label>

                        <input
                            type="text"
                            id="mobileNo"
                            name="mobileNo"
                            className="form-control"
                            autoComplete='off'
                            value={contactDetail?.mobileNo}
                            readOnly
                        />
                    </div>

                    <div className="col-12  mb-4">
                        <label htmlFor="email" className="form-label">Email Adress :</label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            autoComplete='off'
                            value={contactDetail?.email}
                            readOnly
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="message" className="form-label">Message :</label>

                        <input
                            type="text"
                            id="message"
                            name="message"
                            className="form-control"
                            autoComplete='off'
                            value={contactDetail?.message}
                            readOnly
                        />
                    </div>

                    <div className="col-12 d-none">
                        <label htmlFor="email" className="form-label">Message :</label>

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

export default ViewContact;

