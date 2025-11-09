import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Search from '../../../assets/images/search.png';
import SearchClose from '../../../assets/images/search_close.png';

import ClipCopy from '../../../assets/images/clip-copy.png';
import eye from '../../../assets/images/eye.svg';
import edit from '../../../assets/images/edit.svg';
import trash from '../../../assets/images/trash.svg';
import share from '../../../assets/images/share.svg';

import Delete from '../../../components/modal/delete/Delete';
import { reqtoSuperAdminDeleteContact, reqtoSuperAdminGetContact } from "../../../redux-Toolkit/services/superadmin/SuperAdminServices";
import { useDispatch, useSelector } from "react-redux";
import ViewContact from "../../../components/modal/super-admin/contact/view/ViewContact";
import DataTableComponents from "../../../components/data-table/DataTableComponents";
import { CreatedDate } from "../../../utils/DateTimeFormate";
import ReplyContact from "../../../components/modal/super-admin/contact/edit/ReplyContact";
import { FaReply } from "react-icons/fa";
import { BsReply } from "react-icons/bs";

const modal = {
    viewCompany: false,
    replyContact: false,
    deleteContact: false,
}

const initialState = {
    viewId: null,
    reply: null,
    deleteId: null,
}

const ContactUs = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { contactList, loader, deleteLoader, contactLoader } = superAdminReducer;

    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");

    const [deleteId, setDeleteId] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    // Offcanvas / Modal
    const [modalShow, setModalShow] = useState(modal);
    const [modalState, setModalState] = useState(initialState);

    const handleClose = () => {
        setModalShow(modal);
        setModalState(initialState);
    }

    const handleDelete = async () => {
        const res = await dispatch(reqtoSuperAdminDeleteContact(modalState.deleteId));

        if (res.payload?.status) {
            GetContactList();
            handleClose();
        }
    }

    const GetContactList = async () => {
        await dispatch(reqtoSuperAdminGetContact());
    }

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
            name: 'Company Name',
            cell: (row) => row.companyName || "-",
            minWidth: "180px !important",
        },
        {
            name: 'Name',
            cell: (row) => row.name || "-",
            minWidth: "180px !important",
        },
        {
            name: 'Email address',
            cell: (row) => row.email || "-",
            minWidth: "250px !important",
        },
        {
            name: 'Phone number',
            cell: (row) => row.mobileNo || "-",
            minWidth: "160px !important",
        },
        {
            name: 'Status',
            cell: (row) => (
                <div className={`status ${row.status === "Completed" ? "completed" : "pending"}`}>
                    {row.status}
                </div>
            ),
            minWidth: "150px !important",
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
                <div className="d-flex align-items-center">
                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon me-3"
                        onClick={() => {
                            setModalShow({ ...modalShow, viewCompany: true });
                            setModalState({ ...modalState, viewId: row.id });
                        }}
                    >
                        <img src={eye} alt="eye" />
                    </button>

                    {
                        // row.status === "Completed" ? (
                        <button type="button"
                            className="btn btn-sm btn-neutral text-nowrap eye-icon me-3 contact-reply"
                            disabled={row.status === "Completed"}
                            onClick={() => {
                                setModalShow({ ...modalShow, replyContact: true });
                                setModalState({ ...modalState, reply: row });
                            }}
                        >
                            {/* <img src={edit} alt="edit" /> */}
                            <BsReply />
                        </button>
                        // ) : (
                        //     <button>-</button>
                        // )
                    }

                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon"
                        onClick={() => {
                            setModalShow({ ...modalShow, deleteContact: true });
                            setModalState({ ...modalState, deleteId: row.id });
                        }}
                    >
                        <img src={trash} alt="trash" />
                    </button>
                </div>
            ),
            width: '170px',
            center: true

        },
    ];


    const filterContact = contactList?.filter((i) => {
        const searchstr = `${i.companyName} ${i.name} ${i.email} ${i.mobileNo} ${i.status} ${CreatedDate(i.createdAt)}`.toLowerCase();

        return searchstr.includes(search.toLowerCase());
    });

    const startIndex = (currentPage - 1) * perPage;
    const currentPageData = filterContact.slice(startIndex, startIndex + perPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    useEffect(() => {
        GetContactList();
    }, []);

    return (
        <>

            <section className="categorylist-section mt-2 mt-lg-2 mt-xl-3">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header pt-3">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    {/* <h3 className="mb-0 page-title">
                                        Help & Support
                                    </h3> */}

                                    <div className="col-lg-12 col-12 d-flex justify-content-end">
                                        <div className="search d-flex align-items-center gap-1">
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
                                            filterDataLength={filterContact.length || 0}
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


            {/* Reply-Contact-Us Modal */}
            <ReplyContact show={modalShow.replyContact} handleClose={handleClose} GetContactList={GetContactList} contact={modalState.reply} />

            {/* View-Contact-Us Modal */}
            <ViewContact show={modalShow.viewCompany} handleClose={handleClose} contactId={modalState.viewId} />

            {/* Delete-Contact-Us Modal */}
            <Delete show={modalShow.deleteContact} handleClose={handleClose} isDeleteLoading={deleteLoader} handleDelete={handleDelete} role={" Help & Support"} />

        </>
    )
}

export default ContactUs;