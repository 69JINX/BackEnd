import Image from 'next/image'
import React, { useState } from 'react'
import { cart_img } from '../../../Public/images.jsx'
import { FaRegHeart } from "react-icons/fa"
import Link from 'next/link.js'
import { Calligraffitti, Signika_Negative } from 'next/font/google'
import { FaRegCircleDot } from 'react-icons/fa6'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart } from '@/redux/Slices/cartSlice.js'
import { Toast } from 'react-bootstrap'

const Signika = Signika_Negative({ subsets: ['latin-ext'] })

function OffiCanvas_Cart_Cards({ cart, filepath }) {

    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [toast, setToast] = useState({ text: '', color: '', delay: 0 });

    const removeProductFromCart = () => {
        console.log(cart);
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/website/cart/delete-cart-product/${cart._id}`)
            .then((response) => {
                console.log(response);
                setShow(true);
                setToast({ text: `${response.data.deletedProduct.product.name} removed from cart`, color: '#72bf6a', delay: 1000 });
                dispatch(fetchCart(user._id));
            })
            .catch((error) => {
                console.log(error);
                setShow(true);
                setToast({ text: `${error.response && error.response.data.message}`, color: '#ED4337', delay: 1000 });
            })
    }

    return (
        <div className={`Cart-item d-flex py-3 border-bottom`}>
            <Toast className='position-fixed' style={{ position: 'fixed', top: '40px', right: '10px', zIndex: '999', backgroundColor: toast.color, fontWeight: 'bold' }}
                onClose={() => setShow(false)} show={show} delay={toast.delay} autohide>
                <Toast.Body>{toast.text}</Toast.Body>
            </Toast>
            <div className='w-25 mx-2'>
                <img src={filepath + cart.product.thumbnail} width="100%" />
            </div>
            <div className='w-75 px-2 d-flex flex-column justify-content-between'>
                <div className='w-100'>
                    <div className='d-flex justify-content-between '>
                        <div>{cart.product.name}</div>
                        <div role='button' onClick={removeProductFromCart}>X</div>
                    </div>
                    <div className='text-black-50'>
                        Size : {cart.size.name}
                    </div>
                    <div className='mt-2'>
                        <Link href=""><span className={`${Signika.className} text-decoration-underline`}>Move to Wishlist</span></Link>
                        <span className='px-2'><FaRegHeart color='black' /></span>
                    </div>
                    <div className='m-2'>
                        <FaRegCircleDot role='button' color={cart.color.code} size={20} />
                    </div>
                </div>
                <div className='w-100 d-flex justify-content-between'>
                    <div className='d-flex fs-5'>
                        <div className='px-3 py-2 border' role='button'>–</div>
                        <div className='px-3 py-2 border' role='button'>{cart.quantity}</div>
                        <div className='px-3 py-2 border' role='button'>+</div>
                    </div>
                    <div className='fs-6 align-content-end' >
                        <strong>₹{cart.product.price}</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OffiCanvas_Cart_Cards