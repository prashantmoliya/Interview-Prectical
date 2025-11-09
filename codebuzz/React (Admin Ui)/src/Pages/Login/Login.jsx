import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash, FaUserCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../../helper/Axios';
import { toast } from 'react-toastify';

const initialState= {
    email: "",
    password: "",
}

const Login = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [formData, setformData] = useState(initialState);
    console.log(formData);

    const [showpassword, setshowpassword] = useState(false);

    const PasswordShowHide = () => {
        setshowpassword((prevShowPassword) => !prevShowPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setformData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await Axios.post(`/auth/login`, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(res);

            if (res.data.status) {
                toast.success(res.data.message);

                setformData(initialState);

                localStorage.setItem("admin-Token", res.data.token);
                navigate("/dashboard");
            }
            else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.error(err);

            if (err.message === "Network Error") {
                toast.error(err.message);
            }
            if (err.response?.status === 404) {
                toast.error(err.response.data.message);
            }
            else if (err.response?.status === 500) {
                toast.error(err.response.data.message);
            }
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>

            <section className="login-section">
                <div className="container d-flex align-items-center justify-content-center min-vh-100">
                    <div className="row login-box superadmin">
                        <div className="col-lg-6 left-box d-flex align-items-center">
                            <div className="row align-items-center">
                                <div className="header-text mb-4">
                                    {/* <img src="/Images/Logo.png" alt="logo" className="img-fluid mb-3" draggable="false" /> */}
                                    <h4 className="mb-2">
                                        Sign In !
                                        <span>
                                            {/* 👋 */}
                                            <FaUserCog style={{ marginLeft: "13px", marginBottom: "2px" }} />
                                        </span>
                                    </h4>
                                    {/* <p>Enter you details for further process</p> */}
                                    <p>Hello there, sign in to continue!</p>
                                </div>
                                <form
                                    onSubmit={handleLogin}
                                >
                                    <div className="mb-4">
                                        <label htmlFor="email" className="form-label">Email:</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="form-control"
                                            placeholder="Enter Your Email Address"
                                            // autoComplete='off'
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label htmlFor="password" className="form-label">Password:</label>
                                        <div className="input-group">
                                            <input
                                                style={{ borderRadius: "6px" }}
                                                type={showpassword ? "text" : "password"}
                                                name="password"
                                                id="password"
                                                className="form-control"
                                                placeholder="Enter Your Password"
                                                autoComplete='off'
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                            <span
                                                onClick={PasswordShowHide}
                                                style={{
                                                    position: 'absolute',
                                                    right: '10px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    border: "0",
                                                    // color: '#6c757d',
                                                    color: '#000',
                                                    backgroundColor: "transparent",
                                                    cursor: 'pointer',
                                                    zIndex: "999"
                                                }}
                                            >
                                                {showpassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                                            </span>
                                        </div>
                                    </div>

                                    {/* <div className='mt-4 text-end forget-paasword'>
                                        <p><span onClick={() => navigate('/superadmin/forget-Password')}>Forget Password?</span></p>
                                    </div> */}

                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            className={`login-btn ${loading ? 'btn-loading' : ''}`}
                                            disabled={loading}
                                        >
                                            {loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                                            {loading ? 'Signing In...' : 'Sign In'}
                                        </button>
                                    </div>
                                </form>

                                {/* <div className='mt-4 form-navigate'>
                                    <p>Don't have an account? <span onClick={() => navigate('/superadmin/register')}>Sign Up</span></p>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-lg-6 right-box">
                            <img src="/Images/login.svg" alt="vector" className="img-fluid vector-img" draggable="false" />

                            <div className="glass-effect d-none">
                                {/* <h2>Very Good Works Are Watting For You 😉</h2> */}
                                {/* <h5 className="mt-3 text-center">Sign In 🤞</h5> */}
                                <img src="/Images/login.svg" alt="vector" className="img-fluid vector-img" draggable="false" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Login;