import React, { useEffect } from 'react'
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Rating from '@mui/material/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { getapi } from '../Redux/ApiData/AxiosApi';
import Spinner from 'react-bootstrap/Spinner';

const Dashboard = () => {

    const dispatch = useDispatch();

    const { loader, error, data } = useSelector((state) => ({
        loader: state.dashboard.loader,
        error: state.dashboard.error,
        data: state.dashboard.data,
    }));

    const [search, setsearch] = useState("");
    const [select, setselect] = useState("");

    useEffect(() => {
        dispatch(getapi(search, select));
    }, [search, select]);


    return (
        <>
            <div className='container'>
                {loader ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <div>

                        <div className='d-flex'>
                            <div className="input-group mb-1 w-50" style={{ marginLeft: '37%' }}>
                                <input type="search" className="form-control rounded " placeholder="Search..." aria-label="Search" aria-describedby="search-addon" value={search} onChange={(e) => setsearch(e.target.value)} />
                            </div>

                            <div className=''>
                                <Form.Select className='ms-3' value={select} onChange={(e) => setselect(e.target.value)} style={{ width: '100%' }} aria-label="Default select example">
                                    <option value="">select category</option>
                                    <option value="smartphones">smartphones</option>
                                    <option value="laptops">laptops</option>
                                    <option value="fragrances">fragrances</option>
                                    <option value="skincare">skincare</option>
                                    <option value="groceries">groceries</option>
                                    <option value="home-decoratio">home-decoration</option>
                                </Form.Select>
                            </div>
                        </div>

                        <table className="table align-middle mb-0 bg-white border ">
                            <thead className="bg-light">
                                <tr>
                                    <th>Id</th>
                                    <th>Category</th>
                                    <th>Brand</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>DiscountPercentage</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.map((i, index) => {
                                        return (
                                            <tr>
                                                <td>{i.id}.</td>
                                                <td>{i.category}</td>
                                                <td>{i.brand}</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <img src={i.thumbnail} alt style={{ width: 45, height: 45 }} className="rounded-circle" />
                                                        <div className="ms-3">
                                                            <p className="fw-bold mb-1">{i.title}</p>
                                                            <p className="text-muted mb-0">
                                                                <Rating name="half-rating-read" defaultValue={i.rating} precision={0.1} readOnly />
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="fw-normal mb-1">{i.description}</p>
                                                </td>
                                                <td>
                                                    <span className="badge badge-success rounded-pill d-inline">Active</span>
                                                    {i.discountPercentage}
                                                </td>
                                                <td>{i.price}</td>
                                                <td>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>


                    </div>
                )
                }
            </div>
        </>
    )
}

export default Dashboard
