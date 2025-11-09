import React, { useState } from 'react';
import { Modal } from 'react-bootstrap'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { useDispatch, useSelector } from 'react-redux';
import { reqtoSuperAdminAddCompany } from '../../../../../redux-Toolkit/services/superadmin/SuperAdminServices';
import { loaders } from '../../../../loader/Loader';

const initialState = {
    name: "",
    email: "",
    mobileNumber: "",
    companyName: ""
}

const AddCompany = ({ show, handleClose, GetCompanyList }) => {

    const dispatch = useDispatch();

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { loader, companyLoader } = superAdminReducer;

    const [formData, setFormData] = useState(initialState);
    const [phoneError, setPhoneError] = useState("");

    const handleCloseHide = () => {
        handleClose();
        setFormData(initialState);
        setPhoneError("");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }


    const handlePhoneChange = (value, country) => {
        // // const cleanValue = value.replace(/\D/g, ""); // digits only
        // const phoneWithPlus = "+" + value;

        // const parsed = parsePhoneNumberFromString("+" + value);

        // setFormData((prev) => ({
        //     ...prev,
        //     mobileNumber: phoneWithPlus,
        // }));

        // // ✅ Validation with libphonenumber-js

        // if (!value) {
        //     setPhoneError("Phone number is required");
        //     return;
        // }

        // const parsed = parsePhoneNumberFromString("+" + phoneWithPlus);
        // if (!parsed || !parsed.isValid()) {
        //     setPhoneError("Invalid phone number");
        // } else {
        //     setPhoneError(""); // clear error when valid
        // }


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


    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!formData.mobileNumber) {
        //     setPhoneError("Phone number is required");
        //     return;
        // }

        // const parsed = parsePhoneNumberFromString("+" + formData.mobileNumber);
        // if (!parsed || !parsed.isValid()) {
        //     setPhoneError("Invalid phone number");
        //     return; // ⛔ stop submission
        // }

        if (!formData.mobileNumber) {
            setPhoneError("Phone number is required");
            return;
        }

        const parsed = parsePhoneNumberFromString(formData.mobileNumber);
        if (!parsed || !parsed.isValid()) {
            setPhoneError("Invalid phone number");
            return;
        }

        const res = await dispatch(reqtoSuperAdminAddCompany(formData));

        if (res.payload?.status) {
            handleCloseHide();
            GetCompanyList();
        }
    }


    return (
        <Modal className='form' show={show} backdrop="static" centered >
            <div className="modal-header">
                <h5 className="modal-title mb-5" id="deleteModalLabel">
                    Add Partner
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
                        <label htmlFor="companyName" className="form-label">Company Name :</label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            className="form-control"
                            placeholder="Enter Your Company Name"
                            autoComplete='off'
                            value={formData.companyName}
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

                    <div className=" d-flex justify-content-between">
                        <button
                            type="submit"
                            className="close-btn"
                            disabled={companyLoader}
                        >
                            {companyLoader ? loaders.small : 'Submit'}
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

export default AddCompany;