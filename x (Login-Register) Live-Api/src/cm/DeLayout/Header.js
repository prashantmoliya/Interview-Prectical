import React from 'react'
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutuser } from '../Redux/AuthLayout/AxiosApi';

const Header = () => {

    const dispatch= useDispatch();

    const {login} = useSelector((state)=> ({
        login: state.redux.login,
    }));

    const HandleLogOut = (Did) =>{
        console.log("Delete++", Did);

        if(window.confirm(`Do You Want To Delete?`)){
            dispatch(logoutuser(Did));
        }
    }
    

  return (
    <div>
      
          <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light site-navbar-target mb-5">
              <div class="container">
                  <Link to="/" class="navbar-brand fs-2 fw-bold">React</Link>

                  <div class="m-auto ">
                      <ul class="navbar-nav">
                          <li class="nav-item "><Link to="/DashBoard" class="nav-link">DashBoard</Link></li>
                          <li class="nav-item "><Link to="/User" class="nav-link">User</Link></li>
                      </ul>
                  </div>

                  <div className='cursor-pointer me-2 nav-name'>{login?.Username}</div>
                  <div >
                      <Link to="/Profile"><CgProfile size={25} className='cp cursor-pointer text-white fw-bold me-3' /></Link>
                      <FiLogOut size={25} className='cp text-white fw-bold' onClick={()=> HandleLogOut(login.id)} />
                  </div>
              </div>
          </nav>

    </div>
  )
}

export default Header
