import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import UserImage from "../../assets/Images/user.jpg";
import Search from '../../../assets/images/search.png';
import Links from '../../../assets/images/links.png';
import ClipCopy from '../../../assets/images/clip-copy.png';
import eye from '../../../assets/images/eye.svg';
import edit from '../../../assets/images/edit.svg';
import trash from '../../../assets/images/trash.svg';
import share from '../../../assets/images/share.svg';
import SourceBack from '../../../assets/images/source-back.png';


import Delete from '../../../components/modal/delete/Delete';
import { CompanyData, UserData, UsersData, ViewUserFormData } from "../../../constants/Data";
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

import { reqtoSuperAdminDeleteUser, reqtoSuperAdminGetUser, reqtoSuperAdminViewUser } from "../../../redux-Toolkit/services/superadmin/SuperAdminServices";
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

const ViewUsers = () => {

    const { userId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { loader, usersDetail } = superAdminReducer;

    const [usersList, setUsersList] = useState(ViewUserFormData);
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

    const handleViewUser = async (id) => {
        await dispatch(reqtoSuperAdminViewUser(id));
    }

    useEffect(() => {
        if (userId) {
            handleViewUser(userId);
        }
    }, [userId]);


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
            name: 'Country',
            cell: (row) => (
                <div className="d-flex align-items-center">
                    <div className="me-3 name-initials">
                        <img
                            src={row.countryImg}
                            alt="Image"
                            // className={`${row.image === null && 'rounded-circle'}`}
                            style={{
                                maxWidth: "60px",
                                maxHeight: "60px",
                                padding: '8px 0'
                            }}
                        />
                    </div>
                    <div>
                        {row.country || "-"}
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
            name: 'Title',
            cell: (row) => row.title || "-",
            // maxwidth: "14%",
        },
        // {
        //     name: 'Email address',
        //     cell: (row) => row.email || "-",
        // },
        // {
        //     name: 'Phone number',
        //     cell: (row) => row.mobileNumber || "-",
        //     maxwidth: "10%",
        // },
        {
            name: 'Created Date',
            cell: (row) =>
                row.createdData
            // CreatedDate(row.createdAt)
            ,
            // maxwidth: "12%",
        },
        {
            name: 'Status',
            cell: (row) => (
                <div className={`status ${row.status === "Completed" ? "completed" : row.status === "Pending" ? "pending" : "rejected"}`}>
                    {row.status}
                </div>
            ),
            // maxwidth: "9%",
        },
        {
            name: 'Action',
            cell: (row) =>
            (
                <div className="d-flex align-items-center">
                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon me-3"
                        onClick={() => {
                            navigate(`/superadmin/users/${userId}/${row.route}`)
                        }}
                    >
                        <img src={eye} alt="eye" />
                    </button>

                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon me-3"
                        onClick={() => {
                            setModalShow({ ...modalShow, deleteUser: true });
                            setModalState({ ...modalState, deleteId: row.id });
                        }}
                    >
                        <img src={trash} alt="trash" />
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
                    <div className="col-lg-5">
                        <div className="card">
                            <div className="card-header pt-3 ps-0">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <h3 className="mb-0 page-title">
                                        <button type='button' className='bg-transparent border-0 me-4' onClick={() => navigate(-1)}>
                                            <img src={SourceBack} alt="" />
                                        </button>

                                        View Client
                                    </h3>
                                </div>
                            </div>

                            <div className="card-body view-user mt-lg-4 mt-4">
                                <form className='row gx-5 flex-row gap-0'>
                                    <div className="col-12 mb-4 d-none">
                                        {/* <label htmlFor="name" className="form-label">Name :</label> */}
                                        {/* <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            placeholder="Enter Your Name"
                            autoComplete='off'
                            readOnly
                        /> */}

                                        <div className="d-flex align-items-center">
                                            <div className="me-3 name-initials form">
                                                {/* <img
                                    src={User1}
                                    alt="Image"
                                    // className={`${row.image === null && 'rounded-circle'}`}
                                    style={{
                                        maxWidth: "80px",
                                        maxHeight: "80px",
                                    }}
                                /> */}
                                                <span>{usersDetail?.name ? getNameInitials(usersDetail?.name) : ""}</span>
                                            </div>
                                            <div>
                                                <div className='username mb-1'>
                                                    {usersDetail?.name}
                                                </div>
                                                <div className={`status form ${usersDetail?.status === "Completed" ? "completed" : usersDetail?.status === "Pending" ? "pending" : "rejected"}`}>
                                                    Pending form travel visa
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                    <div className="col-6 mb-4 ">
                                        <div className="d-flex flex-column justify-content-center">
                                            <div className="name-initials form text-center">
                                                <span className="text-center">{usersDetail?.name ? getNameInitials(usersDetail?.name) : ""}</span>
                                            </div>
                                            <div className='username mt-4'>
                                                {usersDetail?.name}
                                            </div>
                                        </div>

                                    </div>

                                    {/* <div className="col-4 mb-4 d-flex justify-content-end align-items-center">
                                        <div className={`status ${usersDetail?.status === "Completed" ? "completed" : usersDetail?.status === "Pending" ? "pending" : "rejected"}`}>
                                            {usersDetail?.status}
                                        </div>
                                    </div> */}

                                    <div className="col-12 mb-4">
                                        <label htmlFor="email" className="form-label">Email Adress :</label>

                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            autoComplete='off'
                                            value={usersDetail?.email}
                                            readOnly
                                        />
                                    </div>

                                    <div className="col-6 mb-2">
                                        <label htmlFor="phone" className="form-label">Mobile Number :</label>

                                        <input
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            className="form-control"
                                            autoComplete='off'
                                            value={usersDetail?.mobileNumber}
                                            readOnly
                                        />
                                    </div>

                                    <div className="col-6 mb-2">
                                        <label htmlFor="createdAt" className="form-label">Created Date :</label>
                                        <input
                                            type="text"
                                            id="createdAt"
                                            name="createdAt"
                                            className="form-control"
                                            autoComplete='off'
                                            value={usersDetail?.createdAt ? CreatedDate(usersDetail?.createdAt) : "-"}
                                            readOnly
                                        />
                                    </div>

                                    {/* <div className="col-12 mb-4">
                                        <label htmlFor="category" className="form-label">Category :</label>
                                        <input
                                            type="text"
                                            id="category"
                                            name="category"
                                            className="form-control"
                                            autoComplete='off'
                                            value={usersDetail?.category}
                                            readOnly
                                        />
                                    </div> */}
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header pt-3">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <h3 className="mb-0 page-title">
                                        Forms
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


            {/* Delete-User Modal */}
            {/* <Delete show={modalShow.deleteUser} handleClose={handleClose} isDeleteLoading={loader} handleDelete={handleDelete} role={"Client"} /> */}


        </>
    )
}

export default ViewUsers;