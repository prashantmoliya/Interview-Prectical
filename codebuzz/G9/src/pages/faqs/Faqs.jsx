import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Css
import "./Faqs.scss"

import Accordion from 'react-bootstrap/Accordion';
import { reqtoGetFaqs } from '../../redux-Toolkit/services/FaqsServices';


const Faqs = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const blogs = useSelector((state) => state.Faqs);
    const { loader, faqsList } = blogs;

    const GetFaqs = async () => {
        await dispatch(reqtoGetFaqs());
    }

    useEffect(() => {
        GetFaqs();
    }, []);

    return (
        <>

            {/* ------ Faqs Start ------ */}
            <div className="faqs pd-x">
                <h4>Frequently Asked Questions</h4>

                <Accordion defaultActiveKey="0" flush>
                    {/* <Accordion.Item eventKey="0">
                        <Accordion.Header>How i can place customize order ?</Accordion.Header>
                        <Accordion.Body>
                            Yes! For a fully custom design, please contact our support team or use the "Special Request" form. We’ll get back to you with options and pricing. Customized orders usually take 5–10 business days to create, plus shipping time. You’ll receive an estimated delivery date at checkout.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>What is your payment policy ?</Accordion.Header>
                        <Accordion.Body>
                            Absolutely. We use industry-standard SSL encryption and trusted payment gateways to ensure all transactions are 100% secure. We currently support EMI options via selected credit cards and third-party providers (if applicable). Check availability at checkout.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Are customized orders returnable ?</Accordion.Header>
                        <Accordion.Body>

                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>What is your cancellation policy ?</Accordion.Header>
                        <Accordion.Body>
                            Cancellations are only accepted within 12 hours of placing the order, as production begins shortly after. Unfortunately, once the order is shipped, cancellation is not possible. You may initiate a return (if applicable) after delivery, subject to our return policy.
                        </Accordion.Body>
                    </Accordion.Item> */}

                    {
                        faqsList?.map((i, index) => {
                            return (
                                <Accordion.Item eventKey={String(index)} key={i?.id}>
                                    <Accordion.Header>{i?.question}</Accordion.Header>
                                    <Accordion.Body>
                                        {/* {i?.answer} */}

                                        <div
                                            dangerouslySetInnerHTML={{ __html: i?.answer }}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                            )
                        })
                    }

                </Accordion>
            </div>
            {/* ------ Faqs End ------ */}

        </>
    )
}

export default Faqs;