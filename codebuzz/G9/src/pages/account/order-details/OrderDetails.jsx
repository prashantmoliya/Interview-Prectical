import React, { useEffect } from 'react'

// Css
import "./OrderDetails.scss"

// Image
import OrderImg from "../../../assets/images/account/my-orders.svg";
import PdfImg from "../../../assets/images/account/pdf.svg";
// Light
import HomeLight from "../../../assets/images/account/home-light.svg";
import WorkLight from "../../../assets/images/account/work-light.svg";
import OtherLight from "../../../assets/images/account/other-light.svg";
// Dark
import HomeDark from "../../../assets/images/account/home-dark.svg";
import WorkDark from "../../../assets/images/account/work-dark.svg";
import OtherDark from "../../../assets/images/account/other-dark.svg";

import useThemeMode from '../../../hooks/useThemeMode';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reqtoGetOrderDetail } from '../../../redux-Toolkit/services/AccountServices';
import { FormateCreatedDate } from '../../../utils';
import useCurrency from '../../../hooks/useCurrency';
import { currencyData } from '../../../constants/data';


const OrderDetails = () => {

    const ThemeMode = useThemeMode();
    const currency = useCurrency();

    const { orderId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loader, orderDetail } = useSelector((state) => state.UserAccount);

    // OrderDetail 
    const GetOrderDetail = async (id, currency) => {
        await dispatch(reqtoGetOrderDetail({ id, currency }));
    }

    useEffect(() => {
        GetOrderDetail(orderId, currency);
    }, [orderId, currency]);

    return (
        <>

            {/* ------ Order-Detail Start ------ */}
            <div className="order_details pd-x">
                <div className="page_menu">
                    My Orders {` > `} <span>Order Details</span>
                </div>

                <div className="order_detail_info d-flex justify-content-between align-items-center">
                    <div className='d-flex align-items-center'>
                        <div>
                            <h4>Order ID: {orderDetail?.orderId}</h4>

                            <p className='mb-0'>
                                Order Date: {FormateCreatedDate(orderDetail?.createdAt)}
                            </p>
                        </div>

                        <button type='button' className='pdf_btn ms-4'>
                            <img src={PdfImg} alt="" className='img-fluid' draggable={false} />
                        </button>
                    </div>

                    <div className={`status ${orderDetail?.status === 'Delivered' ? 'delivered' : orderDetail?.status === 'Pending' ? 'pending' : 'cancelled'}`}>
                        {orderDetail?.status}
                    </div>
                </div>

                <div className="lines mx-0"></div>

                <div className="products_detail_info">
                    <h4>Products</h4>

                    {/* <div className="order_box d-flex align-items-center">
                        <div className="image">
                            <img src={OrderImg} alt="" className='img-fluid' draggable={false} />
                        </div>
                        <div className="order_detail w-100">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="name">
                                    Silver Engagement Diamond Ring
                                </div>

                                <div className='total_price'>
                                    $276.00
                                </div>
                            </div>

                            <div className="qty">Quantity: 2</div>
                            <div className="price">Per Item: $138.00</div>
                        </div>
                    </div>

                    <div className="order_box d-flex align-items-center">
                        <div className="image">
                            <img src={OrderImg} alt="" className='img-fluid' draggable={false} />
                        </div>
                        <div className="order_detail w-100">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="name">
                                    Silver Engagement Diamond Ring
                                </div>

                                <div className='total_price'>
                                    $138.00
                                </div>
                            </div>

                            <div className="qty">Quantity: 1</div>
                            <div className="price">Per Item: $138.00</div>
                        </div>
                    </div> */}

                    {
                        orderDetail?.items?.map((i, index) => {
                            return (
                                <div div className="order_box d-flex align-items-center" key={index}>
                                    <div className="image">
                                        <img src={i?.images[0]} alt="" className='img-fluid' draggable={false} />
                                    </div>
                                    <div className="order_detail w-100">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="name">
                                                {i?.title}
                                            </div>

                                            <div className='total_price'>
                                                {currency ? currencyData?.find((i) => i?.value === currency)?.symbol : '₹'}
                                                {Number(i?.subtotal)}
                                            </div>
                                        </div>

                                        <div className="qty">Quantity: {i?.quantity}</div>
                                        <div className="price">
                                            Per Item: {` `}
                                            {currency ? currencyData?.find((i) => i?.value === currency)?.symbol : '₹'}
                                            {Number(i?.price)}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="lines mx-0"></div>

                <div className="payment_detail_info">
                    <h4>Payment Details</h4>

                    <div className='price_list'>
                        <div className='d-flex justify-content-between align-items-center mb-13'>
                            <div className="name">Payment Method</div>
                            <div className="price">UPI: xxxxxx@oksbi</div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center mb-13 total'>
                            <div className="name">Subtotal</div>
                            <div className="price">
                                {currency ? currencyData?.find((i) => i?.value === currency)?.symbol : '₹'}
                                {Number(orderDetail?.paymentDetails?.subtotal)}</div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center mb-13'>
                            <div className="name">GST & Taxes (18%)</div>
                            <div className="price">
                                {currency ? currencyData?.find((i) => i?.value === currency)?.symbol : '₹'}
                                {Number(orderDetail?.paymentDetails?.gst)}</div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center mb-13'>
                            <div className="name">Shipping Fees</div>
                            <div className="price">
                                {currency ? currencyData?.find((i) => i?.value === currency)?.symbol : '₹'}
                                0.00
                            </div>
                        </div>
                        {/* <div className='d-flex justify-content-between align-items-center mb-13 coupon'>
                            <div className="name">Coupon</div>
                            <div className="price">- {currency ? currencyData?.find((i) => i?.value === currency)?.symbol : '₹'}175.00</div>
                        </div> */}
                        <div className='d-flex justify-content-between align-items-center total'>
                            <div className="name">Total</div>
                            <div className="price">
                                {currency ? currencyData?.find((i) => i?.value === currency)?.symbol : '₹'}
                                {Number(orderDetail?.paymentDetails?.total)}</div>
                        </div>
                    </div>
                </div>

                <div className="lines mx-0"></div>

                <div className="shipping_detail px-0">
                    <h4>Shipping Details</h4>

                    <div className='title d-flex align-items-center'>
                        {/* <img src={ThemeMode ? HomeLight : HomeDark} alt="" className='img-fluid me-3' draggable={false} /> */}
                        <img src={orderDetail?.address?.address_type === 'Home' ? ThemeMode ? HomeLight : HomeDark : orderDetail?.address?.address_type === 'Work' ? ThemeMode ? WorkLight : WorkDark : ThemeMode ? OtherLight : OtherDark} alt="" className='img-fluid me-3' draggable={false} />

                        {orderDetail?.address?.address_type}
                    </div>
                    <p className='mb-0'>
                        {/* 123, Shyamdham Soc, Nana Varachha Surat, Gujarat, India - 395006 */}
                        {orderDetail?.address?.address_line_1}, {orderDetail?.address?.city}, {orderDetail?.address?.state}, {orderDetail?.address?.country} - {orderDetail?.address?.postal_code}
                    </p>
                </div>

            </div >
            {/* ------ Order-Detail End ------ */}

        </>
    )
}

export default OrderDetails;