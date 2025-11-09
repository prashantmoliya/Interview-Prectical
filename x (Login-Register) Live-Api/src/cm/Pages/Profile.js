import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { profileupdatedata } from '../Redux/AuthLayout/AxiosApi';

const Profile = () => {

    const dispatch= useDispatch();

    const { login } = useSelector((state) => ({
        login: state.redux.login,
    }));

    const [id, setid] = useState("");
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [name, setname] = useState("");

    useEffect(() => {
        if (login) {
            setid(login.id);
            setusername(login.Username);
            setemail(login.Email);
            setpassword(login.Password);
            setname(login.Name);
        }
    }, [login]);

    const HandleUpdateProfile = () => {
        let obj = {
            id: id,
            Username: username,
            Email: email,
            Password: password,
            Name: name,
        };
        console.log("HandleUpdateProfile++", obj);

        if (window.confirm("Do you want to Profile Upadate?")) {
            dispatch(profileupdatedata(id, obj));
        }
    }


    return (
        <div>

            <div className='form container mt-5 col-6'>
                <div className="card">
                    <div className="card-header" style={{ textAlign: 'left' }}>
                        <h2>Profile</h2>
                    </div>
                    <div className="card-body" style={{ textAlign: 'left' }}>
                        <input type='hidden' className="form-control" placeholder='Update Your Id' value={id} />
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <div className="form-group">
                                    <label>User Name</label>
                                    <input type='name' className="form-control" placeholder='Update Your UserName' value={username} onChange={(e) => setusername(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-12 mb-2">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type='email' className="form-control" placeholder='Update Your Email' value={email} onChange={(e) => setemail(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-12 mb-2">
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type='text' className="form-control" placeholder='Update Your Password' value={password} onChange={(e) => setpassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-12 mb-2">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type='text' className="form-control" placeholder='Update Your Name' value={name} onChange={(e) => setname(e.target.value)} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="card-footer" style={{ textAlign: 'left' }}>
                        <button className="btn btn-primary" type="submit" onClick={HandleUpdateProfile}>Update</button>
                        &nbsp; | &nbsp;
                        <Link to="/DashBoard" className="btn btn-danger">Back</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile