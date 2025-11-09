import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';

// Css
import "./AccountSidebar.scss";

// Image
// Light
import UserLight from "../../assets/images/account/user-light.svg";
import ChangePasswordLight from "../../assets/images/account/change-password-light.svg";
import OrderLight from "../../assets/images/account/order-light.svg";
import AddressLight from "../../assets/images/account/address-light.svg";
import WishlistLight from "../../assets/images/account/wishlist-light.svg";
import SavedLight from "../../assets/images/account/saved-light.svg";
import SignoutLight from "../../assets/images/account/signout-light.svg";

import UserActiveLight from "../../assets/images/account/user-active-light.svg";
import OrderActiveLight from "../../assets/images/account/order-active-light.svg";
import AddressActiveLight from "../../assets/images/account/address-active-light.svg";
import WishlistActiveLight from "../../assets/images/account/wishlist-active-light.svg";
import SavedActiveLight from "../../assets/images/account/saved-active-light.svg";

// Dark
import UserDark from "../../assets/images/account/user-dark.svg";
import ChangePasswordDark from "../../assets/images/account/change-password-dark.svg";
import OrderDark from "../../assets/images/account/order-dark.svg";
import AddressDark from "../../assets/images/account/address-dark.svg";
import WishlistDark from "../../assets/images/account/wishlist-dark.svg";
import SavedDark from "../../assets/images/account/saved-dark.svg";
import SignoutDark from "../../assets/images/account/signout-dark.svg";

import UserActiveDark from "../../assets/images/account/user-active-dark.svg";
import OrderActiveDark from "../../assets/images/account/order-active-dark.svg";
import AddressActiveDark from "../../assets/images/account/address-active-dark.svg";
import WishlistActiveDark from "../../assets/images/account/wishlist-active-dark.svg";
import SavedActiveDark from "../../assets/images/account/saved-active-dark.svg";

import SignOut from '../modal/sign-out/SignOut';
import { useDispatch, useSelector } from 'react-redux';
import { reqtoSignOut } from '../../redux-Toolkit/services/AuthServices';
import useThemeMode from '../../hooks/useThemeMode';
import { reqtoGetProfile } from '../../redux-Toolkit/services/AccountServices';
import { signOutWithGoogle } from '../../firebase/services/AuthServices';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';

const AccountSidebar = () => {

    const ThemeMode = useThemeMode();
    const currentUser = useFirebaseAuth();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userToken, googleLogin } = useSelector((state) => state.UserAuth);
    const { loader, userProfile } = useSelector((state) => state.UserAccount);
    console.log(userProfile);

    const [signOutModalShow, setSignOutModalShow] = useState(false);
    const [signOutLoader, setSignOutLoader] = useState(false);

    const handleClose = () => {
        setSignOutModalShow(false);
    }

    const handleSignOut = async () => {
        setSignOutLoader(true);
        
        try {
            if (currentUser) {
                const firebaseRes = await signOutWithGoogle();
                console.log("done", firebaseRes);

                if (!firebaseRes?.status) {
                    return;
                }
            }

            const res = await dispatch(reqtoSignOut());

            if (res.payload?.status) {
                setSignOutModalShow(false);

                navigate("/home");
                window.dispatchEvent(new Event("cartUpdated"));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSignOutLoader(false);
        }
    }

    // Profile 
    const GetProfile = async () => {
        await dispatch(reqtoGetProfile());
    }

    useEffect(() => {
        if (userToken) {
            GetProfile();
        }
    }, [userToken]);

    return (
        <div className='account_sidebar'>
            <h4>Hii, {userProfile?.name}</h4>

            <ul>
                <li>
                    <NavLink to="/account">
                        {({ isActive }) => (
                            <>
                                <img src={isActive ? ThemeMode ? UserActiveLight : UserActiveDark : ThemeMode ? UserLight : UserDark} alt="" className='img-fluid' draggable={false} />

                                Account Overview
                            </>
                        )}
                    </NavLink>
                </li>

                {
                    !googleLogin &&
                    <li>
                        <NavLink to="/change-password">
                            {({ isActive }) => (
                                <>
                                    <img src={isActive ? ThemeMode ? ChangePasswordLight : ChangePasswordDark : ThemeMode ? ChangePasswordLight : ChangePasswordDark} alt="" className='img-fluid' draggable={false} />

                                    Change Password
                                </>
                            )}
                        </NavLink>
                    </li>
                }


                <li>
                    <NavLink to="/orders">
                        {({ isActive }) => (
                            <>
                                <img src={isActive ? ThemeMode ? OrderActiveLight : OrderActiveDark : ThemeMode ? OrderLight : OrderDark} alt="" className='img-fluid' draggable={false} />

                                My Orders
                            </>
                        )}
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/address">
                        {({ isActive }) => (
                            <>
                                <img src={isActive ? ThemeMode ? AddressActiveLight : AddressActiveDark : ThemeMode ? AddressLight : AddressDark} alt="" className='img-fluid' draggable={false} />

                                Manage Address
                            </>
                        )}
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/wishlist">
                        {({ isActive }) => (
                            <>
                                <img src={isActive ? ThemeMode ? WishlistActiveLight : WishlistActiveDark : ThemeMode ? WishlistLight : WishlistDark} alt="" className='img-fluid' draggable={false} />

                                My Wishlist
                            </>
                        )}
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/product-saved">
                        {({ isActive }) => (
                            <>
                                <img src={isActive ? ThemeMode ? SavedActiveLight : SavedActiveDark : ThemeMode ? SavedLight : SavedDark} alt="" className='img-fluid' draggable={false} />

                                Product Saved
                            </>
                        )}
                    </NavLink>
                </li>

                <li>
                    <Link
                        onClick={() => {
                            setSignOutModalShow(true)

                        }}
                    >
                        <img src={ThemeMode ? SignoutLight : SignoutDark} alt="" className='img-fluid' draggable={false} />

                        Sign-out
                    </Link>
                </li>
            </ul>


            {/* Modal-Primary */}
            <SignOut show={signOutModalShow} handleClose={handleClose} handleSignOut={handleSignOut} loader={signOutLoader || loader} />

        </div>
    )
}

export default AccountSidebar;