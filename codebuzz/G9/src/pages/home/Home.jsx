import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Css
import "./Home.scss"

// Image
import BannerImg1 from "../../assets/images/home/banner_img1.svg";
import TopCollection1 from "../../assets/images/home/top_collection1.svg";
import TopCollection2 from "../../assets/images/home/top_collection2.svg";
import TopCollection3 from "../../assets/images/home/top_collection3.svg";
import TopCollection4 from "../../assets/images/home/top_collection4.svg";
import CustomizeJewellery from "../../assets/images/home/customize_jewellery.svg";
import Product1 from "../../assets/images/home/product1.svg";
import Product2 from "../../assets/images/home/product2.svg";
import Product3 from "../../assets/images/home/product3.svg";
import Product4 from "../../assets/images/home/product4.svg";

// Light
import FrameLight from "../../assets/images/frame-light.svg";
import ConflictFreeLight from "../../assets/images/home/conflict-free-light.svg";
import IndiaLight from "../../assets/images/home/india-light.svg";
import ResizingLight from "../../assets/images/home/resizing-light.svg";
import CareLight from "../../assets/images/home/care-light.svg";
import DiamondLight from "../../assets/images/home/diamond-light.svg";
import AboutG9JewelleryLight from "../../assets/images/home/about-g9jewellery-light.svg";
import Like from "../../assets/images/account/like.svg";
import UnLikeLight from "../../assets/images/account/unlike-light.svg";
import CallLight from "../../assets/images/home/call-light.svg";
import EmailLight from "../../assets/images/home/email-light.svg";
import ComplaintLight from "../../assets/images/home/complaint-light.svg";

// Dark
import FrameDark from "../../assets/images/frame-dark.svg";
import ConflictFreeDark from "../../assets/images/home/conflict-free-dark.svg";
import IndiaDark from "../../assets/images/home/india-dark.svg";
import ResizingDark from "../../assets/images/home/resizing-dark.svg";
import CareDark from "../../assets/images/home/care-dark.svg";
import DiamondDark from "../../assets/images/home/diamond-dark.svg";
import AboutG9JewelleryDark from "../../assets/images/home/about-g9jewellery-dark.svg";
import UnLikeDark from "../../assets/images/account/unlike-dark.svg";
import CallDark from "../../assets/images/home/call-dark.svg";
import EmailDark from "../../assets/images/home/email-dark.svg";
import ComplaintDark from "../../assets/images/home/complaint-dark.svg";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import useThemeMode from '../../hooks/useThemeMode';
import { reqtoGetSlider, reqtoGetTopSellingProduct } from '../../redux-Toolkit/services/HomeServices';
import { toast } from 'react-toastify';
import { reqtoAddWishlist, reqtoDeleteWishlist, reqtoGetWishlist } from '../../redux-Toolkit/services/AccountServices';
import useCurrency from '../../hooks/useCurrency';
import { currencyData } from '../../constants/data';


const Home = () => {

    const ThemeMode = useThemeMode();
    const currency = useCurrency();


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userToken } = useSelector((state) => state.UserAuth);
    const { wishList } = useSelector((state) => state.UserAccount);

    const home = useSelector((state) => state.Home);
    const { loader, sliderList, topSellingProductList } = home;

    const [visibleTopSellProduct, setVisibleTopSellProduct] = useState(4);

    const handleToggleWishlist = async (id) => {
        if (!userToken) {
            toast.warn("Please login to wishlist.");
            navigate('/');
            return;
        }

        const isInWishlist = wishList?.some((w) => w?.id === id);

        if (isInWishlist) {
            const res = await dispatch(reqtoDeleteWishlist(id));

            if (res.payload?.status) {
                GetWishlist();
            }
        } else {
            const res = await dispatch(reqtoAddWishlist({ product_id: id }));

            if (res.payload?.status) {
                GetWishlist();
            }
        }
    };

    const handleViewMoreTopSellProduct = () => {
        // setVisibleTopSellProduct((prev) => prev + 4);
        navigate("/product?topSelling=true");
    };


    const GetSlider = async () => {
        await dispatch(reqtoGetSlider());
    }

    const GetTopSellingProduct = async (currency) => {
        await dispatch(reqtoGetTopSellingProduct(currency));
    }

    const GetWishlist = async () => {
        await dispatch(reqtoGetWishlist());
    }

    useEffect(() => {
        GetSlider();
        if (userToken) {
            GetWishlist();
        }
    }, []);

    useEffect(() => {
        GetTopSellingProduct(currency);
    }, [currency])

    return (
        <>

            {/* ------ Home-Banner Start ------ */}
            <div className="home_banner">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={true}
                    pagination={{ clickable: true }}
                    allowTouchMove={false}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    className="bannerSwiper"
                >
                    {/* <SwiperSlide>
                        <div className="banner_slide">
                            <div className="banner_img">
                                <img src={BannerImg1} alt="Banner" className='img-fluid' draggable={false} />

                                <div className="content pd-x">
                                    <h2>Top 10 Wedding Rings</h2>

                                    <p>Start your search for the perfect ring with our Top 10 <br /> Women's Wedding Rings.</p>

                                    <button type='button' className='main_btn shop_now' onClick={() => navigate("/product")}>
                                        SHOP NOW
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="banner_slide">
                            <div className="banner_img">
                                <img src={BannerImg1} alt="Banner" className='img-fluid' draggable={false} />

                                <div className="content pd-x">
                                    <h2>Top 10 Wedding Rings</h2>

                                    <p>Start your search for the perfect ring with our Top 10 <br /> Women's Wedding Rings.</p>

                                    <button type='button' className='main_btn shop_now' onClick={() => navigate("/product")}>
                                        SHOP NOW
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="banner_slide">
                            <div className="banner_img">
                                <img src={BannerImg1} alt="Banner" className='img-fluid' draggable={false} />

                                <div className="content pd-x">
                                    <h2>Top 10 Wedding Rings</h2>

                                    <p>Start your search for the perfect ring with our Top 10 <br /> Women's Wedding Rings.</p>

                                    <button type='button' className='main_btn shop_now' onClick={() => navigate("/product")}>
                                        SHOP NOW
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="banner_slide">
                            <div className="banner_img">
                                <img src={BannerImg1} alt="Banner" className='img-fluid' draggable={false} />

                                <div className="content pd-x">
                                    <h2>Top 10 Wedding Rings</h2>

                                    <p>Start your search for the perfect ring with our Top 10 <br /> Women's Wedding Rings.</p>

                                    <button type='button' className='main_btn shop_now' onClick={() => navigate("/product")}>
                                        SHOP NOW
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="banner_slide">
                            <div className="banner_img">
                                <img src={BannerImg1} alt="Banner" className='img-fluid' draggable={false} />

                                <div className="content pd-x">
                                    <h2>Top 10 Wedding Rings</h2>

                                    <p>Start your search for the perfect ring with our Top 10 <br /> Women's Wedding Rings.</p>

                                    <button type='button' className='main_btn shop_now' onClick={() => navigate("/product")}>
                                        SHOP NOW
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="banner_slide">
                            <div className="banner_img">
                                <img src={BannerImg1} alt="Banner" className='img-fluid' draggable={false} />

                                <div className="content pd-x">
                                    <h2>Top 10 Wedding Rings</h2>

                                    <p>Start your search for the perfect ring with our Top 10 <br /> Women's Wedding Rings.</p>

                                    <button type='button' className='main_btn shop_now' onClick={() => navigate("/product")}>
                                        SHOP NOW
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide> */}

                    {
                        sliderList?.map((i, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <div className="banner_slide">
                                        <div className="banner_img">
                                            <div className='image'>
                                                <img src={i.slider} alt="Banner" className='img-fluid' draggable={false} />
                                            </div>

                                            {/* <div className="content pd-x">
                                                <h2>Top 10 Wedding Rings</h2>

                                                <p>Start your search for the perfect ring with our Top 10 <br /> Women's Wedding Rings.</p>

                                                <button
                                                    type='button'
                                                    className='main_btn shop_now'
                                                // onClick={() => navigate("/product")}     
                                                >
                                                    SHOP NOW
                                                </button>
                                            </div> */}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }

                </Swiper>
            </div>
            {/* ------ Home-Banner End ------ */}



            {/* ------ Top-Collection Start ------ */}
            <div className="top_collection pd-x">
                <div className='text-center'>
                    <h4 className='mb-0'>Explore Our Top Collection</h4>

                    <img src={ThemeMode ? FrameLight : FrameDark} alt="Frame" className='img-fluid frame' draggable={false} />

                    <p className=''>
                        Explore the epitome of elegance and craftsmanship with our Top Collection - a curated selection of our most loved and best-selling jewellery pieces. Whether you're looking for statement pieces or everyday elegance, our Top Collection brings together beauty, quality, and style in one stunning showcase.
                    </p>
                </div>

                <div className="row">
                    <div className="col-lg-3">
                        <div className="image_collection">
                            <img src={TopCollection1} alt="Diamond Bracelets" className='img-fluid' draggable={false} />

                            <div className="content_collection">
                                <span>Diamond Bracelets</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="image_collection">
                            <img src={TopCollection2} alt="Engagement Rings" className='img-fluid' draggable={false} />

                            <div className="content_collection">
                                <span>Engagement Rings</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="image_collection">
                            <img src={TopCollection3} alt="Diamond Necklaces" className='img-fluid' draggable={false} />

                            <div className="content_collection">
                                <span>Diamond Necklaces</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="image_collection">
                            <img src={TopCollection4} alt="Diamond Earrings" className='img-fluid' draggable={false} />

                            <div className="content_collection">
                                <span>Diamond Earrings</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ------ Top-Collection End ------ */}



            {/* ------ Fancy-Slider Start ------ */}
            <div className="fancy_slider">
                <Swiper
                    loop={true}
                    speed={2000}
                    slidesPerView={5}
                    spaceBetween={30}
                    centeredSlides={true}
                    modules={[Autoplay, Navigation]}
                    autoplay={{
                        delay: 0,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1.5,
                        },
                        480: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        992: {
                            slidesPerView: 4,
                        },
                        1399: {
                            slidesPerView: 4.5,
                        },
                        1500: {
                            slidesPerView: 5,
                        }
                    }}
                    className="fancySwiper"
                >
                    <SwiperSlide>
                        <div className="fancy_slider_box d-flex align-items-center justify-content-center">
                            <img src={ThemeMode ? ConflictFreeLight : ConflictFreeDark} alt="Conflict" className="img-fluid me-3" draggable={false} />

                            <p className="m-0">Conflict Free</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="fancy_slider_box d-flex align-items-center justify-content-center">
                            <img src={ThemeMode ? IndiaLight : IndiaDark} alt="Conflict" className="img-fluid me-3" draggable={false} />

                            <p className="m-0">Made in INDIA</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="fancy_slider_box d-flex align-items-center justify-content-center">
                            <img src={ThemeMode ? ResizingLight : ResizingDark} alt="Conflict" className="img-fluid me-3" draggable={false} />

                            <p className="m-0">Free Resizing</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="fancy_slider_box d-flex align-items-center justify-content-center">
                            <img src={ThemeMode ? CareLight : CareDark} alt="Conflict" className="img-fluid me-3" draggable={false} />

                            <p className="m-0">Lifetime Care</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="fancy_slider_box d-flex align-items-center justify-content-center">
                            <img src={ThemeMode ? ConflictFreeLight : ConflictFreeDark} alt="Conflict" className="img-fluid me-3" draggable={false} />

                            <p className="m-0">Conflict Free</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="fancy_slider_box d-flex align-items-center justify-content-center">
                            <img src={ThemeMode ? IndiaLight : IndiaDark} alt="Conflict" className="img-fluid me-3" draggable={false} />

                            <p className="m-0">Made in INDIA</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="fancy_slider_box d-flex align-items-center justify-content-center">
                            <img src={ThemeMode ? ResizingLight : ResizingDark} alt="Conflict" className="img-fluid me-3" draggable={false} />

                            <p className="m-0">Free Resizing</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="fancy_slider_box d-flex align-items-center justify-content-center">
                            <img src={ThemeMode ? CareLight : CareDark} alt="Conflict" className="img-fluid me-3" draggable={false} />

                            <p className="m-0">Lifetime Care</p>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            {/* ------ Fancy-Slider End ------ */}



            {/* ------ Customize-Jewellery Start ------ */}
            <div className="customize_jewellery pd-x">
                <div className="row align-items-center justify-content-lg-between">
                    <div className="col-lg-6 col-xxl-5">
                        <div className="customize_cointent">
                            <h4 className='mb-0'>
                                <span>DESIGN YOUR OWN</span> <br />
                                Customize Your Jewellery
                            </h4>

                            <p className=''>
                                Customize every product with every piece is made to reflect your personal style and story to selecting your preferred size, shape and finish. Whether it’s a special occasion or a personal expression of style, our expert artisans work with you to bring your vision to life.
                            </p>

                            <button type='button' className='main_btn customize_order_now'>
                                CUSTOMIZE ORDER NOW
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="image">
                            <img src={CustomizeJewellery} alt="Customize Jewellery" className='img-fluid' draggable={false} />
                        </div>
                    </div>
                </div>

                <div className="diamond d1">
                    <img src={ThemeMode ? DiamondLight : DiamondDark} alt="DiamondLight" className='img-fluid' draggable={false} />
                </div>
                <div className="diamond d2">
                    <img src={ThemeMode ? DiamondLight : DiamondDark} alt="DiamondLight" className='img-fluid' draggable={false} />
                </div>
                <div className="diamond d3">
                    <img src={ThemeMode ? DiamondLight : DiamondDark} alt="DiamondLight" className='img-fluid' draggable={false} />
                </div>
            </div>
            {/* ------ Customize-Jewellery End ------ */}



            {/* ------ About-G9Jewellery Start ------ */}
            <div className="about_jewellery pd-x">
                <div className="row align-items-center justify-content-lg-between">
                    <div className="col-lg-8">
                        <div className="about_cointent">
                            <h4 className='mb-0 cursor-pointer' onClick={() => navigate("/about")}>
                                <span>ABOUT US</span> <br />
                                About G9 Jewellery
                            </h4>

                            <p className=''>
                                <b>G9 Jewellery</b> is a modern Indian luxury jewellery brand born from emotion, elegance, and purpose.
                                The brand name "G9" is a meaningful mix of 9 Gs: <b>Girl, God, Gold, Gujarat, Glit, Glamour, Gorgeous, Genius, and Gems.</b>
                            </p>

                            <p className=''>
                                At G9, we believe jewellery is not just an accessory, it's a feeling, a memory, and a mirror of a woman’s journey. Our brand celebrates the emotional bond women share with their jewellery by crafting timeless pieces that reflect her identity, strength, and story.
                            </p>

                            <button type='button' className='main_btn read_more' onClick={() => navigate("/about")}>
                                READ MORE
                            </button>

                            <p className='mb-0'>
                                Know more about G9 Jewellery and Products? <Link to="/contact-us">Contact Us</Link>
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="image">
                            <img src={ThemeMode ? AboutG9JewelleryLight : AboutG9JewelleryDark} alt="About G9 Jewellery" className='img-fluid' draggable={false} />
                        </div>
                    </div>
                </div>
            </div>
            {/* ------ About-G9Jewellery End ------ */}



            {/* ------ Lines Start ------ */}
            <div className="lines"></div>
            {/* ------ Lines End ------ */}



            {/* ------ Top-Selling-Products Start ------ */}
            <div className="top_selling_products pd-x">
                <div className='text-center'>
                    <h4 className='mb-0'>Top Selling Products</h4>

                    <img src={ThemeMode ? FrameLight : FrameDark} alt="Frame" className='img-fluid frame' draggable={false} />

                    <p className=''>
                        Discover our most loved pieces in the Top Selling Jewellery collection. These customer favorites are a perfect blend of timeless
                        beauty, modern elegance, and exceptional craftsmanship.
                    </p>
                </div>

                <div className="row g-5">
                    {/* <div className="col-lg-3">
                        <div className="product_box">
                            <div className="image">
                                <img src={Product1} alt="Product" className='img-fluid' draggable={false} />
                            </div>

                            <div className="detail">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="name" onClick={() => navigate("/product-details/1")}>Gold Diamond Bracelets</div>

                                    <div className='like'>
                                        <button type='button' className=''>
                                            <img src={UnLikeLight} alt="" className='img-fluid' draggable={false} />
                                        </button>
                                    </div>
                                </div>

                                <div className="price">$160.00 </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="product_box">
                            <div className="image">
                                <img src={Product2} alt="Product" className='img-fluid' draggable={false} />
                            </div>

                            <div className="detail">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="name" onClick={() => navigate("/product-details/1")}>Silver Diamond Neckless</div>

                                    <div className='like'>
                                        <button type='button' className=''>
                                            <img src={UnLikeLight} alt="" className='img-fluid' draggable={false} />
                                        </button>
                                    </div>
                                </div>

                                <div className="price">$130.00 </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="product_box">
                            <div className="image">
                                <img src={Product4} alt="Product" className='img-fluid' draggable={false} />
                            </div>

                            <div className="detail">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="name" onClick={() => navigate("/product-details/1")}>Silver Diamond Ring</div>

                                    <div className='like'>
                                        <button type='button' className=''>
                                            <img src={UnLikeLight} alt="" className='img-fluid' draggable={false} />
                                        </button>
                                    </div>
                                </div>

                                <div className="price">$120.00 </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="product_box">
                            <div className="image">
                                <img src={Product3} alt="Product" className='img-fluid' draggable={false} />
                            </div>

                            <div className="detail">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="name" onClick={() => navigate("/product-details/1")}>Silver Diamond Earrings</div>

                                    <div className='like'>
                                        <button type='button' className=''>
                                            <img src={UnLikeLight} alt="" className='img-fluid' draggable={false} />
                                        </button>
                                    </div>
                                </div>

                                <div className="price">$140.00 </div>
                            </div>
                        </div>
                    </div> */}

                    {
                        topSellingProductList?.slice(0, visibleTopSellProduct)?.map((i, index) => {
                            const isInWishlist = wishList?.some((w) => w?.id === i?.id);

                            return (
                                <div className="col-lg-3" key={index}>
                                    <div className="product_box">
                                        <div className="image">
                                            <span className='ribbon'>G9 Jewellery</span>

                                            <img src={i?.images[0]} alt={i?.title} className='img-fluid cursor-pointer' draggable={false} onClick={() => navigate(`/product-details/${i?.id}`)} />
                                        </div>

                                        <div className="detail">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="name" onClick={() => navigate(`/product-details/${i?.id}`)}>{i?.title}</div>

                                                <div className='like'>
                                                    <button type='button' className='' onClick={() => handleToggleWishlist(i?.id)}>
                                                        {
                                                            isInWishlist ? (
                                                                <img src={Like} alt="" className='img-fluid' draggable={false} />
                                                            ) : (
                                                                <img src={ThemeMode ? UnLikeLight : UnLikeDark} alt="" className='img-fluid' draggable={false} />
                                                            )
                                                        }
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="price">
                                                {currency ? currencyData?.find((i) => i?.value === currency)?.symbol : '₹'}
                                                {Number(i?.selling_price)} </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                {visibleTopSellProduct < topSellingProductList?.length && (
                    <button
                        type='button'
                        className='main_btn view_more'
                        // onClick={() => navigate("/product")}
                        onClick={handleViewMoreTopSellProduct}
                    >
                        VIEW MORE
                    </button>
                )}

            </div>
            {/* ------ Top-Selling-Products End ------ */}


            {/* ------ Lines Start ------ */}
            <div className="lines"></div>
            {/* ------ Lines End ------ */}



            {/* ------ Get-In-Touch Start ------ */}
            <div className="get_in_touch pd-x">
                <div className='text-center'>
                    <h4 className='mb-0'>Get In Touch With Us</h4>

                    <img src={ThemeMode ? FrameLight : FrameDark} alt="Frame" className='img-fluid frame' draggable={false} />

                    <p className=''>
                        Cal and Email for connect with our friendly team and also you can place the customize order.
                    </p>
                </div>

                <div className="row justify-content-center g-5">
                    <div className="col-lg-4">
                        <div className="contact_detail text-center h-100">
                            <div className="image">
                                <img src={ThemeMode ? CallLight : CallDark} alt="Call" className='img-fluid' draggable={false} />
                            </div>

                            <div className='title'>Call Us</div>
                            <p>Mon-Sat from 10AM to 6PM.</p>
                            <Link to="tel:+917285858542">+91 7285 858 542</Link>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="contact_detail text-center h-100">
                            <div className="image">
                                <img src={ThemeMode ? EmailLight : EmailDark} alt="Email" className='img-fluid' draggable={false} />
                            </div>

                            <div className='title'>Email Us</div>
                            <p>We’re here to chat support.</p>
                            <Link to="mailto:g9jewellerys@gmail.com">g9jewellerys@gmail.com</Link>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="contact_detail text-center h-100">
                            <div className="image">
                                <img src={ThemeMode ? ComplaintLight : ComplaintDark} alt="Email" className='img-fluid' draggable={false} />
                            </div>

                            <div className='title'>Complaint & Query</div>
                            <p>We’re here to Listen.</p>
                            <Link to="/complaint-query">Write Message</Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* ------ Get-In-Touch End ------ */}


        </>
    )
}

export default Home;