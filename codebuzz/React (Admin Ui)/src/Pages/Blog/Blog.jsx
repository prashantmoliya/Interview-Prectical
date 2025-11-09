import React, { useEffect, useState } from 'react';
import { customStyles } from '../../Components/DataTable/DataTable';
import DataTable from 'react-data-table-component';
import { authHeader, Axios } from '../../helper/Axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Delete from '../../Components/Model/Delete/Delete';
import AddBlog from '../../Components/Offcanvas/Blog/AddBlog';
import EditBlog from '../../Components/Offcanvas/Blog/EditBlog';

const Blog = () => {

    const navigate = useNavigate();

    const [blog, setBlog] = useState([]);
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");

    const [editBlog, setEditBlog] = useState({});
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    // Offcanvas / Model
    const [modalShow, setModalShow] = useState({
        addBlog: false,
        editBlog: false,
        deleteBlog: false,
    });

    const handleClose = () => {
        setModalShow({
            addBlog: false,
            editBlog: false,
            deleteBlog: false,
        });
    }

    const GetBlog = async () => {
        setLoader(true);

        try {
            const res = await Axios.get(`/blog/list`, authHeader());

            if (res.data?.status) {
                setBlog(res.data.data);
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

    const handleDelete = async () => {
        setIsDeleteLoading(true);

        try {
            const res = await Axios.delete(`/blog/delete/${deleteId}`, authHeader());

            if (res.data?.status) {
                toast.success(res.data?.message);

                handleClose();
                // GetBlog();

                setBlog((prev) => prev.filter((i) => i.id !== deleteId));
            }
            else {
                toast.error(res.data?.message);
            }

        } catch (err) {
            // console.error("Delete-Job-Error++", err);
        } finally {
            setIsDeleteLoading(false);
        }
    }

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
            width: '80px'
        },
        {
            name: 'Title',
            cell: (row) => row.title,
            style: {
                margin: '10px 0 '
            }
        },
        {
            name: 'Image',
            cell: (row) => (
                <img
                    src={row?.image}
                    alt="Image"
                    style={{
                        maxWidth: "60px",
                        maxHeight: "60px",
                        padding: '8px 0'
                    }}
                />
            ),
            // maxWidth: "10%",
            // minWidth: "100px",
        },
        {
            name: 'Author Name',
            cell: (row) => row.authorname,
        },
        // {
        //     name: 'Description',
        //     cell: (row) => row.description,
        //     maxWidth: "20%",
        //     minWidth: "120px",
        // },
        {
            name: 'Created Date',
            cell: (row) => (
                CreatedDate(row.createdAt)
            ),
            maxWidth: "20%",
            minWidth: "130px",
        },
        {
            name: 'Action',
            cell: (row) =>
            (
                <div className="d-flex align-items-center">
                    <button type="button" className="btn btn-sm btn-neutral text-nowrap ri-edit-box-line me-2"
                        onClick={() => {
                            setModalShow({ ...modalShow, editBlog: true });
                            setEditBlog(row);
                        }}
                    ></button>

                    <button type="button" className="btn btn-sm btn-square btn-neutral text-danger-hover ri-delete-bin-line"
                        onClick={() => {
                            setModalShow({ ...modalShow, deleteBlog: true });
                            setDeleteId(row?.id);
                        }}
                    ></button>
                </div>
            ),
            width: '150px'
        },
    ];

    const filterBlog = blog.filter((i) => {
        const searchstr = `${i.title} ${i.companyName} ${i.categoryName} ${i.categoryName} ${i.title} ${CreatedDate(i.createdAt)}`.toLowerCase();

        return searchstr.includes(search.toLowerCase());
    });

    const startIndex = (currentPage - 1) * perPage;
    const currentPageData = filterBlog.slice(startIndex, startIndex + perPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    useEffect(() => {
        GetBlog();
    }, []);


    return (
        <>

            {/* <section className="title">
                <div className="row">
                    <div className="col-12 mt-4">
                        <h3>Blog</h3>
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
                                        Blog
                                    </h3>

                                    <button className="add-btn boreder-0" type="button" onClick={() => setModalShow({ ...modalShow, addBlog: true })}>
                                        Add Blog
                                    </button>
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
                                            paginationTotalRows={filterBlog.length}
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

            { /* ----- Add-Blog Offcanvas ----- */}
            <AddBlog show={modalShow.addBlog} handleClose={handleClose} GetBlog={GetBlog} />

            { /* ----- Edit-Blog Offcanvas ----- */}
            <EditBlog show={modalShow.editBlog} handleClose={handleClose} GetBlog={GetBlog} blogs={editBlog} />

            { /* ----- Delete-Blog Modal ----- */}
            <Delete show={modalShow.deleteBlog} handleClose={handleClose} isDeleteLoading={isDeleteLoading} handleDelete={handleDelete} role="Blog" />

        </>
    )
}

export default Blog;