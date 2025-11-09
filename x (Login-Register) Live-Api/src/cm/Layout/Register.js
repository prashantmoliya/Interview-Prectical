import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerpostdata } from '../Redux/AuthLayout/AxiosApi';
import { toast } from 'react-toastify';

const   Register = () => {

    const dispatch = useDispatch();

    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [name, setname] = useState("");

    const HandleRegister = () => {
        if(!username || !password || !email || !name){
            toast.error("All Field are Required");
        }
        else{
            let obj = {
                Username: username,
                Email: email,
                Password: password,
                Name: name,
            };
            console.log("HandleRegister++", obj);
    
            dispatch(registerpostdata(obj));
        
            setusername("");
            setemail("");
            setpassword("");
            setname("");
        }
    }


    return (
        <div>
            <div className='form container mt-5 col-6'>
                <div className="card">
                    <div className="card-header" style={{ textAlign: 'left' }}>
                        <h2>Register</h2>
                    </div>
                    <div className="card-body" style={{ textAlign: 'left' }}>
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <div className="form-group">
                                    <label>User Name</label>
                                    <input type='name' name='name' className="form-control" placeholder='Enter Your UserName' value={username} onChange={(e) => setusername(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-12 mb-2">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type='email' name='email' className="form-control" placeholder='Enter Your Email' value={email} onChange={(e) => setemail(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-12 mb-2">
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type='password' name='password' className="form-control" placeholder='Enter Your Password' value={password} onChange={(e) => setpassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Name </label>
                                    <input type='name' name='name' className="form-control" placeholder='Enter Your Name' value={name} onChange={(e) => setname(e.target.value)} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="card-footer" style={{ textAlign: 'left' }}>
                        <button className="btn btn-primary" type="submit" onClick={HandleRegister}>Sign up</button>
                        &nbsp; | &nbsp;
                        <Link to="/" className="btn btn-danger">Sign in</Link>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default Register