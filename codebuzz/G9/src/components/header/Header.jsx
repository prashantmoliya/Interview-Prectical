import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';

// Css
import "./Header.scss"

// Image
// Light
import LogoLight from "../../assets/images/header/logo-light.svg";
import CartLight from "../../assets/images/header/cart-light.svg";
import UserLight from "../../assets/images/header/user-light.svg";
import DropdownLight from "../../assets/images/header/dropdown-light.svg";
import ProductJewelleryLight from "../../assets/images/header/product-jewellery-light.svg";
// Dark
import LogoDark from "../../assets/images/header/logo-dark.svg";
import CartDark from "../../assets/images/header/cart-dark.svg";
import UserDark from "../../assets/images/header/user-dark.svg";
import DropdownDark from "../../assets/images/header/dropdown-dark.svg";
import ProductJewelleryDark from "../../assets/images/header/product-jewellery-dark.svg";

import useThemeMode from '../../hooks/useThemeMode';

import { useDispatch, useSelector } from 'react-redux';
import { reqtoGetProfile } from '../../redux-Toolkit/services/AccountServices';
import { getNameInitials } from '../../utils';
import { toast } from 'react-toastify';
import { reqtoGetCart } from '../../redux-Toolkit/services/CartServices';
import { reqtoGetOfferbar } from '../../redux-Toolkit/services/HomeServices';

import Select from "react-select";

import { CurrencyContext } from '../../context/CurrencyContext';
import { currencyData } from '../../constants/data';
import { SelectDropdownIndicator } from '../react-select/ReactSelect';

const Header = ({ categoryList, subCategoryList }) => {

    const ThemeMode = useThemeMode();

    // Currency
    const { currency, handleCurrency } = useContext(CurrencyContext);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = localStorage.getItem("g9jewellery-user-token");

    const { userToken } = useSelector((state) => state.UserAuth);
    const { cartList } = useSelector((state) => state.Cart);
    const { offerbarList } = useSelector((state) => state.Home);

    const userAccount = useSelector((state) => state.UserAccount);
    const { userProfile } = userAccount;

    const [searching, setSearching] = useState("");

    const handleSearching = (e) => {
        e.preventDefault();

        console.log("Header Searching :-", searching);

        navigate(`/product?search=${searching}`);

        setSearching('');
    }

    const handleCart = () => {
        if (userToken) {
            navigate('/cart');
        } else {
            toast.warn("Please login to Cart.");
            navigate('/');
        }
    };

    // GetOfferbar 
    const GetOfferbar = async () => {
        await dispatch(reqtoGetOfferbar());
    }

    // Profile 
    const GetProfile = async () => {
        await dispatch(reqtoGetProfile());
    }

    // Cart 
    const GetCart = async (currency) => {
        await dispatch(reqtoGetCart(currency));
    }


    useEffect(() => {
        GetOfferbar();
    }, []);

    useEffect(() => {
        if (userToken) {
            GetProfile();
        }
    }, [userToken]);


    useEffect(() => {
        if (userToken && currency) {
            GetCart(currency);
        }

        const handleCartUpdate = () => {
            if (userToken && currency) {
                GetCart(currency);
            }
        }

        window.addEventListener("cartUpdated", handleCartUpdate);
        return () => window.removeEventListener("cartUpdated", handleCartUpdate);
    }, [userToken, currency]);


    return (
        <>

            {/* ------ Top-bar Start ------ */}
            <div className="top_bar">
                <div className='offer d-flex align-items-center'>
                    {
                        offerbarList?.map((i, index) => {
                            return (
                                <p className="mb-0 text-center" key={index}>
                                    {i?.text}
                                </p>
                            )
                        })
                    }

                    {/* <p className="mb-0 text-center">The Fall Sale at G9 Jewellery | <span>25% Off Ring Settings & Bands</span></p> */}
                </div>
            </div>
            {/* ------ Top-bar End ------ */}



            {/* ------ Header Start ------ */}
            <header className=''>
                <div className='top pd-x'>
                    <div className="">
                        <nav className="navbar navbar-expand-lg">
                            <div className="container-fluid p-0">
                                <div className='navbar-brand me-0'>
                                    <Link to="/home">
                                        <img src={ThemeMode ? LogoLight : LogoDark} alt="" className='img-fluid logo' />
                                    </Link>
                                </div>

                                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                                    <div className="offcanvas-header">
                                        <div className='navbar-brand'>
                                            <Link>
                                                <img src={ThemeMode ? LogoLight : LogoDark} alt="" className='img-fluid' />
                                            </Link>
                                        </div>
                                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div className="offcanvas-body align-items-center">

                                        <form className="me-auto d-none d-lg-flex" role="search" onSubmit={handleSearching}>
                                            <input type="text" placeholder="Search Product..." value={searching} onChange={(e) => setSearching(e.target.value)} required />

                                            <button type="submit" className="search_btn">
                                                Search
                                            </button>
                                        </form>

                                        <div className='accounts ms-auto d-none d-lg-block d-lg-flex align-items-lg-center'>
                                            <div className=''>
                                                <Link
                                                    // to={"/cart"}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleCart();
                                                    }}
                                                    className='d-flex align-items-center cart'
                                                >
                                                    <img src={ThemeMode ? CartLight : CartDark} alt="" className='img-fluid' draggable={false} />

                                                    <span className=''></span>

                                                    <div className="quantity">
                                                        {currency ? currencyData?.find((i) => i?.value === currency)?.symbol : '₹'}
                                                        {Number(cartList?.Total || 0)}
                                                    </div>
                                                </Link>
                                            </div>

                                            <div className='mx-4'>
                                                {/* <Link className='d-flex align-items-center cart'>
                                                    <div className="quantity me-3">
                                                        Currency
                                                    </div>

                                                    <img src={ThemeMode ? DropdownLight : DropdownDark} alt="" className='img-fluid' draggable={false} />
                                                </Link> */}

                                                <Select
                                                    options={currencyData}
                                                    value={currency ? currencyData?.find((i) => i?.value === currency) : null}
                                                    onChange={(e) => {
                                                        handleCurrency(e ? e.value : '');
                                                    }}
                                                    placeholder="Currency"
                                                    classNamePrefix="form-currency"
                                                    components={{ DropdownIndicator: SelectDropdownIndicator }}
                                                    isSearchable={false}
                                                    formatOptionLabel={(option) => (
                                                        <div className='d-flex align-items-center gap-2 '>
                                                            <span>{option.symbol}</span>
                                                            <span>{option.label}</span>
                                                        </div>
                                                    )}
                                                />
                                            </div>

                                            {
                                                userToken ? (
                                                    <div className='account_profile d-flex align-items-center'>
                                                        <div className='image'>
                                                            {
                                                                userProfile?.profile ? (
                                                                    <img src={userProfile?.profile} alt="" className='img-fluid user_img' draggable={false} />
                                                                ) : (
                                                                    <div className="name_initials">
                                                                        <span>{getNameInitials(userProfile?.name)}</span>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                        <div className='info'>
                                                            <div className="name">Hello, {userProfile?.name || ""}</div>
                                                            <div
                                                                className='menu d-flex align-items-center'
                                                                onClick={() => navigate("/account")}
                                                            >
                                                                Account & Orders
                                                                <img src={ThemeMode ? DropdownLight : DropdownDark} alt="" className='img-cluid ms-2' draggable={false} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className=''>
                                                        <Link to={"/"}>
                                                            <img src={ThemeMode ? UserLight : UserDark} alt="" className='img-fluid' draggable={false} />
                                                        </Link>
                                                    </div>
                                                )
                                            }

                                        </div>

                                        <ul className="navbar-nav mb-0 mb-lg-0 me-auto d-none">
                                            <li className="nav-item mb-2 mb-lg-0" data-bs-dismiss="offcanvas">
                                                <NavLink to="/" className="nav-link">HOME</NavLink>
                                            </li>
                                            <li className="nav-item mb-2 mb-lg-0" data-bs-dismiss="offcanvas">
                                                <NavLink to="/about-us" className="nav-link">ABOUT US</NavLink>
                                            </li>
                                            <li className="nav-item mb-2 mb-lg-0" onMouseEnter={() => setIsSubMenuVisible(true)} onMouseLeave={() => setIsSubMenuVisible(false)} data-bs-dismiss="offcanvas">

                                                <div className="nav-link d-flex align-items-center">
                                                    SERVICES
                                                    {/* <img src={Dropdown} alt="Instagram" className='img-cluid ms-3' /> */}
                                                </div>

                                                {/* {
                                                    isSubMenuVisible && (
                                                        <ul className="sub-menu">
                                                            <li><Link className="nav-link" to={`/services-details/${ServicesData[0]?.slug}`} onClick={() => setIsSubMenuVisible(false)}>COLOR CONSULTATION</Link></li>
                                                            <li><Link className="nav-link" to={`/services-details/${ServicesData[1]?.slug}`} onClick={() => setIsSubMenuVisible(false)}>SPACE PLANNING</Link></li>
                                                            <li><Link className="nav-link" to={`/services-details/${ServicesData[2]?.slug}`} onClick={() => setIsSubMenuVisible(false)}>HOME RENOVATIONS</Link></li>
                                                            <li><Link className="nav-link" to={`/services-details/${ServicesData[3]?.slug}`} onClick={() => setIsSubMenuVisible(false)}>BESPOKE FURNITURE</Link></li>
                                                        </ul>
                                                    )
                                                } */}

                                            </li>
                                            <li className="nav-item mb-2 mb-lg-0" data-bs-dismiss="offcanvas">
                                                <NavLink to="/packages" className="nav-link">PACKAGES</NavLink>
                                            </li>
                                            <li className="nav-item mb-0 mb-lg-0" data-bs-dismiss="offcanvas">
                                                <NavLink to="/contact-us" className="nav-link">CONTACT US</NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div >
                {/* <div className='second d-none d-lg-block'>
                    <div className="pd-x">
                        <nav className="navbar navbar-expand-lg">
                            <div className="container-fluid p-0">
                                <div className='navbar-brand me-0'>
                                </div>

                                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                                    <div className="offcanvas-header">
                                        <div className='navbar-brand'>
                                            <Link>
                                            </Link>
                                        </div>
                                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div className="offcanvas-body align-items-center">
                                        <ul className="navbar-nav mb-0 mb-lg-0 me-auto">
                                            <li className="nav-item mb-2 mb-lg-0" data-bs-dismiss="offcanvas">
                                                <NavLink to="/home" className="nav-link">Home</NavLink>
                                            </li>
                                            <li className="nav-item mb-2 mb-lg-0" data-bs-dismiss="offcanvas">
                                                <NavLink className="nav-link d-flex align-items-center">
                                                    Products
                                                    <img src={DropdownLight} alt="" className='img-cluid ms-2' draggable={false} />
                                                </NavLink>

                                                <div className="sub-menu">

                                                </div>
                                            </li>
                                            <li className="nav-item mb-2 mb-lg-0" data-bs-dismiss="offcanvas">
                                                <NavLink className="nav-link">About Us</NavLink>
                                            </li>
                                            <li className="nav-item mb-0 mb-lg-0" data-bs-dismiss="offcanvas">
                                                <NavLink className="nav-link">Contact Us</NavLink>
                                            </li>
                                        </ul>

                                        <div className='support me-5'>
                                            <Link className='' to="tel:+1234657890">
                                                +123 465 7890
                                            </Link>
                                            <span>Call or Text 24/7</span>
                                        </div>

                                        <button type='button' className='main_btn ask_price'>
                                            ASK PRICE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div> */}


                <div className='second d-none d-lg-block' >
                    <div className="">
                        <nav className="navbar navbar-expand-lg pd-x">
                            <div className="container-fluid d-block p-0">
                                <div className="d-flex justify-content-between align-items-center">
                                    <ul className="navbar-nav mb-0 mb-lg-0 me-auto">
                                        <li className="nav-item mb-2 mb-lg-0">
                                            <NavLink to="/home" className="nav-link">Home</NavLink>
                                        </li>
                                        <li className="nav-item mb-2 mb-lg-0">
                                            <NavLink className="nav-link d-flex align-items-center">
                                                Products
                                                <img src={ThemeMode ? DropdownLight : DropdownDark} alt="" className='img-cluid ms-2' draggable={false} />
                                            </NavLink>

                                            {/* <ul className="sub-menu pd-x">
                                                    <li><Link className="nav-link">COLOR CONSULTATION</Link></li>
                                                    <li><Link className="nav-link">SPACE PLANNING</Link></li>
                                                    <li><Link className="nav-link">HOME RENOVATIONS</Link></li>
                                                    <li><Link className="nav-link">BESPOKE FURNITURE</Link></li>
                                                </ul> */}

                                            <div className='sub-menu'>
                                                <div></div>
                                                <div className="pd-x">
                                                    <div className="row">
                                                        <div className="col-lg-3">
                                                            <h3 className='mb-0'>
                                                                {categoryList?.find((i) => i.name === "Men's")?.name && "Men’s Jewellery"}
                                                            </h3>

                                                            <ul>
                                                                {/* <li><Link to="/product">Rings</Link></li>
                                                                <li><Link to="/product">Bracelets</Link></li> */}

                                                                {
                                                                    // console.log(subCategoryList?.filter((i) => i.categoryId === 8))

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
                                                        <div className="col-lg-3">
                                                            <h3 className='mb-0'>
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
                                                        <div className="col-lg-3">
                                                            <h3 className='mb-0'>
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
                                                        <div className="col-lg-3">
                                                            <div className="image">
                                                                <img src={ThemeMode ? ProductJewelleryLight : ProductJewelleryDark} alt="Jewellery" className='img-fluid' draggable={false} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </li>
                                        <li className="nav-item mb-2 mb-lg-0">
                                            <NavLink to="/about" className="nav-link">About Us</NavLink>
                                        </li>
                                        {/* <li className="nav-item mb-2 mb-lg-0">
                                                <NavLink className="nav-link">Our Story</NavLink>
                                            </li>
                                            <li className="nav-item mb-0 mb-lg-0">
                                                <NavLink className="nav-link">Blogs</NavLink>
                                            </li> */}
                                        <li className="nav-item mb-0 mb-lg-0">
                                            <NavLink to="/contact-us" className="nav-link">Contact Us</NavLink>
                                        </li>
                                    </ul>

                                    <div className='support me-5'>
                                        <Link className='' to="tel:+917285858542">
                                            +91 7285 858 542
                                        </Link>
                                        <span>Call or WhatsApp 24/7</span>
                                    </div>

                                    <button type='button' className='main_btn ask_price'>
                                        ASK PRICE
                                    </button>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>

            </header >
            {/* ------ Header End ------ */}


        </>
    )
}

export default Header;