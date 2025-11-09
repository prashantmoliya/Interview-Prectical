import React, { useState } from 'react';
import { Modal } from 'react-bootstrap'
import CloseModal from '../../../assets/images/close_modal.png'
import ShareCopy from '../../../assets/images/share_copy.png'
import ShareWp from '../../../assets/images/share_wp.png'
import ShareGmail from '../../../assets/images/share_gmail.png'
import ShareInsta from '../../../assets/images/share_insta.png'
import ShareFacebook from '../../../assets/images/share_facebook.png'
import { MdOutlineContentCopy } from 'react-icons/md';
import { toast } from 'react-toastify';
import { visaCatagory, visaForm } from '../../../constants/Data';
import { loaders } from '../../loader/Loader';
import { reqtoAdminShareFormUser } from '../../../redux-Toolkit/services/admin/AdminServices';
import { useDispatch, useSelector } from 'react-redux';

const initialState = {
    category: '',
    formLink: '',
    applicant: ''
}

const Share = ({ show, handleClose, users, GetUserList }) => {

    const adminReducer = useSelector((state) => state.Admin);
    const { usersFormShareLoader } = adminReducer;

    const dispatch = useDispatch();

    const [formData, setFormData] = useState(initialState);

    const handleCloseHide = () => {
        handleClose();
        setFormData(initialState);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        let updateData = {
            ...formData,
            [name]: value,
        }

        if (name === "category") {
            const selectedCategory = visaForm?.find(i => i.category === value);
            updateData.formLink = selectedCategory ? `${import.meta.env.VITE_APP_DOMAIN}/forms/${selectedCategory.key}` : '';
        }

        setFormData(updateData);
    };

    const handleCopy = () => {
        navigator?.clipboard?.writeText(`${users}`)
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
    }

    const generateUniqueId = (length = 10) => {
        return Math.random().toString(36).substring(2, 2 + length);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formUniqueId = generateUniqueId(10);

        const payload = {
            ...formData,
            formUniqueId: formUniqueId,
            formLink: `${formData.formLink}/${users.uniqueId}/${formUniqueId}`,
        }
        console.log(payload);

        const res = await dispatch(reqtoAdminShareFormUser({ id: users?.id, data: payload }));

        if (res.payload?.status) {
            handleCloseHide();
            GetUserList(users?.id);
        }
    }

    return (
        <Modal className='form view form' show={show} backdrop="static" centered >
            <div className="modal-header align-items-start">
                <h5 className="modal-title mb-5" id="deleteModalLabel">
                    Share Form
                </h5>

                <button type="button" className="btn-close" onClick={handleClose} >
                    {/* <img src={CloseModal} alt="" /> */}
                </button>

            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmit} className='row gx-5'>
                    <div className="col-12 mb-4">
                        <label htmlFor="name" className="form-label">Name :</label>

                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            autoComplete='off'
                            value={users?.name}
                            readOnly
                        />
                    </div>

                    <div className="col-12 mb-4">
                        <label htmlFor="email" className="form-label">Email :</label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            autoComplete='off'
                            value={users?.email}
                            readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="category" className="form-label">Form :</label>

                        <select
                            className="form-select form-control category"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Form</option>
                            {
                                visaForm?.map((i, index) => {
                                    return (
                                        <option value={i.category} key={index}>{i.category}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="applicant" className="form-label">Applicant Type :</label>

                        <select
                            className="form-select form-control category"
                            id="applicant"
                            name="applicant"
                            value={formData.applicant}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Applicant Type</option>
                            <option value="Primary Applicant">Primary Applicant</option>
                            <option value="Spouse Applicant">Spouse Applicant</option>
                            <option value="Dependent Applicant">Dependent Applicant</option>
                            <option value="Child">Child</option>
                            <option value="Family Sponsorship">Family Sponsorship</option>
                        </select>
                    </div>

                    {/* <div className="col-12 mb-0">
                        <label htmlFor="users" className="form-label">Drive Link :</label>

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

                                {
                                    users ? users : "No Drive Link Available"
                                }
                            </div>

                            {
                                users &&
                                <button
                                    type="button"
                                    className="btn btn-sm btn-neutral text-nowrap eye-icon"
                                    onClick={() => {
                                        // navigator?.clipboard?.writeText("https://drive.google.com/file/d/1zfjyOgPxoxFVqybpXMRZ--kM2UU6bMkM/view?usp=drive_link")
                                        //     .then((res) => {
                                        //         toast.info("Copied!", {
                                        //             position: "bottom-center",
                                        //             icon: false,
                                        //             autoClose: 1500
                                        //         });
                                        //     })
                                        //     .catch((err) => {
                                        //         throw err
                                        //     })
                                        handleCopy()
                                    }}
                                >
                                    <MdOutlineContentCopy size={24} />
                                </button>
                            }
                        </div>
                    </div>

                    <div className="mt-5 d-flex  gap-4">
                        <button
                            type="button"
                            className='bg-transparent border-0'
                            style={{ width: '50px', height: '50px', opacity: !users ? 0.5 : 1 }}
                            onClick={handleCopy}
                            disabled={!users}
                        >
                            <img src={ShareCopy} alt="" className='img-fluid' />
                        </button>
                        <button
                            type="button"
                            className='bg-transparent border-0'
                            style={{ width: '50px', height: '50px', opacity: !users ? 0.5 : 1 }}
                            onClick={handleWhatsUp}
                            disabled={!users}
                        >
                            <img src={ShareWp} alt="" className='img-fluid' />
                        </button>
                        <button
                            type="button"
                            className='bg-transparent border-0'
                            style={{ width: '50px', height: '50px', opacity: !users ? 0.5 : 1 }}
                            onClick={handleGmail}
                            disabled={!users}
                        >
                            <img src={ShareGmail} alt="" className='img-fluid' />
                        </button>
                        <button
                            type="button"
                            className='bg-transparent border-0'
                            style={{ width: '50px', height: '50px', opacity: !users ? 0.5 : 1 }}
                            onClick={handleInstagram}
                            disabled={!users}
                        >
                            <img src={ShareInsta} alt="" className='img-fluid' />
                        </button>
                        <button
                            type="button"
                            className='bg-transparent border-0'
                            style={{ width: '50px', height: '50px', opacity: !users ? 0.5 : 1 }}
                            onClick={handleFacebook}
                            disabled={!users}
                        >
                            <img src={ShareFacebook} alt="" className='img-fluid' />
                        </button>
                    </div> */}

                    <div className="d-flex justify-content-between">
                        <button
                            type="submit"
                            className="close-btn"
                            disabled={usersFormShareLoader}
                        >
                            {usersFormShareLoader ? loaders.small : 'Share'}
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
            </div >
        </Modal >
    )
}

export default Share;
