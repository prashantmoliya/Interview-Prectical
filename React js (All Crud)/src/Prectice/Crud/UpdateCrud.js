import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const UpdateCrud = () => {

    const { id } = useParams();
    console.log('Crud Edit Id++', id);

    useEffect(() => {
        Get();
    }, []);

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [phone, setphone] = useState("");

    const Get = () => {
        const get = JSON.parse(localStorage.getItem('crud')) || [];

        const edit = get.find((i) => i.id == id);

        console.log('Crud Edit++', edit);

        if (edit) {
            setname(edit.name || "");
            setemail(edit.email || "");
            setpassword(edit.password || "");
            setphone(edit.phone || "");
        }
    }


    const navigate= useNavigate();

    const HandleUpdate = () => {
        const get = JSON.parse(localStorage.getItem('crud')) || [];
        console.log('get++', get);
        
        const update = {
            id: Number(id),
            name: name,
            email: email,
            password: password,
            phone: phone,
        }

        console.log('Crud Update++', update);

        const updatedata= get.map((i) => i.id === update.id ? update : i);

        localStorage.setItem('crud', JSON.stringify(updatedata));
    
        navigate("/ViewCrud");
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
                        <Link to="/ViewCrud" className="btn btn-danger">Back</Link>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default UpdateCrud;
