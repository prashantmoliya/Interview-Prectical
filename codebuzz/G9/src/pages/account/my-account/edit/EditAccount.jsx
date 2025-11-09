import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// Css
// import "./CreateAddress.scss"

// Image
// Light
import EditProfileSelectLight from "../../../../assets/images/account/edit-profile-select-light.svg";
// Dark
import EditProfileSelectDark from "../../../../assets/images/account/edit-profile-select-dark.svg";

import { reqtoEditManageAddress, reqtoEditProfile } from '../../../../redux-Toolkit/services/AccountServices';
import { loaders } from '../../../../components/loader/Loader';
import { editUserProfile } from '../../../../redux-Toolkit/slices/AccountSlice';
import useThemeMode from '../../../../hooks/useThemeMode';
import { getNameInitials } from '../../../../utils';
import { toast } from 'react-toastify';


const initialState = {
    name: "",
    email: "",
    Mobile_number: "",
    profile: null,
}

const EditAccount = () => {

    const ThemeMode = useThemeMode();

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const userAccount = useSelector((state) => state.UserAccount);
    const { userProfileLoader, userProfileEdit } = userAccount;

    console.log(userProfileEdit);


    const [formData, setFormData] = useState(initialState);
    const [profileImage, setProfileImage] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files && files[0]) {
            const file = files[0];

            if (file.size > 5 * 1024 * 1024) { // 5MB
                toast.error(`File size exceeds 5MB limit`);
                return;
            }

            setFormData((prev) => ({
                ...prev,
                [name]: file,
            }));

            setProfileImage(URL.createObjectURL(files[0]));

        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: files ? files[0] : value,
            }));
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await dispatch(reqtoEditProfile(formData));

        if (res.payload?.status) {
            dispatch(editUserProfile());
            navigate("/account");
        }
    }

    useEffect(() => {
        if (userProfileEdit) {
            setFormData({
                name: userProfileEdit?.name || "",
                email: userProfileEdit?.email || "",
                Mobile_number: userProfileEdit?.Mobile_number || "",
                profile: userProfileEdit?.profile || null,
            });

            setProfileImage(userProfileEdit?.profile || null);
        }
    }, [userProfileEdit]);


    return (
        <>

            {/* ------ Edit-Account Start ------ */}
            <div className="create_address pd-x">
                <h4>Edit Profile</h4>

                <div className='address_form'>
                    <form className='row m-0' onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <div className="profile_image_container">
                                {
                                    profileImage ? (
                                        <img src={profileImage} alt="Profile" className="profile_image img-fluid" draggable={false} />
                                    ) : (
                                        <div className="name_initials">
                                            <span>{getNameInitials(userProfileEdit.name)}</span>
                                        </div>
                                    )
                                }

                                <label htmlFor="profile" className="camera">
                                    <img src={ThemeMode ? EditProfileSelectLight : EditProfileSelectDark} alt="Upload" className='img-fluid' draggable={false} />
                                </label>
                            </div>
                            <input
                                type="file"
                                id="profile"
                                name="profile"
                                className="form-control d-none"
                                onChange={handleChange}
                                accept="image/*"
                            />
                        </div>

                        <div className="col-lg-12 mb-4">
                            <label htmlFor="name" className='form-label'>Name *</label>
                            <div>
                                <input
                                    type="text"
                                    name='name'
                                    placeholder=''
                                    className='form-control'
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <label htmlFor="email" className='form-label'>Email *</label>
                            <div>
                                <input
                                    type="email"
                                    name='email'
                                    placeholder=''
                                    className='form-control'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <label htmlFor="Mobile_number" className='form-label'>Mobile Number *</label>
                            <div>
                                <input
                                    type="text"
                                    pattern='\d*'
                                    maxLength={10}
                                    name='Mobile_number'
                                    placeholder=''
                                    className='form-control'
                                    value={formData.Mobile_number}
                                    onChange={handleChange}
                                    onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                    required
                                />
                            </div>
                        </div>

                        <button type='submit' className='main_btn address_btn' disabled={userProfileLoader}>
                            {
                                userProfileLoader ? loaders.btn : 'SUBMIT'
                            }
                        </button>
                    </form>
                </div>
            </div>
            {/* ------ Edit-Account End ------ */}

        </>
    )
}

export default EditAccount;





