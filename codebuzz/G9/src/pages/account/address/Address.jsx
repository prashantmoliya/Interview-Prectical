import React, { useEffect, useState } from 'react'

// Css

// Image
// Light
import HomeLight from "../../../assets/images/account/home-light.svg";
import WorkLight from "../../../assets/images/account/work-light.svg";
import OtherLight from "../../../assets/images/account/other-light.svg";
import MenuLight from "../../../assets/images/account/menu-light.svg";
// Dark
import HomeDark from "../../../assets/images/account/home-dark.svg";
import WorkDark from "../../../assets/images/account/work-dark.svg";
import OtherDark from "../../../assets/images/account/other-dark.svg";
import MenuDark from "../../../assets/images/account/menu-dark.svg";


import AccountSidebar from '../../../components/account-sidebar/AccountSidebar';

import Delete from '../../../components/modal/delete/Delete';
import Primary from '../../../components/modal/primary/Primary';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reqtoDeleteManageAddress, reqtoGetManageAddress, reqtoSetPrimaryManageAddress } from '../../../redux-Toolkit/services/AccountServices';
import { editManageAddress } from '../../../redux-Toolkit/slices/AccountSlice';
import useThemeMode from '../../../hooks/useThemeMode';

const initialModalState = {
    primary: false,
    delete: false
}

const Address = () => {

    const ThemeMode = useThemeMode();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userAccount = useSelector((state) => state.UserAccount);
    const { loader, manageAddressList, manageAddressLoader } = userAccount;

    const [modalShow, setModalShow] = useState(initialModalState);
    const [addressId, setAddressId] = useState(null);

    const handleClose = () => {
        setModalShow(initialModalState);
        setAddressId(null);
    }

    const GetManageAddress = async () => {
        await dispatch(reqtoGetManageAddress());
    }

    const handleSetPrimary = async () => {
        const res = await dispatch(reqtoSetPrimaryManageAddress(addressId));

        if (res.payload?.status) {
            handleClose();
            GetManageAddress();
        }
    }

    const handleDelete = async () => {
        const res = await dispatch(reqtoDeleteManageAddress(addressId));

        if (res.payload?.status) {
            handleClose();
            GetManageAddress();
        }
    }

    useEffect(() => {
        GetManageAddress();
    }, []);


    return (
        <>

            {/* ------ Address Start ------ */}
            <div className="account pd-x">
                <div className="page_menu">
                    Home {` > `} <span>Manage Address</span>
                </div>


                <div className="row">
                    <div className="col-lg-3">
                        <AccountSidebar />
                    </div>

                    <div className="col-lg-9">
                        <div className="account_overview">
                            <h4>Manage Address</h4>

                            <div className="details">

                                {/* <div className="address">
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div className='type d-flex align-items-center'>
                                            <img src={ThemeMode ? HomeLight : HomeDark} alt="" className='img-fluid' draggable={false} />

                                            <span className='mx-3'>Home</span>

                                            <div className='status delivered'>
                                                Primary
                                            </div>
                                        </div>

                                        <div>
                                            <button type='button' className='menu_btn' data-bs-toggle="dropdown" aria-expanded="false">
                                                <img src={ThemeMode ? MenuLight : MenuDark} alt="" className='img-fluid' draggable={false} />
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-end">
                                                <li><button type='button' className="dropdown-item" onClick={() => { setModalShow({ ...modalShow, primary: true }) }}>Set As Primary</button></li>
                                                <li><button type='button' className="dropdown-item" onClick={() => { navigate("/address/edit/1") }}>Edit</button></li>
                                                <li><button type='button' className="dropdown-item" onClick={() => { setModalShow({ ...modalShow, delete: true }) }}>Delete</button></li>

                                            </ul>

                                        </div>
                                    </div>

                                    <p className='mb-0'>
                                        123, Shyamdham Soc, Nana Varachha <br />
                                        Surat, Gujarat, India - 395006
                                    </p>
                                </div>

                                <div className="line"></div>

                                <div className="address">
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div className='type d-flex align-items-center'>
                                            <img src={ThemeMode ? WorkLight : WorkDark} alt="" className='img-fluid' draggable={false} />

                                            <span className='mx-3'>Work</span>
                                        </div>

                                        <div>
                                            <button type='button' className='menu_btn' data-bs-toggle="dropdown" aria-expanded="false">
                                                <img src={ThemeMode ? MenuLight : MenuDark} alt="" className='img-fluid' draggable={false} />
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-end">
                                                <li><button type='button' className="dropdown-item" onClick={() => { setModalShow({ ...modalShow, primary: true }) }}>Set As Primary</button></li>
                                                <li><button type='button' className="dropdown-item" onClick={() => { navigate("/address/edit/2") }}>Edit</button></li>
                                                <li><button type='button' className="dropdown-item" onClick={() => { setModalShow({ ...modalShow, delete: true }) }}>Delete</button></li>

                                            </ul>

                                        </div>
                                    </div>

                                    <p className='mb-0'>
                                        306, Dhara Arcade, Mota Varachha <br />
                                        Surat, Gujarat, India - 395006
                                    </p>
                                </div>

                                <div className="line"></div>

                                <div className="address">
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div className='type d-flex align-items-center'>
                                            <img src={ThemeMode ? OtherLight : OtherDark} alt="" className='img-fluid' draggable={false} />

                                            <span className='mx-3'>Other</span>
                                        </div>

                                        <div>
                                            <button type='button' className='menu_btn' data-bs-toggle="dropdown" aria-expanded="false">
                                                <img src={ThemeMode ? MenuLight : MenuDark} alt="" className='img-fluid' draggable={false} />
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-end">
                                                <li><button type='button' className="dropdown-item" onClick={() => { setModalShow({ ...modalShow, primary: true }) }}>Set As Primary</button></li>
                                                <li><button type='button' className="dropdown-item" onClick={() => { navigate("/address/edit/3") }}>Edit</button></li>
                                                <li><button type='button' className="dropdown-item" onClick={() => { setModalShow({ ...modalShow, delete: true }) }}>Delete</button></li>

                                            </ul>

                                        </div>
                                    </div>

                                    <p className='mb-0'>
                                        789, Light House, Udhana Darwaja <br />
                                        Surat, Gujarat, India - 395006
                                    </p>
                                </div> */}


                                {
                                    manageAddressList?.length > 0 ? (
                                        manageAddressList?.map((i, index) => {
                                            return (
                                                <React.Fragment key={i?.id}>
                                                    <div className="address">
                                                        <div className='d-flex align-items-center justify-content-between'>
                                                            <div className='type d-flex align-items-center'>
                                                                {/* <img src={i?.address_type === 'Home' ? HomeLight : i?.address_type === 'Work' ? WorkLight : OtherLight} alt="" className='img-fluid' draggable={false} /> */}
                                                                <img src={i?.address_type === 'Home' ? ThemeMode ? HomeLight : HomeDark : i?.address_type === 'Work' ? ThemeMode ? WorkLight : WorkDark : ThemeMode ? OtherLight : OtherDark} alt="" className='img-fluid' draggable={false} />

                                                                <span className='mx-3'>
                                                                    {i?.address_type}
                                                                </span>

                                                                {
                                                                    i?.primary === 1 &&
                                                                    <div className='status delivered'>
                                                                        Primary
                                                                    </div>
                                                                }
                                                            </div>

                                                            <div>
                                                                <button type='button' className='menu_btn' data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <img src={ThemeMode ? MenuLight : MenuDark} alt="" className='img-fluid' draggable={false} />
                                                                </button>
                                                                <ul className="dropdown-menu dropdown-menu-end">
                                                                    {
                                                                        i?.primary === 0 &&
                                                                        <li>
                                                                            <button
                                                                                type='button'
                                                                                className="dropdown-item"
                                                                                onClick={() => {
                                                                                    setModalShow({ ...modalShow, primary: true })
                                                                                    setAddressId(i?.id)
                                                                                }}
                                                                            >
                                                                                Set As Primary
                                                                            </button>
                                                                        </li>
                                                                    }

                                                                    <li>
                                                                        <button
                                                                            type='button'
                                                                            className="dropdown-item"
                                                                            onClick={() => {
                                                                                navigate(`/address/edit/${i?.id}`)
                                                                                dispatch(editManageAddress(i))
                                                                            }}
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button
                                                                            type='button'
                                                                            className="dropdown-item"
                                                                            onClick={() => {
                                                                                setModalShow({ ...modalShow, delete: true })
                                                                                setAddressId(i?.id)
                                                                            }}
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>

                                                        <p className='mb-0'>
                                                            {i?.address_line_1} <br />
                                                            {i?.city}, {i?.state}, {i?.country} - {i?.postal_code}
                                                        </p>
                                                    </div>

                                                    {index !== manageAddressList.length - 1 && <div className="line"></div>}
                                                </React.Fragment>
                                            )
                                        })
                                    ) : (
                                        <div className='order_box text-center'>
                                            <div className="order_detail "><span className='price'>You have not added any address yet. Please add one.</span></div>
                                        </div>
                                    )
                                }

                            </div>

                            <button type='button' className='main_btn address_btn' onClick={() => navigate("/address/create")}>
                                ADD NEW ADDRESS
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* ------ Address End ------ */}


            {/* Modal-Primary */}
            <Primary show={modalShow.primary} handleClose={handleClose} handleSetPrimary={handleSetPrimary} loader={manageAddressLoader} />
            {/* Modal-Delete */}
            <Delete show={modalShow.delete} handleClose={handleClose} handleDelete={handleDelete} loader={manageAddressLoader} />

        </>
    )
}

export default Address;