import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { reqtoGetPolicy } from '../../redux-Toolkit/services/PolicyServices';

import DOMPurify from 'dompurify';

const ReturnRefundPolicy = () => {

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

    const policy = policyList?.find((i) => i.name === "Refund & Return Policy");

    return (
        <>

            {/* ------ Return-Refund-Policy Start ------ */}
            <div className="policy pd-x">
                <h4>Return & Refund Policy</h4>

                {/* <p className='black mb-40'>
                    At G9 Jewellery, customer satisfaction is our top priority. We take utmost care in crafting and delivering every piece of jewellery and diamonds. However, if you are not completely satisfied with your purchase, our Return & Refund Policy will guide you.
                </p>

                <p className='black mb-10'>1. Eligibility for Returns</p>
                <p className='mb-10'>We accept returns under the following conditions:</p>
                <ul className='mb-60'>
                    <li><p>The product must be unused, unworn, and in its original condition.</p></li>
                    <li><p>The product must be returned with original invoice, certificates (if any), packaging, and tags intact.</p></li>
                    <li><p>Return request must be initiated within [3 to 5 business days] of delivery (based on your business policy).</p></li>
                </ul>

                <p className='black mb-10'>2. Refund Policy</p>
                <ul className='mb-60'>
                    <li><p>Once we receive and inspect the returned item, you will be notified of approval/rejection.</p></li>
                    <li><p>Approved refunds will be processed within 3–5 business days to your original payment method.</p></li>
                    <li><p>Shipping charges, taxes, and duties are non-refundable (unless the item received is defective/damaged).</p></li>
                </ul>

                <p className='black mb-10'>3. Refund Exceptions</p>
                <ul className='mb-60'>
                    <li><p>If the product shows signs of wear, alteration, or damage not caused during transit, the refund will not be approved.</p></li>
                    <li><p>If an incorrect product is sent, a full refund or replacement will be provided.</p></li>
                </ul>

                <p className='black mb-10'>4. Return Shipping</p>
                <ul className='mb-60'>
                    <li><p>Customers are responsible for safely shipping the product back to us.</p></li>
                    <li><p>For damaged/defective/wrong products, return shipping will be covered by us.</p></li>
                    <li><p>We recommend using insured courier services for high-value jewellery and diamonds.</p></li>
                </ul>

                <p className='black mb-10'>5. Damaged or Defective Items</p>
                <ul className='mb-60'>
                    <li><p>If your order arrives damaged, defective, or incorrect, please notify us within 48 hours of delivery with photos/videos.</p></li>
                    <li><p>We will arrange for inspection and provide a replacement/refund at no additional cost.</p></li>
                </ul>

                <p className='black mb-10'>6. Contact Us</p>
                <p>For return or refund assistance, please contact our support team:</p>
                <p className='mb-10'>Email: <Link to="mailto:g9jewellerys@gmail.com">g9jewellerys@gmail.com</Link></p>
                <p className='mb-0'>Phone: <Link to="tel:+917285858542">+91 7285 858 542</Link></p> */}

                <div
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(policy?.description) }}
                />

            </div>
            {/* ------ Return-Refund-Policy End ------ */}

        </>
    )
}

export default ReturnRefundPolicy;