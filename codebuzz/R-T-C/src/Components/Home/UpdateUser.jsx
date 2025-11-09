import { useEffect } from 'react';
// import './Users.css'
import './Users.scss'
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { getsingleasyncuser, updateasyncuser } from '../../Redux/Home/User-Api/AxiosApi';
import { getsingaluser, putuser } from '../../Redux-Toolkit/HomeSlice/User-Api/AxiosApi';
import { useFormik } from 'formik';
import * as Yup from "yup";

const UpdateUser = () => {

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // dispatch(getsingleasyncuser(id));

        dispatch(getsingaluser(id));
    }, [dispatch, id]);


    // 1. React-Redux 

    // const { loader, error, user } = useSelector((state) => ({
    //     loader: state.redux.loader,
    //     error: state.redux.error,
    //     user: state.redux.user,
    // }));
    // console.log(loader, user, error);

    // 2. Redux-Toolkit 

    const { loader, error, user } = useSelector((state) => ({
        loader: state.redux.loader,
        error: state.redux.error,
        user: state.redux.user,
    }));
    console.log(loader, user, error);


    const UpdateFormSchema= Yup.object().shape({
        name: Yup.string().min(2).max(15).required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(8).max(12).required("Password is required"),
        phone: Yup.string().matches(/^\d{10}$/, "Phone number must be exactly 10 digits.").required("Phone is required"),
    })

    const formik = useFormik({
        initialValues: {
            name: user.name || "",
            email: user.email || "",
            password: user.password || "",
            phone: user.phone || "",
        },
        enableReinitialize: true,
        validationSchema: UpdateFormSchema,
        onSubmit: async (values) => {
            console.log("update data++", values);

            // dispatch(updateasyncuser(id,values));

            const res = await dispatch(putuser({ Uid: id, data: values }));
            console.log("13++", res);

            if (res.payload.status === 200) {
                navigate("/user");
            }

            formik.resetForm();
        }
    });
    // console.log("Update-Formik++", formik);



    return (
        <>

            <div className='form'>
                <div className="card">
                    <div className="card-header" style={{ textAlign: 'left' }}>
                        <h2>Update User</h2>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="card-body" style={{ textAlign: 'left' }}>
                            <div className="row">
                                <div className="col-lg-12 mb-2">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type='text' className="form-control" placeholder='Update Your Name' name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        {
                                            formik.touched.name && formik.errors.name ? <span className='text-danger'>* {formik.errors.name}</span> : ""
                                        }
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-2">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type='email' className="form-control" placeholder='Update Your Email' name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        {
                                            formik.touched.email && formik.errors.email ? <span className='text-danger'>* {formik.errors.email}</span> : ""
                                        }
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-2">
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type='password' className="form-control" placeholder='Update Your Password' name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        {
                                            formik.touched.password && formik.errors.password ? <span className='text-danger'>* {formik.errors.password}</span> : ""
                                        }
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type='text' className="form-control" placeholder='Update Your Phone'
                                            name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} maxLength={10} pattern="\d{10}" onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} />
                                        {
                                            formik.touched.phone && formik.errors.phone ? <span className='text-danger'>* {formik.errors.phone}</span> : ""
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="card-footer" style={{ textAlign: 'left' }}>
                            <button className="btn btn-primary" type="submit">Update</button>
                            &nbsp; | &nbsp;
                            <Link to="/user" className="btn btn-danger">Back</Link>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default UpdateUser
