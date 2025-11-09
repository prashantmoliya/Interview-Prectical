import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

// Css
import "./Checkout.scss"

// Image
import OrderImg from "../../assets/images/account/my-orders.svg";
// Light    
import HomeLight from "../../assets/images/account/home-light.svg";
import WorkLight from "../../assets/images/account/work-light.svg";
import OtherLight from "../../assets/images/account/other-light.svg";
// Dark
import HomeDark from "../../assets/images/account/home-dark.svg";
import WorkDark from "../../assets/images/account/work-dark.svg";
import OtherDark from "../../assets/images/account/other-dark.svg";

import ChooseAddress from '../../components/modal/choose-address/ChooseAddress';

import useThemeMode from '../../hooks/useThemeMode';
import { reqtoAddAddressDetail, reqtoGetOrderSummary, reqtoPaymentFetch } from '../../redux-Toolkit/services/PaymentServices';
import { useDispatch, useSelector } from 'react-redux';
import { reqtoGetManageAddress, reqtoUserAddress } from '../../redux-Toolkit/services/AccountServices';
import { loaders } from '../../components/loader/Loader';
import useCurrency from '../../hooks/useCurrency';
import { currencyData } from '../../constants/data';

const initialModalState = {
    chooseAddress: false,
}

const initialAddressState = {
    type: "Home",
    image: HomeLight,
    address: "123, Shyamdham Soc, Nana Varachha Surat, Gujarat, India - 395006",
}

const initialGstState = {
    name: "",
    GstNumber: "",
}

const Checkout = () => {

    const ThemeMode = useThemeMode();
    const currency = useCurrency();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loader, orderSummary } = useSelector((state) => state.Payment);

    const userAccount = useSelector((state) => state.UserAccount);
    const { userAddress, manageAddressList } = userAccount;


    const [formData, setFormData] = useState(initialGstState);

    const [modalShow, setModalShow] = useState(initialModalState);
    const [selectedAddress, setSelectedAddress] = useState(userAddress);
    console.log(userAddress, selectedAddress);

    const handleClose = () => {
        setModalShow(initialModalState);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }


    const handlePayNow = async () => {
        const paymentPayload = {};
        const paymentRes = await dispatch(reqtoPaymentFetch(paymentPayload));

        if (paymentRes.payload?.status) {
            const payload = { ...formData, userAddressId: selectedAddress?.id };
            const res = await dispatch(reqtoAddAddressDetail(payload));

            if (res.payload?.status) {
                window.dispatchEvent(new Event("cartUpdated"));
                navigate(`/cart/checkout/completed`, { state: paymentRes?.payload?.data })
            }
        }
    }


    // OrderSummary 
    const GetOrderSummary = async (currency) => {
        await dispatch(reqtoGetOrderSummary(currency));
    }

    // ManageAddress
    const GetManageAddress = async () => {
        await dispatch(reqtoGetManageAddress());
    }

    // UserAddress
    const GetUserAddress = async () => {
        await dispatch(reqtoUserAddress());
    }

    useEffect(() => {
        GetManageAddress();
        GetUserAddress();
    }, []);

    useEffect(() => {
        GetOrderSummary(currency);
    }, [currency]);

    useEffect(() => {
        if (userAddress) {
            setSelectedAddress(userAddress);
        }
    }, [userAddress]);

    return (
        <>

            {/* ------ Checkout Start ------ */}
            <div className="checkout pd-x">
                <div className='checkout_top'>
                    <div className="page_menu">
                        Cart {` > `} <span>Address & Payment</span>
                    </div>

                    <h4>Delivery Address</h4>

                    <p>
                        Please select your delivery address and continue to payment for order confirmation.
                    </p>
                </div>

                <div className="checkout_area">
                    <div className="row">
                        <div className="col-lg-8">
                            <form className='row m-0'>
                                <div className="address px-0">
                                    {
                                        ((userAddress && userAddress?.id) || (selectedAddress && selectedAddress?.id)) && (
                                            <>
                                                <div className='title d-flex align-items-center'>
                                                    {/* <img src={selectedAddress.image} alt="" className='img-fluid me-3' draggable={false} /> */}
                                                    <img src={selectedAddress?.address_type === 'Home' ? ThemeMode ? HomeLight : HomeDark : selectedAddress?.address_type === 'Work' ? ThemeMode ? WorkLight : WorkDark : ThemeMode ? OtherLight : OtherDark} alt="" className='img-fluid me-3' draggable={false} />

                                                    {selectedAddress?.address_type}
                                                </div>

                                                <p className='mb-0'>
                                                    {/* 123, Shyamdham Soc, Nana Varachha Surat, Gujarat, India - 395006 <br /> */}
                                                    {/* {selectedAddress.address} */}
                                                    {selectedAddress?.address_line_1}, {selectedAddress?.city}, {selectedAddress?.state}, {selectedAddress?.country} - {selectedAddress?.postal_code}
                                                </p>
                                            </>
                                        )
                                    }


                                    {
                                        manageAddressList?.length > 0 ? (
                                            <button
                                                type='button'
                                                className={`main_btn choose_another_address ${(userAddress && userAddress?.id) || (selectedAddress && selectedAddress?.id) ? '' : 'mt-0'}`}
                                                onClick={() => {
                                                    setModalShow({ ...modalShow, chooseAddress: true });
                                                }}
                                            >
                                                CHOOSE ANOTHER ADDRESS
                                            </button>
                                        ) : (
                                            <button
                                                type='button'
                                                className={`main_btn choose_another_address ${(userAddress && userAddress?.id) || (selectedAddress && selectedAddress?.id) ? '' : 'mt-0'}`}
                                                onClick={() => navigate('/address/create', { state: 'checkout' })}
                                            >
                                                ADD NEW ADDRESS
                                            </button>
                                        )
                                    }
                                </div>

                                <div className='px-0'>
                                    <h4 className='mb-0'>GST Details (Optional)</h4>

                                    <p>Please enter your gst details.</p>
                                </div>

                                <div className="col-lg-12 mb-4 px-0">
                                    <label htmlFor="name" className='form-label'>Name</label>
                                    <div>
                                        <input
                                            type="text"
                                            name='name'
                                            placeholder=''
                                            className='form-control'
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-4 px-0">
                                    <label htmlFor="GstNumber" className='form-label'>GST Number</label>
                                    <div>
                                        <input
                                            type="text"
                                            name='GstNumber'
                                            placeholder=''
                                            className='form-control'
                                            value={formData.GstNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-4">
                            <div className="order_summary">
                                <h4>Order Summary</h4>
                                <p>Your order is eligible for FREE Delivery.</p>

                                <div className='price_list'>
                                    <div className='d-flex justify-content-between align-items-center mb-15'>
                                        <div className="name">Subtotal</div>
                                        <div className="price">
                                            {currency ? currencyData?.find((i) => i?.value === currency)?.symbol : '₹'}
                                            {Number(orderSummary?.subtotal)}
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center mb-15'>
                                        <div className="name">GST & Taxes (18%)</div>
                                        <div className="price">
                                            {currency ? currencyData?.find((i) => i?.value === currency)?.symbol : '₹'}
                                            {Number(orderSummary?.gst)}
                                        </div>
                                    </div>
                                    {/* <div className='d-flex justify-content-between align-items-center mb-15'>
                                        <div className="name">Shipping</div>
                                        <div className="price">$120.00</div>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center mb-15 coupon'>
                                        <div className="name">Coupon Applied</div>
                                        <div className="price">- $175.00</div>
                                    </div> */}
                                    <div className='d-flex justify-content-between align-items-center total'>
                                        <div className="name">Total</div>
                                        <div className="price">
                                            {currency ? currencyData?.find((i) => i?.value === currency)?.symbol : '₹'}
                                            {Number(orderSummary?.total)}
                                        </div>
                                    </div>
                                </div>

                                <button type='button' className='main_btn pay_now' onClick={handlePayNow} disabled={!selectedAddress?.id || orderSummary?.total === 0 || loader}>
                                    {
                                        loader ?
                                            loaders.btn :
                                            `PAY NOW (${currency ? currencyData?.find((i) => i?.value === currency)?.symbol : '₹'}${Number(orderSummary?.total)})`
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
            {/* ------ Checkout End ------ */}


            {/* Modal-Choose-Address */}
            <ChooseAddress show={modalShow.chooseAddress} handleClose={handleClose} handleSelectAddress={(i) => setSelectedAddress(i)} manageAddressList={manageAddressList} />


        </>
    )
}

export default Checkout;