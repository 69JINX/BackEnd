'use client'
import React, { useState } from 'react'
import './../Css/QuickAdd_Cards.css'
import Link from 'next/link'
import { FaRegCircleDot } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa6";

function QuickAdd_Cards(props) {
    const [Bg_img, setBg_img] = useState(props.bg_out);
    const [selectedColor, setSelectedColor] = useState('');

    const setColor = () => {

    }
    return (
        // <Link href="#">
            <div className="box">
                <div className='image position-relative d-flex justify-content-center align-items-end' style={{ backgroundImage: `url('${Bg_img}')` }} onMouseEnter={() => setBg_img(props.bg_in)} onMouseLeave={() => setBg_img(props.bg_out)}>
                    <div className='best-seller bg-black p-1 text-white d-inline-block position-absolute m-1'>
                        BEST SELLER
                    </div>
                    <div className="quick-add px-3 py-2 text-center mb-2">
                        Quick add
                        <div className='quick-add-size'>
                            <div className="size">XXS</div>
                            <div className="size">XS</div>
                            <div className="size">S</div>
                            <div className="size">M</div>
                            <div className="size">L</div>
                            <div className="size">XL</div>
                        </div>
                    </div>
                </div>
                <div className='details'>
                    <ul className='m-0 list-unstyled p-0'>
                        <li className='title fw-bold my-2'>{props.title}</li>
                        <li className='price fs-6 my-2 d-flex'><div>{props.price}</div>&nbsp;<div className='text-decoration-line-through'>{props.mrp}</div></li>
                        <li className='color fw-bold'>{props.colors.length} color</li>
                        <li className='show_color d-flex gap-2'>
                            {props.colors && props.colors.map((color) => (
                                <div key={color.code} role='button' onClick={() => setSelectedColor(color.code)}>
                                    <FaRegCircleDot role='button' color={color.code}
                                        size={selectedColor === color.code ? 30 : 20}/>
                                </div>
                            ))
                            }
                        </li>
                    </ul>
                </div>
            </div>
        // </Link>
    )
}

export default QuickAdd_Cards