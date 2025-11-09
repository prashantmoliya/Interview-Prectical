import React, { useEffect } from 'react'

// Css

// Image
// Light
import MyWishlist1 from "../../../assets/images/account/my-wishlist1.svg";
import MyWishlist2 from "../../../assets/images/account/my-wishlist2.svg";
import MyWishlist3 from "../../../assets/images/account/my-wishlist3.svg";
import RatingStar from "../../../assets/images/account/rating-star.svg";
import Like from "../../../assets/images/account/like.svg";
import UnLikeLight from "../../../assets/images/account/unlike-light.svg";

// Dark
import UnLikeDark from "../../../assets/images/account/unlike-dark.svg";

import AccountSidebar from '../../../components/account-sidebar/AccountSidebar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reqtoDeleteWishlist, reqtoGetWishlist } from '../../../redux-Toolkit/services/AccountServices';
import useCurrency from '../../../hooks/useCurrency';
import { currencyData } from '../../../constants/data';

const Wishlist = () => {

    const currency = useCurrency();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userAccount = useSelector((state) => state.UserAccount);
    const { loader, wishList } = userAccount;

    const GetWishlist = async (currency) => {
        await dispatch(reqtoGetWishlist(currency));
    }

    const handleDeleteWishlist = async (id) => {
        const res = await dispatch(reqtoDeleteWishlist(id));

        if (res.payload?.status) {
            GetWishlist(currency);
        }
    }

    useEffect(() => {
        GetWishlist(currency);
    }, [currency]);


    return (
        <>

            {/* ------ Wishlist Start ------ */}
            <div className="account pd-x">
                <div className="page_menu">
                    Home {` > `} <span>My Wishlist</span>
                </div>


                <div className="row">
                    <div className="col-lg-3">
                        <AccountSidebar />
                    </div>

                    <div className="col-lg-9">
                        <div className="account_overview">
                            <h4 className='wishlist'>My Wishlist</h4>

                            <div className="row g-5">

                                {
                                    wishList?.length > 0 ? (
                                        wishList?.map((i, index) => {
                                            return (
                                                <div className="col-lg-4" key={i?.id}>
                                                    <div className="wishlist_box">
                                                        <div className="image">
                                                            <span className='ribbon'>G9 Jewellery</span>

                                                            <img src={i?.images[0]} alt="" className='img-fluid' draggable={false} />
                                                        </div>
                                                        <div className="wishlist_detail">
                                                            {/* <div className="d-flex justify-content-between align-items-center">
                                                            <div className="rating d-flex gap-1">
                                                                {
                                                                    Array.from({ length: 5 }).map((_, index) => (
                                                                        <img src={RatingStar} alt="" className='img-fluid' draggable={false} key={index} />
                                                                    ))
                                                                }
                                                            </div>

                                                            <div className='like'>
                                                                <button type='button' className='' onClick={() => handleDelete(i?.product_id)}>
                                                                    <img src={Like} alt="" className='img-fluid' draggable={false} />
                                                                    <img src={wishList.some(w => w.product_id === i.product_id) ? Like : UnLikeLight} alt="" className='img-fluid' draggable={false} />
                                                                </button>
                                                            </div>
                                                        </div> */}

                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="name">{i?.title}</div>
                                                                <div className='like'>
                                                                    <button type='button' className='' onClick={() => handleDeleteWishlist(i?.id)}>
                                                                        <img src={Like} alt="" className='img-fluid' draggable={false} />
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            {/* <p className='mb-0'>
                                                            {i?.description}
                                                        </p> */}

                                                            <div className="price">
                                                                {currency ? currencyData?.find((i) => i?.value === currency)?.symbol : '₹'}
                                                                {i?.selling_price}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <div className='wishlist_box nodata text-center'>
                                            <div className="wishlist_detail mt-0"><span className='price'>Your Wishlist is empty</span></div>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ------ Wishlist End ------ */}

        </>
    )
}

export default Wishlist;