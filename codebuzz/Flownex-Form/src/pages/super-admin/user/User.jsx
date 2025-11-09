import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import UserImage from "../../assets/Images/user.jpg";
import Search from '../../../assets/images/search.png';
import Links from '../../../assets/images/links.png';
import ClipCopy from '../../../assets/images/clip-copy.png';

import Delete from '../../../components/modal/delete/Delete';
import { UserData } from "../../../constants/Data";
import DataTableComponents from "../../../components/data-table/DataTableComponents";
import { FaEye } from "react-icons/fa";
import { BsCopy } from "react-icons/bs";
import { IoMdLink } from "react-icons/io";

// import { CreatedDate } from '../../utils/DateTimeFormate';

const modal = {
    deleteUser: false,
}

const User = () => {

    const navigate = useNavigate();

    const [userList, setUserList] = useState(UserData);
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");

    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    // Offcanvas / Modal
    const [modalShow, setModalShow] = useState(modal);

    const handleClose = () => {
        setModalShow(modal);
    }

    // const GetPatient = async () => {
    //     setLoader(true);

    //     try {
    //         const res = await Axios.get(apiendpoints.getPatient, authorizationHeaders());

    //         if (res.data?.status) {
    //             setPatientList(res.data.data);
    //         }
    //         else {
    //             toast.error(res.data?.message);
    //         }

    //     } catch (err) {
    //         if (err.response?.status === 500) {
    //             setError(err.response.data.message);
    //         }
    //     } finally {
    //         setLoader(false);
    //     }
    // }

    const handleDelete = async () => {
        setIsDeleteLoading(true);

        // try {
        //     const res = await Axios.delete(apiendpoints.deletePatient.replace(":id", deleteId), authorizationHeaders());

        //     if (res.data?.status) {
        //         toast.success(res.data?.message);

        //         handleClose();
        //         // GetPatient();

        //         setPatientList((prev) => prev.filter((i) => i.id !== deleteId));
        //     }
        //     else {
        //         toast.error(res.data?.message);
        //     }

        // }
        // catch (err) {
        //     if (err.response?.status === 500) {
        //         toast.error(err.response.data.message);
        //     }
        // }
        // finally {
        //     setIsDeleteLoading(false);
        // }
    }

    const columns = [
        {
            name: 'No.',
            selector: (_, index) => (currentPage - 1) * perPage + (index + 1),
            width: '80px',
            style: {
                margin: '10px 0'
            }
        },
        {
            name: 'Name',
            cell: (row) => (
                <div className="d-flex align-items-center">
                    <div className="me-3">
                        <img
                            src={row.image}
                            alt="Image"
                            className={`${row.image === null && 'rounded-circle'}`}
                            style={{
                                maxWidth: "60px",
                                maxHeight: "60px",
                                padding: '8px 0'
                            }}
                        />
                    </div>
                    <div>
                        {row.name || "-"}
                    </div>
                </div>
            ),
            // maxwidth: "10%",
            // minWidth: "100px",
        },

        {
            name: 'From Title',
            cell: (row) => row.fromTitle || "-",
        },
        {
            name: 'Email address',
            cell: (row) => row.email || "-",
        },
        {
            name: 'Phone number',
            cell: (row) => row.phone || "-",
            maxwidth: "12%",
            minWidth: "100px",
        },
        {
            name: 'Created Date',
            cell: (row) => row.createdData,
        },
        {
            name: 'Action',
            cell: (row) =>
            (
                <div className="d-flex align-items-center">
                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon me-3"
                        onClick={() => { }}
                    >
                        <BsCopy />
                        {/* <img src={ClipCopy} alt="ClipCopy" className="img-fluid" /> */}
                    </button>
                    <button type="button" className="btn btn-sm btn-square btn-neutral text-danger-hover eye-icon"
                        onClick={() => {
                            // setModalShow({ ...modalShow, deleteUser: true });
                            // setDeleteId(row?.id);
                        }}
                    >
                        {/* <img src={Links} alt="ClipCopy" className="img-fluid" /> */}
                        <IoMdLink />
                    </button>
                </div>
            ),
            width: '130px'
        },
    ];


    const filterUser = userList?.filter((i) => {
        const searchstr = `${i.name} ${i.fromTitle} ${i.email} ${i.phone} ${i.createdData}`.toLowerCase();

        return searchstr.includes(search.toLowerCase());
    });

    const startIndex = (currentPage - 1) * perPage;
    const currentPageData = filterUser.slice(startIndex, startIndex + perPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    // useEffect(() => {
    //     GetPatient();
    // }, []);

    return (
        <>

            <section className="categorylist-section mt-2 mt-lg-2 mt-xl-3">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header pt-3">
                                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                    <h3 className="mb-0 page-title">
                                        Client
                                    </h3>

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
                                        />

                                        <img src={Search} alt="Search" className="img-fluid" />
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
                                            filterDataLength={filterUser.length || 0}
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


            { /* ----- Delete-User Modal ----- */}
            <Delete show={modalShow.deleteUser} handleClose={handleClose} isDeleteLoading={isDeleteLoading} handleDelete={handleDelete} role="User" />

        </>
    )
}

export default User;