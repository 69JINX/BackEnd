'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './../Css/Navbar.css'
import './../Css/ProfileDropDown.css'
import { CiSearch, CiHeart } from "react-icons/ci";
import { PiUserCircle } from "react-icons/pi";
import { IoBagHandleOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaFacebookF } from "react-icons/fa";
import { MdLabelImportant } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import Link from 'next/link';
import ThisJustIn from './NavbarDropdowns/ThisJustIn';
import Women from './NavbarDropdowns/Women'
import Men from './NavbarDropdowns/Men';
import OurStory from './NavbarDropdowns/OurStory';
import Offcanvas from 'react-bootstrap/Offcanvas';
import OffCanvas_data from './OffCanvas_data';
import OffCanvas_Cart from './OffCanvas_Cart';
import { Modal } from 'react-bootstrap';
import { logo_dark } from './../../Public/images.jsx'
import { Passero_One, Roboto_Condensed } from 'next/font/google'
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { Atom } from 'react-loading-indicators';
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/redux/Slices/productSlice';
import { fetchUserData } from '@/redux/Slices/userSlice';
import { useRouter } from "next/navigation";
import { FaRegCircleUser } from "react-icons/fa6";
import { GoMail } from "react-icons/go";



const robotoCondensed = Roboto_Condensed({ subsets: ['latin-ext'], width: ['500'] });

function Navigbar() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [profileDropDown, setProfileDropDown] = useState(false);

    const [showCart, setShowCart] = useState(false);
    const handleCloseCart = () => setShowCart(false);
    const handleShowCart = () => setShowCart(true);

    const [showCartOnSmallScreen, setShowCartOnSmallScreen] = useState(false);
    const handleCloseCartOnSmallScreen = () => setShowCartOnSmallScreen(false);
    const handleShowCartOnSmallScreen = () => setShowCartOnSmallScreen(true);

    const [LoginModalShow, setLoginModalShow] = useState(false);
    const [SignUpModalShow, setSignUpModalShow] = useState(false);

    const [userData, setUserData] = useState(null);

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.value);

    useEffect(() => {
        dispatch(fetchProducts()); // Whenever website(header) loads, all products will be fetches in advance and stored in the redux store, so whenever we need to show data in any page, we can show it from redux store instead of calling api on every page
        dispatch(fetchUserData()); // Fetch user data from the server whenever user data is required in the website
    }, [dispatch]);


    useEffect(() => {
        console.log('user Data => ', user);
        if (user) return setUserData(user.data);
    }, [user])

    const checkIfLoggedIn = () => {
        dispatch(fetchUserData());

        if (!(JSON.stringify(user) === "{}")) { // Checking if user is not a empty object. If user is empty that means we didn't get any cookie token from client or token which was stored in cookie was expired
            // alert('You are already Logged In');
            setProfileDropDown(!profileDropDown);
            return 0;
        }

        setLoginModalShow(true);
    }

    const logOut = () => {
        Cookies.remove('frankandoak_user');
        window.location.reload();
    }





    return (
        <>
            <div className="Navbar ">
                <div className='web-view d-flex justify-content-between pe-4'>
                    <div className="Menu">



                        <ul className='m-0'>
                            <li className='fs-4'><Link href="#" className="logo">Frank And Oak</Link></li>
                            <li><Link href="#"> This Just In</Link>
                                <div className="this-just-in" style={{ marginLeft: '-240px' }}>
                                    <ThisJustIn />
                                </div>
                            </li>
                            <li><Link href="#"> Women</Link>
                                <div className="Women" style={{ marginLeft: '-365px' }}>
                                    <Women />
                                </div></li>
                            <li><Link href="#"> Men</Link>
                                <div className="Men" style={{ marginLeft: '-460px' }}>
                                    <Men />
                                </div>
                            </li>
                            <li><Link href="#"> OurStory</Link>
                                <div className="OurStory" style={{ marginLeft: '-540px' }}>
                                    <OurStory />
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="controls fs-3">

                        <nav>
                            <div className={`menu ${profileDropDown ? 'active' : ''}`}>
                                {userData ?
                                    <ul>
                                        <li><FaRegCircleUser size={20} /><span>{userData.first_name} {userData.last_name}</span></li>
                                        <li><GoMail size={20} /><span>{userData.email}</span></li>
                                    </ul> : ''}
                                <div role='button' className='logout-btn' onClick={logOut}>Sign Out</div>
                            </div>
                        </nav>

                        <ul className='m-0'>
                            <li><CiSearch /></li>
                            <li className='position-relative'>
                                <PiUserCircle role='button' onClick={checkIfLoggedIn} />
                                <div className='userProfile position-absolute'></div>
                                <LogInModal show={LoginModalShow} onHide={() => setLoginModalShow(false)} onSignUp={() => setSignUpModalShow(true)} />
                                <SignUpModal show={SignUpModalShow} onHide={() => setSignUpModalShow(false)} onLogin={() => setLoginModalShow(true)} />
                            </li>
                            <li><CiHeart /></li>
                            <li role='button'>
                                <IoBagHandleOutline onClick={handleShowCart} />
                                <Offcanvas style={{ width: '35vw' }} placement='end' show={showCart} onHide={handleCloseCart}>
                                    <OffCanvas_Cart />
                                </Offcanvas>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='mobile-view d-flex justify-content-between pe-4 flex-wrap-reverse'>
                    <div className="Menu">
                        <ul className='m-0 d-flex align-items-center'>
                            <li >
                                <RxHamburgerMenu size={30} onClick={handleShow} />
                                <Offcanvas show={show} onHide={handleClose}>
                                    <OffCanvas_data />
                                </Offcanvas>
                            </li>
                            <li className='fs-4 fw-bold'><Link href="#" className="logo">Frank And Oak</Link></li>
                        </ul>
                    </div>
                    <div className="controls fs-3">
                        <ul className='m-0'>
                            <li><CiSearch /></li>
                            <li><PiUserCircle /></li>
                            <li><CiHeart /></li>
                            <li role='button'>
                                <IoBagHandleOutline onClick={handleShowCartOnSmallScreen} />
                                <Offcanvas style={{ width: '60vw' }} placement='end' show={showCartOnSmallScreen} onHide={handleCloseCartOnSmallScreen}>
                                    <OffCanvas_Cart />
                                </Offcanvas></li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* <Navbar collapseOnSelect expand="lg" className="px-5 Navbar">
                <Navbar.Brand href="#home" className='logo fw-bold fs-4'>Frank And Oak</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <div className="Menu">
                            <ul className='m-0'>
                                <Link href="#" className="logo p-0"><li></li></Link>
                                <li><Link href="#"> This Just In</Link>
                                    <div className="this-just-in" style={{ marginLeft: '-18vw' }}>
                                        <ThisJustIn />
                                    </div>
                                </li>
                                <li><Link href="#"> Women</Link>
                                    <div className="Women" style={{ marginLeft: '-26vw' }}>
                                        <Women />
                                    </div></li>
                                <li><Link href="#"> Men</Link>
                                    <div className="Men" style={{ marginLeft: '-32vw' }}>
                                        <Men />
                                    </div>
                                </li>
                                <li><Link href="#"> OurStory</Link>
                                    <div className="OurStory" style={{ marginLeft: '-36.5vw' }}>
                                        <OurStory />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Nav>
                    <Nav>
                        <div className="controls fs-3">
                            <ul className='m-0'>
                                <li><CiSearch /></li>
                                <li><PiUserCircle /></li>
                                <li><CiHeart /></li>
                                <li><IoBagHandleOutline /></li>
                            </ul>
                        </div>
                    </Nav>
                </Navbar.Collapse>

            </Navbar> */}
        </>
    )
}

function LogInModal(props) {

    const [formData, setformData] = useState({});
    const router = useRouter();

    const handleInput = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleLogin = () => {

        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (reg.test(formData.email) == false) { // using this function because type="email" is not validating email(it is not validating email we have to put button type to submit which if we did then page is refreshing, used e.preventDefault() but it is not working because of something parent element having some Link tag or form in it)
            alert('Invalid Email Address');
            // toast.error('Invalid Email Address', {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "colored",
            // });

            return;
        }

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/website/user/login`, formData)
            .then((response) => {

                if (response.data.token) {
                    for (const key in formData) {
                        formData[key] = '';
                    }
                    Cookies.set('frankandoak_user', response.data.token);
                    alert('Successfully logged in');

                    window.location.reload();

                    props.onHide();
                }
            })
            .catch((error) => {
                if (error.response.data.message) alert(error.response.data.message);

                // toast.error(error.response.data.message, {
                //     position: "top-right",
                //     autoClose: 5000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "colored",
                // });
            })
    }

    return (
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered className='LoginModal'>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className='m-auto'>
                    <strong className={`${robotoCondensed.className} fs-2`}>Welcome Back!</strong><br />
                    <strong className={`${robotoCondensed.className} fs-6`}>Log in to enjoy your perks</strong>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div>
                    {/* <ToastContainer // commented cause not working(only allowed on ToastContainer in one file, and we are using it in SignUpModal s)
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    /> */}
                    <div className='d-flex justify-content-around'>
                        <div className='mb-2 bg-black m-auto' style={{ width: '50px' }}>
                            <Image alt="" src={logo_dark} width={40}></Image>
                        </div>
                        <div className='mb-2 ps-4 m-auto' style={{ width: '50px' }}>
                            <FaHeart size={30} />
                        </div>
                        <div className='mb-2 m-auto' style={{ width: '50px' }}>
                            <MdLabelImportant size={30} />
                        </div>
                    </div>
                    <div className='Offers d-flex justify-content-around mb-4 text-center'>
                        <div>
                            <div>Frank's Club</div>
                            <div>Earn points, get rewards</div>
                        </div>
                        <div>
                            <div>Wishlist</div>
                            <div>Save your favourites</div>
                        </div>
                        <div>
                            <div>Early access</div>
                            <div>Exclusive sale perks</div>
                        </div>
                    </div>
                    <div className='px-4'>
                        <form>
                            <div><input className='w-100 my-2 p-2' onChange={handleInput} value={formData.email} type='email' name="email" placeholder='Email Address' /></div>
                            <div><input className='w-100 my-2 p-2' onChange={handleInput} value={formData.password} type='password' name="password" placeholder='Password' /></div>
                            <div className='text-decoration-underline'>Forgot Password ?</div>
                            <div><button type='button' onClick={handleLogin} className='w-100 my-2 p-2 fw-bold border border-white border-2 text-white bg-black'>
                                Log In
                            </button></div>
                        </form>
                        <hr />
                        <div>
                            <div className='text-center pb-2'>Social Login</div>
                            <div className='d-flex justify-content-around'>
                                <div role='button' className='border border-2 border-black p-2 text-center'>
                                    <FaFacebookF className='pb-1' size={20} />
                                    <span className='ms-1'>Sign in with Facebook</span>
                                </div>
                                <div role='button' className='border border-2 border-black p-2 text-center'>
                                    <FaGoogle className='pb-1' size={20} />
                                    <span className='ms-1'>Sign in with Google</span>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className='text-center'>
                            Don't have an account?
                            <span role='button' onClick={() => { props.onHide(); props.onSignUp() }} className='text-decoration-underline'>
                                &nbsp;Sign up &#8594;
                            </span>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer> */}
        </Modal>
    );
}

function SignUpModal(props) {

    const [formData, setformData] = useState({ first_name: '', last_name: '', email: '', password: '' });
    const [showOTPBox, setshowOTPBox] = useState(false);
    const [loader, setloader] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
    let timerInterval;

    const handleInput = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleRegister = (e) => {

        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (reg.test(formData.email) == false) { // using this function because type="email" is not validating email(it is not validating email we have to put button type to submit which if we did then page is refreshing, used e.preventDefault() but it is not working because of something parent element having some Link tag or form in it)

            toast.error('Invalid Email Address', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            return;
        }

        function hasEmptyValues({ iShopFor, otp, ...obj }) {
            return Object.values(obj).some(
                value =>
                    value === null ||
                    value === undefined ||
                    value === '' ||
                    (Array.isArray(value) && value.length === 0) ||
                    (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0)
            );
        }
        console.log(formData);
        if (hasEmptyValues(formData)) {
            toast.error('required fields are missing!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        setloader(true);

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/website/user/registration`, formData)
            .then((response) => {
                if (response.data.data) {

                    toast.error('You already have an account with this Email. Please Login', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                    setloader(false);
                }
                else {

                    setloader(false);
                    setshowOTPBox(true);
                    toast.success('OTP send to your email address', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                    setTimeout(() => {
                        setshowOTPBox(false);
                        clearInterval(timerInterval);
                    }, 120000);

                    setRemainingTime(120);
                    timerInterval = setInterval(() => {
                        setRemainingTime((prevTime) => {
                            if (prevTime <= 1) {
                                clearInterval(timerInterval); // Clear interval when time is up
                                return 0;
                            }
                            return prevTime - 1;
                        });
                    }, 1000);

                }
            })
            .catch((error) => {
                setloader(false);
                console.log(error);
                toast.error(error || error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
    }

    const validateOTP = (e) => {
        console.log(formData.otp);
        setloader(true);
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/website/user/validateOTP`, formData)
            .then((response) => {
                setshowOTPBox(false);
                setloader(false);

                clearInterval(timerInterval); // Stop the timer
                setRemainingTime(0);

                for (const key in formData) {
                    formData[key] = '';
                }

                if (response.status == 204) {

                    toast.success(<>Account Created Successfully.<br /> Login to Continue...</>, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }

                props.onLogin();
                setTimeout(() => props.onHide(), 5000);

            })
            .catch((error) => {
                setloader(false);
                toast.error(error.response && error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
    }

    useEffect(() => {
        // Clean up the interval on unmount
        return () => clearInterval(timerInterval);
    }, []);

    return (
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered className='LoginModal'>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className='m-auto'>
                    <strong className={`${robotoCondensed.className} fs-2`}>Welcome Back!</strong><br />
                    <strong className={`${robotoCondensed.className} fs-6`}>Log in to enjoy your perks</strong>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                    <div className='text-center'>
                        Already have an account?
                        <span role='button' onClick={() => { props.onHide(); props.onLogin() }} className='text-decoration-underline'>
                            &nbsp;Log in &#8594;
                        </span>
                    </div>
                    <div className='px-4'>
                        <form>
                            <div><input name='first_name' type='text' value={formData.first_name} onChange={handleInput} className='w-100 my-2 p-2' placeholder='First Name' /></div>
                            <div><input name='last_name' type='text' value={formData.last_name} onChange={handleInput} className='w-100 my-2 p-2' placeholder='Last Name' /></div>
                            <div><input name='email' type='email' value={formData.email} onChange={handleInput} className='w-100 my-2 p-2' placeholder='Email Address' /></div>
                            <div><input name='password' type='password' value={formData.password} onChange={handleInput} className='w-100 my-2 p-2' placeholder='Password' /></div>
                            <div><input className={`${showOTPBox ? 'd-block' : 'd-none'} w-100 my-2 p-2`} type="text" name="otp" onChange={handleInput} placeholder="OTP" /></div>
                            <div className="d-flex gap-5 my-2">I shop for
                                <div className="d-flex items-center gap-3">
                                    <input type="radio" name="iShopFor" onChange={handleInput} value="Men" id="gender" /> Men
                                    <input type="radio" name="iShopFor" onChange={handleInput} value="Women" id="gender" /> Women
                                    <input type="radio" name="iShopFor" onChange={handleInput} value="All" id="gender" /> All
                                </div>
                            </div>
                            <div className={` text-center ${loader ? 'd-block' : 'd-none'}`}>
                                <Atom className="text-center fixed top-0 left-0" color="#32cd32" size="medium" text="" textColor="" />
                            </div>
                            <div className='mt-3 text-center' style={{ marginTop: "20px", fontSize: "16px" }}>
                                {remainingTime > 0 ? `OTP expires in ${remainingTime} seconds` : ""}
                            </div>
                            {/* <div className={`${showOTPBox ? 'd-block' : 'd-none'} text-center`}>OTP will expire within {timer} seconds</div> */}
                            <div>
                                <button type='button'
                                    onClick={handleRegister}
                                    disabled={loader}
                                    className={`w-100 my-2 p-2 fw-bold border border-white border-2 text-white bg-black ${loader ? 'd-none' : 'd-block'} ${showOTPBox ? 'd-none' : 'd-block'}`}>
                                    Generate OTP
                                </button>
                            </div>
                            <div>
                                <button type='button'
                                    onClick={validateOTP}
                                    className={`w-100 my-2 p-2 fw-bold border border-white border-2 text-white bg-black ${showOTPBox ? 'd-block' : 'd-none'} `}>
                                    Validate OTP
                                </button>
                            </div>
                        </form>
                        <hr />
                        <div>
                            <div className='text-center pb-2'>Social SignUp</div>
                            <div className='d-flex justify-content-around'>
                                <div role='button' className='border border-2 border-black p-2 text-center'>
                                    <FaFacebookF className='pb-1' size={20} />
                                    <span className='ms-1'>Sign in with Facebook</span>
                                </div>
                                <div role='button' className='border border-2 border-black p-2 text-center'>
                                    <FaGoogle className='pb-1' size={20} />
                                    <span className='ms-1'>Sign in with Google</span>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer> */}
        </Modal>
    );
}

export default Navigbar



