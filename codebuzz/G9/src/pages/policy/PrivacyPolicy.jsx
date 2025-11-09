import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Css
import "./Policy.scss"

import { reqtoGetPolicy } from '../../redux-Toolkit/services/PolicyServices';

import DOMPurify from 'dompurify';


const PrivacyPolicy = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const home = useSelector((state) => state.Policy);
    const { loader, policyList } = home;

    console.log(policyList);

    const GetPolicy = async () => {
        await dispatch(reqtoGetPolicy());
    }

    useEffect(() => {
        GetPolicy();
    }, []);

    const policy = policyList?.find((i) => i.name === "Privacy Policy");

    return (
        <>

            {/* ------ Privacy-Policy Start ------ */}
            <div className="policy pd-x">
                {/* <h4>Privacy Policy</h4>

                <p className='black mb-10'>
                    G9 Jewellery ("we," "our," "us") values the trust you place in us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, mobile application, or purchase our products online.
                </p>

                <p className='black mb-40'>
                    By using our services, you agree to the terms of this Privacy Policy.
                </p>

                <p className='black'>1. Information We Collect</p>
                <p>We may collect the following types of information:</p>

                <p className='black mb-10'>A) Personal Information</p>

                <ul>
                    <li><p>Full Name</p></li>
                    <li><p>Email Address</p></li>
                    <li><p>Phone Number</p></li>
                    <li><p>Billing and Shipping Address</p></li>
                    <li><p>Payment Information (processed securely via third-party gateways; we do not store full card details)</p></li>
                </ul>

                <p className='black mb-10'>B) Non-Personal Information</p>

                <ul>
                    <li><p>IP Address</p></li>
                    <li><p>Browser Type</p></li>
                    <li><p>Device Information</p></li>
                    <li><p>Website Usage Data (pages viewed, time spent, referring URL)</p></li>
                </ul>

                <p className='black mb-10'>C) Account & Order Information</p>

                <ul className='mb-60'>
                    <li><p>Order History</p></li>
                    <li><p>Wishlist/Customized Jewellery Preferences</p></li>
                    <li><p>Reviews, Ratings, or Comments</p></li>
                </ul>


                <p className='black mb-10'>2. How We Use Your Information</p>
                <p>We use the collected information for purposes including:</p>
                <ul className='mb-60'>
                    <li><p>Processing and fulfilling your orders</p></li>
                    <li><p>Providing order confirmations, shipping updates, and support</p></li>
                    <li><p>Personalizing your shopping experience</p></li>
                    <li><p>Sending promotional offers, newsletters, and updates (you may opt-out anytime)</p></li>
                    <li><p>Improving website performance and security</p></li>
                    <li><p>Preventing fraud, unauthorized transactions, and ensuring compliance with laws</p></li>
                </ul>


                <p className='black mb-10'>3. Cookies and Similar Technologies</p>
                <p>We may use cookies and other technologies to provide, protect, and improve our products and services, such as by personalizing content, offering and measuring advertisements, understanding user behaviour, and providing a safer experience.</p>
                <p className='mb-60'>You can remove or reject cookies using your browser or device settings, but in some cases doing so may affect your ability to use the Platform/ our services.</p>

                <p className='black mb-10'>4. Data Security</p>
                <p className='mb-60'>We implement strict security measures, including SSL encryption, firewalls, and secure servers, to protect your personal information. While we strive for maximum protection, no method of electronic transmission is 100% secure.</p>

                <p className='black mb-10'>5. Your Privacy Rights</p>
                <p>Depending on your location, you may have the right to:</p>

                <ul className='mb-60'>
                    <li><p>Access, update, or delete your personal information</p></li>
                    <li><p>Request a copy of the data we hold about you</p></li>
                    <li><p>Opt-out of marketing communications</p></li>
                    <li><p>Withdraw consent at any time</p></li>
                </ul>

                <p className='black mb-10'>6. Changes to This Policy</p>
                <p className='mb-60'>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.</p>


                <p className='black mb-10'>7. Contact Us</p>
                <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
                <p className='mb-10'>Email: <Link to="mailto:g9jewellerys@gmail.com">g9jewellerys@gmail.com</Link></p>
                <p className='mb-0'>Phone: <Link to="tel:+917285858542">+91 7285 858 542</Link></p> */}


                {/* <p>
                    {policy?.description}
                </p> */}
                <div
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(policy?.description) }}
                />

            </div>
            {/* ------ Privacy-Policy End ------ */}


        </>
    )
}

export default PrivacyPolicy;