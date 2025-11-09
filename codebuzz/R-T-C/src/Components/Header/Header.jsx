import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { auth } from "../../Firebase/firebaseconfig";
import { useContext, useEffect, useState } from "react";
import { LuCircleUser } from "react-icons/lu";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { DarkModeContext } from "../Context-DarkMode/DarkModeContext";

const Header = () => {

    const navigate = useNavigate();

    const { dark, setDark } = useContext(DarkModeContext);
    // console.log("Use-Context-Api", dark, setDark);   

    const user = auth.currentUser; // check if user is null
    console.log("user-->", user); // null if logged out

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("onAuthStateChanged++", currentUser);

        });
        // console.log(user);

        return () => unsubscribe();
    }, [])


    const HandleLogOut = async () => {
        if (window.confirm("Do You Want to Logout ? ")) {

            try {
                // User Sign-Out (signOut)    
                // const res = await signOut(auth);
                // console.log("SignOut++", res);

                const res = await signOut(auth);
                console.log("signOut++", res);

                console.log("Current User after sign-out: ", auth.currentUser);
                localStorage.removeItem("firebase-token");
                navigate("/login");
                // window.location.reload();

                // toast.success("Your LogOut SuccessFull");
            } catch (err) {
                console.error("SignOut Error++", err);

            }
        }
    };


    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
            // Enter fullscreen
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) { // Firefox
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari
                document.documentElement.webkitRequestFullscreen();
            }

            setIsFullScreen(true);
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { // Firefox
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { // Chrome, Safari
                document.webkitExitFullscreen();
            }

            setIsFullScreen(false);
        }
    };


    const ToggleTheme = () => {
        setDark(!dark);
    }

    return (
        <>

            <header className={`p-3 ${dark ? 'bg-white text-dark' : 'bg-dark text-white'}`}>
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <div className={`d-flex align-items-center mb-2 mb-lg-0 ${dark ? 'text-dark' : 'text-white'} text-decoration-none`}>
                            <a className="navbar-brand fs-2 fw-bold" href="/">React</a>
                        </div>

                        <ul className="nav col-12 col-lg-auto m-lg-auto mb-2 justify-content-center mb-md-0">
                            {/* <li><Link to="/" className={`nav-link px-2 ${ dark ? 'text-dark' : 'text-white' }`}>Chart-js</Link></li>
                            <li><Link to="/fancy-ui" className={`nav-link px-2 ${ dark ? 'text-dark' : 'text-white' }`}>Fancy-ui</Link></li>
                            <li><Link to="/gsap" className={`nav-link px-2 ${ dark ? 'text-dark' : 'text-white' }`}>Gsap</Link></li>
                            <li><Link to="/i18next" className={`nav-link px-2 ${ dark ? 'text-dark' : 'text-white' }`}>i18next</Link></li>
                            <li><Link to="/user" className={`nav-link px-2 ${ dark ? 'text-dark' : 'text-white' }`}>user</Link></li>
                            <li><Link to="/cart" className={`nav-link px-2 ${ dark ? 'text-dark' : 'text-white' }`}>Cart</Link></li> */}

                            {Links?.map((i, index) => (
                                <li key={index}>
                                    <Link to={i.path} className={`nav-link px-2 ${dark ? 'text-dark' : 'text-white'}`}>
                                        {i.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        {/* <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                            <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
                        </form> */}
                        <div className="text-end d-flex align-items-center">
                            {/* <button type="button" className="btn btn-success me-2">
                                Profile
                            </button> */}
                            <div className="me-2">
                                <Link className="me-3" onClick={toggleFullScreen}>
                                    {/* <AiOutlineFullscreen size={30} /> */}

                                    {isFullScreen ? (
                                        <AiOutlineFullscreenExit size={30} />
                                    ) : (
                                        <AiOutlineFullscreen size={30} />
                                    )}
                                </Link>

                                <Link to="/profile">
                                    <LuCircleUser size={30} color={dark ? 'black' : 'white'} />
                                </Link>
                            </div>
                            <button type="button" className="btn btn-danger me-2" onClick={HandleLogOut}>LogOut</button>
                            {/* <button type="button" className="btn btn-warning">Sign-up</button> */}
                        </div>


                        <div className="ms-4 cursor-pointer" onClick={ToggleTheme}>
                            {
                                dark ? (
                                    <MdDarkMode size={25} />
                                ) : (
                                    <MdLightMode size={25} />
                                )
                            }

                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}

export default Header;

export const Links = [
    { name: "Chart-js", path: "/" },
    { name: "Fancy-ui", path: "/fancy-ui" },
    { name: "Gsap", path: "/gsap" },
    { name: "i18next", path: "/i18next" },
    { name: "user", path: "/user" },
    { name: "product", path: "/product" },
    { name: "cart", path: "/cart" },
];
