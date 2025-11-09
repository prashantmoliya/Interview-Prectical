import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { reqtoSuperAdminEditCompany, reqtoSuperAdminReplyContact } from '../../../../../redux-Toolkit/services/superadmin/SuperAdminServices';
import { loaders } from '../../../../loader/Loader';

const initialState = {
    reply: "",
}

const ReplyContact = ({ show, handleClose, GetContactList, contact }) => {

    const dispatch = useDispatch();

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { loader, contactLoader } = superAdminReducer;

    const [formData, setFormData] = useState(initialState);

    const handleCloseHide = () => {
        handleClose();
        setFormData(initialState);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await dispatch(reqtoSuperAdminReplyContact({ id: contact.id, data: formData }));

        if (res.payload?.status) {
            GetContactList();
            handleCloseHide();
        }
    }

    return (
        <Modal className='form' show={show} backdrop="static" centered >
            <div className="modal-header">
                <h5 className="modal-title mb-5" id="deleteModalLabel">
                    Reply
                </h5>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="form-label">Name :</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control readonly"
                            autoComplete='off'
                            value={contact?.name}
                            readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">Email :</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control readonly"
                            autoComplete='off'
                            value={contact?.email}
                            readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="reply" className="form-label">Message :</label>
                        <textarea
                            type="text"
                            id="reply"
                            name="reply"
                            className="form-control"
                            placeholder="Enter Your Message"
                            autoComplete='off'
                            value={formData.reply}
                            onChange={handleChange}
                            rows={5}
                            required
                        />
                    </div>

                    <div className=" d-flex justify-content-between">
                        <button
                            type="submit"
                            className="close-btn"
                            disabled={contactLoader}
                        >
                            {contactLoader ? loaders.small : 'Reply'}
                        </button>
                        <button
                            type="button"
                            className={`delete-btn`}
                            onClick={handleCloseHide}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default ReplyContact;