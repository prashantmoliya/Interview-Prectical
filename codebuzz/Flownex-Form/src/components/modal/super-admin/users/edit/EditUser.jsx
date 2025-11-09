import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { reqtoSuperAdminEditUser } from '../../../../../redux-Toolkit/services/superadmin/SuperAdminServices';
import { loaders } from '../../../../loader/Loader';
import { visaCatagory } from '../../../../../constants/Data';

const initialState = {
    id: '',
    name: '',
    email: '',
    mobileNumber: '',
    category: '',
}

const EditUser = ({ show, handleClose, GetUserList, user }) => {


    const dispatch = useDispatch();

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { loader } = superAdminReducer;

    const [formData, setFormData] = useState(initialState);

    const handleCloseHide = () => {
        handleClose();
        // setFormData(initialState);
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

        const { email, category, ...formDatas } = formData;

        const res = await dispatch(reqtoSuperAdminEditUser(formDatas));

        if (res.payload?.status) {
            GetUserList();
            handleCloseHide();
        }
    }

    useEffect(() => {
        if (user) {
            setFormData({
                id: user?.id,
                name: user?.name || '',
                email: user?.email || '',
                mobileNumber: user?.mobileNumber || '',
                category: user?.category || '',
            });
        }
    }, [user]);


    return (
        <Modal className='form' show={show} backdrop="static" centered >
            <div className="modal-header">
                <h5 className="modal-title mb-5" id="deleteModalLabel">
                    Edit Client
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
                            readOnly
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

                    {/* <div className="mb-4">
                        <label htmlFor="category" className="form-label">Category :</label>

                        <select
                            className="form-select form-control"
                            id="category"
                            name="category"
                            value={formData.category}
                            disabled
                        >
                            <option value="">Select Category</option>
                            {
                                visaCatagory?.map((i, index) => {
                                    return (
                                        <option value={i.category} key={index}>{i.category}</option>
                                    )
                                })
                            }
                        </select>
                    </div> */}

                    <div className="d-flex justify-content-between">
                        <button
                            type="submit"
                            className="close-btn"
                            disabled={loader}
                        >
                            {loader ? loaders.small : 'Update'}
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

export default EditUser;