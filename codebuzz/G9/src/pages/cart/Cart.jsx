import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Css
import "./Cart.scss"

// Image
import OrderImg from "../../assets/images/account/my-orders.svg";

// Light
import Minus from "../../assets/images/cart/minus.svg";
import Plus from "../../assets/images/cart/plus.svg";
import Delete from "../../assets/images/cart/delete.svg";
// Dark
import MinusDark from "../../assets/images/cart/minus-dark.svg";
import PlusDark from "../../assets/images/cart/plus-dark.svg";
import DeleteDark from "../../assets/images/cart/delete-dark.svg";

import useThemeMode from '../../hooks/useThemeMode';
import { reqtoCartQty, reqtoDeleteCart, reqtoGetCart, reqtoShareProduct } from '../../redux-Toolkit/services/CartServices';
import useCurrency from '../../hooks/useCurrency';
import { currencyData } from '../../constants/data';
import { FormateCreatedDate } from '../../utils';
import { reqtoAddProductSaved } from '../../redux-Toolkit/services/AccountServices';
import Share from '../../components/modal/share/Share';

const initialLoaderState = {
    delete: null,
    save: null,
    share: null,
}

const initialModalState = {
    share: false,
}

const Cart = () => {

    const ThemeMode = useThemeMode();
    const currency = useCurrency();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.Cart);
    const { loader, cartList, shareProduct } = cart;

    const { productSavedLoader } = useSelector((state) => state.UserAccount);

    const [loading, setLoading] = useState(initialLoaderState);
    const [modalShow, setModalShow] = useState(initialModalState);

    const [quantity, setQuantity] = useState(CartData?.map(() => 1));

    const handleClose = () => {
        setModalShow(initialModalState);
    }

    // Cart 
    const handleMinusQty = async (i) => {
        // setQuantity((prev) =>
        //     prev.map((qty, i) => (i === index ? Math.max(1, qty - 1) : qty))
        // );

        if (i?.quantity > 1) {
            const res = await dispatch(reqtoCartQty({ products: i?.productId, qty: i?.quantity - 1 }));

            if (res.payload?.status) {
                GetCart(currency);
                window.dispatchEvent(new Event("cartUpdated"));
            }
        }
    }

    const handlePlusQty = async (i) => {
        // setQuantity((prev) =>
        //     prev.map((qty, i) => (i === index ? qty + 1 : qty))
        // );

        const res = await dispatch(reqtoCartQty({ products: i?.productId, qty: i?.quantity + 1 }));

        if (res.payload?.status) {
            GetCart(currency);
            window.dispatchEvent(new Event("cartUpdated"));
        }

    }

    const handleDeleteCart = async (id) => {
        setLoading((prev) => ({ ...prev, delete: id }));

        const res = await dispatch(reqtoDeleteCart(id));

        if (res.payload?.status) {
            GetCart(currency);
            window.dispatchEvent(new Event("cartUpdated"));
        }

        setLoading((prev) => ({ ...prev, delete: null }));
    }

    const GetCart = async (currency) => {
        await dispatch(reqtoGetCart(currency));
    }

    // ProductSaved 
    const handleAddProductSaved = async (id) => {
        setLoading((prev) => ({ ...prev, save: id }));

        const res = await dispatch(reqtoAddProductSaved({ products: id }));

        if (res.payload?.status) {
            GetCart(currency);
            window.dispatchEvent(new Event("cartUpdated"));
        }

        setLoading((prev) => ({ ...prev, save: null }));
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
        GetCart(currency);
    }, [currency]);

    return (
        <>

            {/* ------ Cart Start ------ */}
            <div className="cart pd-x">
                <div className='cart_top'>
                    <h4>Your Shopping Cart</h4>

                    {/* <p>
                        Have an Coupon Code? <button type='button'>Apply Now</button>
                    </p> */}
                </div>

                <div className="cart_area">
                    <div className="row">
                        <div className="col-lg-8">
                            {/* <div className="order_box d-flex align-items-center">
                                <div className="image">
                                    <img src={OrderImg} alt="Product" className='img-fluid' draggable={false} />
                                </div>

                                <div className="order_detail w-1001">
                                    <div className="name">Silver Engagement Diamond Ring</div>
                                    <div className="price">$276.00</div>
                                    <div className="quantity_control">
                                        <button type='button' onClick={handleMinusQty} disabled={quantity === 1} >
                                            <img src={Minus} alt="Minus" className='img-fluid' draggable={false} />
                                        </button>
                                        <span>{quantity}</span>
                                        <button type='button' onClick={handlePlusQty}>
                                            <img src={Plus} alt="Plus" className='img-fluid' draggable={false} />
                                        </button>
                                    </div>
                                </div>
                            </div> */}

                            <div className="details">
                                {/* {
                                    CartData?.map((i, index) => {
                                        return (
                                            <React.Fragment key={i?.id}>

                                                <div className="order_box d-flex align-items-center" key={index}>
                                                    <button type='button' className='delete_order' >
                                                        <img src={ThemeMode ? Delete : DeleteDark} alt="Minus" className='img-fluid' draggable={false} />
                                                    </button>

                                                    <div className="image">
                                                        <img src={OrderImg} alt="Product" className='img-fluid' draggable={false} />
                                                    </div>

                                                    <div className="order_detail w-100">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="name">{i.name}</div>
                                                            <div className="price">
                                                                {(i.price * quantity[index]).toFixed(2)}
                                                            </div>
                                                        </div>
                                                        <p>
                                                            {i.description}
                                                        </p>
                                                        <div className='date'>
                                                            Estimated Delivery Date: <span>{i.date}</span>
                                                        </div>

                                                        <div className="d-flex align-items-center gap-4">
                                                            <div className="quantity_control">
                                                                <button
                                                                    type='button'
                                                                    onClick={() => handleMinusQty(index)}
                                                                    disabled={quantity[index] === 1}
                                                                >
                                                                    <img src={ThemeMode ? Minus : MinusDark} alt="Minus" className='img-fluid' draggable={false} />
                                                                </button>
                                                                <span>{quantity[index]}</span>
                                                                <button
                                                                    type='button'
                                                                    onClick={() => handlePlusQty(index)}
                                                                >
                                                                    <img src={ThemeMode ? Plus : PlusDark} alt="Plus" className='img-fluid' draggable={false} />
                                                                </button>
                                                            </div>

                                                            <div className="order_option">
                                                                <button
                                                                    type='button'
                                                                >
                                                                    Delete
                                                                </button>
                                                                <div className="line_option"></div>
                                                                <button
                                                                    type='button'
                                                                >
                                                                    Save for Later
                                                                </button>
                                                                <div className="line_option"></div>
                                                                <button
                                                                    type='button'
                                                                >
                                                                    Share
                                                                </button>

                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>

                                                {index !== CartData.length - 1 && <div className="line"></div>}
                                            </React.Fragment>
                                        )
                                    })
                                } */}

                                {
                                    cartList?.cart?.length > 0 ? (
                                        <>
                                            {
                                                cartList?.cart?.map((i, index) => {
                                                    return (
                                                        <React.Fragment key={i?.productId}>

                                                            <div className="order_box d-flex align-items-center" key={index}>
                                                                <button type='button' className='delete_order' >
                                                                    <img src={ThemeMode ? Delete : DeleteDark} alt="Minus" className='img-fluid' draggable={false} />
                                                                </button>

                                                                <div className="image">
                                                                    <img src={i?.images[0]} alt="Product" className='img-fluid' draggable={false} />
                                                                </div>

                                                                <div className="order_detail w-100">
                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                        <div className="name">{i?.title}</div>
                                                                        <div className="price">
                                                                            {/* ${(i.selling_price * quantity[index]).toFixed(2)} */}
                                                                            {currency ? currencyData?.find((i) => i?.value === currency)?.symbol : '₹'}
                                                                            {Number(i.selling_price)}
                                                                        </div>
                                                                    </div>
                                                                    <p>
                                                                        {i.shortDescription}
                                                                    </p>
                                                                    <div className='date'>
                                                                        Estimated Delivery Date: <span>{FormateCreatedDate(i?.estimatedDeliveryDate)}</span>
                                                                    </div>

                                                                    <div className="d-flex align-items-center gap-4">
                                                                        <div className="quantity_control">
                                                                            <button
                                                                                type='button'
                                                                                onClick={() => handleMinusQty(i)}
                                                                                // disabled={quantity[index] === 1}
                                                                                disabled={i?.quantity === 1}
                                                                            >
                                                                                <img src={ThemeMode ? Minus : MinusDark} alt="Minus" className='img-fluid' draggable={false} />
                                                                            </button>
                                                                            <span>{i?.quantity}</span>
                                                                            <button
                                                                                type='button'
                                                                                onClick={() => handlePlusQty(i)}
                                                                            >
                                                                                <img src={ThemeMode ? Plus : PlusDark} alt="Plus" className='img-fluid' draggable={false} />
                                                                            </button>
                                                                        </div>

                                                                        <div className="order_option">
                                                                            <button
                                                                                type='button'
                                                                                onClick={() => handleDeleteCart(i?.productId)}
                                                                                disabled={loading?.delete === i?.productId}
                                                                            >
                                                                                Delete
                                                                            </button>
                                                                            <div className="line_option"></div>
                                                                            <button
                                                                                type='button'
                                                                                onClick={() => handleAddProductSaved(i?.productId)}
                                                                                disabled={loading?.save === i?.productId}
                                                                            >
                                                                                Save for Later
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

                                                            {/* {index !== cartList?.cart.length - 1 && */}
                                                            <div className="line"></div>
                                                            {/* } */}
                                                        </React.Fragment>
                                                    )
                                                })
                                            }

                                            <div className="sub_total text-end">
                                                <div className="name">
                                                    Subtotal ({cartList?.item} items):
                                                    <span>
                                                        {` `}{currency ? currencyData?.find((i) => i?.value === currency)?.symbol : '₹'}
                                                        {Number(cartList?.subtotal)}</span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="sub_total text-center">
                                            <div className="name"><span>Your Cart is empty</span></div>
                                        </div>
                                    )
                                }
                            </div>

                        </div>
                        <div className="col-lg-4">
                            <div className="order_summary">
                                <h4>Order Summary</h4>
                                <p>Your order is eligible for FREE Delivery.</p>

                                <div className='price_list'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div className="name">Subtotal ({cartList?.item || 0} items)</div>
                                        <div className="price">
                                            {currency ? currencyData?.find((i) => i?.value === currency)?.symbol : '₹'}
                                            {Number(cartList?.subtotal) || 0}</div>
                                    </div>
                                    {/* <div className='d-flex justify-content-between align-items-center coupon'>
                                        <div className="name">Coupon Applied <button type='button'>Remove</button></div>
                                        <div className="price">- {currency ? currencyData?.find((i) => i?.value === currency)?.symbol : '₹'}175.00
                                        </div>
                                    </div> */}
                                    <div className='d-flex justify-content-between align-items-center total'>
                                        <div className="name">Total</div>
                                        <div className="price">
                                            {currency ? currencyData?.find((i) => i?.value === currency)?.symbol : '₹'}
                                            {Number(cartList?.Total) || 0}</div>
                                    </div>
                                </div>

                                <button type='button' className='main_btn checkout_now' onClick={() => navigate("/cart/checkout")} disabled={cartList?.cart?.length === 0}>
                                    CHECKOUT NOW
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ------ Cart End ------ */}

            {/* Share */}
            <Share show={modalShow.share} handleClose={handleClose} productLink={shareProduct} />


        </>
    )
}

export default Cart;



const CartData = [
    {
        image: OrderImg,
        name: "Silver Engagement Diamond Ring",
        description: 'Diamond PreSet Solitaire Ring In 18Kt White Gold (3.8 gram) with Diamonds (0.2060 Ct) and Solitaire (0.30 Ct)',
        date: "10 Sep,2025",
        price: 276,
    },
    {
        image: OrderImg,
        name: "Silver Engagement Diamond Ring",
        description: "Diamond PreSet Solitaire Ring In 18Kt White Gold (3.8 gram) with Diamonds (0.2060 Ct) and Solitaire (0.30 Ct)",
        date: "10 Sep,2025",
        price: 276,
    },
    {
        image: OrderImg,
        name: "Silver Engagement Diamond Ring",
        description: "Diamond PreSet Solitaire Ring In 18Kt White Gold (3.8 gram) with Diamonds (0.2060 Ct) and Solitaire (0.30 Ct)",
        date: "10 Sep,2025",
        price: 276,
    },
]