import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { fb } from '../../fbconfig';

const AddCrud = () => {

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [phone, setphone] = useState("");

    const navigate = useNavigate();
    
    const HandleSubmit = async () => {

        try {
            const add = {
                name: name,
                email: email,
                password: password,
                phone: phone
            };

            const fbc= collection(fb, "Crud");
            const post = await addDoc(fbc, add);

            console.log('Crud Firebase Post++', post)
        }
        catch(e){
            console.log('Crud Firebase Post Error++', e)
        }

        setname("");
        setemail("");
        setpassword("");
        setphone("");

        navigate("/Firebase/ViewCrud");
    }


    return (
        <div>

            <div className='form'>
                <div className="card">
                    <div className="card-header" style={{ textAlign: 'left' }}>
                        <h2>Add User</h2>
                    </div>
                    <div className="card-body" style={{ textAlign: 'left' }}>
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type='text' className="form-control" placeholder='Enter Your Name' value={name} onChange={(e)=> setname(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-12 mb-2">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type='text' className="form-control" placeholder='Enter Your Email' value={email} onChange={(e)=> setemail(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-12 mb-2">
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type='password' className="form-control" placeholder='Enter Your Password' value={password} onChange={(e)=> setpassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type='phone' className="form-control" placeholder='Enter Your Phone' value={phone} onChange={(e)=> setphone(e.target.value)} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="card-footer" style={{ textAlign: 'left' }}>
                        <button className="btn btn-primary" type="submit" onClick={HandleSubmit}>Submit</button>
                        &nbsp; | &nbsp;
                        <Link to="/Firebase/ViewCrud" className="btn btn-danger">Back</Link>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AddCrud;
