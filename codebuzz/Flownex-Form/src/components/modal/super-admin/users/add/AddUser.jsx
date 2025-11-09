import React, { useState } from 'react';
import { Modal } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux';
import { reqtoSuperAdminAddUser } from '../../../../../redux-Toolkit/services/superadmin/SuperAdminServices';
import { loaders } from '../../../../loader/Loader';
import { visaCatagory } from '../../../../../constants/Data';

const initialState = {
    name: '',
    email: '',
    mobileNumber: '',
    category: '',
    formLink: '',
    userUniqueId: '',
    formUniqueId: ''
}

const AddUser = ({ show, handleClose, GetUserList }) => {

    const dispatch = useDispatch();

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { loader } = superAdminReducer;

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
            const selectedCategory = visaCatagory.find(item => item.category === value);
            updateData.formLink = selectedCategory ? `${import.meta.env.VITE_APP_DOMAIN}/forms/${selectedCategory.route}` : '';
        }

        setFormData(updateData);
    }

    const generateUniqueId = (length = 10) => {
        return Math.random().toString(36).substring(2, 2 + length);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formUniqueId = generateUniqueId(10);
        const userUniqueId = generateUniqueId(10);
        const payload = {
            ...formData,
            userUniqueId: userUniqueId,
            formUniqueId: formUniqueId,
            formLink: `${formData.formLink}/${userUniqueId}/${formUniqueId}`,
        }

        const res = await dispatch(reqtoSuperAdminAddUser(payload));

        if (res.payload?.status) {
            GetUserList();
            handleCloseHide();
        }
    }


    return (
        <Modal className='form' show={show} backdrop="static" centered >
            <div className="modal-header">
                <h5 className="modal-title mb-5" id="deleteModalLabel">
                    Add Client
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
                            className="form-control"
                            placeholder="Enter Your Name"
                            autoComplete='off'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">Email :</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Your Email Address"
                            autoComplete='off'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="mobileNumber" className="form-label">Phone Number :</label>
                        <input
                            type="text"
                            pattern='\d*'
                            maxLength={12}
                            id="mobileNumber"
                            name="mobileNumber"
                            className="form-control"
                            placeholder="Enter Your Phone Number"
                            autoComplete='off'
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="category" className="form-label">Category :</label>

                        <select
                            className="form-select form-control"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            {/* <option value="Study Visa">Study Visa</option>
                            <option value="Work Visa">Work Visa</option>
                            <option value="Tourist Visa">Tourist Visa</option>
                            <option value="PR Visa (Permanent Residency)">PR Visa (Permanent Residency)</option> */}
                            {
                                visaCatagory?.map((i, index) => {
                                    return (
                                        <option value={i.category} key={index}>{i.category}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="d-flex justify-content-between">
                        {/* <button
                            className={`login-btn ${loading ? 'btn-loading' : ''}`}
                            disabled={loading}
                        >
                            {loading && loaders.small}
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button> */}
                        <button
                            type="submit"
                            className="close-btn"
                            disabled={loader}
                        >
                            {loader ? loaders.small : 'Save'}
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

export default AddUser;
