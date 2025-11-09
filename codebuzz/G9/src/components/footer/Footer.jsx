import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

// Css
import "./Footer.scss"

// Image
// Light
import CallLight from "../../assets/images/footer/call-light.svg";
import EmailLight from "../../assets/images/footer/email-light.svg";
import InstagramLight from "../../assets/images/footer/instagram-light.svg";
import FacebookLight from "../../assets/images/footer/facebook-light.svg";
import LinkedinLight from "../../assets/images/footer/linkedin-light.svg";
import YoutubeLight from "../../assets/images/footer/youtube-dark.svg";
import PinterestLight from "../../assets/images/footer/pinterest-light.svg";
// Dark
import CallDark from "../../assets/images/footer/call-dark.svg";
import EmailDark from "../../assets/images/footer/email-dark.svg";
import InstagramDark from "../../assets/images/footer/instagram-dark.svg";
import FacebookDark from "../../assets/images/footer/facebook-dark.svg";
import LinkedinDark from "../../assets/images/footer/linkedin-dark.svg";
import YoutubeDark from "../../assets/images/footer/youtube-dark.svg";
import PinterestDark from "../../assets/images/footer/pinterest-dark.svg";

import useThemeMode from '../../hooks/useThemeMode';
import ThemeToggle from '../theme-toggle/ThemeToggle';

const Footer = ({ categoryList, subCategoryList }) => {

    const ThemeMode = useThemeMode();

    return (
        <>

            {/* ------ Footer Start ------ */}
            <footer className='pd-x'>
                <div className="row">
                    <div className="col-lg-2">
                        <h3>Quick Links</h3>

                        <ul>
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/blogs-media/blogs">Blogs / Media</Link></li>
                            <li><Link to="/contact-us">Contact Us</Link></li>
                            <li><Link to="/faqs">Faq’s</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-2">
                        <h3>
                            {/* Men’s Jewellery */}
                            {categoryList?.find((i) => i.name === "Men's")?.name && "Men’s Jewellery"}
                        </h3>

                        <ul>
                            {/* <li><Link to="/product">Rings</Link></li>
                            <li><Link to="/product">Bracelets</Link></li> */}

                            {
                                subCategoryList
                                    ?.filter((i) => i.categoryId === 8)
                                    ?.map((i, index) => {
                                        return (
                                            <li key={index}><Link to={`/product/${i.categoryId}/${i.id}`}>{i?.name}</Link></li>
                                        )
                                    })
                            }
                        </ul>
                    </div>
                    <div className="col-lg-2">
                        <h3>
                            {categoryList?.find((i) => i.name === "Women's")?.name && "Women’s Jewellery"}
                        </h3>

                        <ul>
                            {/* <li><Link to="/product">Rings</Link></li>
                            <li><Link to="/product">Bracelets</Link></li>
                            <li><Link to="/product">Necklaces</Link></li>
                            <li><Link to="/product">Earrings</Link></li>
                            <li><Link to="/product">Chains</Link></li> */}

                            {
                                subCategoryList
                                    ?.filter((i) => i.categoryId === 9
                                    )
                                    ?.map((i, index) => {
                                        return (
                                            <li key={index}><Link to={`/product/${i.categoryId}/${i.id}`}>{i?.name}</Link></li>
                                        )
                                    })
                            }
                        </ul>
                    </div>
                    <div className="col-lg-2">
                        <h3>
                            {categoryList?.find((i) => i.name === "Accessories")?.name && "Accessories"}
                        </h3>

                        <ul>
                            {/* <li><Link to="/product">Watches</Link></li>
                            <li><Link to="/product">Diamonds</Link></li> */}
                            {
                                subCategoryList
                                    ?.filter((i) => i.categoryId === 10
                                    )
                                    ?.map((i, index) => {
                                        return (
                                            <li key={index}><Link to={`/product/${i.categoryId}/${i.id}`}>{i?.name}</Link></li>
                                        )
                                    })
                            }
                        </ul>
                    </div>
                    <div className="col-lg-2">
                        <h3>Policies</h3>

                        <ul>
                            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
                            <li><Link to="/payment-delivery-policy">Payment & Delivery Policy</Link></li>
                            <li><Link to="/return-refund-policy">Refund & Return Policy</Link></li>
                        </ul>
                    </div>
                </div>
            </footer>
            {/* ------ Footer End ------ */}



            {/* ------ Developed Start ------ */}
            <div className='developed'>
                <div className="social">
                    <h3 className='text-center'>Get In Touch</h3>

                    <div className="d-flex justify-content-center flex-wrap gap-4">
                        <Link to="tel:+917285858542">
                            <img src={ThemeMode ? CallLight : CallDark} alt="Call" className='img-fluid' draggable={false} />
                        </Link>
                        <Link to="mailto:g9jewellerys@gmail.com">
                            <img src={ThemeMode ? EmailLight : EmailDark} alt="Email" className='img-fluid' draggable={false} />
                        </Link>
                        <Link to="https://www.instagram.com/g9jwellery/" target='_blank'>
                            <img src={ThemeMode ? InstagramLight : InstagramDark} alt="Instagram" className='img-fluid' draggable={false} />
                        </Link>
                        <Link to="https://www.facebook.com/GnineJewellery" target='_blank'>
                            <img src={ThemeMode ? FacebookLight : FacebookDark} alt="Facebook" className='img-fluid' draggable={false} />
                        </Link>
                        <Link to="https://www.linkedin.com/company/g9jewellery-com/" target='_blank'>
                            <img src={ThemeMode ? LinkedinLight : LinkedinDark} alt="Linkedin" className='img-fluid' draggable={false} />
                        </Link>
                        <Link to="https://pin.it/4ZAmrbcbi" target='_blank'>
                            <img src={ThemeMode ? PinterestLight : PinterestDark} alt="Pinterest" className='img-fluid' draggable={false} />
                        </Link>
                    </div>
                </div>

                <p className='mb-0 text-center mx-auto'>
                    G9 Jewellery © 2025, All Right Reserved.
                </p>
            </div>
            {/* ------ Developed End ------ */}

        </>

    )
}

export default Footer;