import React, { useState } from 'react'

import Search from '../../../assets/images/search.png';
import SourceBack from '../../../assets/images/source-back.png';
import SourceFolder from '../../../assets/images/source-folder.png';

import { SourceContent, visaCatagory } from '../../../constants/Data';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const SourceUser = () => {

    const { userId } = useParams();
    const navigate = useNavigate();
    
    const [search, setSearch] = useState("");

    const name = SourceContent.superadmin.find((i) => i.id === parseInt(userId));

    return (
        <>

            <section className="categorylist-section mt-2 mt-lg-2 mt-xl-3">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header pt-3 ps-0">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <h3 className="mb-0 page-title">
                                        <button type='button' className='bg-transparent border-0 me-4' onClick={()=> navigate(-1)}>
                                            <img src={SourceBack} alt="" />
                                        </button>

                                        {name?.name}
                                    </h3>

                                    {/* <div className="w-50 d-flex justify-content-end">
                                        <div className="search d-flex align-items-center">
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
                                    </div> */}

                                </div>
                            </div>


                            <div className="dashboard">
                                <div className="row gx-5 mb-5">

                                    {
                                        visaCatagory?.map((i, index) => {
                                            return (
                                                <div className="col-xxl-3 col-xl-4 col-md-6 col-12 mt-lg-4 mt-4" key={index}>
                                                    <NavLink to={`/superadmin/source/${userId}/${i.route}`}>
                                                        <div className="card shadow border-0">
                                                            <div className="card-body">
                                                                <div className="row align-items-center">
                                                                    <div className="col">
                                                                        <div className="icon icon-shape bg-tertiary text-dark text-lg rounded-circle">
                                                                            <img src={SourceFolder} alt="DashUser" className="img-fluid" />
                                                                        </div>
                                                                        <span className="h6 fw-semibold text-muted text-sm d-block mt-2 mb-0 title">
                                                                            {i.category} Form
                                                                        </span>
                                                                    </div>
                                                                    {/* <div className="col-auto">
                                                                        <div className="icon icon-shape bg-tertiary text-dark text-lg rounded-circle">
                                                                            {i.icon}
                                                                        </div>
                                                                    </div> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </NavLink>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default SourceUser;