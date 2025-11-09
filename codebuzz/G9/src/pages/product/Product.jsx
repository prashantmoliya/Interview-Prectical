import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';

import { Range } from 'react-range';
import { Convert } from "easy-currencies";


// Css
import "./Product.scss"

// Image
import Product2 from "../../assets/images/home/product2.svg";
import Product3 from "../../assets/images/home/product3.svg";
import Product4 from "../../assets/images/home/product4.svg";
// Light
import Like from "../../assets/images/account/like.svg";
import UnLikeLight from "../../assets/images/account/unlike-light.svg";
import UpArrowLight from "../../assets/images/product/up-arrow-light.svg";
import DownArrowLight from "../../assets/images/product/down-arrow-light.svg";
import DropdownLight from "../../assets/images/header/dropdown-light.svg";
import GridLight from "../../assets/images/product/grid-light.svg";
import ListLight from "../../assets/images/product/list-light.svg";

import GridActiveLight from "../../assets/images/product/grid-active-light.svg";
import ListActiveLight from "../../assets/images/product/list-active-light.svg";

// Dark
import UnLikeDark from "../../assets/images/account/unlike-dark.svg";
import DropdownDark from "../../assets/images/header/dropdown-dark.svg";
import GridDark from "../../assets/images/product/grid-dark.svg";
import ListDark from "../../assets/images/product/list-dark.svg";

import GridActiveDark from "../../assets/images/product/grid-active-dark.svg";
import ListActiveDark from "../../assets/images/product/list-active-dark.svg";

import useThemeMode from '../../hooks/useThemeMode';
import { useDispatch, useSelector } from 'react-redux';
import { reqtoGetProductGoldPurity, reqtoGetProductList, reqtoGetProductMetals, reqtoGetProductPriceFilter, reqtoGetProductStoneShape } from '../../redux-Toolkit/services/ProductServices';
import { reqtoAddWishlist, reqtoDeleteWishlist, reqtoGetWishlist } from '../../redux-Toolkit/services/AccountServices';
import { toast } from 'react-toastify';
import useCurrency from '../../hooks/useCurrency';
import { currencyData } from '../../constants/data';
import { Accordion } from 'react-bootstrap';
import Pagination from '../../components/pagination/Pagination';

const Product = () => {

    const ThemeMode = useThemeMode();
    const currency = useCurrency();

    const { categoryId, subCategoryId } = useParams();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const searching = searchParams.get('search') || "";
    const topSelling = searchParams.get('topSelling') || "";

    console.log(location, searchParams, topSelling, searching);


    const navigate = useNavigate();
    const dispatch = useDispatch();



    const { userToken } = useSelector((state) => state.UserAuth);
    const { wishList } = useSelector((state) => state.UserAccount);

    const product = useSelector((state) => state.Product);
    const { categoryList, subCategoryList, metalsList, goldPurityList, stoneShapeList, productPriceList, productList, productListPagination } = product;
    // console.log("categoryList-->", categoryList, "subCategoryList-->", subCategoryList, "metalsList-->", metalsList, "subCategoryList-->", goldPurityList, "stoneShapeList-->", stoneShapeList, "productList-->", productList);
    console.log(productPriceList);

    const [currentPage, setCurrentPage] = useState(1);

    // Grid & List
    const [gridListView, setGridListView] = useState("grid");

    // Filters
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");

    // const STEP = 1, MIN = productPriceList?.minPrice, MAX = productPriceList?.maxPrice;    // STEP = 1, MIN = 0, MAX = 100000;
    const STEP = 1;
    const MIN = productPriceList?.minPrice ?? 0;
    const MAX = productPriceList?.maxPrice ?? 0;

    const safeMin = MIN;
    const safeMax = MAX > MIN ? MAX : MIN + STEP;

    const [priceRange, setPriceRange] = useState([safeMin, safeMax]); // [min, max]
    const [isPriceApplied, setIsPriceApplied] = useState(false);

    const [metal, setMetal] = useState([]);
    const [stoneShape, setStoneShape] = useState([]);
    const [goldPurity, setGoldPurity] = useState([]);
    // console.log(sortBy, search, priceRange, metal, stoneShape, goldPurity);


    useEffect(() => {
        if (productPriceList?.minPrice != null && productPriceList?.maxPrice != null) {
            const min = productPriceList.minPrice;
            const max = productPriceList.maxPrice;

            const safeMax = max > min ? max : min + STEP;
            setPriceRange([min, safeMax]);
            // console.log("changed", productPriceList.minPrice, productPriceList.maxPrice);

            // const filters = buildFilters();
            // filters.minPrice = productPriceList.minPrice;
            // filters.maxPrice = productPriceList.maxPrice;

            // GetProductList(filters);
        }
    }, [currency, productPriceList]);


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

    const handleMetalChange = (e) => {
        const value = e.target.value;

        setMetal((prev) => (
            prev?.includes(value) ? prev?.filter((i) => i !== value) : [...prev, value]
        ));
    }

    const handleStoneShapeChange = (e) => {
        const value = e.target.value;

        setStoneShape((prev) => (
            prev?.includes(value) ? prev?.filter((i) => i !== value) : [...prev, value]
        ));
    }

    const handleGoldPurityChange = (e) => {
        const value = e.target.value;

        setGoldPurity((prev) => (
            prev?.includes(value) ? prev?.filter((i) => i !== value) : [...prev, value]
        ));
    }

    const filterCount = [
        (isPriceApplied && (priceRange[0] !== MIN || priceRange[1] !== MAX)),
        metal?.length > 0,
        stoneShape?.length > 0,
        goldPurity?.length > 0
    ]?.filter(Boolean)?.length;
    const isFiltersApplied = filterCount > 0;

    const buildFilters = () => {
        const filters = {};

        if (currency) filters.currency = currency;
        if (categoryId) filters.categoryId = categoryId;
        if (subCategoryId) filters.subCategoryId = subCategoryId;

        if (topSelling) filters.topSelling = true;
        if (searching) filters.search = searching;
        if (search) filters.search = search;

        if (sortBy === "newArrival") filters.newArrival = true;
        if (sortBy === "readyToShip") filters.readyToShip = true;
        else if (sortBy === "discounted") filters.discounted = true;

        if (priceRange[0]) filters.minPrice = priceRange[0];
        if (priceRange[1]) filters.maxPrice = priceRange[1];

        // if (priceRange[0] !== undefined && priceRange[0] !== null) {
        //     filters.minPrice = priceRange[0];
        // }
        // if (priceRange[1] !== undefined && priceRange[1] !== null) {
        //     filters.maxPrice = priceRange[1];
        // }

        if (metal) filters.metal = metal;
        if (stoneShape) filters.stoneShape = stoneShape;
        if (goldPurity) filters.goldPurity = goldPurity;

        return filters;
    };

    const priceFilters = () => {
        const filters = {};

        if (currency) filters.currency = currency;
        if (categoryId) filters.categoryId = categoryId;
        if (subCategoryId) filters.subCategoryId = subCategoryId;

        if (topSelling) filters.topSelling = true;
        if (searching) filters.search = searching;
        if (search) filters.search = search;

        if (sortBy === "newArrival") filters.newArrival = true;
        if (sortBy === "readyToShip") filters.readyToShip = true;
        else if (sortBy === "discounted") filters.discounted = true;

        if (metal) filters.metal = metal;
        if (stoneShape) filters.stoneShape = stoneShape;
        if (goldPurity) filters.goldPurity = goldPurity;

        return filters;
    };

    const clearFilters = () => {
        // setSearch("");
        // setSortBy("");
        setPriceRange([MIN, MAX]);
        setIsPriceApplied(false);
        setMetal([]);
        setStoneShape([]);
        setGoldPurity([]);
    };

    // Wishlist 
    const GetWishlist = async () => {
        await dispatch(reqtoGetWishlist());
    }

    // Product 
    const GetProductMetals = async () => {
        await dispatch(reqtoGetProductMetals());
    }

    const GetProductGoldPurity = async () => {
        await dispatch(reqtoGetProductGoldPurity());
    }

    const GetProductStoneShape = async () => {
        await dispatch(reqtoGetProductStoneShape());
    }

    const GetProductPriceFilter = async (filters) => {
        await dispatch(reqtoGetProductPriceFilter(filters));
    }

    const GetProductList = async (filters) => {
        await dispatch(reqtoGetProductList({ filters, page: currentPage, perPage: 9 }));
    }

    useEffect(() => {
        if (userToken) {
            GetWishlist();
        }

        GetProductMetals();
        GetProductGoldPurity();
        GetProductStoneShape();
    }, []);

    useEffect(() => {
        const filters = priceFilters();

        GetProductPriceFilter(filters);
    }, [currency, categoryId, subCategoryId, sortBy, searching, metal, stoneShape, goldPurity, topSelling]);

    useEffect(() => {
        // const filters = buildFilters();

        // GetProductList(filters);

        const filters = buildFilters();
        filters.minPrice = productPriceList.minPrice;
        filters.maxPrice = productPriceList.maxPrice;

        GetProductList(filters);
    }, [currency, categoryId, subCategoryId, sortBy, searching, metal, stoneShape, goldPurity, topSelling, productPriceList, currentPage]);



    const categoryLabels = {
        8: "Men’s Jewellery",
        9: "Women’s Jewellery",
        10: "Accessories",
    };

    const placeHolder = subCategoryList?.find((i) => i.id === Number(subCategoryId))?.name;

    return (
        <>

            {/* ------ Product Start ------ */}
            <div className="product pd-x">
                <div className='product_top'>
                    <div className="row align-items-lg-center justify-content-lg-between">
                        <div className="col-lg-3">
                            <h4>
                                {/* Rings */}
                                {subCategoryList?.find((i) => i.id === Number(subCategoryId))?.name}
                                {topSelling ? 'Top Selling' : ''}
                                {searching ? 'Product' : ''}
                            </h4>

                            <p className='mb-0'>
                                {/* Women’s Jewellery */}
                                {/* {categoryList?.find((i) => i.id === 8)?.name && "Men’s Jewellery"}
                                {categoryList?.find((i) => i.id === 9)?.name && "Women’s Jewellery"}
                                {categoryList?.find((i) => i.id === 10)?.name && "Accessories"} */}
                                {categoryLabels[Number(categoryId)]}
                            </p>
                        </div>
                        <div className="col-lg-8 col-xl-6">
                            <div className="filtering_area d-flex justify-content-end">
                                {/*<div className='sorting me-5'>
                                     <select
                                        className="form-select form-control"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option selected>Sort By</option>
                                        <option value="">All</option>
                                        <option value="readyToShip">Ready to Ship</option>
                                        <option value="discounted">Discounted</option>
                                    </select> 
                            </div>*/}

                                <div className='sorting'>
                                    <button type='button' className='menu_btn d-flex justify-content-between align-items-center' data-bs-toggle="dropdown" aria-expanded="false">
                                        {sortBy === "" ? "Sort By"
                                            : sortBy === "newArrival"
                                                ? "New Arrival"
                                                : sortBy === "readyToShip"
                                                    ? "Ready to Ship"
                                                    : sortBy === "discounted"
                                                        ? "Discounted"
                                                        : "All"}

                                        <img src={ThemeMode ? DropdownLight : DropdownDark} alt="" className='img-cluid ms-2' draggable={false} />
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <button type='button' className={`dropdown-item ${sortBy === "" ? "active" : ""}`} onClick={() => setSortBy("")}>All</button>
                                        </li>
                                        <li>
                                            <button type='button' className={`dropdown-item ${sortBy === "readyToShip" ? "active" : ""}`} onClick={() => setSortBy("newArrival")}>New Arrival</button>
                                        </li>
                                        <li>
                                            <button type='button' className={`dropdown-item ${sortBy === "readyToShip" ? "active" : ""}`} onClick={() => setSortBy("readyToShip")}>Ready to Ship</button>
                                        </li>
                                        <li>
                                            <button type='button' className={`dropdown-item ${sortBy === "discounted" ? "active" : ""}`} onClick={() => setSortBy("discounted")}>Discounted</button>
                                        </li>
                                    </ul>
                                </div>

                                <form
                                    className="searching mx-4"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        // setSearch(e.target.elements.search.value);
                                        // navigate(`/product?search=${e.target.elements.search.value}`);

                                        const filters = buildFilters();
                                        GetProductList(filters);

                                        const priceFilter = priceFilters();
                                        GetProductPriceFilter(priceFilter);

                                        setSearch('');
                                    }}
                                >
                                    <input type="text" name="search" placeholder={`Search ${placeHolder ? placeHolder : ''}...`} value={search} onChange={(e) => setSearch(e.target.value)} />

                                    <button type="submit" className="search_btn">
                                        Search
                                    </button>
                                </form>

                                <div className='view_grid'>
                                    <span>View: </span>

                                    <div className="grid_btns">
                                        <button
                                            type='button'
                                            className={`grid_btn ${gridListView === 'grid' ? 'active' : ''}`}
                                            onClick={() => setGridListView("grid")}
                                        >
                                            <img src={gridListView === 'grid' ? ThemeMode ? GridActiveLight : GridActiveDark : ThemeMode ? GridLight : GridDark} alt="" className='' draggable={false} />
                                        </button>
                                        <button
                                            type='button'
                                            className={`grid_btn ${gridListView === 'list' ? 'active' : ''}`}
                                            onClick={() => setGridListView("list")}
                                        >
                                            <img src={gridListView === 'list' ? ThemeMode ? ListActiveLight : ListActiveDark : ThemeMode ? ListLight : ListDark} alt="" className='' draggable={false} />
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="product_list">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="filter_area">
                                <div className='d-flex justify-content-between align-items-center mb-40'>
                                    <div className="title">
                                        Filters ({filterCount.toString().padStart(2, "0")})
                                    </div>

                                    <button
                                        type='button'
                                        onClick={clearFilters}
                                        disabled={!isFiltersApplied}
                                    >
                                        Clear Filters
                                    </button>
                                </div>

                                <div className='mb-40'>
                                    <div className="title">Price</div>

                                    <div className="pricing">
                                        <Range
                                            step={STEP}
                                            min={safeMin}
                                            max={safeMax}
                                            values={priceRange}
                                            onChange={(values) => setPriceRange(values)}
                                            // onFinalChange={(values) => setPriceRange(values)}
                                            renderTrack={({ props, children }) => {
                                                const safeDiff = MAX - MIN > 0 ? MAX - MIN : 1;

                                                const startPercent = ((priceRange[0] - MIN) / safeDiff) * 100;
                                                const endPercent = ((priceRange[1] - MIN) / safeDiff) * 100;

                                                return (
                                                    <div
                                                        {...props}
                                                        className="custom-track"
                                                        style={{
                                                            ...props.style,
                                                            height: '6px',
                                                            width: '100%',
                                                            // background: `linear-gradient(to right, #ddd ${((priceRange[0] - MIN) / (MAX - MIN)) * 100}%, #000 ${((priceRange[0] - MIN) / (MAX - MIN)) * 100}%, #000 ${((priceRange[1] - MIN) / (MAX - MIN)) * 100}%, #ddd ${((priceRange[1] - MIN) / (MAX - MIN)) * 100}%)`
                                                            background: `linear-gradient(
                                                            to right,
                                                            var(--color5) ${startPercent}%,
                                                            var(--black) ${startPercent}%,
                                                            var(--black) ${endPercent}%,
                                                            var(--color5) ${endPercent}%
                                                            )`
                                                        }}
                                                    >
                                                        {children}
                                                    </div>
                                                )
                                            }}
                                            renderThumb={({ props }) => {
                                                const { key, ...rest } = props;
                                                return (
                                                    <div
                                                        key={key}
                                                        {...rest}
                                                        className="custom-thumb"
                                                        style={{
                                                            ...rest.style,
                                                            height: '20px',
                                                            width: '20px',
                                                            borderRadius: '50%',
                                                            border: `1px solid var(--color-4)`,
                                                            background: `var(--gradient-color-1)`,
                                                        }}
                                                    />
                                                )
                                            }}
                                        />

                                        <div className="price_control d-flex justify-content-between">
                                            {/* Min-Price */}
                                            <div className="counter d-flex align-items-center content-center">
                                                <span>
                                                    {currency ? currencyData?.find((i) => i?.value === currency)?.symbol : '₹'}
                                                    {priceRange[0]}
                                                </span>
                                                <div className='d-grid'>
                                                    <button
                                                        type='button'
                                                        onClick={() =>
                                                            setPriceRange([
                                                                Math.min(priceRange[0] + STEP, priceRange[1]), // prevent exceeding max
                                                                priceRange[1],
                                                            ])
                                                        }
                                                    >
                                                        <img src={UpArrowLight} alt="Up" className='img-fluid' draggable={false} />
                                                    </button>
                                                    <button
                                                        type='button'
                                                        onClick={() =>
                                                            setPriceRange([
                                                                Math.max(priceRange[0] - STEP, safeMin), // prevent going below MIN
                                                                priceRange[1],
                                                            ])
                                                        }
                                                        disabled={priceRange[0] === safeMin}
                                                    >
                                                        <img src={DownArrowLight} alt="Down" className='img-fluid' draggable={false} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Max-Price */}
                                            <div className="counter d-flex align-items-center content-center">
                                                <span>
                                                    {currency ? currencyData?.find((i) => i?.value === currency)?.symbol : '₹'}
                                                    {priceRange[1]}
                                                </span>
                                                <div className='d-grid'>

                                                    <button
                                                        type='button'
                                                        onClick={() =>
                                                            setPriceRange([
                                                                priceRange[0],
                                                                Math.min(priceRange[1] + STEP, safeMax), // prevent going above MAX
                                                            ])
                                                        }
                                                        disabled={priceRange[1] === safeMax}
                                                    >
                                                        <img src={UpArrowLight} alt="Up" className='img-fluid' draggable={false} />
                                                    </button>
                                                    <button
                                                        type='button'
                                                        onClick={() =>
                                                            setPriceRange([
                                                                priceRange[0],
                                                                Math.max(priceRange[1] - STEP, priceRange[0]), // prevent crossing min
                                                            ])
                                                        }
                                                    >
                                                        <img src={DownArrowLight} alt="Down" className='img-fluid' draggable={false} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            className="main_btn pricing_btn"
                                            onClick={() => {
                                                const filters = buildFilters();
                                                GetProductList(filters);
                                                setIsPriceApplied(true);
                                            }}
                                            disabled={priceRange[0] === safeMin && priceRange[1] === safeMax}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>


                                <Accordion alwaysOpen> {/* defaultActiveKey="0" */}
                                    <Accordion.Item eventKey="0" className='mb-40'>
                                        <Accordion.Header>
                                            <div className="title d-flex align-items-center justify-content-between cursor-pointer w-100">
                                                Metal

                                                <img src={ThemeMode ? DropdownLight : DropdownDark} alt="" className='img-cluid' draggable={false} />
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <ul>
                                                {metalsList?.map((i, index) => (
                                                    <li key={index}>
                                                        <label className="custom-checkbox">
                                                            <span>{i?.name}</span>
                                                            <input
                                                                type="checkbox"
                                                                name="metalId"
                                                                className='form-check-input'
                                                                value={i?.id}
                                                                checked={metal?.includes(String(i?.id))}
                                                                onChange={handleMetalChange}
                                                            />
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1" className='mb-40'>
                                        <Accordion.Header>
                                            <div className="title d-flex align-items-center justify-content-between cursor-pointer w-100">
                                                Stone Shape

                                                <img src={ThemeMode ? DropdownLight : DropdownDark} alt="" className='img-cluid' draggable={false} />
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <ul>
                                                {stoneShapeList?.map((i, index) => (
                                                    <li key={index}>
                                                        <label className="custom-checkbox">
                                                            <span>{i?.name}</span>
                                                            <input
                                                                type="checkbox"
                                                                name="stoneShapeId"
                                                                className='form-check-input'
                                                                value={i?.id}
                                                                checked={stoneShape?.includes(String(i?.id))}
                                                                onChange={handleStoneShapeChange}
                                                            />
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2" className=''>
                                        <Accordion.Header>
                                            <div className="title d-flex align-items-center justify-content-between cursor-pointer w-100">
                                                Gold Purity

                                                <img src={ThemeMode ? DropdownLight : DropdownDark} alt="" className='img-cluid' draggable={false} />
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <ul>
                                                {goldPurityList?.map((i, index) => (
                                                    <li key={index}>
                                                        <label className="custom-checkbox">
                                                            <span>{i?.name}</span>
                                                            <input
                                                                type="checkbox"
                                                                name="goldPurityId"
                                                                className='form-check-input'
                                                                value={i?.id}
                                                                checked={goldPurity?.includes(String(i?.id))}
                                                                onChange={handleGoldPurityChange}
                                                            />
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                                <div className="d-none">
                                    <div className='mb-40'>
                                        <div className="title d-flex align-items-center justify-content-between cursor-pointer">
                                            Metal

                                            <img src={ThemeMode ? DropdownLight : DropdownDark} alt="" className='img-cluid' draggable={false} />
                                        </div>

                                        <ul>
                                            {/* {["Gold", "Rose Gold", "Black Gold", "Silver"].map((i) => (
                                            <li key={i}>
                                                <label className="custom-checkbox">
                                                    <span>{i}</span>
                                                    <input
                                                        type="checkbox"
                                                        value={i}
                                                        className='form-check-input'
                                                    />
                                                </label>
                                            </li>
                                        ))} */}


                                            {/* {metalsList?.map((i, index) => (
                                            <li key={index}>
                                                <label className="custom-checkbox">
                                                    <span>{i?.name}</span>
                                                    <input
                                                        type="radio"
                                                        name="metalId"
                                                        className='form-check-input'
                                                        value={i?.id}
                                                        checked={metal === String(i?.id)}
                                                        onChange={handleMetalChange}
                                                    />
                                                </label>
                                            </li>
                                        ))} */}

                                            {metalsList?.map((i, index) => (
                                                <li key={index}>
                                                    <label className="custom-checkbox">
                                                        <span>{i?.name}</span>
                                                        <input
                                                            type="checkbox"
                                                            name="metalId"
                                                            className='form-check-input'
                                                            value={i?.id}
                                                            checked={metal?.includes(String(i?.id))}
                                                            onChange={handleMetalChange}
                                                        />
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className='mb-40'>
                                        <div className="title d-flex align-items-center justify-content-between cursor-pointer">
                                            Stone Shape

                                            <img src={ThemeMode ? DropdownLight : DropdownDark} alt="" className='img-cluid' draggable={false} />
                                        </div>

                                        <ul>
                                            {/* {["Gemstone", "Diamond", "Pearl", "Ruby", "Emerald"].map((i) => (
                                            <li key={i}>
                                                <label className="custom-checkbox">
                                                    <span>{i}</span>
                                                    <input
                                                        type="checkbox"
                                                        value={i}
                                                        className='form-check-input'
                                                    />
                                                </label>
                                            </li>
                                        ))} */}

                                            {/* {stoneShapeList?.map((i, index) => (
                                            <li key={index}>
                                                <label className="custom-checkbox">
                                                    <span>{i?.name}</span>
                                                    <input
                                                        type="radio"
                                                        name="stoneShapeId"
                                                        className='form-check-input'
                                                        value={i?.id}
                                                        checked={stoneShape === String(i?.id)}
                                                        onChange={handleStoneShapeChange}
                                                    />
                                                </label>
                                            </li>
                                        ))} */}

                                            {stoneShapeList?.map((i, index) => (
                                                <li key={index}>
                                                    <label className="custom-checkbox">
                                                        <span>{i?.name}</span>
                                                        <input
                                                            type="checkbox"
                                                            name="stoneShapeId"
                                                            className='form-check-input'
                                                            value={i?.id}
                                                            checked={stoneShape?.includes(String(i?.id))}
                                                            onChange={handleStoneShapeChange}
                                                        />
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className=''>
                                        <div className="title d-flex align-items-center justify-content-between cursor-pointer">
                                            Gold Purity

                                            <img src={ThemeMode ? DropdownLight : DropdownDark} alt="" className='img-cluid' draggable={false} />
                                        </div>

                                        <ul>
                                            {/* {["18k", "22k", "24k"].map((i) => (
                                            <li key={i}>
                                                <label className="custom-checkbox">
                                                    <span>{i}</span>
                                                    <input
                                                        type="checkbox"
                                                        value={i}
                                                        className='form-check-input'
                                                    />
                                                </label>
                                            </li>
                                        ))} */}

                                            {/* {goldPurityList?.map((i, index) => (
                                            <li key={index}>
                                                <label className="custom-checkbox">
                                                    <span>{i?.name}</span>
                                                    <input
                                                        type="radio"
                                                        name="goldPurityId"
                                                        className='form-check-input'
                                                        value={i?.id}
                                                        checked={goldPurity === String(i?.id)}
                                                        onChange={handleGoldPurityChange}
                                                    />
                                                </label>
                                            </li>
                                        ))} */}

                                            {goldPurityList?.map((i, index) => (
                                                <li key={index}>
                                                    <label className="custom-checkbox">
                                                        <span>{i?.name}</span>
                                                        <input
                                                            type="checkbox"
                                                            name="goldPurityId"
                                                            className='form-check-input'
                                                            value={i?.id}
                                                            checked={goldPurity?.includes(String(i?.id))}
                                                            onChange={handleGoldPurityChange}
                                                        />
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-9">

                            {
                                productList?.length > 0 ? (
                                    gridListView === "grid" ? (
                                        <div className="product_area">
                                            <div className="row g-5">
                                                {
                                                    productList?.map((i, index) => {
                                                        const isInWishlist = wishList?.some((w) => w?.id === i?.id);

                                                        return (
                                                            <div className="col-lg-4" key={index}>
                                                                <div className="product_box">
                                                                    <div className="image">
                                                                        <span className='ribbon'>G9 Jewellery</span>

                                                                        <img src={i?.images[0]} alt={i?.title} className='img-fluid cursor-pointer' draggable={false} onClick={() => navigate(`/product-details/${i.id}`)} />
                                                                    </div>

                                                                    <div className="detail">
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                            <div className="name" onClick={() => navigate(`/product-details/${i.id}`)}>{i.title}</div>

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
                                                                            {Number(i.selling_price)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>
                                    ) : (
                                        <div className='product_list_area'>
                                            {
                                                productList?.map((i, index) => {
                                                    const isInWishlist = wishList?.some((w) => w?.id === i?.id);

                                                    return (
                                                        <React.Fragment key={index}>

                                                            <div className="product_box d-flex">
                                                                <div className="image">
                                                                    <span className='ribbon'>G9 Jewellery</span>

                                                                    <img src={i?.images[0]} alt={i?.title} className='img-fluid cursor-pointer' draggable={false} onClick={() => navigate(`/product-details/${i.id}`)} />
                                                                </div>
                                                                <div className="detail w-100">
                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                        <div className="name" onClick={() => navigate(`/product-details/${i.id}`)}>{i.title}</div>

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
                                                                        {Number(i?.selling_price)}
                                                                    </div>

                                                                    <p>
                                                                        {i?.shortDescription}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            {index !== productList.length - 1 && <div className="line"></div>}
                                                        </React.Fragment>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                ) : (
                                    <div className='product_area text-center mt-5 pt-5'>
                                        <div className="product_box">
                                            <div className='detail mt-0'>
                                                <span className='price'>No Products found in this category.</span></div>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                productList?.length > 0 && (
                                    <div className="mt-5">
                                        <Pagination
                                            pagination={productListPagination}
                                            currentPage={currentPage}
                                            onPageChange={(page) => setCurrentPage(page)}
                                        />
                                    </div>
                                )
                            }

                        </div>

                    </div >
                </div >

            </div >
            {/* ------ Product End ------ */}

        </>
    )
}

export default Product;



const ProductData = [
    {
        image: Product2,
        name: "Silver Diamond Neckless",
        price: 130,
    },
    {
        image: Product4,
        name: "Silver Diamond Ring",
        price: 120,
    },
    {
        image: Product3,
        name: "Silver Diamond Earrings",
        price: 140,
    },
    {
        image: Product2,
        name: "Silver Diamond Neckless",
        price: 130,
    },
    {
        image: Product4,
        name: "Silver Diamond Ring",
        price: 120,
    },
    {
        image: Product3,
        name: "Silver Diamond Earrings",
        price: 140,
    },
    {
        image: Product2,
        name: "Silver Diamond Neckless",
        price: 130,
    },
    {
        image: Product4,
        name: "Silver Diamond Ring",
        price: 120,
    },
    {
        image: Product3,
        name: "Silver Diamond Earrings",
        price: 140,
    },
]






{/* {
                                                    ProductData?.map((i, index) => {
                                                        return (
                                                            <div className="col-lg-4" key={index}>
                                                                <div className="product_box">
                                                                    <div className="image">
                                                                        <img src={i.image} alt={i.name} className='img-fluid' draggable={false} />
                                                                    </div>

                                                                    <div className="detail">
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                            <div className="name" onClick={() => navigate("/product-details/1")}>{i.name}</div>

                                                                            <div className='like'>
                                                                                <button type='button' className=''>
                                                                                    <img src={UnLikeLight} alt="" className='img-fluid' draggable={false} />
                                                                                </button>
                                                                            </div>
                                                                        </div>

                                                                        <div className="price">${i.price}.00 </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                } */}