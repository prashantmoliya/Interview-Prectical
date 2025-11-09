import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getuserdatarequest } from '../Redux/User/Action';

const View = () => {

    const dispatch= useDispatch();

    useEffect(() => {
        dispatch(getuserdatarequest());
        
    }, [dispatch]);


    return (
        <div>
            <div className="card">
                <div className="card-header d-flex justify-content-center">
                    <Link to={'/Add'} className="btn btn-success">Add User [+]</Link>
                </div>
                <div className="card-body">
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
                                    <Link className="btn btn-primary">Edit</Link>
                                    &nbsp; | &nbsp;
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>

            </div>

        </div>
    );
}

export default View;
