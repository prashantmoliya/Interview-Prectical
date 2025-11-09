import React, { useState } from 'react'

import Search from '../../../assets/images/search.png';

import { DashboardContent, SourceContent } from '../../../constants/Data';
import { NavLink } from 'react-router-dom';

const Source = () => {

    const [search, setSearch] = useState("");

    return (
        <>

            <section className="categorylist-section mt-2 mt-lg-2 mt-xl-3">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header pt-3">
                                <div className="d-flex align-items-center justify-content-end flex-wrap">
                                    {/* <h3 className="mb-0 page-title">
                                        Add Client
                                    </h3> */}

                                    <div className="w-50 d-flex justify-content-end">
                                        <div className="search d-flex align-items-center">
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


                            <div className="dashboard">
                                <div className="row gx-5 mb-5">

                                    {
                                        SourceContent?.admin?.map((i, index) => {
                                            return (
                                                <div className="col-xxl-3 col-xl-4 col-md-6 col-12 mt-lg-4 mt-4" key={index}>
                                                    <NavLink to={`${i.route}/${i.id}`}>
                                                        <div className="card shadow border-0">
                                                            <div className="card-body">
                                                                <div className="row align-items-center">
                                                                    <div className="col">
                                                                        <span className="card-title mb-0">
                                                                            {i.count || 0}
                                                                        </span>
                                                                        <span className="h6 fw-semibold text-muted text-sm d-block mt-2 mb-0 title">
                                                                            {i.name}
                                                                        </span>
                                                                    </div>
                                                                    <div className="col-auto">
                                                                        <div className="icon icon-shape bg-tertiary text-dark text-lg rounded-circle">
                                                                            {i.icon}
                                                                        </div>
                                                                    </div>
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

export default Source;