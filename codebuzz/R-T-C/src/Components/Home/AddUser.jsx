import { useDispatch } from 'react-redux'
// import './Users.css'
import './Users.scss'
import { Link, useNavigate } from "react-router-dom"
import { postasyncuser } from '../../Redux/Home/User-Api/AxiosApi';
import { postuser } from '../../Redux-Toolkit/HomeSlice/User-Api/AxiosApi';
import { useFormik } from 'formik';
import * as Yup from "yup";

const AddUser = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const FormValidation = Yup.object().shape({
        name: Yup.string().min(2).max(15).required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(8).max(12).required("Password is required"),
        phone: Yup.string().matches(/^\d{10}$/, "Phone number must be exactly 10 digits.").required("Phone is required"),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            phone: '',
        },
        validationSchema: FormValidation,
        onSubmit: async (values) => {
            console.log("user data++", values);

            // dispatch(postasyncuser(values));

            const res = await dispatch(postuser(values));
            console.log("12++", res);

            if (res.payload.status === 201) {
                navigate("/user");
            }

            formik.resetForm();
        }
    });
    // console.log("User-Formik++", formik);

    return (
        <>
            <div className='form'>
                <div className="card">
                    <div className="card-header" style={{ textAlign: 'left' }}>
                        <h2>Add User</h2>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="card-body" style={{ textAlign: 'left' }}>
                            <div className="row">
                                <div className="col-lg-12 mb-2">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type='text' className="form-control" placeholder='Enter Your Name' name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        {
                                            formik.touched.name && formik.errors.name ? <span className='text-danger'>* {formik.errors.name}</span> : ""
                                        }
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-2">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type='email' className="form-control" placeholder='Enter Your Email' name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        {
                                            formik.touched.email && formik.errors.email ? <span className='text-danger'>* {formik.errors.email}</span> : ""
                                        }
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-2">
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type='password' className="form-control" placeholder='Enter Your Password' name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        {
                                            formik.touched.password && formik.errors.password ? <span className='text-danger'>* {formik.errors.password}</span> : ""
                                        }
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type='text' className="form-control" placeholder='Enter Your Phone' name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} maxLength={10} pattern="\d{10}" onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} />
                                        {
                                            formik.touched.phone && formik.errors.phone ? <span className='text-danger'>* {formik.errors.phone}</span> : ""
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="card-footer" style={{ textAlign: 'left' }}>
                            <button className="btn btn-primary" type="submit">Submit</button>
                            &nbsp; | &nbsp;
                            <Link to="/user" className="btn btn-danger">Back</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddUser
