import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import UserImage from "../../assets/Images/user.jpg";
import Search from '../../../assets/images/search.png';
import Links from '../../../assets/images/links.png';
import ClipCopy from '../../../assets/images/clip-copy.png';
import eye from '../../../assets/images/eye.svg';
import edit from '../../../assets/images/edit.svg';
import trash from '../../../assets/images/trash.svg';
import share from '../../../assets/images/share.svg';


import Delete from '../../../components/modal/delete/Delete';
import { CompanyData, UserData, UsersData } from "../../../constants/Data";
import DataTableComponents from "../../../components/data-table/DataTableComponents";
import { FaEye } from "react-icons/fa";
import { BsCopy } from "react-icons/bs";
import { IoMdLink } from "react-icons/io";
import { LuShare } from "react-icons/lu";
import AddUser from "../../../components/modal/super-admin/users/add/AddUser";
import EditUser from "../../../components/modal/super-admin/users/edit/EditUser";
import ViewUser from "../../../components/modal/super-admin/users/view/ViewUser";
import Share from "../../../components/modal/share/Share";
import { useDispatch, useSelector } from "react-redux";

import { reqtoSuperAdminDeleteUser, reqtoSuperAdminGetUser } from "../../../redux-Toolkit/services/superadmin/SuperAdminServices";
import { getNameInitials } from "../../../utils";
import { CreatedDate } from "../../../utils/DateTimeFormate";


const modal = {
    addUser: false,
    editUser: false,
    viewUser: false,
    deleteUser: false,
    shareUser: false
}

const initialState = {
    viewId: null,
    editUser: null,
    deleteId: null,
    shareLink: null,
}

const Users = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { usersList, loader, deleteLoader } = superAdminReducer;


    // const [usersList, setUsersList] = useState(UsersData);
    // const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");

    const [modalState, setModalState] = useState(initialState);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    // Offcanvas / Modal
    const [modalShow, setModalShow] = useState(modal);

    const handleClose = () => {
        setModalShow(modal);
        setModalState(initialState);
    }

    const handleDelete = async () => {
        const res = await dispatch(reqtoSuperAdminDeleteUser(modalState.deleteId));

        if (res.payload?.status) {
            GetUserList();
            handleClose();
        }
    }

    const GetUserList = async () => {
        await dispatch(reqtoSuperAdminGetUser());
    }

    const columns = [
        {
            name: 'No.',
            selector: (_, index) => (currentPage - 1) * perPage + (index + 1),
            width: '80px',
        },
        {
            name: 'Name',
            cell: (row) => (
                <div className="d-flex align-items-center">
                    <div className="me-3 name-initials">
                        {/* <img
                            src={row.image}
                            alt="Image"
                            // className={`${row.image === null && 'rounded-circle'}`}
                            style={{
                                maxWidth: "60px",
                                maxHeight: "60px",
                                padding: '8px 0'
                            }}
                        /> */}

                        <span>{getNameInitials(row.name) || '-'}</span>
                    </div>
                    <div>
                        {row.name || "-"}
                    </div>
                </div>
            ),
            style: {
                margin: '10px 0'
            }
            // maxwidth: "10%",
            // minWidth: "100px",
        },
        {
            name: 'Category',
            cell: (row) => row.category || "-",
            maxwidth: "14%",
        },
        {
            name: 'Email address',
            cell: (row) => row.email || "-",
        },
        {
            name: 'Phone number',
            cell: (row) => row.mobileNumber || "-",
            maxwidth: "10%",
        },
        {
            name: 'Created Date',
            cell: (row) => CreatedDate(row.createdAt),
            maxwidth: "12%",
        },
        {
            name: 'Status',
            cell: (row) => (
                <div className={`status ${row.status === "Completed" ? "completed" : row.status === "Pending" ? "pending" : "rejected"}`}>
                    {row.status}
                </div>
            ),
            maxwidth: "9%",
        },
        {
            name: 'Action',
            cell: (row) =>
            (
                <div className="d-flex align-items-center">
                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon me-3"
                        onClick={() => {
                            // setModalShow({ ...modalShow, viewUser: true });
                            // setModalState({ ...modalState, viewId: row.id });
                            navigate(`/superadmin/users/${row.id}`)
                        }}
                    >
                        <img src={eye} alt="eye" />
                    </button>

                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon me-3"
                        onClick={() => {
                            setModalShow({ ...modalShow, editUser: true });
                            setModalState({ ...modalState, editUser: row });
                        }}
                    >
                        <img src={edit} alt="edit" />
                    </button>

                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon me-3"
                        onClick={() => {
                            setModalShow({ ...modalShow, deleteUser: true });
                            setModalState({ ...modalState, deleteId: row.id });
                        }}
                    >
                        <img src={trash} alt="trash" />
                    </button>

                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon"
                        onClick={() => {
                            setModalShow({ ...modalShow, shareUser: true });
                            setModalState({ ...modalState, shareLink: row });
                        }}
                    >
                        <img src={share} alt="share" />
                    </button>
                </div>
            ),
            width: '210px'
        },
    ];


    const filterUsers = usersList?.filter((i) => {
        const searchstr = `${i.name} ${i.category} ${i.email} ${i.status} ${i.mobileNumber} ${CreatedDate(i.createdAt)}`.toLowerCase();

        return searchstr.includes(search.toLowerCase());
    });

    const startIndex = (currentPage - 1) * perPage;
    const currentPageData = filterUsers?.slice(startIndex, startIndex + perPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    useEffect(() => {
        GetUserList();
    }, []);

    return (
        <>

            <section className="categorylist-section mt-2 mt-lg-2 mt-xl-3">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header pt-3">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <h3 className="mb-0 page-title">
                                        Add Client
                                    </h3>

                                    <div className="w-50 d-flex justify-content-end">
                                        <div className="search d-flex align-items-center gap-1 me-4 ">
                                            {/* <label htmlFor="dt-search-0" className='search-label'>
                                            Search:
                                        </label> */}
                                            <input
                                                type="search"
                                                className="form-control form-control-sm border-0"
                                                placeholder='Search'
                                                id="dt-search-0"
                                                name='search'
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                            />

                                            <img src={Search} alt="Search" className="img-fluid" />
                                        </div>

                                        <button className="add-btn boreder-0" type="button"
                                            onClick={() => setModalShow({ ...modalShow, addUser: true })}
                                        >
                                            Add Client
                                        </button>
                                    </div>

                                </div>
                            </div>

                            <div className="card-body table-responsive">
                                {
                                    error ? (
                                        <div className="text-center text-dark my-5" style={{ fontSize: '22px', fontWeight: '600' }}>
                                            {error}
                                        </div>
                                    ) : (
                                        <DataTableComponents
                                            columns={columns}
                                            currentPageData={currentPageData}
                                            loader={loader}
                                            filterDataLength={filterUsers?.length || 0}
                                            perPage={perPage}
                                            handleRowsPerPageChange={handleRowsPerPageChange}
                                            handlePageChange={handlePageChange}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Add-User Modal */}
            <AddUser show={modalShow.addUser} handleClose={handleClose} GetUserList={GetUserList} />

            {/* Edit-User Modal */}
            <EditUser show={modalShow.editUser} handleClose={handleClose} GetUserList={GetUserList} user={modalState.editUser} />

            {/* View-User Modal */}
            <ViewUser show={modalShow.viewUser} handleClose={handleClose} userId={modalState.viewId} />

            {/* Delete-User Modal */}
            <Delete show={modalShow.deleteUser} handleClose={handleClose} isDeleteLoading={deleteLoader} handleDelete={handleDelete} role={"Client"} />

            {/* Share-User Modal */}
            <Share show={modalShow.shareUser} handleClose={handleClose} driveLink={modalState.shareLink} />
        </>
    )
}

export default Users;