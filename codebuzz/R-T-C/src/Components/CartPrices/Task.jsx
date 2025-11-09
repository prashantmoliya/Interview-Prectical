import React, { useEffect, useState } from 'react'
import CartPrices from './CartPrices.json'


const Task = () => {

    // const x = CartPrices.Cart.map((i) => (
    //     i.qtyno.split(' | ').map((qty) => {
    //         return parseInt(qty.trim())
    //     })
    // ));
    // console.log("Qty++", x.join('\n'));

    const filterdata = CartPrices.Cart;
    console.log(filterdata.length);

    const [SelectQty, setSelectQty] = useState(Array(filterdata.length).fill(1))

    const HandleChangeQty = (e, index) => {

        const newQty = [...SelectQty];
        newQty[index] = parseInt(e.target.value);
        setSelectQty(newQty);
    }

    console.log("SelectQty++", SelectQty);


    const calculateTotalPrice = (item, index) => {
        const productPrice = parseFloat(item.productprice.split(" | ")[SelectQty[index] - 1].trim());

        return SelectQty[index] * productPrice;
    };

    const [SavingTotal, setSavingTotal] = useState(0);
    const [Total, setTotal] = useState(0);

    useEffect(() => {
        const savingtotal = filterdata.reduce((acc, curr) => {
            return acc + curr.TotalSavingPrice;
        }, 0);
        console.log("SavingTotal Pro++", savingtotal);
        setSavingTotal(savingtotal);


        const total = filterdata.reduce((acc, curr, index) => {
            const Total = parseFloat(curr.productprice.split(" | ")[SelectQty[index] - 1].trim());

            return acc + (SelectQty[index] * Total);
        }, 0);
        console.log("Total++", total);
        setTotal(total);

    }, [filterdata, SelectQty])

    return (
        <>

            <section className="h-100 h-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="row">

                                        <div className="col-lg-9">
                                            <h5 className="mb-3"><div className=""><i className="fas fa-long-arrow-alt-left me-2" />Continue shopping</div></h5>
                                            <hr />
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div>
                                                    <p className="mb-1">Shopping cart</p>
                                                </div>
                                            </div>

                                            {
                                                filterdata.map((i, index) => {
                                                    return (
                                                        <div className="card mb-3" key={i.id}>
                                                            <div className="card-body">
                                                                <div className="d-flex justify-content-between">
                                                                    <div className="d-flex flex-row align-items-center">
                                                                        <div>
                                                                            <img src={i.image} style={{ width: 65 }} />
                                                                        </div>
                                                                        <div className="ms-3">
                                                                            <h5>{i.productname}</h5>
                                                                            <p className="small mb-0">{i.desc}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex flex-row align-items-center">
                                                                        {/* <div style={{ width: 50 }}>
                                                                <h5 className="fw-normal mb-0">2</h5>
                                                            </div> */}
                                                                        <div className="col-md-8">
                                                                            <label htmlFor={`qtySelect-${index}`} className="form-label">Qty</label>
                                                                            <select id={`qtySelect-${index}`} className="form-select fw-bold"
                                                                                value={SelectQty[index]} onChange={(e) => HandleChangeQty(e, index)} required>
                                                                                {
                                                                                    i.qtyno.split(" | ").map((qty, qtyindex) => (
                                                                                        <option key={qty} value={parseInt(qty.trim())}>{`${qty} (₹ ${i.productprice.split(" | ")[qtyindex]} / unit)`}</option>
                                                                                    ))
                                                                                }
                                                                                {/* <option value="">{i.qtyno} (₹ {i.productprice} / unit)</option> */}
                                                                                {/* <option>1 (₹ 1000 / unit)</option>
                                                                                <option>2 (₹ 800 / unit)</option>
                                                                                <option>3 (₹ 900 / unit)</option>
                                                                                <option>4 (₹ 100 / unit)</option> */}
                                                                            </select>
                                                                            <div className="invalid-feedback">
                                                                                Please select a valid state.
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ width: 80 }} className='ms-3'>
                                                                            <div className='text-cart' style={{ fontSize: '14px' }}>Price</div>
                                                                            <span className="mb-0" style={{ fontSize: '13px' }}>₹ {calculateTotalPrice(i, index) + i.TotalSavingPrice}</span>
                                                                            <h6 className="mb-0 text-cart">₹ {calculateTotalPrice(i, index)}</h6>
                                                                            <span style={{ fontSize: '13px', color: 'green' }}>Saving {i.TotalSavingPrice}</span>
                                                                        </div>
                                                                        <a href="#!" style={{ color: '#cecece' }}><i className="fas fa-trash-alt" /></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }

                                            {/* <div className="card mb-3">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div>
                                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp" className="img-fluid rounded-3" alt="Shopping item" style={{ width: 65 }} />
                                                            </div>
                                                            <div className="ms-3">
                                                                <h5>Iphone 11 pro</h5>
                                                                <p className="small mb-0">256GB, Navy Blue</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div className="col-md-8">
                                                                <label for="validationCustom04" className="form-label">Qty</label>
                                                                <select className="form-select fw-bold" id="validationCustom04" required>
                                                                    <option>1 (₹ 1000 / unit)</option>
                                                                    <option>2 (₹ 800 / unit)</option>
                                                                    <option>3 (₹ 900 / unit)</option>
                                                                    <option>4 (₹ 100 / unit)</option>
                                                                </select>
                                                                <div className="invalid-feedback">
                                                                    Please select a valid state.
                                                                </div>
                                                            </div>
                                                            <div style={{ width: 80 }} className='ms-3'>
                                                                <div className='text-dark' style={{ fontSize: '14px' }}>Price</div>
                                                                <span className="mb-0" style={{ fontSize: '13px' }}>₹ 1800</span>
                                                                <h6 className="mb-0 text-dark">₹ 1000</h6>
                                                                <span style={{ fontSize: '13px', color: 'green' }}>Saving 800</span>
                                                            </div>
                                                            <a href="#!" style={{ color: '#cecece' }}><i className="fas fa-trash-alt" /></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card mb-3">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div>
                                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img2.webp" className="img-fluid rounded-3" alt="Shopping item" style={{ width: 65 }} />
                                                            </div>
                                                            <div className="ms-3">
                                                                <h5>Samsung galaxy Note 10 </h5>
                                                                <p className="small mb-0">256GB, Navy Blue</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div className="col-md-8">
                                                                <label for="validationCustom04" className="form-label">Qty</label>
                                                                <select className="form-select fw-bold" id="validationCustom04" required>
                                                                    <option>1 (₹ 1000 / unit)</option>
                                                                    <option>2 (₹ 800 / unit)</option>
                                                                    <option>3 (₹ 900 / unit)</option>
                                                                    <option>4 (₹ 100 / unit)</option>
                                                                </select>
                                                                <div className="invalid-feedback">
                                                                    Please select a valid state.
                                                                </div>
                                                            </div>
                                                            <div style={{ width: 80 }} className='ms-3'>
                                                                <div className='text-dark' style={{ fontSize: '14px' }}>Price</div>
                                                                <span className="mb-0" style={{ fontSize: '13px' }}>₹ 1800</span>
                                                                <h6 className="mb-0 text-dark">₹ 1000</h6>
                                                                <span style={{ fontSize: '13px', color: 'green' }}>Saving 800</span>
                                                            </div>
                                                            <a href="#!" style={{ color: '#cecece' }}><i className="fas fa-trash-alt" /></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card mb-3">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div>
                                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img3.webp" className="img-fluid rounded-3" alt="Shopping item" style={{ width: 65 }} />
                                                            </div>
                                                            <div className="ms-3">
                                                                <h5>Canon EOS M50</h5>
                                                                <p className="small mb-0">Onyx Black</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div className="col-md-8">
                                                                <label for="validationCustom04" className="form-label">Qty</label>
                                                                <select className="form-select fw-bold" id="validationCustom04" required>
                                                                    <option>1 (₹ 1000 / unit)</option>
                                                                    <option>2 (₹ 800 / unit)</option>
                                                                    <option>3 (₹ 900 / unit)</option>
                                                                    <option>4 (₹ 100 / unit)</option>
                                                                </select>
                                                                <div className="invalid-feedback">
                                                                    Please select a valid state.
                                                                </div>
                                                            </div>
                                                            <div style={{ width: 80 }} className='ms-3'>
                                                                <div className='text-dark' style={{ fontSize: '14px' }}>Price</div>
                                                                <span className="mb-0" style={{ fontSize: '13px' }}>₹ 1800</span>
                                                                <h6 className="mb-0 text-dark">₹ 1000</h6>
                                                                <span style={{ fontSize: '13px', color: 'green' }}>Saving 800</span>
                                                            </div>
                                                            <a href="#!" style={{ color: '#cecece' }}><i className="fas fa-trash-alt" /></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>

                                        <div className="col-lg-3">
                                            <div className="card bg-dark text-white rounded-3">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                                        <h5 className="mb-0">Card details</h5>
                                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" className="img-fluid rounded-3" style={{ width: 45 }} alt="Avatar" />
                                                    </div>
                                                    <form className="mt-4">
                                                        <div data-mdb-input-init className="form-outline form-white mb-4">
                                                            <input type="text" id="typeName" className="form-control form-control-lg" siez={17} placeholder="Cardholder's Name" />
                                                            <label className="form-label" htmlFor="typeName">Cardholder's Name</label>
                                                        </div>
                                                        <div data-mdb-input-init className="form-outline form-white mb-4">
                                                            <input type="text" id="typeText" className="form-control form-control-lg" siez={17} placeholder="1234 5678 9012 3457" minLength={19} maxLength={19} />
                                                            <label className="form-label" htmlFor="typeText">Card Number</label>
                                                        </div>
                                                        <div className="row mb-4">
                                                            <div className="col-md-6">
                                                                <div data-mdb-input-init className="form-outline form-white">
                                                                    <input type="text" id="typeExp" className="form-control form-control-lg" placeholder="MM/YYYY" size={7} minLength={7} maxLength={7} />
                                                                    <label className="form-label" htmlFor="typeExp">Expiration</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div data-mdb-input-init className="form-outline form-white">
                                                                    <input type="password" id="typeText" className="form-control form-control-lg" placeholder="●●●" size={1} minLength={3} maxLength={3} />
                                                                    <label className="form-label" htmlFor="typeText">Cvv</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                    <hr className="my-4" />
                                                    <div className="d-flex justify-content-between">
                                                        <p className="mb-2">Subtotal</p>
                                                        <div>
                                                            <p className="mb-1" style={{ fontSize: '13px' }}>₹{(Total + SavingTotal).toFixed(2)}</p>
                                                            <p className="mb-2">₹{Total.toFixed(2)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <p className="mb-2">Shipping</p>
                                                        <p className="mb-2">₹00.00</p>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-4">
                                                        <p className="mb-2">Total(Incl. taxes)</p>
                                                        <p className="mb-2">₹{Total.toFixed(2)}</p>
                                                    </div>
                                                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-info btn-block btn-lg">
                                                        <div className="d-flex justify-content-between">
                                                            <span>
                                                                {/* $4818.00 */}
                                                                ₹{Total.toFixed(2)}
                                                            </span>
                                                            <span>Checkout <i className="fas fa-long-arrow-alt-right ms-2" /></span>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

export default Task
