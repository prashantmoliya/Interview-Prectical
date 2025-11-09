import React, { useState } from 'react';
import { Modal } from 'react-bootstrap'
import User1 from '../../../../../assets/images/user1.png'
import CloseModal from '../../../../../assets/images/close_modal.png'
import { MdOutlineContentCopy } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { reqtoSuperAdminViewUser } from '../../../../../redux-Toolkit/services/superadmin/SuperAdminServices';
import { useDispatch, useSelector } from 'react-redux';
import { getNameInitials } from '../../../../../utils';
import { loaders } from '../../../../loader/Loader';
import { CreatedDate } from '../../../../../utils/DateTimeFormate';

const initialState = {
    name: '',
    email: '',
    phone: '',
    category: '',
}

const ViewUser = ({ show, handleClose, userId }) => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState(initialState);

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { usersDetail } = superAdminReducer;

    const handleViewUser = async (id) => {
        await dispatch(reqtoSuperAdminViewUser(id));
    }

    useEffect(() => {
        if (show && userId) {
            handleViewUser(userId);
        }
    }, [show, userId]);


    return (
        <Modal className='form view' show={show} backdrop="static" centered >
            <div className="modal-header align-items-start">
                <h5 className="modal-title mb-5" id="deleteModalLabel">
                    View Client
                </h5>

                <button type="button" className="btn-close" onClick={handleClose} >
                    {/* <img src={CloseModal} alt="" /> */}
                </button>

            </div>
            <div className="modal-body">
                <form className='row gx-5 flex-row gap-0'>
                    <div className="col-8 mb-4">
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

                        <div className="d-flex align-items-center">
                            <div className="me-3 name-initials form">
                                {/* <img
                                    src={User1}
                                    alt="Image"
                                    // className={`${row.image === null && 'rounded-circle'}`}
                                    style={{
                                        maxWidth: "80px",
                                        maxHeight: "80px",
                                    }}
                                /> */}
                                <span>{usersDetail?.name ? getNameInitials(usersDetail?.name) : ""}</span>
                            </div>
                            <div>
                                <div className='username mb-1'>
                                    {usersDetail?.name}
                                </div>
                                <div className={`status form ${usersDetail?.status === "Completed" ? "completed" : usersDetail?.status === "Pending" ? "pending" : "rejected"}`}>
                                    Pending form travel visa
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-4 mb-4 d-flex justify-content-end align-items-center">
                        <div className={`status ${usersDetail?.status === "Completed" ? "completed" : usersDetail?.status === "Pending" ? "pending" : "rejected"}`}>
                            {usersDetail?.status}
                        </div>
                    </div>

                    <div className="col-12 mb-4">
                        <label htmlFor="email" className="form-label">Email Adress :</label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            autoComplete='off'
                            value={usersDetail?.email}
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
                            value={usersDetail?.mobileNumber}
                            readOnly
                        />
                    </div>

                    <div className="col-6 mb-4">
                        <label htmlFor="createdAt" className="form-label">Created Date :</label>
                        <input
                            type="text"
                            id="createdAt"
                            name="createdAt"
                            className="form-control"
                            autoComplete='off'
                            value={usersDetail?.createdAt ? CreatedDate(usersDetail?.createdAt) : "-"}
                            readOnly
                        />
                    </div>

                    <div className="col-12 mb-4">
                        <label htmlFor="category" className="form-label">Category :</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            className="form-control"
                            autoComplete='off'
                            value={usersDetail?.category}
                            readOnly
                        />
                    </div>

                    {/* <div className="col-12 mb-4">
                        <label htmlFor="drivelink" className="form-label">Drive Link :</label>

                        <div className="input-group">
                            <div
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    color: '#000',
                                    wordBreak: 'break-word',
                                    whiteSpace: 'pre-wrap',
                                    paddingRight: '13px',
                                    flex: 1,
                                }}
                            >
                                {usersDetail?.driveLink ? usersDetail?.driveLink : "No Drive Link Available"}
                            </div>

                            {
                                usersDetail?.driveLink &&
                                <button
                                    type="button"
                                    className="btn btn-sm btn-neutral text-nowrap eye-icon"
                                    onClick={() => {
                                        navigator?.clipboard?.writeText(`${usersDetail?.driveLink}`)
                                            .then((res) => {
                                                toast.info("Copied!", {
                                                    position: "bottom-center",
                                                    icon: false,
                                                    autoClose: 1500
                                                });
                                            })
                                            .catch((err) => {
                                                throw err
                                            })
                                    }}
                                >
                                    <MdOutlineContentCopy size={24} />
                                </button>
                            }

                        </div>
                    </div> */}


                    <div className="d-flex justify-content-between mt-2">
                        <button
                            type="button"
                            className="close-btn"
                        // disabled={loader}
                        >
                            View Source
                        </button>
                        <button
                            type="button"
                            className={`delete-btn`}
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div >
        </Modal >
    )
}

export default ViewUser;



