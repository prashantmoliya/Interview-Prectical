import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { reqtoUserChangePassword } from '../../../redux-Toolkit/services/AccountServices';
import { loaders } from '../../../components/loader/Loader';

// Css
// import "./CreateAddress.scss"

// Image
// Light
// Dark

const initialState = {
    OldPassword: "",
    NewPassword: "",
    Confirmpassword: "",
}

const ChangePassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userAccount = useSelector((state) => state.UserAccount);
    const { loader } = userAccount;

    const [formData, setFormData] = useState(initialState);
    const [passwordError, setPasswordError] = useState({
        password: '',
        ConfirmPassword: '',
    });

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "NewPassword") {
            if (!passwordRegex.test(value)) {
                setPasswordError((prev) => ({
                    ...prev,
                    password:
                        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.",
                }));
            } else {
                setPasswordError((prev) => ({ ...prev, password: "" }));
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!passwordRegex.test(formData.NewPassword)) {
            setPasswordError((prev) => ({
                ...prev,
                password:
                    "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.",
            }));
            return;
        }

        if (formData.NewPassword !== formData.Confirmpassword) {
            setPasswordError((prev) => ({
                ...prev,
                ConfirmPassword: "Password does not match.",
            }));
            return;
        } else {
            setPasswordError((prev) => ({ ...prev, ConfirmPassword: "" }));
        }

        const res = await dispatch(reqtoUserChangePassword(formData));

        if (res.payload?.status) {
            navigate("/account");
        }
    }


    return (
        <>

            {/* ------ Change-Password Start ------ */}
            <div className="create_address pd-x">
                <h4>Change Password</h4>

                <div className='address_form'>
                    <form className='row m-0' onSubmit={handleSubmit}>
                        <div className="col-lg-12 mb-4">
                            <label htmlFor="OldPassword" className='form-label'>Old Password *</label>
                            <div>
                                <input
                                    type="text"
                                    name='OldPassword'
                                    placeholder=''
                                    className='form-control'
                                    value={formData.OldPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-lg-12 mb-4">
                            <label htmlFor="NewPassword" className='form-label'>New Password *</label>
                            <div>
                                <input
                                    type="text"
                                    name='NewPassword'
                                    placeholder=''
                                    className='form-control'
                                    value={formData.NewPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {passwordError.password && <div className='mt-2 error_message'>{passwordError.password}</div>}
                        </div>
                        <div className="col-lg-12">
                            <label htmlFor="Confirmpassword" className='form-label'>Confirm New Password *</label>
                            <div>
                                <input
                                    type="text"
                                    name='Confirmpassword'
                                    placeholder=''
                                    className='form-control'
                                    value={formData.Confirmpassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {passwordError.ConfirmPassword && <div className='mt-2 error_message'>{passwordError.ConfirmPassword}</div>}
                        </div>

                        <button type='submit' className='main_btn address_btn' disabled={loader}>
                            {
                                loader ? loaders.btn : 'SUBMIT'
                            }
                        </button>
                    </form>
                </div>
            </div>
            {/* ------ Change-Password End ------ */}

        </>
    )
}

export default ChangePassword;