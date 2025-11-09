import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const UpdateCrud = () => {

    const { id } = useParams();
    
    useEffect(() => {
        Get();
    }, [])

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [phone, setphone] = useState("");

    const Get = () => {
        axios.get("http://localhost:4000/user/" + id)
        .then((res)=>{
            console.log('Crud Axios Edit++', res)

            if (res.data) {
                setname(res.data.name || "");
                setemail(res.data.email || "");
                setpassword(res.data.password || "");
                setphone(res.data.phone || "");
            }
        })
        .catch((e)=>{
            console.log('Crud Axios Edit Error++', e)
        })
    }

    const navigate = useNavigate();

    const HandleUpdate = () => {
        const obj = {
            id: id,
            name: name,
            email: email,
            password: password,
            phone: phone,
        };

        axios.put("http://localhost:4000/user/" + id, obj)
        .then((res)=>{
            console.log('Crud Axios Update++', res)
        })
        .catch((e)=>{
            console.log('Crud Axios Update Error++', e)
        })

        navigate("/Axios/ViewCrud");
    }


    return (
        <div>

            <div className='form'>
                <div className="card">
                    <div className="card-header" style={{ textAlign: 'left' }}>
                        <h2>Update User</h2>
                    </div>
                    <div className="card-body" style={{ textAlign: 'left' }}>
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type='text' className="form-control" placeholder='Update Your Name' value={name} onChange={(e)=> setname(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-12 mb-2">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type='text' className="form-control" placeholder='Update Your Email' value={email} onChange={(e)=> setemail(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-12 mb-2">
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type='password' className="form-control" placeholder='Update Your Password' value={password} onChange={(e)=> setpassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type='phone' className="form-control" placeholder='Update Your Phone' value={phone} onChange={(e)=> setphone(e.target.value)} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="card-footer" style={{ textAlign: 'left' }}>
                        <button className="btn btn-primary" type="submit" onClick={HandleUpdate}>Update</button>
                        &nbsp; | &nbsp;
                        <Link to="/Axios/ViewCrud" className="btn btn-danger">Back</Link>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default UpdateCrud;
