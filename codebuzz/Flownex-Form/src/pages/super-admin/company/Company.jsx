import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import UserImage from "../../assets/Images/user.jpg";
import Search from '../../../assets/images/search.png';
import SearchClose from '../../../assets/images/search_close.png';
import ClipCopy from '../../../assets/images/clip-copy.png';
import eye from '../../../assets/images/eye.svg';
import edit from '../../../assets/images/edit.svg';
import trash from '../../../assets/images/trash.svg';
import share from '../../../assets/images/share.svg';

import Delete from '../../../components/modal/delete/Delete';

import { CompanyData, UserData } from "../../../constants/Data";
import DataTableComponents from "../../../components/data-table/DataTableComponents";
import { FaEye } from "react-icons/fa";
import { BsCopy } from "react-icons/bs";
import { IoMdLink } from "react-icons/io";
import { LuShare } from "react-icons/lu";
import AddCompany from "../../../components/modal/super-admin/company/add/AddCompany";
import EditCompany from "../../../components/modal/super-admin/company/edit/EditCompany";
import ViewCompany from "../../../components/modal/super-admin/company/view/ViewCompany";
import { useDispatch, useSelector } from "react-redux";
import { reqtoSuperAdminDeleteCompany, reqtoSuperAdminGetCompany, reqtoSuperAdminStatusCompany } from "../../../redux-Toolkit/services/superadmin/SuperAdminServices";
import { CreatedDate } from "../../../utils/DateTimeFormate";
import { InputSwitch } from "primereact/inputswitch";

// import { CreatedDate } from '../../utils/DateTimeFormate';

const modal = {
    addCompany: false,
    editCompany: false,
    deleteCompany: false,
}

const initialState = {
    viewId: null,
    editCompany: null,
    deleteId: null,
    shareLink: null,
}

const Company = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const superAdminReducer = useSelector((state) => state.SuperAdmin);
    const { companyList, loader, deleteLoader, companyLoader } = superAdminReducer;

    // const [companyList, setCompanyList] = useState(CompanyData);
    // const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");
    const [select, setSelect] = useState("");

    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
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
        const res = await dispatch(reqtoSuperAdminDeleteCompany(modalState.deleteId));

        if (res.payload?.status) {
            GetCompanyList();
            handleClose();
        }
    }

    const handleStatusChange = async (Uid) => {
        const res = await dispatch(reqtoSuperAdminStatusCompany(Uid));

        if (res.payload?.status) {
            // GetCompanyList();
        }
    }

    const GetCompanyList = async () => {
        await dispatch(reqtoSuperAdminGetCompany());
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
            name: 'Logo',
            cell: (row) => (
                <div className="">
                    <img
                        src={row.logo}
                        alt="Image"
                        className={``}
                        style={{
                            maxWidth: "60px",
                            maxHeight: "60px",
                            padding: '8px 0'
                        }}
                    />
                </div>
            ),
            width: "150px",
        },
        {
            name: 'Type',
            cell: (row) => row?.premium || "-",
            minWidth: "100px !important",
            width: "12%",
        },
        {
            name: 'Company Name',
            cell: (row) => row.companyName || "-",
            // maxwidth: "17%",
            // minWidth: "100px",
            minWidth: "180px !important",
            width: "18%",
        },
        {
            name: 'Email',
            cell: (row) => row.email || "-",
            minWidth: "250px !important",
            width: "23%",
        },
        {
            name: 'Status',
            cell: (row) => (
                <div>
                    <InputSwitch
                        checked={row.status === "Active"}
                        onChange={() => handleStatusChange(row?.id)}
                        className="custom-switch-btn"
                    />
                </div>
            ),
            width: '100px',
        },
        {
            name: 'Created Date',
            cell: (row) => CreatedDate(row.createdAt),
            minWidth: "180px !important",
            width: "12%",
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

                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon me-3"
                        // onClick={() => navigate(`/superadmin/company/edit/${row.name}`)}
                        onClick={() => {
                            setModalShow({ ...modalShow, editCompany: true });
                            setModalState({ ...modalState, editCompany: row });
                        }}
                    >
                        <img src={edit} alt="edit" />
                    </button>

                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon"
                        onClick={() => {
                            setModalShow({ ...modalShow, deleteCompany: true });
                            setModalState({ ...modalState, deleteId: row.id });
                        }}
                    >
                        <img src={trash} alt="trash" />
                    </button>

                    {/* <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon me-3"
                        onClick={() => { }}
                    >
                        <img src={share} alt="share" />
                    </button> */}
                </div>
            ),
            width: '130px',
            center: true
        },
    ];


    const filterCompany = companyList?.filter((i) => {
        const searchstr = `${i.premium} ${i.companyName} ${i.email}  ${CreatedDate(i.createdAt)}`.toLowerCase();

        const matchesSearch = searchstr.includes(search.toLowerCase());

        const matchesSelect = select ? i.premium === select : true;

        return matchesSearch && matchesSelect;

    });

    const startIndex = (currentPage - 1) * perPage;
    const currentPageData = filterCompany?.slice(startIndex, startIndex + perPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    useEffect(() => {
        GetCompanyList();
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
                                        Partner
                                    </h3> */}

                                    <div className="col-lg-12 col-12 d-flex justify-content-end">
                                        <div className="searchs d-flex align-items-center gap-1 me-2 me-xl-4">
                                            <select
                                                className="form-select form-control"
                                                id="type"
                                                name="type"
                                                value={select}
                                                onChange={(e) => setSelect(e.target.value)}
                                                required
                                            >
                                                <option value="">All</option>
                                                <option value="Basic">Basic</option>
                                                <option value="Manual">Manual</option>
                                                <option value="Professional">Professional</option>
                                            </select>
                                        </div>

                                        <div className="search d-flex align-items-center gap-1 me-2 me-xl-4">
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

                                        <button className="add-btn boreder-0" type="button"
                                            // onClick={() => navigate('/superadmin/company/add')}
                                            onClick={() => setModalShow({ ...modalShow, addCompany: true })}
                                        >
                                            Add Partner
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
                                            filterDataLength={filterCompany.length || 0}
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

            {/* Add-Company Modal */}
            <AddCompany show={modalShow.addCompany} handleClose={handleClose} GetCompanyList={GetCompanyList} />

            {/* Edit-Company Modal */}
            <EditCompany show={modalShow.editCompany} handleClose={handleClose} GetCompanyList={GetCompanyList} company={modalState.editCompany} />

            {/* View-Company Modal */}
            <ViewCompany show={modalShow.viewCompany} handleClose={handleClose} companyId={modalState.viewId} />

            {/* Delete-Company Modal */}
            <Delete show={modalShow.deleteCompany} handleClose={handleClose} isDeleteLoading={deleteLoader} handleDelete={handleDelete} role={"Partner"} />

        </>
    )
}

export default Company;