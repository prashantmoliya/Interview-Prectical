import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

// Css
import "./CreateAddress.scss"
import { useDispatch, useSelector } from 'react-redux';
import { reqtoAddManageAddress } from '../../../../redux-Toolkit/services/AccountServices';
import { loaders } from '../../../../components/loader/Loader';

const initialState = {
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    address_type: "",
}

const CreateAddress = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const checkout = location?.state || '';

    const userAccount = useSelector((state) => state.UserAccount);
    const { manageAddressLoader } = userAccount;

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await dispatch(reqtoAddManageAddress(formData));

        if (res.payload?.status) {
            if (checkout === 'checkout') {
                navigate("/cart/checkout");
            } else {
                navigate("/address");
            }
        }
    }

    return (
        <>

            {/* ------ Create-Address Start ------ */}
            <div className="create_address pd-x">
                <h4>Add Address</h4>

                <div className='address_form'>
                    <form className='row m-0' onSubmit={handleSubmit}>
                        <div className="col-lg-6 mb-4">
                            <label htmlFor="address_line_1" className='form-label'>Address Line 1 *</label>
                            <div>
                                <input
                                    type="text"
                                    name='address_line_1'
                                    placeholder=''
                                    className='form-control'
                                    value={formData?.address_line_1}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <label htmlFor="address_line_2" className='form-label'>Address Line 2 *</label>
                            <div>
                                <input
                                    type="text"
                                    name='address_line_2'
                                    placeholder=''
                                    className='form-control'
                                    value={formData?.address_line_2}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <label htmlFor="city" className='form-label'>City *</label>
                            <div>
                                <input
                                    type="text"
                                    name='city'
                                    placeholder=''
                                    className='form-control'
                                    value={formData?.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <label htmlFor="state" className='form-label'>State/Province *</label>
                            <div>
                                <input
                                    type="text"
                                    name='state'
                                    placeholder=''
                                    className='form-control'
                                    value={formData?.state}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <label htmlFor="country" className='form-label'>Country *</label>
                            <div>
                                <input
                                    type="text"
                                    name='country'
                                    placeholder=''
                                    className='form-control'
                                    value={formData?.country}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <label htmlFor="postal_code" className='form-label'>Postal Code *</label>
                            <div>
                                <input
                                    type="text"
                                    name='postal_code'
                                    placeholder=''
                                    className='form-control'
                                    value={formData?.postal_code}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <label htmlFor="address_type" className='form-label'>Address Type *</label>
                            <div className='d-flex gap-4'>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        id="home"
                                        name="address_type"
                                        className="form-check-input"
                                        value={"Home"}
                                        checked={formData?.address_type === "Home"}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label className="form-check-label" htmlFor="home">
                                        Home
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        id="work"
                                        name="address_type"
                                        className="form-check-input"
                                        value={"Work"}
                                        checked={formData?.address_type === "Work"}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label className="form-check-label" htmlFor="work">
                                        Work
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        id="other"
                                        name="address_type"
                                        className="form-check-input"
                                        value={"Other"}
                                        checked={formData?.address_type === "Other"}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label className="form-check-label" htmlFor="other">
                                        Other
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button type='submit' className='main_btn address_btn' disabled={manageAddressLoader}>
                            {
                                manageAddressLoader ? loaders.btn : 'ADD ADDRESS'
                            }
                        </button>
                    </form>
                </div>
            </div>
            {/* ------ Create-Address End ------ */}

        </>
    )
}

export default CreateAddress;