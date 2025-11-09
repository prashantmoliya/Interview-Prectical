import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import UserImage from "../../assets/Images/user.jpg";
import Search from '../../../assets/images/search.png';
import SearchClose from '../../../assets/images/search_close.png';
import ClipCopy from '../../../assets/images/clip-copy.png';
import eye from '../../../assets/images/eye.svg';
import edit from '../../../assets/images/edit.svg';
import trash from '../../../assets/images/trash.svg';
import share from '../../../assets/images/share.svg';
import FormEdit from '../../../assets/images/form-edit.svg';
import SourceBack from '../../../assets/images/source-back.png';


import Delete from '../../../components/modal/delete/Delete';
import { CompanyData, UserData, UsersData, ViewUserFormData } from "../../../constants/Data";
import DataTableComponents from "../../../components/data-table/DataTableComponents";
import { FaEye } from "react-icons/fa";
import { BsCopy } from "react-icons/bs";
import { IoMdLink } from "react-icons/io";
import { LuShare } from "react-icons/lu";
import AddUser from "../../../components/modal/super-admin/users/add/AddUser";
import ViewUser from "../../../components/modal/super-admin/users/view/ViewUser";
import { useDispatch, useSelector } from "react-redux";

import { reqtoSuperAdminDeleteUser, reqtoSuperAdminGetUser, reqtoSuperAdminViewUser } from "../../../redux-Toolkit/services/superadmin/SuperAdminServices";
import { getNameInitials } from "../../../utils";
import { CreatedDate } from "../../../utils/DateTimeFormate";
import { reqtoAdminDeleteUser, reqtoAdminViewUser, reqtoAdminViewUserDeleteForm, reqtoAdminViewUserGetForm } from "../../../redux-Toolkit/services/admin/AdminServices";
import EditUser from "../../../components/modal/admin/users/edit/EditUser";
import FormShare from "../../../components/modal/share/FormShare";
import Share from "../../../components/modal/share/Share";

const modal = {
    editUser: false,
    deleteForm: false,
    shareUserForm: false,
    shareForm: false
}

const initialState = {
    editUser: null,
    deleteId: { userId: null, userFormId: null },
    shareUserForm: null,
    shareForm: null,
}

const ViewUsers = () => {

    const { userId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const adminReducer = useSelector((state) => state.Admin);
    const { usersDetail, deleteLoader, usersDetailFormListLoader, usersDetailFormList } = adminReducer;


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
        await dispatch(reqtoAdminViewUser(id));
    }

    const handleViewUserGetForm = async (id) => {
        await dispatch(reqtoAdminViewUserGetForm(id));
    }





    const handleClose = () => {
        setModalShow(modal);
        // setModalState(initialState);
    }

    const handleDelete = async () => {
        const res = await dispatch(reqtoAdminViewUserDeleteForm({ id: modalState.deleteId }));

        if (res.payload?.status) {
            handleViewUserGetForm(userId);
            handleClose();
        }
    }

    // const GetUserList = async () => {
    //     await dispatch(reqtoSuperAdminGetUser());
    // }

    const columns = [
        {
            name: 'No.',
            selector: (_, index) => (currentPage - 1) * perPage + (index + 1),
            width: '80px',
            style: {
                margin: '20px 0'
            }
        },
        {
            name: 'Title',
            cell: (row) => row.category || "-",
            minWidth: "250px !important",
        },
        {
            name: 'Applicant Type',
            cell: (row) => row.applicant || "-",
            minWidth: "200px !important",
        },
        {
            name: 'Form Status',
            cell: (row) => (
                <div
                    className={`status ${row.formStatus === "Completed" ? "completed" : row.formStatus === "Pending" ? "pending" : "rejected"}`}
                    onClick={() => navigate(`/admin/users/${row.userId}/${row.id}`, { state: row })}
                >
                    {row.formStatus}
                </div>
            ),
            minWidth: "150px !important",
        },
        {
            name: 'Document Status',
            cell: (row) => (
                <div
                    className={`status ${row.docFormStatus === "Completed" ? "completed" : row.docFormStatus === "Pending" ? "pending" : row.docFormStatus === "Cancelled" ? "rejected" : "null"}`}
                    onClick={() => navigate(`/admin/users/${row.userId}/${row.id}`, { state: row })}
                >
                    {/* {row.docFormStatus === "Completed" ? "Submitted" : row.docFormStatus === 'Pending' ? 'Requested' : '-'} */}
                    {row.docFormStatus === null ? "-" : row.docFormStatus}
                </div>
            ),
            minWidth: "160px !important",
        },
        {
            name: 'Created Date',
            cell: (row) => CreatedDate(row.createdAt),
            minWidth: "180px !important",
            center: true
        },
        {
            name: 'Action',
            cell: (row) =>
            (
                // row.formStatus = "Pending", "Completed", "Cancelled"
                // row.docFormStatus = null, "Pending", "Completed", "Cancelled"

                <div className="d-flex align-items-center">
                    <button
                        type="button"
                        className="btn btn-sm btn-neutral text-nowrap eye-icon me-3 form-btns"
                        disabled={
                            row.formStatus === "Cancelled"
                        }
                        onClick={() => {
                            navigate(`/admin/users/${userId}/${row.id}`, { state: row })
                        }}
                    >
                        <img src={eye} alt="eye" />
                    </button>

                    <button
                        type="button"
                        className="btn btn-sm btn-neutral text-nowrap eye-icon me-3 form-btns"
                        disabled={
                            (row.formStatus === "Cancelled") ||
                            (row.formStatus === "Completed" && row.docFormStatus === "Completed") ||
                            (row.formStatus === "Completed" && row.docFormStatus === "Cancelled")
                        }
                        onClick={() => {
                            setModalShow({ ...modalShow, shareForm: true })
                            setModalState({ ...modalState, shareForm: row });
                        }}
                    >
                        <img src={share} alt="share" />
                    </button>

                    <button
                        type="button"
                        className="btn btn-sm btn-neutral text-nowrap eye-icon me-3 form-btns"
                        // disabled={
                        //    // row.formStatus === "Cancelled"

                        // }
                        onClick={() => {
                            setModalShow({ ...modalShow, deleteForm: true });
                            setModalState({ ...modalState, deleteId: { userId: row.userId, userFormId: row.id } });
                        }}
                    >
                        <img src={trash} alt="trash" />
                    </button>

                    <button
                        type="button"
                        className="btn btn-sm btn-neutral text-nowrap eye-icon me-3 form-btns"
                        disabled={
                            row.formStatus === "Cancelled"
                        }
                        onClick={() => {
                            //     setModalShow({ ...modalShow, editUser: true });
                            //     setModalState({ ...modalState, editUser: row });
                            navigate(`/admin/users/form-edit/${userId}/${row.id}`, { state: row })
                        }}
                    >
                        <img src={edit} alt="edit" />
                    </button>
                </div>
            ),
            width: '210px',
            center: true

        },
    ];


    const filterUsers = usersDetailFormList?.filter((i) => {
        const searchstr = `${i.category} ${i.formStatus} ${i.docFormStatus} ${CreatedDate(i.createdAt)}`.toLowerCase();

        return searchstr.includes(search.toLowerCase());
    });

    const startIndex = (currentPage - 1) * perPage;
    // const currentPageData = filterUsers?.slice(startIndex, startIndex + perPage);
    const currentPageData = filterUsers
        ?.slice(startIndex, startIndex + perPage)
        ?.map((row, idx) => ({
            ...row,
            _rowId: `${row.userId}-${row.id ?? "row"}-${idx}`,
        }));

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };


    useEffect(() => {
        if (userId) {
            handleViewUser(userId);
            handleViewUserGetForm(userId);
        }
    }, [userId]);



    return (
        <>

            <section className="categorylist-section mt-2 mt-lg-2 mt-xl-3">
                <div className="row">
                    <div className="col-xxl-5 col-xl-6 col-lg-9">
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
                                        <div className="d-flex align-items-center">
                                            <div className="me-3 name-initials form">
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

                                    {/* <div className="col-9 mb-4 ">
                                        <div className="d-flex flex-column justify-content-center">
                                            <div className="name-initials form text-center">
                                                <span className="text-center">{usersDetail?.name ? getNameInitials(usersDetail?.name) : ""}</span>
                                            </div>
                                            <div className='username mt-4'>
                                                {usersDetail?.name}
                                            </div>
                                        </div>
                                    </div> */}

                                    {/* <div className="col-3 mb-4 d-flex justify-content-end align-items-start p-0">
                                        <button className="bg-transparent" type="button" onClick={() => {
                                            setModalShow({ ...modalShow, editUser: true });
                                        }}>
                                            <img src={FormEdit} alt="form-edit-icon" />
                                        </button>
                                    </div> */}

                                    <div className="col-12 mt-2 mb-4 position-relative">
                                        <div>
                                            <label htmlFor="email" className="form-label">Name :</label>

                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="form-control"
                                                autoComplete='off'
                                                value={usersDetail?.name}
                                                readOnly
                                            />
                                        </div>

                                        <div className="position-absolute" style={{ top: '-15px', right: '-6px' }}>
                                            <button className="bg-transparent" type="button" onClick={() => {
                                                setModalShow({ ...modalShow, editUser: true });
                                            }}>
                                                <img src={FormEdit} alt="form-edit-icon" />
                                            </button>
                                        </div>
                                    </div>

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

                                    <div className="col-lg-12 col-12 d-flex justify-content-end">
                                        <div className="search d-flex align-items-center gap-1 me-2 me-xl-4 ">
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
                                                autoComplete="off"
                                            />

                                            {
                                                search ?
                                                    <button
                                                        className="search-cancel bg-transparent"
                                                        onClick={() => setSearch("")}
                                                    >
                                                        <img src={SearchClose} alt="Search" className="img-fluid" />
                                                    </button>
                                                    :
                                                    <img src={Search} alt="Search" className="img-fluid" />
                                            }
                                        </div>

                                        <button
                                            className="add-btn boreder-0" type="button"
                                            onClick={() => {
                                                setModalShow({ ...modalShow, shareUserForm: true })
                                                setModalState({ ...modalState, shareUserForm: { id: usersDetail?.id, uniqueId: usersDetail?.uniqueId, name: usersDetail?.name, email: usersDetail?.email } });
                                            }}
                                        >
                                            Share Form
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
                                            loader={usersDetailFormListLoader}
                                            filterDataLength={filterUsers?.length || 0}
                                            perPage={perPage}
                                            handleRowsPerPageChange={handleRowsPerPageChange}
                                            handlePageChange={handlePageChange}
                                            onRowClicked={(row) => {
                                                if (row.formStatus !== "Cancelled") {
                                                    navigate(`/admin/users/${row.userId}/${row.id}`, { state: row })
                                                }
                                            }}
                                            pointerOnHover
                                            conditionalRowStyles={[
                                                {
                                                    when: row => row.formStatus === "Cancelled",
                                                    style: {
                                                        cursor: "not-allowed !important",
                                                    }
                                                },
                                                // {
                                                //     when: row => row.formStatus !== "Cancelled",
                                                //     style: { cursor: "pointer !important" }
                                                // }
                                            ]}

                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Edit-User Modal */}
            <EditUser show={modalShow.editUser} handleClose={handleClose} user={usersDetail} GetUserList={handleViewUser} />

            {/* Share-User Modal */}
            <Share show={modalShow.shareUserForm} handleClose={handleClose} users={modalState.shareUserForm} GetUserList={handleViewUserGetForm} />

            {/* Share-Form Modal */}
            <FormShare show={modalShow.shareForm} handleClose={handleClose} handleViewUserGetForm={handleViewUserGetForm} forms={modalState.shareForm} email={usersDetail?.email} />

            {/* Delete-Form Modal */}
            <Delete show={modalShow.deleteForm} handleClose={handleClose} isDeleteLoading={deleteLoader} handleDelete={handleDelete} role={"Form"} />



        </>
    )
}

export default ViewUsers;