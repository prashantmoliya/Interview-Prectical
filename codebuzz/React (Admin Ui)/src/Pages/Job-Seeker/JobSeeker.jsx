import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { customStyles } from '../../Components/DataTable/DataTable';
import { useNavigate, useParams } from 'react-router-dom';
import { authHeader, Axios } from '../../helper/Axios';
import { toast } from 'react-toastify';
import { FaFilePdf } from 'react-icons/fa6';

const JobSeeker = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [jobSeeker, setJobSeeker] = useState([]);
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");

    // const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    // const [deleteId, setDeleteId] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    // Offcanvas / Model
    const [modalShow, setModalShow] = useState({
        deletejobseeker: false,
    });

    const handleClose = () => {
        setModalShow({
            deletejobseeker: false,
        });
    }   

    const GetJobSeeker = async (jobId) => {
        setLoader(true);

        try {
            const res = await Axios.get(`/job/job-seekers/${jobId}`, authHeader());

            if (res.data?.status) {
                setJobSeeker(res.data.data);
            }
            else {
                // toast.error(res.data?.message);
            }

        } catch (err) {
            if (err?.message === "Network Error") {
                setError(err.message);
            }
            if (err.response?.status === 404) {
                setError(err.response.data.message);
            }
            else if (err.response?.status === 500) {
                setError(err.response.data.message);
            }
        } finally {
            setLoader(false);
        }
    }

    // const handleDelete = async () => {
    //     setIsDeleteLoading(true);

    //     try {
    //         const res = await Axios.delete(`/job/job-seekers/${deleteId}`, authHeader());

    //         if (res.data?.status) {
    //             toast.success(res.data?.message);

    //             handleClose();
    //             // GetJobSeeker();

    //             setJobSeeker((prev) => prev.filter((i) => i.id !== deleteId));
    //         }
    //         else {
    //             toast.error(res.data?.message);
    //         }
    //     } catch (err) {
    //         // console.error("Delete-JobSeeker-Error++", err);
    //     } finally {
    //         setIsDeleteLoading(false);
    //     }
    // }

    const CreatedDate = (createddate) => {
        const date = new Date(createddate);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${day}-${month}-${year}, ${hours}:${minutes}:${seconds}`;
    }

    const columns = [
        {
            name: 'No.',
            selector: (_, index) => (currentPage - 1) * perPage + (index + 1),
            // width: '80px'
            maxWidth: "5%",
            minWidth: "80px",
        },
        {
            name: 'First Name',
            cell: (row) => row.firstName,
            width: '112px'
        },
        {
            name: 'Last Name',
            cell: (row) => row.lastName,
            width: '112px'
        },
        {
            name: 'Email',
            cell: (row) => row.email,
            maxWidth: "20%",
            minWidth: "150px",
        },
        {
            name: 'Phone',
            cell: (row) => row.phone,
        },
        {
            name: 'Gender',
            cell: (row) => row.phone,
        },
        {
            name: 'Time',
            cell: (row) => row.time,
        },
        {
            name: 'Cover Letter',
            cell: (row) => row.coverLatter,
            // width: '125px',
            maxWidth: "20%",
            minWidth: "125px",
            style: {
                margin: "10px 0"
            }
        },
        {
            name: 'Created Date',
            cell: (row) => (
                CreatedDate(row.createdAt)
            ),
            // width: '200px',
            maxWidth: "20%",
            minWidth: "130px",
        },
        {
            name: 'Resume',
            cell: (row) =>
            (
                <div className="d-flex align-items-center">
                    {/* <button type="button" className="btn btn-sm me-2 text-nowrap pdf-icon"
                        onClick={() => {
                            
                        }}  
                    >
                        <FaFilePdf />
                    </button> */}
                    

                    <a href={row.resume} target="_blank" className="btn btn-sm me-2 text-nowrap pdf-icon">
                        <FaFilePdf />
                    </a>
                    {/* rel="noopener noreferrer" */}
                </div>
            ),
            width: '100px'
        },
    ];

    const filterJobSeeker = jobSeeker.filter((i) => {
        const searchstr = `${i.firstName} ${i.lastName} ${i.email} ${i.phone} ${i.gender} ${i.time} ${i.coverLatter} ${CreatedDate(i.createdAt)}`.toLowerCase();

        return searchstr.includes(search.toLowerCase());
    });

    const startIndex = (currentPage - 1) * perPage;
    const currentPageData = filterJobSeeker.slice(startIndex, startIndex + perPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    useEffect(() => {
        GetJobSeeker(id);
    }, [id]);

    return (
        <>

            {/* <section className="title">
                <div className="row">
                    <div className="col-12 mt-4">
                        <h3>Job Seeker</h3>
                    </div>
                </div>
            </section> */}

            <section className="categorylist-section mt-5">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                    <h3 className="mb-0 page-title">
                                        Job Seeker
                                    </h3>
                                </div>
                            </div>

                            <div className="card-body table-responsive">
                                <div className="row mt-2 mb-2 justify-content-between">
                                    <div className="col-md-auto search ms-auto">
                                        <div className="dt-search d-flex align-items-center gap-1">
                                            <label htmlFor="dt-search-0" className='search-label'>
                                                Search:
                                            </label>
                                            <input
                                                type="search"
                                                className="form-control form-control-sm"
                                                id="dt-search-0"
                                                name='search'
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                </div>

                                {
                                    error ? (
                                        <div className="text-center text-dark my-5" style={{ fontSize: '22px', fontWeight: '700' }}>
                                            {error}
                                        </div>
                                    ) : (
                                        <DataTable
                                            columns={columns}
                                            data={currentPageData}
                                            progressPending={loader}
                                            progressComponent={
                                                <div className="d-flex justify-content-center align-items-center" style={{ height: '20vh' }}>
                                                    <div className="spinner-border text-dark" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </div>
                                            }
                                            noDataComponent={
                                                <div className="text-center my-5" style={{ fontSize: '22px', fontWeight: '700' }}>
                                                    Data Not Found
                                                </div>
                                            }
                                            pagination
                                            paginationServer
                                            paginationTotalRows={filterJobSeeker.length}
                                            paginationPerPage={perPage}
                                            onChangeRowsPerPage={handleRowsPerPageChange}
                                            onChangePage={handlePageChange}
                                            customStyles={customStyles}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default JobSeeker;