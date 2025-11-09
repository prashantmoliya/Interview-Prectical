import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchdata } from './Redux/AxiosApi';

const Component = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchdata());  
    }, []);

    const { loading, data, error } = useSelector((state) => ({
        loading: state.redux.loading,
        data: state.redux.data,
        error: state.redux.error,
    }))
    console.log('Get Api Redux++', 'Loader :', loading, ', Data :', data, ', Error :', error)
    

    return (
        <div>
            <h4>React Redux Api Calling</h4>

            {
                loading ? (
                    <div class="spinner-border mt-5" style={{ width: "3rem", height: "3rem" }} role="status"></div>
                ) : error ? (
                        <h1 className='mt-5 text-danger'>{error}</h1>
                    ) : (
                        <div class="card">
                            {/**<div class="card-header">
                                <button href="view.html" class="btn btn-success">Add User [+]</button>
                            </div>**/}
                            <div class="card-body">
                                <table class="table table-bordered">
                                    <thead class="bg-dark text-white">
                                        <tr>
                                            <td>Sr No.</td>
                                            <td>Id</td>
                                            <td>Name</td>
                                            <td>Email</td>
                                            <td>Password</td>
                                            <td>Phone</td>
                                            {/**<td>Action</td>**/}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/**<tr>
                                                <td>1</td>
                                                <td>18</td>
                                                <td>Virat Kohli</td>
                                                <td>virat18@gmail.com</td>
                                                <td>2323cheeku</td>
                                                <td>9789056789</td>
                                                {/**<td>
                                                    <button href="update.html" class="btn btn-primary">Edit</button>
                                                    &nbsp; | &nbsp;
                                                    <button class="btn btn-danger">Delete</button>
                                                </td>
                                            </tr>**/}
                                            {
                                                data.map((i, index) => {
                                                    return (
                                                        <tr>
                                                            <td>{index + 1}.</td>
                                                            <td>{i.id}</td>
                                                            <td>{i.name}</td>
                                                            <td>{i.email}</td>
                                                            <td>{i.password}</td>
                                                            <td>{i.phone}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    )
            }


        </div>
    )
}

export default Component;
