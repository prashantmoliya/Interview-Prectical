import { useEffect, useState } from 'react'
// import './Users.css'
import './Users.scss'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { deleteasyncuser, getasyncuser } from '../../Redux/Home/User-Api/AxiosApi'
import { deleteuser, getuser } from '../../Redux-Toolkit/HomeSlice/User-Api/AxiosApi'

const ViewUser = () => {

    const dispatch = useDispatch();

    const [AllSelect, setAllSelect] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        // dispatch(getasyncuser());

        dispatch(getuser());
    }, [dispatch]);

    // 1. React-Redux 

    // const { loader, error, users } = useSelector((state) => ({
    //     loader: state.redux?.loader,
    //     error: state.redux?.error,
    //     users: state.redux?.users,
    // }));
    // console.log(loader, error, users);

    // const HandleDelete = (id) => {
    //     if (window.confirm("Do You Want To Delete ?")) {
    //         dispatch(deleteasyncuser(id));
    //     }
    // }

    // 2. Redux-Toolkit     

    const { loader, users, error } = useSelector((state) => ({
        loader: state.redux.loader,
        users: state.redux.users,
        error: state.redux.error,
    }));
    console.log(loader, users, error);

    const HandleDelete = (id) => {
        if (window.confirm("Do You Want To Delete ?")) {
            dispatch(deleteuser(id));
        }
    }

    const HandleSelect = (Uid) => {
        if (selectedUsers.includes(Uid)) {
            setSelectedUsers(selectedUsers.filter(userId => userId !== Uid));
        } else {
            setSelectedUsers([...selectedUsers, Uid]);
        }
    }

    const HandleAllSelect = () => {
        if (AllSelect) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(users.map(user => user.id));
        }
        setAllSelect(!AllSelect);
    }

    const HandleDeleteSelected = () => {
        if (window.confirm("Do you want to delete the selected users?")) {
            selectedUsers.forEach(id => dispatch(deleteuser(id)));

            setSelectedUsers([]);
            setSelectAll(false);
        }
    };


    return (
        <>

            <div className='text-center mt-4'>
                <h2 style={{ textDecoration: 'underline' }}>Redux-Toolkit with server</h2>
            </div>

            <div style={{ maxWidth: "90%", margin: 'auto', marginTop: "20px" }} className="">
                <div className="card">
                    <div className="card-header d-flex justify-content-justify">
                        <Link to={'/add-user'} className="btn btn-success">Add User [+]</Link>

                        <button className="btn btn-danger ms-auto" onClick={HandleDeleteSelected} disabled={selectedUsers.length === 0}>
                            Delete Selected
                        </button>
                    </div>
                    <div className="card-body">
                        {
                            loader ? (
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '20vh' }}>
                                    <div className="spinner-border text-dark" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )
                                :
                                error ? (
                                    <div className="d-flex justify-content-center align-items-center" style={{ height: '20vh' }}>
                                        <div className='text-dark fs-4 fw-medium'>{error}</div>
                                    </div>
                                )
                                    : (
                                        users.length > 0 && (
                                            <>
                                                <table className="table table-bordered">
                                                    <thead className="bg-dark text-white">
                                                        <tr>
                                                            <td>
                                                                <input type="checkbox" checked={AllSelect} onChange={HandleAllSelect} />
                                                            </td>
                                                            <td>Sr No.</td>
                                                            {/* <td>Id</td> */}
                                                            <td>Name</td>
                                                            <td>Email</td>
                                                            <td>Password</td>
                                                            <td>Phone</td>
                                                            <td>Action</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            users?.map((i, index) => {
                                                                return (
                                                                    <tr key={i.id}>
                                                                        <td>
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={selectedUsers.includes(i.id)}
                                                                                className='checkbox'
                                                                                onChange={() => HandleSelect(i.id)}
                                                                            />
                                                                        </td>
                                                                        <td>{index + 1}.</td>
                                                                        {/* <td>{i.id}</td> */}
                                                                        <td>{i.name}</td>
                                                                        <td>{i.email}</td>
                                                                        <td>{i.password}</td>
                                                                        <td>{i.phone}</td>
                                                                        <td>
                                                                            <Link to={`/update-user/${i.id}`} className="btn btn-primary">Edit</Link>
                                                                            &nbsp; | &nbsp;
                                                                            <button type='button' className="btn btn-danger" onClick={() => HandleDelete(i.id)}>Delete</button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </>
                                        )
                                    )
                        }

                    </div>

                </div>
            </div>

        </>
    )
}

export default ViewUser


{/* <tr>
                                    <td>1</td>
                                    <td>18</td>
                                    <td>Virat Kohli</td>
                                    <td>virat18@gmail.com</td>
                                    <td>2323cheeku</td>
                                    <td>9789056789</td>
                                    <td>
                                        <Link to="/update-user" className="btn btn-primary">Edit</Link>
                                        &nbsp; | &nbsp;
                                        <button className="btn btn-danger">Delete</button>
                                    </td>
                                </tr> */}