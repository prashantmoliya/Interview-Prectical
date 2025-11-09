import React, { useEffect, useState } from 'react';
import '../Home/Users.scss'
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from 'formik';
import * as Yup from "yup";
import { auth } from '../../Firebase/firebaseconfig';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { imgKit } from '../../ImageKit/ImageKit';

const Profile = () => {

    const [user, setUser] = useState(null);
    const [imageShow, setImageShow] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Profile++", currentUser);

            if (currentUser) {
                setUser(currentUser);
            }
        });
        // console.log(user);

        return () => unsubscribe();
    }, [])


    const FormValidation = Yup.object().shape({ 
        displayName: Yup.string().min(2).max(15).required("Name is required"),
        phoneNumber: Yup.string().matches(/^\d{10}$/, "Phone number must be exactly 10 digits.").required("Phone is required"),
    });

    const formik = useFormik({
        initialValues: {
            displayName: user?.displayName || '',
            email: user?.email || '',
            phoneNumber: user?.phoneNumber || '',
            photoURL: user?.photoURL || ""
        },
        enableReinitialize: true,
        validationSchema: FormValidation,
        handleChange: (e) => {
            console.log(e);

            if (e.target.name === 'photoURL') {
                const file = e.target.files[0];

                if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setImageShow(reader.result);
                        formik.setFieldValue('photoURL', reader.result);
                    };
                    reader.readAsDataURL(file);
                }
            }
        },
        onSubmit: async (values) => {
            console.log("Update Profile++", { ...values, phoneNumber: Number(values.phoneNumber) });

            const user = auth.currentUser;
            await updateProfile(user, {
                displayName: values.displayName,
                phoneNumber: Number(values.phoneNumber),
                photoURL: values.photoURL,
            });

            toast.success("Profile Updated");

            // formik.resetForm();
        }
    });

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
          try {
            // Upload to ImgKit
            const response = await imgKit.upload({
              file,
              fileName: file.name,
              folder: '/profiles/', // Optional folder
            });

            console.log("Upload to ImgKit", response);
            
    
            // Set Image Preview and PhotoURL
            setImageShow(response.url);
            formik.setFieldValue('photoURL', response.url);
          } catch (error) {
            toast.error('Image Upload Failed!');
            console.error('Error uploading image:', error);
          }
        }
      };


    return (
        <>


            <div className='form'>
                <div className="card">
                    <div className="card-header" style={{ textAlign: 'left' }}>
                        <h2>Profile</h2>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="card-body" style={{ textAlign: 'left' }}>
                            <div className="row">
                                <div className="col-lg-12 mb-2">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type='text' className="form-control" placeholder='Enter Your Name' name="displayName" value={formik.values.displayName} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        {
                                            formik.touched.displayName && formik.errors.displayName ? <span className='text-danger'>* {formik.errors.displayName}</span> : ""
                                        }
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-2">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type='email' className="form-control" placeholder='Update Your Email' name="email" value={formik.values.email} readOnly />
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-2">
                                    <div className="form-group">
                                        <label>Photo</label>
                                        <input
                                            type='file'
                                            className="form-control"
                                            name="photoURL"
                                            // onChange={formik.handleChange}
                                            onChange={handleImageUpload}
                                        />
                                        {imageShow && (
                                            <div className="mb-3 mt-3">
                                                <img
                                                    src={imageShow}
                                                    alt="Image"
                                                    className="img-thumbnail img-fluid"
                                                    style={{
                                                        maxWidth: "150px", maxHeight: "150px", marginBottom: "10px"
                                                    }}
                                                />
                                            </div>
                                        )}


                                        {/* <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            className="form-control"
                                            onChange={handleChange}
                                            accept='image/*'
                                        />*/}
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type='text' className="form-control" placeholder='Enter Your Phone' name="phoneNumber" value={formik.values.phoneNumber} onChange={formik.handleChange} onBlur={formik.handleBlur} maxLength={10} pattern="\d{10}" onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} />
                                        {
                                            formik.touched.phoneNumber && formik.errors.phoneNumber ? <span className='text-danger'>* {formik.errors.phoneNumber}</span> : ""
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="card-footer" style={{ textAlign: 'left' }}>
                            <button className="btn btn-primary" type="submit">Update</button>
                            &nbsp; | &nbsp;
                            <Link to="/" className="btn btn-danger">Back</Link>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Profile