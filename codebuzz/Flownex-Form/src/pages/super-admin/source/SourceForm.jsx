import React, { useState } from 'react'

import Search from '../../../assets/images/search.png';
import SourceBack from '../../../assets/images/source-back.png';
import SourceView from '../../../assets/images/source-view.png';

import { SourceContent, SourceFormContent, visaCatagory } from '../../../constants/Data';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const SourceForm = () => {

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
                                        <button type='button' className='bg-transparent border-0 me-4' onClick={() => navigate(-1)}>
                                            <img src={SourceBack} alt="" />
                                        </button>

                                        {name?.name}
                                    </h3>
                                </div>
                            </div>


                            <div className="dashboard">
                                <div className="row gx-5 mb-5">

                                    {
                                        SourceFormContent?.superadmin?.map((i, index) => {
                                            return (
                                                <div className="col-xxl-3 col-xl-4 col-md-6 col-12 mt-lg-4 mt-4" key={index}>
                                                    {/* <div> */}
                                                    <div className="card shadow border-0">
                                                        <div className="card-body">
                                                            <div className="row align-items-center">
                                                                <div className="col p-0">
                                                                    <div className="icon icon-shape bg-tertiary text-dark text-lg rounded-circle w-100 h-100 position-relative">
                                                                        <button type='button' className='bg-transparent border-0 position-absolute' style={{ top: '8px', right: "8px" }}>
                                                                            <img src={SourceView} alt="DashUser" className="img-fluid" />
                                                                        </button>

                                                                        <img src={i.img} alt="DashUser" className="img-fluid w-100 h-100" />
                                                                    </div>
                                                                    <span className="h6 fw-semibold text-muted text-sm d-block mt-3 mb-0 title">
                                                                        {i.fileName}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* </div> */}
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

export default SourceForm;