import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userdeletedata, usereditdata, usergetdata } from '../Redux/AxiosApi';

const ViewCrud = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(usergetdata());
    }, []);


    const { loader,getdata, error } = useSelector((state) => ({
        loader: state.redux.loader,
        error: state.redux.error,
        getdata: state.redux.userdata
    }));
    console.log('Redux Crud Axios Get++', loader, getdata, error);


    const HandleDelete = (Did) => {
        try {
            if(window.confirm("Delete Your Data " + Did)){
                console.log('Redux Crud Axios Delete++', Did);

                dispatch(userdeletedata(Did));

            }
        }
        catch(e){
            console.log('Redux Crud Axios Delete Error++', e);
        }
    }

    const navigate = useNavigate();

    const HandleEdit = (Eid) => {
        try {
            console.log('Redux Crud Axios Edit++', Eid);

            dispatch(usereditdata(Eid));

            navigate("/ReduxAxios/UpdateCrud");
        }
        catch(e){
            console.log('Redux Crud Axios Edit Error++', e);
        }
    }



    return (
        <div>

            <div className="card">
                <div className="card-header d-flex justify-content-center">
                    <Link to="/ReduxAxios/AddCrud" className="btn btn-success">Add User [+]</Link>
                </div>
                <div className="card-body">
                    {
                        loader ? (
                            <div class="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status"></div>
                        ) : error ? (
                                <h3 className='text-danger'>{ error }</h3>
                            ) : getdata.length === 0 ? (
                                    <h3>No Data</h3>
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
                                                                    <button className="btn btn-primary" onClick={()=> HandleEdit(i.id)}>Edit</button>
                                                                    &nbsp; | &nbsp;
                                                                    <button className="btn btn-danger" onClick={()=> HandleDelete(i.id)}>Delete</button>
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
