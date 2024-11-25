import React, { useEffect, useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import '././../Css/OffCanvas_data.css'
import Link from 'next/link';
import OffCanvas_Cart_Cards from './OffCanvas_Cart_data/OffCanvas_Cart_Cards';
import { IoLockClosedOutline } from "react-icons/io5";
import { Poppins, Kanit } from 'next/font/google'
import { useDispatch, useSelector } from 'react-redux';
import './../Css/Collections.css'

const poppins = Poppins({ subsets: ['latin-ext'], weight: ['400'] })
const kanit = Kanit({ subsets: ['latin-ext'], weight: ['400'] })

function OffCanvas_Cart() {

    const [cart, setCart] = useState([]);
    const [filepath, setfilepath] = useState('');

    const user = useSelector((state) => state.user.value)

    const { cart_value, cart_loading, cart_error } = useSelector((state) => state.cart);
    useEffect(() => {
        if (cart_value) {
            setCart(cart_value.data);
            setfilepath(cart_value.filepath);
            console.log('cart_value=>', cart_value);
            return;
        }
    }, [cart_value])


    return (
        <>
            <Offcanvas.Header closeButton>
                <Link href="#" className="logo fs-4 fw-bold">Frank And Oak</Link>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className='w-100 text-white py-2 bg-black text-center'>
                    <strong>Free shipping on order $99+ and free returns</strong>
                </div>

                <div className={`loader mt-3 text-center m-auto ${cart_loading ? 'd-block' : 'd-none'}`}>
                    <div id="loader">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                {
                    (JSON.stringify(user) === "{}") ?

                        <div className='text-center my-4 text-danger fs-4'>Please Login to See Your Cart</div>
                        :
                        (cart && cart.length == 0) ?
                            <div className='text-center my-4 text-danger fs-4'>Your Cart is Empty</div>
                            :
                            <>
                                <div className='OffCanvas-Cart-Cards p-3 overflow-scroll' style={{ height: '78%' }}>
                                    {
                                        cart && cart.map((cart_item, index) => (
                                            <OffCanvas_Cart_Cards key={index} cart={cart_item} filepath={filepath} />
                                        ))
                                    }
                                </div>
                                <div className='px-2 bg-light'>
                                    <div className={`${kanit.className} m-2 fs-5`}>
                                        Subtotal
                                        (<span className={`${kanit.className} fs-6 opacity-75`}>{cart.length} items</span>)
                                    </div>
                                    <Link href="#" className="text-decoration-none">
                                        <button className={`${poppins.className} w-100 p-2 fs-5 fw-bold text-white bg-black`}>Secure Checkout <IoLockClosedOutline size={17} /></button>
                                    </Link>
                                </div>
                            </>
                }
            </Offcanvas.Body>
        </>
    )
}

export default OffCanvas_Cart