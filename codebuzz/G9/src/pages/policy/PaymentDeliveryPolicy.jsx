import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { reqtoGetPolicy } from '../../redux-Toolkit/services/PolicyServices';

import DOMPurify from 'dompurify';

const PaymentDeliveryPolicy = () => {

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

    const policy = policyList?.find((i) => i.name === "Payment & Delivery Policy");

    return (
        <>

            {/* ------ Payment-Delivery-Policy Start ------ */}
            <div className="policy pd-x">
                <h4>Payment & Delivery Policy</h4>

                {/* <p className='black mb-40'>
                    At G9 Jewellery, we aim to provide a secure, transparent, and reliable shopping experience. This Payment & Delivery Policy explains how payments are processed and how we deliver jewellery and diamond products to our valued customers.
                </p>

                <p className='black mb-10'>1. Payment Policy</p>
                <p className='black mb-10'>A) Accepted Payment Methods</p>
                <p className='mb-10'>We may collect the following types of information:</p>
                <ul>
                    <li><p>Credit Cards (Visa, MasterCard, etc.)</p></li>
                    <li><p>Debit Cards (enabled for online transactions)</p></li>
                    <li><p>Net Banking (selected banks)</p></li>
                    <li><p>UPI & Digital Wallets</p></li>
                    <li><p>PayPal / International Payment Gateways (for overseas orders)</p></li>
                </ul>

                <p className='black mb-10'>B) Payment Security</p>
                <ul>
                    <li><p>All transactions are processed through SSL-encrypted secure payment gateways.</p></li>
                    <li><p>We do not store your full card details on our servers.</p></li>
                    <li><p>For added security, some transactions may require OTP/3D Secure verification.</p></li>
                </ul>

                <p className='black mb-10'>C) Payment Confirmation</p>
                <ul className='mb-60'>
                    <li><p>Once payment is successfully processed, you will receive an email/SMS confirmation of your order.</p></li>
                    <li><p>If payment fails but the amount is deducted, it will be auto-refunded to your source account within 5–7 business days (depending on your bank/payment provider).</p></li>
                </ul>

                <p className='black mb-10'>2. Delivery Policy</p>
                <p className="mb-10">A) Shipping Coverage</p>
                <ul >
                    <li><p>We deliver across [Worldwide depending on your service] through trusted logistics and courier partners.</p></li>
                    <li><p>Some remote locations may have limited delivery options.</p></li>
                </ul>

                <p className="mb-10">B) Delivery Timelines</p>
                <ul >
                    <li><p><b>Ready-to-ship jewellery/diamonds:</b> Dispatched within 3–5 business days.</p></li>
                    <li><p><b>Customized / Made-to-order jewellery: </b> Processing time may take 10–20 business days, depending on design and craftsmanship.</p></li>
                    <li><p>Delivery timelines vary based on location, customs (for international orders), and courier availability.</p></li>
                </ul>

                <p className="mb-10">C) Shipping Charges</p>
                <ul className='mb-60'>
                    <li><p>Standard shipping charges apply for orders below the threshold.</p></li>
                    <li><p>International orders may incur customs duties, taxes, or import charges (to be borne by the customer).</p></li>
                </ul>

                <p className="mb-10">3. Delivery Issues</p>
                <ul className='mb-60'>
                    <li><p>If the delivery is delayed due to unforeseen circumstances (courier delays, strikes, weather, customs clearance), we will notify you promptly.</p></li>
                    <li><p>If the package is lost or damaged in transit, we will initiate a replacement or refund after investigation with the courier partner.</p></li>
                    <li><p>Customers must provide a correct shipping address. We are not responsible for non-delivery due to incorrect/insufficient address details.</p></li>
                </ul>

                <p className='black mb-10'>4. Contact Us</p>
                <p>For payment or delivery-related queries, please reach us at:</p>
                <p className='mb-10'>Email: <Link to="mailto:g9jewellerys@gmail.com">g9jewellerys@gmail.com</Link></p>
                <p className='mb-0'>Phone: <Link to="tel:+917285858542">+91 7285 858 542</Link></p> */}

                <div
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(policy?.description) }}
                />

            </div>
            {/* ------ Payment-Delivery-Policy End ------ */}

        </>
    )
}

export default PaymentDeliveryPolicy;