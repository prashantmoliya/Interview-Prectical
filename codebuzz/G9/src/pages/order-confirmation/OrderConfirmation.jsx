import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Css
import "./OrderConfirmation.scss"

// Image
// Light
import OrderPlace from "../../assets/images/cart/order_placed.svg";
// Dark
import OrderPlaceDark from "../../assets/images/cart/order_placed-dark.svg";

import useThemeMode from '../../hooks/useThemeMode';

const OrderConfirmation = () => {

    const ThemeMode = useThemeMode();

    const location = useLocation();
    const orderInfo = location?.state || {};
    console.log(location);

    const navigate = useNavigate();

    return (
        <>

            {/* ------ Order-Placed Start ------ */}
            <div className="order_placed pd-x text-center">
                <h4>Order Placed!</h4>

                <p className=''>
                    Your order was successfully placed and is prepared for shipping
                </p>

                <div className='order_placed_image'>
                    <img src={ThemeMode ? OrderPlace : OrderPlaceDark} alt="Order Placed" className='img-fluid' draggable={false} />
                </div>

                <h4>Order ID: {orderInfo?.orderId}</h4>

                <p>
                    <Link to={`/order-details/${orderInfo?.id}`}>View Order Details</Link>
                </p>

                <button type='button' className='main_btn back_to_home' onClick={() => navigate("/home")}>
                    BACK TO HOME
                </button>
            </div>
            {/* ------ Order-Placed End ------ */}

        </>
    )
}

export default OrderConfirmation;