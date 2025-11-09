import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { logoutuser } from '../Redux/Rest Api/AxiosApi';

const Header = () => {

    const dispatch = useDispatch();

    const { login } = useSelector((state) => ({
        login: state.redux.login,
    }));
    console.log("Redux Login-User Id++", login?.id);


    const HandleLogout = (Did) => {
        try {
            console.log("Logout-User Delete++", Did);

            if (window.confirm("Do you want to Logout")){
                dispatch(logoutuser(Did));
            }
        }
        catch(e){
            console.log("User Logout Delete Error++", e);
        }
    }


    return (
        <div>

            <header className="p-3 text-bg-dark bg-dark">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            <div className='fw-bold fs-2'>React</div>
                        </Link>
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 m-auto">
                            <li><Link to="/Home" className="nav-link px-2 text-white">Home</Link></li>
                        </ul>
                        <div className="text-end me-5">
                            <Link to="/Profile"><CgProfile size={25} className='cursor-pointer text-white fw-bold me-3' /></Link>
                            <FiLogOut size={25} className='cursor-pointer text-white fw-bold' onClick={()=> HandleLogout(login.id)} />
                        </div>
                    </div>
                </div>
            </header>


        </div>
    );
}

export default Header;
