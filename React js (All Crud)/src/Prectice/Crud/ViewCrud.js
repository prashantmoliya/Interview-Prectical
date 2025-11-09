import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ViewCrud = () => {

    useEffect(() => {
        Get();
    }, [])
    
    const [getdata, setgetdata] = useState([]);

    const Get = () => {
        const get = JSON.parse(localStorage.getItem('crud'));

        console.log('Crud Get++', get);

        setgetdata(get);
    }

    const HandleDelete = (Did) => {
        const del= getdata.filter((i) => i.id !== Did);

        console.log('Crud Delete++', del);

        localStorage.setItem('crud', JSON.stringify(del));
        setgetdata(del);
    }

    return (
        <div>

            <div className="card">
                <div className="card-header d-flex justify-content-center">
                    <Link to={'/AddCrud'} className="btn btn-success">Add User [+]</Link>
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
                                getdata?.map((i, index) => {
                                    return ( 
                                        <tr key={i.id}>
                                            <td>{index + 1}.</td>
                                            <td>{i.id}</td>
                                            <td>{i.name}</td>
                                            <td>{i.email}</td>
                                            <td>{i.password}</td>
                                            <td>{i.phone}</td>
                                            <td>
                                                <Link to={`/UpdateCrud/${i.id}`} className="btn btn-primary">Edit</Link>
                                                &nbsp; | &nbsp;
                                                <button className="btn btn-danger" onClick={()=> HandleDelete(i.id)}>Delete</button>
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
