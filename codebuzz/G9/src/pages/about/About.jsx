import React from 'react'
import { Link } from 'react-router-dom';

// Css
import "./About.scss"

// Image
import ManishaShah from "../../assets/images/about/manisha-shah.svg";
import KomalTarpara from "../../assets/images/about/komal-tarpara.svg";
import TejasTarapara from "../../assets/images/about/tejas-tarapara.svg";
import FenilShah from "../../assets/images/about/fenil-shah.svg";

// Light
import AboutUsLight from "../../assets/images/about/about-us-light.svg";
// Dark
import AboutUsDark from "../../assets/images/about/about-us-dark.svg";

import useThemeMode from '../../hooks/useThemeMode';

const About = () => {

    const ThemeMode = useThemeMode();

    return (
        <>

            {/* ------ About-Us-Banner Start ------ */}
            <div className="about_us pd-x">
                <div className="row align-items-center justify-content-lg-between">
                    <div className="col-lg-9">
                        <div className="about_cointent">
                            <h6 className='mb-0'>About Us</h6>

                            <h4 className=''>
                                About The Brand
                            </h4>

                            <p className=''>
                                <b>G9 Jewellery</b> is a modern Indian luxury jewellery brand born from emotion, elegance, and purpose. The brand name "G9" is a meaningful mix of 9 Gs: <b>Girl, God, Gold, Gujarat, Glit, Glamour, Gorgeous, Genius, and Gems.</b>
                            </p>

                            <p className='mb-0'>
                                At G9, we believe jewellery is not just an accessory, it's a feeling, a memory, and a mirror of a woman’s journey. Our brand celebrates the emotional bond women share with their jewellery by crafting timeless pieces that reflect her identity, strength, and story.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="image d-flex justify-content-lg-end">
                            <img src={ThemeMode ? AboutUsLight : AboutUsDark} alt="About Us" className='img-fluid' draggable={false} />
                        </div>
                    </div>
                </div>
            </div>
            {/* ------ About-Us-Banner End ------ */}



            {/* ------ Lines Start ------ */}
            <div className="lines"></div>
            {/* ------ Lines End ------ */}



            {/* ------ Vision&Mission Start ------ */}
            <div className="vision_mission pd-x">
                <div className='text-center'>
                    <h4 className='mb-0'>Vision & Mission</h4>

                    <p className=''>
                        We aim to redefine jewellery as more than beauty or luxury but as a spark of identity and empowerment.
                    </p>
                </div>

                <div className="row justify-content-center g-5">
                    <div className="col-lg-6 col-xl-5">
                        <div className="vision_mission_detail text-center">

                            <h3>Our Vision</h3>
                            <p className='mb-0'>
                                To reignite the emotional connection between women and their jewellery - making every piece a symbol of self-love, power,
                                and purpose.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xl-5">
                        <div className="vision_mission_detail text-center">

                            <h3>Our Mission</h3>
                            <p className='mb-0'>
                                To create jewellery that celebrates emotions, tells personal
                                stories, and empowers women through timeless, elegant,
                                and ethical designs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* ------ Vision&Mission End ------ */}



            {/* ------ Directors&Founders Start ------ */}
            <div className="directors_founders pd-x">
                <div className='text-center'>
                    <h4 className='mb-0'>Meet The Directors & Founders</h4>

                    <p className=''>
                        Founded by <b>Ms. Mahi Shah, Ms. Komal Tarpara, Mr. Tejas and Mr. Fenil</b> G9 is the vision of three legends: one woman with a deep emotional connection to jewellery, and two men with the business strategy and vision to shape the market.
                    </p>
                </div>

                <div className="row g-5">
                    <div className="col-lg-3">
                        <div className="founders_box">
                            <div className="image">
                                <img src={ManishaShah} alt="Manisha Shah" className='img-fluid' draggable={false} />
                            </div>

                            <div className="detail text-center">
                                <div className="name">Manisha Shah</div>

                                <div className="role">FOUNDER & DIRECTOR</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="founders_box">
                            <div className="image">
                                <img src={KomalTarpara} alt="Komal Tarpara" className='img-fluid' draggable={false} />
                            </div>

                            <div className="detail text-center">
                                <div className="name">Komal Tarpara</div>

                                <div className="role">FOUNDER & DIRECTOR</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="founders_box">
                            <div className="image">
                                <img src={TejasTarapara} alt="Tejas Tarapara" className='img-fluid' draggable={false} />
                            </div>

                            <div className="detail text-center">
                                <div className="name">Tejas Tarapara</div>

                                <div className="role">CO-FOUNDER</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="founders_box">
                            <div className="image">
                                <img src={FenilShah} alt="Fenil Shah" className='img-fluid' draggable={false} />
                            </div>

                            <div className="detail text-center">
                                <div className="name">Fenil Shah</div>

                                <div className="role">CO-FOUNDER</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ------ Directors&Founders End ------ */}



            {/* ------ Brand Start ------ */}
            <div className="brand pd-x">
                <h4>Brand Goals</h4>

                <p>1. To become a globally recognized leader in emotionally-driven, ethically-made CVD diamond jewellery.</p>
                <p>2. To inspire and empower women through meaningful designs that reflect individuality and pride.</p>
                <p className="mb-0">3. To innovate in the jewellery space with timeless collections, strong community partnerships, and elevated customer experiences.</p>


                <h4 className='mt-5 mb-2'>Brand Identity</h4>

                <p><b>Brand Essence in 3 Words:</b> Timeless. Refined. Iconic.</p>

                <p className='lh'>
                    <b>Target Audience:</b> <br />
                    Women aged 28–45 who are empowered, elegant, and accomplished. They value emotion, quality, and timeless beauty in everything they wear.
                </p>

                <p className='lh'>
                    <b>Unique Differentiator:</b> <br />
                    G9 isn’t just about jewellery - it’s about emotional design. Every piece tells a story and speaks to the woman who wears it.
                </p>

                <p className='mb-0 lh'>
                    <b>Logo Message:</b> <br />
                    Represents strength, luxury, and femininity with a modern touch, reflecting boldness and emotional depth.
                </p>
            </div>
            {/* ------ Brand End ------ */}



            {/* ------ Products&Collection Start ------ */}
            <div className="products_collection pd-x">
                <div className='text-center'>
                    <h4>Products & Collection</h4>

                    <p>
                        <b>Jewellery Types:</b> Earrings, rings, necklaces, bangles, bridal sets, and more.
                    </p>
                    <p>
                        <b>Design Style:</b> A blend of traditional inspiration and modern minimalism, with emotional storytelling at its heart.
                    </p>
                    <p>
                        <b>Materials Used:</b> Gold and certified CVD diamonds.
                    </p>
                    <p>
                        <b>Production:</b> A mix of handcrafted and precision-machined pieces.
                    </p>
                </div>

                <div className="row g-5">
                    <div className="col-lg-3">
                        <div className="products_collection_detail text-center">

                            <h5>Bridal Collection</h5>

                            <p className='mb-0'>
                                Timeless glamour for life's biggest day
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="products_collection_detail text-center">

                            <h5>Everyday Elegance</h5>

                            <p className='mb-0'>
                                Minimal, powerful
                                daily wear
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="products_collection_detail text-center">

                            <h5>Statement Sparkle </h5>

                            <p className='mb-0'>
                                Bold and iconic looks for impactful moments
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="products_collection_detail text-center">

                            <h5>Personalized Jewellery</h5>

                            <p className='mb-0'>
                                Custom pieces that reflect personal stories
                            </p>
                        </div>
                    </div>
                </div>

                <div className='text-center'>
                    <h4 className='mb-2'>Launch Frequency</h4>

                    <p>
                        As per seasonal sales and trends.
                    </p>

                    <button type='button' className='main_btn order_now'>
                        ORDER NOW
                    </button>
                </div>
            </div>
            {/* ------ Products&Collection End ------ */}



            {/* ------ Brand Start ------ */}
            <div className="brand pd-x">
                <h4>Brand Presence & Promotion</h4>

                <p>The brand is open to growth through community events, collaborations with stylists and women-centric platforms.</p>

                <p>G9 Jewellery is based in Surat and currently operates online, using:</p>

                <ul>
                    <li><p>Instagram, Facebook, YouTube</p></li>
                    <li><p>Paid Meta ads, exhibitions, and influencer collaborations</p></li>
                    <li><p className="mb-0">Website and WhatsApp for sales</p></li>
                </ul>
            </div>
            {/* ------ Brand End ------ */}



            {/* ------ Customer-Experience Start ------ */}
            <div className="customer_experience pd-x">
                <h4>Customer Experience</h4>

                <p>G9 creates a luxurious yet personal buying experience, from seamless online shopping to thoughtful unboxing. Each customer is treated as a valued part of the brand's journey.</p>

                <p><b>Client Story:</b> One client gifted herself a G9 bracelet on her 35th birthday, saying: “For years I waited for others to celebrate me. This time, I celebrated myself.”</p>
                <p><b>After-Sales Care:</b> Lifetime support with resizing, repairs, polishing, and personal attention to every client’s needs.</p>
            </div>
            {/* ------ Customer-Experience End ------ */}



            {/* ------ Lines Start ------ */}
            <div className="lines"></div>
            {/* ------ Lines End ------ */}



            {/* ------ Future-Vision Start ------ */}
            <div className="future_vision pd-x">
                <h4>Future Vision</h4>

                <ul>
                    <li><p>Expand G9 globally as a premium CVD diamond jewellery brand</p></li>
                    <li><p>Collaborate with women empowerment campaigns, influencers, and conscious fashion events</p></li>
                    <li><p className="mb-0">Grow the collection with more emotional, elegant, and sustainable pieces</p></li>
                </ul>
            </div>
            {/* ------ Future-Vision End ------ */}

        </>
    )
}

export default About;