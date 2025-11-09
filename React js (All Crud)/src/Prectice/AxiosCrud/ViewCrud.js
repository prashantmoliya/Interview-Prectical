import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ViewCrud = () => {

    useEffect(() => {
        Get();
    }, [])

    const [getdata, setgetdata] = useState([]);

    const Get = () => {
        axios.get("http://localhost:4000/user")
        .then((res)=>{
            console.log('Crud Axios Get++', res);

            setgetdata(res.data);
        })
        .catch((e)=>{
            console.log('Crud Axios Get Error++', e)
        })
    }


    const HandleDelete = (Did) => {
        axios.delete("http://localhost:4000/user/" + Did)
        .then((res)=>{
            console.log('Crud Axios Delete++', res)

            const del = getdata.filter((i) => i.id !== Did);
            
            setgetdata(del)
        })
        .catch((e)=>{
            console.log('Crud Axios Delete Error++', e)
        })
    }


    return (
        <div>

            <div className="card">
                <div className="card-header d-flex justify-content-center" >
                    <Link to={'/Axios/AddCrud'} className="btn btn-success">Add User [+]</Link>
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
                                                <Link to={`/Axios/UpdateCrud/${i.id}`} className="btn btn-primary">Edit</Link>
                                                &nbsp; | &nbsp;
                                                <button className="btn btn-danger" onClick={() =>   HandleDelete(i.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
}

export default ViewCrud;
