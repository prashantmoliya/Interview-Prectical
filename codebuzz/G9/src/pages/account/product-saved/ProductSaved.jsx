import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Css

// Image
// Light

import { currencyData } from '../../../constants/data';
import useCurrency from '../../../hooks/useCurrency';

import AccountSidebar from '../../../components/account-sidebar/AccountSidebar';
import { reqtoDeleteProductSaved, reqtoGetProductSaved, reqtoMovetoCartProductSaved } from '../../../redux-Toolkit/services/AccountServices';
import { reqtoAddCart, reqtoShareProduct } from '../../../redux-Toolkit/services/CartServices';
import Share from '../../../components/modal/share/Share';

const initialState = {
    delete: null,
    movetoCart: null,
    share: null,
}

const initialModalState = {
    share: false,
}

const ProductSaved = () => {

    const currency = useCurrency();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userAccount = useSelector((state) => state.UserAccount);
    const { loader, wishList, productSavedList } = userAccount;

    const { shareProduct } = useSelector((state) => state.Cart);

    const [loading, setLoading] = useState(initialState);
    const [modalShow, setModalShow] = useState(initialModalState);

    const handleClose = () => {
        setModalShow(initialModalState);
    }

    // Product-Saved
    const GetProductSaved = async (currency) => {
        await dispatch(reqtoGetProductSaved(currency));
    }

    const handleDeleteProductSaved = async (id) => {
        setLoading((prev) => ({ ...prev, delete: id }));

        const res = await dispatch(reqtoDeleteProductSaved(id));

        if (res.payload?.status) {
            GetProductSaved(currency);
        }

        setLoading((prev) => ({ ...prev, delete: null }));
    }

    const handleMovetoCart = async (id) => {
        setLoading((prev) => ({ ...prev, movetoCart: id }));

        // const res = await dispatch(reqtoDeleteProductSaved(i?.productId));

        // if (res.payload?.status) {
        //     const addToCartRes = await dispatch(reqtoAddCart({ products: i?.productId, qty: 1 }));

        //     if (addToCartRes.payload?.status) {
        //         window.dispatchEvent(new Event("cartUpdated"));
        //         GetProductSaved(currency);
        //     }
        // }

        const res = await dispatch(reqtoMovetoCartProductSaved({ products: id }));

        if (res.payload?.status) {
            window.dispatchEvent(new Event("cartUpdated"));
            GetProductSaved(currency);
        }

        setLoading((prev) => ({ ...prev, movetoCart: null }));
    }

    // ShareProduct 
    const handleShareProduct = async (id) => {
        setLoading((prev) => ({ ...prev, share: id }));

        const res = await dispatch(reqtoShareProduct({ productId: id }));

        if (res.payload?.status) {
            setModalShow({ ...modalShow, share: true });
        }

        setLoading((prev) => ({ ...prev, share: null }));
    }

    useEffect(() => {
        GetProductSaved(currency);
    }, [currency]);

    return (
        <>

            {/* ------ Product-Saved Start ------ */}
            <div className="account pd-x">
                <div className="page_menu">
                    Home {` > `} <span>Product Saved</span>
                </div>


                <div className="row">
                    <div className="col-lg-3">
                        <AccountSidebar />
                    </div>

                    <div className="col-lg-9">
                        <div className="account_overview">
                            <h4 className='wishlist'>Product Saved</h4>

                            <div className="details">
                                {
                                    productSavedList?.length > 0 ? (
                                        productSavedList?.map((i, index) => {
                                            return (
                                                <React.Fragment key={i?.id}>


                                                    <div className="order_box d-flex align-items-center" key={index}>
                                                        <div className="image">
                                                            <span className='ribbon'>G9 Jewellery</span>

                                                            <img src={i?.images[0]} alt={i?.title} className='img-fluid' draggable={false} />
                                                        </div>

                                                        <div className="order_detail w-100">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="name p">{i?.title}</div>
                                                                <div className="price p">
                                                                    {currency ? currencyData?.find((i) => i?.value === currency)?.symbol : '₹'}
                                                                    {Number(i.selling_price)}
                                                                </div>
                                                            </div>
                                                            <p>
                                                                {i?.shortDescription}
                                                            </p>

                                                            <div className="d-flex align-items-center gap-4">
                                                                <div className="order_option">
                                                                    <button
                                                                        type='button'
                                                                        onClick={() => handleDeleteProductSaved(i?.productId)}
                                                                        disabled={loading?.delete === i?.productId}
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                    <div className="line_option"></div>
                                                                    <button
                                                                        type='button'
                                                                        onClick={() => handleMovetoCart(i?.productId)}
                                                                        disabled={loading?.movetoCart === i?.productId}
                                                                    >
                                                                        Move to Cart
                                                                    </button>
                                                                    <div className="line_option"></div>
                                                                    <button
                                                                        type='button'
                                                                        onClick={() => handleShareProduct(i?.productId)}
                                                                        disabled={loading?.share === i?.productId}
                                                                    >
                                                                        Share
                                                                    </button>
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>

                                                    {index !== productSavedList.length - 1 && <div className="line"></div>}
                                                </React.Fragment>
                                            )
                                        })
                                    ) : (
                                        <div className='order_box text-center'>
                                            <div className="order_detail "><span className='price'>Your Product Saved is empty.</span></div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ------ Product-Saved End ------ */}

            {/* Share */}
            <Share show={modalShow.share} handleClose={handleClose} productLink={shareProduct} />


        </>
    )
}

export default ProductSaved;