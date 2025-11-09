import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginputuser, registerputdata } from '../Redux/Rest Api/AxiosApi';

const Profile = () => {

    const dispatch = useDispatch();

    const { login, register } = useSelector((state) => ({
        register: state.redux.register,
        login: state.redux.login,
    }));
    console.log("Redux Login++", login);
    console.log("Redux Register++", register);


    const [id, setid] = useState("");
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    useEffect(() => {
        if(login){
            setid(login.id);
            setname(login.name);
            setemail(login.email);
            setpassword(login.password);
        }
    }, [login])


    const HandleProfileUpdate = () => {
        try {
            let obj = { 
                id: id,
                name: name,
                email: email,
                password: password,
            };
            console.log("Profile Update Put++", id,',', obj);

            if (window.confirm("Do you want to Profile Upadate")) {
                dispatch(loginputuser(id, obj));
                dispatch(registerputdata(id, obj));
            }
        }
        catch(e){
            console.log("Profile Update Put Error++", e);
        }
    }


    return (
        <div>

            <div className='form m-auto  mt-5 col-6'>
                <div className="card">
                    <div className="card-header" style={{ textAlign: 'left' }}>
                        <h3 className='text-center text-dark'>Profile</h3>
                    </div>
                    <div className="card-body" style={{ textAlign: 'left' }}>
                        <div className="row">
                            <div className="col-lg-12 mb-3">
                                <input type='hidden' className="form-control text-dark" placeholder='Update Your Name' value={id} />
                                <div className="form-group">
                                    <label className='text-dark'>User Name</label>
                                    <input type='name' className="form-control text-dark" placeholder='Update Your Name' value={name} onChange={(e)=> setname(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-12 mb-3">
                                <div className="form-group">
                                    <label className='text-dark'>Email</label>
                                    <input type='email' className="form-control text-dark" placeholder='Update Your Email' value={email} onChange={(e)=> setemail(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-12 mb-3">
                                <div className="form-group">
                                    <label className='text-dark'>Password</label>
                                    <input type='text' className="form-control text-dark" placeholder='Update Your Password' value={password} onChange={(e)=> setpassword(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer" style={{ textAlign: 'left' }}>
                        <button className="btn btn-primary" type="submit" onClick={HandleProfileUpdate} >Update</button>
                        &nbsp; | &nbsp;
                        <Link to="/Home" className="btn btn-danger">Back</Link>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default Profile
