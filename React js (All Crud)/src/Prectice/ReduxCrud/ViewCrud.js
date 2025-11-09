import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { del, edit } from '../Redux/Action';

const ViewCrud = () => {

    const getdata = useSelector((state) => (state.redux.user));
    console.log('Redux Crud Get++', getdata);

    const dispatch = useDispatch();

    const HandleDelete = (Did) => {
        console.log('Redux Crud Delete++', Did);

        if (window.confirm('Delete Your Data ' + Did)) {
            dispatch(del(Did));
        }
    }

    const navigate= useNavigate();

    const HandleEdit = (Eid) => {
        console.log('Redux Crud Edit++', Eid);

        if (window.confirm('Edit Your Data ' + Eid)) {
            dispatch(edit(Eid));

            navigate("/Redux/UpdateCrud");
        }
    }


    return (
        <div>

            <div className="card">
                <div className="card-header d-flex justify-content-center">
                    <Link to="/Redux/AddCrud" className="btn btn-success">Add User [+]</Link>
                </div>
                <div className="card-body">
                    {
                        getdata.length === 0 ? (
                            <div className='fs-3 my-1'>No Data</div>
                        ) : (
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <td>Sr No.</td>
                                        <td>Id</td>
                                        <td>Name</td>
                                        <td>Email</td>
                                        <td>Password</td>
                                        <td>Phone</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>18</td>
                                        <td>Virat Kohli</td>
                                        <td>virat18@gmail.com</td>
                                        <td>2323cheeku</td>
                                        <td>9789056789</td>
                                        <td>
                                            <button className="btn btn-primary">Edit</button>
                                            &nbsp; | &nbsp;
                                            <button className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                    {
                                        getdata.map((i, index) => {
                                            return (
                                                <tr>
                                                    <td>{index + 1}.</td>
                                                    <td>{i.id}</td>
                                                    <td>{i.name}</td>
                                                    <td>{i.email}</td>
                                                    <td>{i.password}</td>
                                                    <td>{i.phone}</td>
                                                    <td>
                                                        <button className="btn btn-primary" onClick={()=> HandleEdit(i.id)}>Edit</button>
                                                        &nbsp; | &nbsp;
                                                        <button className="btn btn-danger" onClick={() => HandleDelete(i.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default ViewCrud;
