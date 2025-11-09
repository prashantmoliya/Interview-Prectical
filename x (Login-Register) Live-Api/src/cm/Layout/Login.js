import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginpostuser } from '../Redux/AuthLayout/AxiosApi';

const Login = () => {

    const dispatch= useDispatch();
    
    const { error, register } = useSelector((state) => ({
        error: state.redux.error,
        register: state.redux.register,
    }));
    console.log(register);


    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const HandleLogin = () => {
        let obj = {
            Email: email,
            Password: password,
        };
        console.log("HandleLogin++", obj);

        const login = register.find((i) => (i.Email == email && i.Password == password));

        if (login) {
            console.log(login);

            dispatch(loginpostuser(login));
        }
        else {
            toast.error("Email & Password are not Valid");
        }

        setemail("");
        setpassword("");
    }


    return (
        <div>

            <div className='form container mt-5 col-6'>
                <div className="card">
                    <div className="card-header" style={{ textAlign: 'left' }}>
                        <h2>Login</h2>
                    </div>
                    <div className="card-body" style={{ textAlign: 'left' }}>
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type='email' name='email' className="form-control" placeholder='Enter Your Email' value={email} onChange={(e) => setemail(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-12 mb-2">
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type='password' className="form-control" placeholder='Enter Your Password' value={password} onChange={(e) => setpassword(e.target.value)} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="card-footer" style={{ textAlign: 'left' }}>
                        <button className="btn btn-primary" type="submit" onClick={HandleLogin}>Sign in</button>
                        &nbsp; | &nbsp;
                        <Link to="/Register" className="btn btn-danger">Sign up</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login
