import React, { useEffect, useState } from 'react'

// Css

// Image
// Light
import OrderImg from "../../../assets/images/account/my-orders.svg";

import AccountSidebar from '../../../components/account-sidebar/AccountSidebar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reqtoGetOrder } from '../../../redux-Toolkit/services/AccountServices';
import { FormateCreatedDate } from '../../../utils';
import useCurrency from '../../../hooks/useCurrency';
import { currencyData } from '../../../constants/data';
import Pagination from '../../../components/pagination/Pagination';

const Orders = () => {

    const currency = useCurrency();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userAccount = useSelector((state) => state.UserAccount);
    const { loader, orderList, orderListPagination } = userAccount;
    console.log(orderList);

    const [orderFilter, setOrderFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const GetOrder = async (filter, currency, page) => {
        await dispatch(reqtoGetOrder({ filter, currency, page, perPage: 9 }));
    }

    useEffect(() => {
        GetOrder(orderFilter, currency, currentPage);
    }, [orderFilter, currency, currentPage]);

    return (
        <>

            {/* ------ Orders Start ------ */}
            <div className="account pd-x">
                <div className="page_menu">
                    Home {` > `} <span>My Orders</span>
                </div>


                <div className="row">
                    <div className="col-lg-3">
                        <AccountSidebar />
                    </div>

                    <div className="col-lg-9">
                        <div className="account_overview">
                            <h4>My Orders</h4>

                            <div className='order_filter d-flex align-items-center'>
                                <button
                                    type='button'
                                    className={`filter_btn ${orderFilter === '' ? 'active' : ''}`}
                                    onClick={() => setOrderFilter('')}
                                >
                                    All
                                </button>
                                <button
                                    type='button'
                                    className={`filter_btn ${orderFilter === 'Pending' ? 'active' : ''}`}
                                    onClick={() => setOrderFilter('Pending')}
                                >
                                    Pending
                                </button>
                                <button
                                    type='button'
                                    className={`filter_btn ${orderFilter === 'Completed' ? 'active' : ''}`}
                                    onClick={() => setOrderFilter('Completed')}
                                >
                                    Completed
                                </button>
                                <button
                                    type='button'
                                    className={`filter_btn ${orderFilter === 'Returned' ? 'active' : ''}`}
                                    onClick={() => setOrderFilter('Returned')}
                                >
                                    Returned
                                </button>
                            </div>

                            <div className="details">

                                {
                                    orderList?.length > 0 ? (
                                        orderList?.map((i, index) => {
                                            return (
                                                <React.Fragment key={i?.id}>
                                                    {/* <div className="order_box d-flex">
                                                    <div className="image">
                                                        <img src={i?.items[0]?.images[0]} alt={i?.items[0]?.title} className='img-fluid' draggable={false} />
                                                    </div>
                                                    <div className="order_detail w-100">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="id">
                                                                Order ID: <span>{i?.items[0]?.orderId}</span>
                                                            </div>

                                                            <div className={`status ${i?.status === 'Delivered' ? 'delivered' : i?.status === 'Pending' ? 'pending' : 'cancelled'}`}>
                                                                {i?.status}
                                                            </div>
                                                        </div>

                                                        <div className="name">{i?.items[0]?.title}</div>
                                                        <div className="price">Total: ${Number(i?.items[0]?.selling_price)?.toFixed(2)}</div>

                                                        <button type='button' className='main_btn order_btn' onClick={() => navigate(`/order-details/${i?.id}`)}>
                                                            Order Details
                                                        </button>
                                                    </div>
                                                </div> */}

                                                    <div className="order_box d-flex">
                                                        {/* <div className="image">
                                                        <img src={i?.items[0]?.images[0]} alt={i?.items[0]?.title} className='img-fluid' draggable={false} />
                                                    </div> */}
                                                        <div className="order_detail w-100">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="id">
                                                                    Order ID: <span>{i?.items[0]?.orderId}</span>
                                                                </div>

                                                                <div className="price">
                                                                    {currency ? currencyData?.find((i) => i?.value === currency)?.symbol : '₹'}
                                                                    {Number(i?.paymentDetails?.total)}</div>
                                                            </div>

                                                            <div className="name">Order Date: {FormateCreatedDate(i?.createdAt)}</div>

                                                            <button type='button' className='main_btn order_btn' onClick={() => navigate(`/order-details/${i?.id}`)}>
                                                                Order Details
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {index !== orderList.length - 1 && <div className="line"></div>}
                                                </React.Fragment>
                                            )
                                        })
                                    ) : (
                                        <div className='order_box text-center'>
                                            <div className="order_detail "><span className='price'>You have not placed any orders yet.</span></div>
                                        </div>
                                    )
                                }

                            </div>

                            {
                                orderList?.length > 0 && (
                                    <div className="mt-5">
                                        <Pagination
                                            pagination={orderListPagination}
                                            currentPage={currentPage}
                                            onPageChange={(page) => setCurrentPage(page)}
                                        />
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
            {/* ------ Orders End ------ */}


        </>
    )
}

export default Orders;





{/* <div className="order_box d-flex">
                                    <div className="image">
                                        <img src={OrderImg} alt="" className='img-fluid' draggable={false} />
                                    </div>
                                    <div className="order_detail w-100">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="id">
                                                Order ID: <span>#569848</span>
                                            </div>

                                            <div className='status pending'>
                                                Pending
                                            </div>
                                        </div>

                                        <div className="name">Silver Engagement Diamond Ring</div>
                                        <div className="price">Total: $138.00</div>

                                        <button type='button' className='main_btn order_btn' onClick={() => navigate(`/order-details/${1}`)}>
                                            Order Details
                                        </button>
                                    </div>
                                </div>

                                <div className="line"></div>

                                <div className="order_box d-flex">
                                    <div className="image">
                                        <img src={OrderImg} alt="" className='img-fluid' draggable={false} />
                                    </div>
                                    <div className="order_detail w-100">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="id">
                                                Order ID: <span>#856328</span>
                                            </div>

                                            <div className='status delivered'>
                                                Delivered
                                            </div>
                                        </div>

                                        <div className="name">Silver Engagement Diamond Ring</div>
                                        <div className="price">Total: $165.00</div>

                                        <button type='button' className='main_btn order_btn' onClick={() => navigate(`/order-details/${1}`)}>
                                            Order Details
                                        </button>
                                    </div>
                                </div>

                                <div className="line"></div>

                                <div className="order_box d-flex">
                                    <div className="image">
                                        <img src={OrderImg} alt="" className='img-fluid' draggable={false} />
                                    </div>
                                    <div className="order_detail w-100">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="id">
                                                Order ID: <span>#6598745</span>
                                            </div>

                                            <div className='status cancelled'>
                                                Cancelled
                                            </div>
                                        </div>

                                        <div className="name">Silver Engagement Diamond Ring</div>
                                        <div className="price">Total: $125.00</div>

                                        <button type='button' className='main_btn order_btn' onClick={() => navigate(`/order-details/${1}`)}>
                                            Order Details
                                        </button>
                                    </div>
                                </div> */}
