import React, { useMemo } from 'react'
import { Modal } from 'react-bootstrap'
import ShareForm from '../../../assets/images/share-form.png'
import GoogleDocs from '../../../assets/images/google-docs.png'
import { loaders } from '../../loader/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { reqtoAdminShareDocFormUser, reqtoAdminShareFormUser } from '../../../redux-Toolkit/services/admin/AdminServices';

const FormShare = ({ show, handleClose, handleViewUserGetForm, forms, email }) => {

    const adminReducer = useSelector((state) => state.Admin);
    const { usersFormShareLoader } = adminReducer;

    const dispatch = useDispatch();

    const isForm = useMemo(() => {
        return forms?.formStatus === "Pending"
    }, [forms])

    const generateUniqueId = (length = 10) => {
        return Math.random().toString(36).substring(2, 2 + length);
    };


    const handleShare = async (e) => {
        e.preventDefault();

        const formUniqueId = generateUniqueId(10);

        const updatedFormLink = forms?.formLink?.replace(/[^/]+$/, formUniqueId);

        console.log(updatedFormLink);

        if (isForm) {
            const payload = {
                category: forms?.category,
                formLink: updatedFormLink,
                formUniqueId: formUniqueId,
            }
            console.log(payload);

            const res = await dispatch(reqtoAdminShareFormUser({ id: forms?.userId, data: payload }));

            if (res.payload?.status) {
                handleClose();
                handleViewUserGetForm(forms?.userId);
            }
        } else {
            const payloadIds = {
                userId: forms?.userId,
                userFormId: forms?.id,
            }

            const payload = {
                formLink: updatedFormLink,
                formUniqueId: formUniqueId,
            }
            console.log(payload);

            const res = await dispatch(reqtoAdminShareDocFormUser({ id: payloadIds, data: payload }));

            if (res.payload?.status) {
                handleClose();
                handleViewUserGetForm(forms?.userId);
            }
        }
    }

    return (
        <Modal className='form view form' show={show} backdrop="static" centered >
            <div className="modal-header justify-content-center align-items-center flex-column">
                <div>
                    <img src={isForm ? ShareForm : GoogleDocs} alt="" className='img-fluid' />
                </div>

                <h5 className="modal-title mt-3 mb-3" id="deleteModalLabel">
                    {isForm ? "Share Form" : "Document Request"}
                </h5>
            </div>

            <div className="modal-body">
                <div className='row gx-5'>
                    <div className='share-info col-12'>
                        {/* <p>You can share this {isForm ? "Form" : "Document"} on this email</p> */}
                        {/* <span>{email}</span> */}

                        <p style={{ textTransform: "none" }}>Do you want to confirm sharing the {isForm ? "Form" : "Document"} to this email: <span>{email}</span>?</p>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button
                            type="button"
                            className="close-btn"
                            disabled={usersFormShareLoader}
                            onClick={handleShare}
                        >
                            {usersFormShareLoader ? loaders.small : 'Share'}
                        </button>
                        <button
                            type="button"
                            className={`delete-btn`}
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default FormShare
