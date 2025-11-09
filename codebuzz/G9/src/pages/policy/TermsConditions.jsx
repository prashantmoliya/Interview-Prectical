import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { reqtoGetPolicy } from '../../redux-Toolkit/services/PolicyServices';

import DOMPurify from 'dompurify';

const TermsConditions = () => {

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

    const policy = policyList?.find((i) => i.name === "Terms & Conditions");

    return (
        <>

            {/* ------ Terms-Conditions Start ------ */}
            <div className="policy pd-x">
                <h4>Terms & Conditions</h4>

                {/* <p className='black mb-40'>
                    Welcome to G9 Jewellery ("we," "our," "us"). By accessing or using our website and purchasing our products, you agree to comply with and be bound by these Terms & Conditions. Please read them carefully before using our services.
                </p>


                <p className='black mb-10'>1. Eligibility</p>
                <p>We may collect the following types of information:</p>
                <ul className='mb-60'>
                    <li><p>You must be at least 18 years old to make a purchase.</p></li>
                    <li><p>By placing an order, you represent that all information provided is accurate and true.</p></li>
                </ul>

                <p className='black mb-10'>2. Products & Services</p>
                <ul className='mb-60'>
                    <li><p>We sell jewellery, diamonds, and related accessories.</p></li>
                    <li><p>All product descriptions, images, and prices are provided for informational purposes. While we strive for accuracy, slight variations may occur.</p></li>
                    <li><p>Gemstones and diamonds may vary in color, clarity, or carat due to natural characteristics.</p></li>
                </ul>

                <p className='black mb-10'>3. Pricing & Payment</p>
                <ul className='mb-60'>
                    <li><p>All prices are listed in [Currency] and are subject to change without prior notice.</p></li>
                    <li><p>Payment must be made at the time of purchase through our secure payment gateways.</p></li>
                    <li><p>We reserve the right to cancel any order in case of pricing errors or fraudulent activity.</p></li>
                </ul>

                <p className='black mb-10'>4. Orders & Shipping</p>
                <ul className='mb-60'>
                    <li><p>Order confirmation will be sent via email after successful payment.</p></li>
                    <li><p>Shipping timelines depend on product availability, customization, and delivery location.</p></li>
                    <li><p>We are not responsible for delays caused by courier services, customs, or unforeseen circumstances.</p></li>
                    <li><p>Risk of loss passes to you upon delivery of the product to your address.</p></li>
                </ul>

                <p className='black mb-10'>5. Returns, Exchanges & Cancellations</p>
                <ul className='mb-60'>
                    <li><p>Returns or exchanges are accepted only under our Return Policy (please refer to the Return/Refund Policy section on our website).</p></li>
                    <li><p>Customized or personalized jewellery is non-refundable unless defective.</p></li>
                    <li><p>Order cancellations are allowed only before processing/shipping.</p></li>
                </ul>

                <p className='black mb-10'>6. User Responsibilities</p>
                <ul className='mb-60'>
                    <li><p>You agree not to misuse our website, attempt to hack systems, or engage in fraudulent activities.</p></li>
                    <li><p>You are responsible for maintaining the confidentiality of your account details.</p></li>
                </ul>


                <p className='black mb-10'>7. Limitation of Liability</p>
                <ul className='mb-60'>
                    <li><p>We are not liable for any indirect, incidental, or consequential damages arising from your use of our website or products.</p></li>
                    <li><p>Product warranties (if any) are limited to those explicitly provided with the item.</p></li>
                </ul>

                <p className='black mb-10'>8. Changes to Terms</p>
                <p className="mb-60">We may update these Terms & Conditions from time to time. Continued use of our website constitutes acceptance of the updated Terms.</p>


                <p className='black mb-10'>9. Contact Us</p>
                <p>If you have any questions about these Terms & Conditions, please contact us:</p>
                <p className='mb-10'>Email: <Link to="mailto:g9jewellerys@gmail.com">g9jewellerys@gmail.com</Link></p>
                <p className='mb-0'>Phone: <Link to="tel:+917285858542">+91 7285 858 542</Link></p> */}


                <div
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(policy?.description) }}
                />

            </div>
            {/* ------ Terms-Conditions End ------ */}

        </>
    )
}

export default TermsConditions;
