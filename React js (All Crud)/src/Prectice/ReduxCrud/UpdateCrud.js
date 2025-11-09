import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../Redux/Action';

const UpdateCrud = () => {

    const editdata = useSelector((state) => (state.redux.edit));
    console.log('Redux Crud Get-Edit++', editdata);

    useEffect(() => {
        Edit(editdata);
    }, [editdata]);

    const [id, setid] = useState("");
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [phone, setphone] = useState("");

    const Edit = (editdata) => {
        if (editdata) {
            setid(editdata.id || "");
            setname(editdata.name || "");
            setemail(editdata.email || "");
            setpassword(editdata.password || "");
            setphone(editdata.phone || "");
        }
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const HandleUpdate = () => {
        const upd = {
            id: id,
            name: name,
            email: email,
            password: password,
            phone: phone,
        };

        console.log('Redux Crud Update++', upd);

        dispatch(update(upd));

        navigate("/Redux/ViewCrud");
    }
   


    return (
        <div>

            <div class='form'>
                <div class="card">
                    <div class="card-header" style={{ textAlign: 'left' }}>
                        <h2>Update User</h2>
                    </div>
                    <div class="card-body" style={{ textAlign: 'left' }}>
                        <div class="row">
                            <div class="col-lg-12 mb-2">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input type='text' class="form-control" placeholder='Update Your Name' value={name} onChange={(e)=> setname(e.target.value)} />
                                </div>
                            </div>
                            <div class="col-lg-12 mb-2">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type='text' class="form-control" placeholder='Update Your Email' value={email} onChange={(e)=> setemail(e.target.value)} />
                                </div>
                            </div>
                            <div class="col-lg-12 mb-2">
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type='password' class="form-control" placeholder='Update Your Password' value={password} onChange={(e)=> setpassword(e.target.value)} />
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label>Phone</label>
                                    <input type='phone' class="form-control" placeholder='Update Your Phone' value={phone} onChange={(e)=> setphone(e.target.value)} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="card-footer" style={{ textAlign: 'left' }}>
                        <button class="btn btn-primary" type="submit" onClick={HandleUpdate}>Update</button>
                        &nbsp; | &nbsp;
                        <Link to="/Redux/ViewCrud" class="btn btn-danger">Back</Link>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default UpdateCrud;
