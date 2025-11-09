import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Css
import './css/App.scss';
import AuthLayout from './components/layout/auth-layout/AuthLayout';
import SignIn from './pages/authentication/sign-in/SignIn';
import ForgotPassword from './pages/authentication/forgot-password/ForgotPassword';
import OtpMethod from './components/otp-Verification/OtpMethod';
import OtpVerification from './components/otp-Verification/OtpVerification';
import CreatePassword from './pages/authentication/create-password/CreatePassword';
import SignUp from './pages/authentication/sign-up/SignUp';
import AddressDetails from './pages/authentication/address-details/AddressDetails';
import ThemeToggle from './components/theme-toggle/ThemeToggle';
import ChatBot from './components/chat-bot/ChatBot';
import DefaultLayout from './components/layout/default-layout/DefaultLayout';
import Account from './pages/account/my-account/Account';
import ChangePassword from './pages/account/change-password/ChangePassword';
import Orders from './pages/account/my-orders/Orders';
import OrderDetails from './pages/account/order-details/OrderDetails';
import Address from './pages/account/address/Address';
import EditAccount from './pages/account/my-account/edit/EditAccount';
import CreateAddress from './pages/account/address/create/CreateAddress';
import EditAddress from './pages/account/address/edit/EditAddress';
import Wishlist from './pages/account/my-wishlist/Wishlist';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Blogs from './pages/blogs/Blogs';
import BlogsDetails from './pages/blogs-details/BlogsDetails';
import Faqs from './pages/faqs/Faqs';
import ContactUs from './pages/contact-us/ContactUs';
import Product from './pages/product/Product';
import ProductDetails from './pages/product-details/ProductDetails';
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';
import OrderConfirmation from './pages/order-confirmation/OrderConfirmation';
import PrivacyPolicy from './pages/policy/PrivacyPolicy';
import TermsConditions from './pages/policy/TermsConditions';
import PaymentDeliveryPolicy from './pages/policy/PaymentDeliveryPolicy';
import ReturnRefundPolicy from './pages/policy/ReturnRefundPolicy';

import ScrollToTop from './components/scroll-to-top/ScrollToTop';

import EmailOtpMethod from './components/email-otp-Verification/EmailOtpMethod';
import EmailOtpVerification from './components/email-otp-Verification/EmailOtpVerification';
import MobileOtpMethod from './components/mobile-otp-Verification/MobileOtpMethod';
import MobileOtpVerification from './components/mobile-otp-Verification/MobileOtpVerification';
import Protected from './components/protected/Protected';
import ComplaintQuery from './pages/complaint-query/ComplaintQuery';
import ProductSaved from './pages/account/product-saved/ProductSaved';

function App() {
    return (
        <>

            <ScrollToTop />

            <Routes>
                {/* -- Authentication -- */}
                <Route element={<AuthLayout />}>
                    <Route path='/' element={<SignIn />} />

                    <Route path='/email-otp-method' element={<EmailOtpMethod />} />
                    <Route path='/email-otp-verify' element={<EmailOtpVerification />} />
                    <Route path='/mobile-otp-method' element={<MobileOtpMethod />} />
                    <Route path='/mobile-otp-verify' element={<MobileOtpVerification />} />

                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/otp-method' element={<OtpMethod />} />
                    <Route path='/otp-verify' element={<OtpVerification />} />
                    <Route path='/create-password' element={<CreatePassword />} />

                    <Route path='/sign-up' element={<SignUp />} />
                    <Route path='/address-details' element={<AddressDetails />} />
                </Route>

                {/* -- Layout -- */}
                <Route element={<DefaultLayout />}>
                    {/* Account */}
                    <Route element={<Protected />}>
                        <Route path='/account' element={<Account />} />
                        <Route path='/account/edit/:id' element={<EditAccount />} />
                        <Route path='/change-password' element={<ChangePassword />} />
                        <Route path='/orders' element={<Orders />} />
                        <Route path='/order-details/:orderId' element={<OrderDetails />} />
                        <Route path='/address' element={<Address />} />
                        <Route path='/address/create' element={<CreateAddress />} />
                        <Route path='/address/edit/:id' element={<EditAddress />} />
                        <Route path='/wishlist' element={<Wishlist />} />
                        <Route path='/product-saved' element={<ProductSaved />} />
                    </Route>

                    {/* Web */}
                    <Route path='/home' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/blogs-media/:type' element={<Blogs />} />
                    <Route path='/blogs-details/:id' element={<BlogsDetails />} />
                    <Route path='/faqs' element={<Faqs />} />
                    <Route path='/contact-us' element={<ContactUs />} />

                    <Route path='/complaint-query' element={<ComplaintQuery />} />

                    <Route path='/product/:categoryId?/:subCategoryId?' element={<Product />} />
                    <Route path='/product-details/:productId' element={<ProductDetails />} />

                    <Route path='/cart' element={<Cart />} />
                    <Route path='/cart/checkout' element={<Checkout />} />
                    <Route path='/cart/checkout/completed' element={<OrderConfirmation />} />

                    <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                    <Route path='/terms-conditions' element={<TermsConditions />} />
                    <Route path='/payment-delivery-policy' element={<PaymentDeliveryPolicy />} />
                    <Route path='/return-refund-policy' element={<ReturnRefundPolicy />} />
                </Route>

            </Routes>

            {/* -- Theme-Toggle -- */}
            <ThemeToggle />
            {/* -- Chat-Bot -- */}
            <ChatBot />

        </>
    )
}

export default App;