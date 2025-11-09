import React, { useEffect, useState } from 'react'
import { BiSolidCategory } from 'react-icons/bi'
import { PiListPlusFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { authHeader, Axios } from '../../helper/Axios'

const Dashboard = () => {

    const [dashboard, setDashboard] = useState({});

    const Dashboard = async () => {
        try {
            const res = await Axios.get("/auth/dashboard", authHeader());

            if (res.data?.status) {
                setDashboard(res.data.data);
            }

        } catch (err) {
            // console.error(err);
        }
    }

    useEffect(() => {
        Dashboard();
    }, []);

    return (
        <>
            {/* <section className="title">
                <div className="row">
                    <div className="col-12 mt-4">
                        <h3>Dashboard</h3>
                    </div>
                </div>
            </section> */}


            <div className="dashboard">
                <div className="row gx-5 mb-5">

                    <div className="col-xl-3 col-md-6 col-12 mt-lg-5 mt-4">
                        <Link to='/category'>
                            <div className="card shadow border-0">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <span className="h6 fw-semibold text-muted text-sm d-block mb-2 title">
                                                Total Category
                                            </span>
                                            <span className="mb-0 card-title">
                                                {dashboard?.categoryCount || 0}
                                            </span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-tertiary text-dark text-lg rounded-circle">
                                                <BiSolidCategory />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-xl-3 col-md-6 col-12 mt-lg-5 mt-4">
                        <Link to='/job'>
                            <div className="card shadow border-0">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <span className="h6 fw-semibold text-muted text-sm d-block mb-2 title">
                                                Total Job
                                            </span>
                                            <span className="mb-0 card-title">
                                                {dashboard?.jobCount || 0}
                                            </span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-tertiary text-dark text-lg rounded-circle">
                                                <PiListPlusFill />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-xl-3 col-md-6 col-12 mt-lg-5 mt-4">
                        <Link to='/blog'>
                            <div className="card shadow border-0">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <span className="h6 fw-semibold text-muted text-sm d-block mb-2 title">
                                                Total Blog
                                            </span>
                                            <span className="mb-0 card-title">
                                                {dashboard?.blogCount || 0}
                                            </span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-tertiary text-dark text-lg rounded-circle">
                                                <PiListPlusFill />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-xl-3 col-md-6 col-12 mt-lg-5 mt-4">
                        <Link to='/subscribe'>
                            <div className="card shadow border-0">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <span className="h6 fw-semibold text-muted text-sm d-block mb-2 title">
                                                Total Subscribe
                                            </span>
                                            <span className="mb-0 card-title">
                                                {dashboard?.subscribeCount || 0}
                                            </span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-tertiary text-dark text-lg rounded-circle">
                                                <PiListPlusFill />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard