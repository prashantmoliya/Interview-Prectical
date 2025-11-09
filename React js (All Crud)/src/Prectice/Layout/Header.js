import React from 'react'
import { Link } from 'react-router-dom'
import { FiLogOut } from "react-icons/fi";

const Header = () => {

    const HandleLogOut = () => {
        localStorage.removeItem('Login-User');
        window.location.reload();
    }

    return (
        <div>

            <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light site-navbar-target mb-5">
                <div class="container">
                    <Link to="/ViewCrud" class="navbar-brand fs-2 fw-bold">React</Link>

                    <button class="navbar-toggler js-fh5co-nav-toggle fh5co-nav-toggle" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="oi oi-menu"></span> Menu
                    </button>

                    <div class="m-auto ">
                        <ul class="navbar-nav">
                            <li class="nav-item "><Link to="/ViewCrud" class="nav-link">Home</Link></li>
                            <li class="nav-item "><Link to="/Axios/ViewCrud" class="nav-link">AxiosCrud</Link></li>
                            <li class="nav-item "><Link to="/Firebase/ViewCrud" class="nav-link">FirebaseCrud</Link></li>
                            <li class="nav-item "><Link to="/Redux/ViewCrud" class="nav-link">ReduxCrud</Link></li>
                            <li class="nav-item "><Link to="/ReduxAxios/ViewCrud" class="nav-link">ReduxAxiosCrud</Link></li>
                            <li class="nav-item "><Link to="/Redux" class="nav-link">ApiRedux</Link></li>
                        </ul>
                    </div>

                    <div> 
                        <FiLogOut size={25} className='cursor-pointer' onClick={HandleLogOut} />
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Header
