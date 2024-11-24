'use client'
import React, { useEffect, useState } from 'react'
import './../Css/QuickAdd_Cards.css'
import Link from 'next/link'
import { FaRegCircleDot } from "react-icons/fa6";
import { Toast } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '@/redux/Slices/userSlice';
import ReactDOM from "react-dom";

function QuickAdd_Cards({ product, filepath }) {
    const [Bg_img, setBg_img] = useState(filepath + product.thumbnail);
    const [selectedColor, setSelectedColor] = useState(product.color && product.color[0].code);
    const [toast, setToast] = useState({ text: '', color: '', delay: 0 });

    const [show, setShow] = useState(false);

    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();

    const addToCard = () => {
        dispatch(fetchUserData());
        setShow(true);

        if ((JSON.stringify(user) === "{}")) {
            setToast({ text: 'Please Login to perform further actions!', color: '#ED4337', delay: 3000 });
            return 0;
        }

        setToast({ text: 'Added to Cart', color: '#72bf6a', delay: 1000 });
    }

    

    return (
        <div className="box">
            <Toast className='position-fixed' style={{ position: 'fixed', top: '40px', right: '10px', zIndex: '999', backgroundColor: toast.color, fontWeight: 'bold' }}
                onClose={() => setShow(false)} show={show} delay={toast.delay} autohide>
                <Toast.Body>{toast.text}</Toast.Body>
            </Toast>
            <div className='image position-relative d-flex justify-content-center align-items-end' style={{ backgroundImage: `url('${Bg_img}')` }} onMouseEnter={() => setBg_img(filepath + product.image_on_hover)} onMouseLeave={() => setBg_img(filepath + product.thumbnail)}>
                <div className='best-seller bg-black p-1 text-white d-inline-block position-absolute m-1'>
                    BEST SELLER
                </div>
                <div className="quick-add px-3 py-2 text-center mb-2">
                    Quick add
                    <div className='quick-add-size'>
                        {
                            product.size && product.size.map((size, index) => (
                                <div key={index} role='button' className="size" onClick={addToCard}>
                                    {size.name}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='details'>
                <ul className='m-0 list-unstyled p-0'>
                    <li className='title fw-bold my-2'>{product.name}</li>
                    <li className='price fs-6 my-2 d-flex'><div>{`₹${product.price}`}</div>&nbsp;<div className='text-decoration-line-through'>{`₹${product.mrp}`}</div></li>
                    <li className='color fw-bold'>{product.color && product.color.length} color</li>
                    <li className='show_color d-flex flex-wrap gap-2'>
                        {product.color && product.color.map((color) => (
                            <div key={color.code} role='button' onClick={() => setSelectedColor(color.code)}>
                                <FaRegCircleDot role='button' color={color.code}
                                    size={selectedColor === color.code ? 30 : 20} />
                            </div>
                        ))
                        }
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default QuickAdd_Cards