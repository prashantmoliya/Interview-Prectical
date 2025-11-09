import React, { useEffect, useState } from 'react'

import Search from '../../../assets/images/search.png';
import DataNotFound from '../../../assets/images/data_not_found.svg';
import SourceBack from '../../../assets/images/source-back.png';    
import SourceView from '../../../assets/images/source-view.png';
import SourceDownload from '../../../assets/images/source-download.png';
import RightSource from '../../../assets/images/right_source.png';
import DefaultPdf from '../../../assets/images/default-pdf.png';
import DummyPassport from '../../../assets/images/dummy-passport.png';

import { SourceContent, SourceFormContent, ViewUserFormData, visaCatagory } from '../../../constants/Data';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reqtoAdminUserFormPdfDocs, reqtoAdminViewUser } from '../../../redux-Toolkit/services/admin/AdminServices';

const SourceForm = () => {

    const { userId, userFormId, category } = useParams();
    const { state = {} } = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const adminReducer = useSelector((state) => state.Admin);
    const { usersDetail, userFormPdfDocsLoader, userFormPdfDocsList } = adminReducer;

    // const name = ViewUserFormData.find((i) => i.route === category);

    const handleViewUser = async (id) => {
        await dispatch(reqtoAdminViewUser(id));
    }

    const handleUserGetFormPdfDocs = async ({ userId, userFormId }) => {
        await dispatch(reqtoAdminUserFormPdfDocs({ userId, userFormId }));
    }


    const handleDownload = async (file) => {
        // const link = document.createElement('a');
        // link.href = file?.pdf; 
        // // link.target = "_blank";

        // // link.download = file?.fileName || "form-document.pdf";\
        // const fileName = file?.pdf?.split('/').pop() || "form-document.pdf";
        // console.log(fileName);
        // link.download = fileName;

        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);

        try {
            const response = await fetch(file?.pdf, { method: "GET" });
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;

            // Always extract file name from URL
            const fileName = file?.pdf?.split("/").pop() || "form-document.pdf";
            link.download = fileName;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Cleanup
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    }

    useEffect(() => {
        if (userId && userFormId) {
            handleViewUser(userId);
            handleUserGetFormPdfDocs({ userId, userFormId });
        }
    }, [userId, userFormId]);


    return (
        <>

            <section className="categorylist-section mt-2 mt-lg-2 mt-xl-3">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header pt-3 ps-0">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <h3 className="mb-0 page-title d-flex align-items-center">
                                        <button type='button' className='bg-transparent border-0 me-4' onClick={() => navigate(-1)}>
                                            <img src={SourceBack} alt="" />
                                        </button>

                                        <span>{usersDetail?.name}</span>

                                        <div className='mx-3'>
                                            <img src={RightSource} alt="" />
                                        </div>

                                        {state?.category}
                                    </h3>
                                </div>
                            </div>


                            <div className="dashboard">

                                <div className="row gx-5 mb-5">
                                    {

                                        userFormPdfDocsList?.length > 0
                                            ? (
                                                // SourceFormContent?.superadmin?.map((i, index) => {
                                                userFormPdfDocsList?.map((i, index) => {
                                                    return (
                                                        <>

                                                            <div className="pt-4">
                                                                <h3 className="mb-0 page-title source">
                                                                    Form
                                                                </h3>
                                                            </div>
                                                            <div className="col-xxl-3 col-xl-4 col-md-6 col-12 mt-lg-3 mt-4" key={index}>
                                                                {/* <div> */}
                                                                <div className="card shadow border-0">
                                                                    <div className="card-body">
                                                                        <div className="row align-items-center">
                                                                            <div className="col p-0">
                                                                                <div className="icon icon-shape bg-tertiary text-dark text-lg rounded-circle w-100 h-100 position-relative">
                                                                                    <button
                                                                                        type='button'
                                                                                        className='bg-transparent border-0 position-absolute'
                                                                                        style={{ top: '8px', right: "47px" }}
                                                                                        onClick={() => handleDownload(i)}
                                                                                    >
                                                                                        <img src={SourceDownload} alt="Download" className="img-fluid" />
                                                                                    </button>

                                                                                    <button
                                                                                        type='button'
                                                                                        className='bg-transparent border-0 position-absolute'
                                                                                        style={{ top: '8px', right: "8px" }}
                                                                                        onClick={() => window.open(i.pdf, '_blank')}
                                                                                    >
                                                                                        <img src={SourceView} alt="View" className="img-fluid" />
                                                                                    </button>
                                                                                    <img src={DefaultPdf} alt="DefaultPdf" className="img-fluid w-100 h-100" />
                                                                                </div>
                                                                                <span className="h6 fw-semibold text-muted text-sm d-block mt-3 mb-0 title">
                                                                                    {i.category}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* </div> */}
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            ) : (
                                                <div className='my-5 pt-5 text-center'>
                                                    <div>
                                                        <img src={DataNotFound} alt="Not Found" className='img-fluid' />
                                                    </div>
                                                    <div
                                                        className="mt-5"
                                                        style={{ fontSize: '28px', fontWeight: 600 }}
                                                    >
                                                        Data Not Found
                                                    </div>
                                                </div>
                                            )
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