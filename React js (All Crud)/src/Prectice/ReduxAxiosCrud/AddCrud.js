import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userpostdate } from '../Redux/AxiosApi';

const AddCrud = () => {

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [phone, setphone] = useState("");

    const dispatch = useDispatch();
    const navigate= useNavigate();

    const HandleSubmit = () => {
        try {
            const obj = {
                id: Math.floor(Math.random() * 100000),
                name: name,
                email: email,
                password: password,
                phone: phone,
            };

            console.log('Redux Crud Axios Post++', obj);

            dispatch(userpostdate(obj));

            navigate("/ReduxAxios/ViewCrud");
        }
        catch(e){
            console.log('Redux Crud Axios Post Error++', e);
        }
    }


    return (
        <div>
            <div class='form'>
                <div class="card">
                    <div class="card-header" style={{ textAlign: 'left' }}>
                        <h2>Add User</h2>
                    </div>
                    <div class="card-body" style={{ textAlign : 'left' }}>
                        <div class="row">
                            <div class="col-lg-12 mb-2">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input type='text' class="form-control" placeholder='Enter Your Name' value={name} onChange={(e)=> setname(e.target.value)} />
                                </div>
                            </div>
                            <div class="col-lg-12 mb-2">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type='text' class="form-control" placeholder='Enter Your Email' value={email} onChange={(e)=> setemail(e.target.value)} />
                                </div>
                            </div>
                            <div class="col-lg-12 mb-2">
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type='password' class="form-control" placeholder='Enter Your Password' value={password} onChange={(e)=> setpassword(e.target.value)} />
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label>Phone</label>
                                    <input type='phone' class="form-control" placeholder='Enter Your Phone' value={phone} onChange={(e)=> setphone(e.target.value)} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="card-footer" style={{ textAlign : 'left' }}>
                        <button class="btn btn-primary" type="submit" onClick={HandleSubmit}>Submit</button>
                        &nbsp; | &nbsp;
                        <Link to="/ReduxAxios/ViewCrud" class="btn btn-danger">Back</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddCrud;
