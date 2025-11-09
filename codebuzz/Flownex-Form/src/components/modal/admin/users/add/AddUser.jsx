import React, { useState } from 'react';
import { Modal } from 'react-bootstrap'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { useDispatch, useSelector } from 'react-redux';
import { loaders } from '../../../../loader/Loader';
import { reqtoAdminAddUser } from '../../../../../redux-Toolkit/services/admin/AdminServices';
import { visaCatagory, visaForm } from '../../../../../constants/Data';

const initialState = {
    name: '',
    email: '',
    mobileNumber: '',
    category: '',
    formLink: '',
    formUniqueId: '',
    userUniqueId: '',
    applicant: ''
}

const AddUser = ({ show, handleClose, GetUserList }) => {

    const dispatch = useDispatch();

    const adminReducer = useSelector((state) => state.Admin);
    const { loader, usersLoader } = adminReducer;

    const [formData, setFormData] = useState(initialState);
    const [phoneError, setPhoneError] = useState("");

    const handleCloseHide = () => {
        handleClose();
        setFormData(initialState);
        setPhoneError("");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        let updateData = {
            ...formData,
            [name]: value,
        }

        if (name === "category") {
            const selectedCategory = visaForm.find(item => item.category === value);
            updateData.formLink = selectedCategory ? `${import.meta.env.VITE_APP_DOMAIN}/forms/${selectedCategory.key}` : '';
        }

        setFormData(updateData);
    }


    const handlePhoneChange = (value, country) => {
        // if (!value) {
        //     setPhoneError("Phone number is required");
        //     setFormData((prev) => ({ ...prev, mobileNumber: "" }));
        //     return;
        // }

        // const parsed = parsePhoneNumberFromString("+" + value);

        // if (parsed && parsed.isValid()) {
        //     // store formatted international number like +1 416-555-1234
        //     const formatted = parsed.formatInternational();

        //     setFormData((prev) => ({
        //         ...prev,
        //         mobileNumber: formatted,
        //     }));

        //     setPhoneError(""); // ✅ clear error
        // } else {
        //     setPhoneError("Invalid phone number");
        //     setFormData((prev) => ({
        //         ...prev,
        //         mobileNumber: "+" + value, // still keep raw with +
        //     }));
        // }

        const dialCode = country?.dialCode || "";
        const fullNumber = "+" + dialCode + (value ? value.replace(dialCode, "") : "");

        if (!value || value === dialCode) {
            setFormData(prev => ({
                ...prev,
                mobileNumber: "+" + dialCode,
            }));
            setPhoneError("");
            return;
        }

        const parsed = parsePhoneNumberFromString(fullNumber);

        if (parsed && parsed.isValid()) {
            const formatted = parsed.formatInternational();
            setFormData(prev => ({
                ...prev,
                mobileNumber: formatted,
            }));
            setPhoneError("");
        } else {
            setFormData(prev => ({
                ...prev,
                mobileNumber: fullNumber,
            }));
            setPhoneError("Invalid phone number");
        }
    };

    const generateUniqueId = (length = 10) => {
        return Math.random().toString(36).substring(2, 2 + length);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.mobileNumber) {
            setPhoneError("Phone number is required");
            return;
        }

        const parsed = parsePhoneNumberFromString(formData.mobileNumber);
        if (!parsed || !parsed.isValid()) {
            setPhoneError("Invalid phone number");
            return;
        }

        const formUniqueId = generateUniqueId(10);
        const userUniqueId = generateUniqueId(10);
        const payload = {
            ...formData,
            userUniqueId: userUniqueId,
            formUniqueId: formUniqueId,
            formLink: `${formData.formLink}/${userUniqueId}/${formUniqueId}`,
        }

        const res = await dispatch(reqtoAdminAddUser(payload));

        if (res.payload?.status) {
            handleCloseHide();
            GetUserList();
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
                        {/* <input
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
                        /> */}

                        <PhoneInput
                            country={'ca'}
                            disableCountryGuess={true}
                            value={formData.mobileNumber ? formData.mobileNumber.replace(/\D/g, "") : ""}
                            onChange={handlePhoneChange}
                            placeholder="Enter Your Phone Number"
                            id="mobileNumber"
                            name="mobileNumber"
                            inputClass="form-control"
                            specialLabel=""
                            enableSearch
                            inputProps={{
                                required: true,
                            }}
                            countryCodeEditable={false}
                            excludeCountries={['do', 'pr', 'us']}
                        />

                        {phoneError && <small className="text-danger">{phoneError}</small>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="category" className="form-label">Form :</label>

                        <select
                            className="form-select form-control"
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
                            className="form-select form-control"
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

                    <div className="d-flex justify-content-between">
                        <button
                            type="submit"
                            className="close-btn"
                            disabled={usersLoader}
                        >
                            {usersLoader ? loaders.small : 'Submit'}
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
